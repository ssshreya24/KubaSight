from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import pandas as pd
import google.generativeai as genai
from dotenv import load_dotenv
import os

# -------------------- Flask App Setup --------------------
app = Flask(__name__)
CORS(app)  # ✅ Allow cross-origin requests from frontend

# -------------------- Load Environment Variables --------------------
load_dotenv()
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
if not GEMINI_API_KEY:
    raise ValueError("❌ Gemini API key not found in .env file.")

genai.configure(api_key=GEMINI_API_KEY)

# -------------------- Load ML Model and Scaler --------------------
model = joblib.load("model/classifier.pkl")
scaler = joblib.load("model/scaler.pkl")
feature_names = scaler.feature_names_in_

# -------------------- Thresholds --------------------
CPU_HARD_THRESHOLD = 85
MEMORY_HARD_THRESHOLD = 750
NET_IO_HARD_THRESHOLD = 15
CPU_MEMORY_COMBO_THRESHOLD = 300

# -------------------- Utility Functions --------------------
def safe_float(value, default=0.0):
    try:
        return float(value)
    except:
        return default

def predict_failure(cpu, memory, net_io, pod_name,
                    net_traffic, net_transmit, net_receive,
                    net_transmit_errors, net_receive_errors):

    restarts = 0
    net_recv = net_io / 2
    net_trans = net_io / 2

    input_df = pd.DataFrame([{ 
        "CPU Usage (%)": cpu,
        "Memory Usage (%)": memory,
        "Pod Restarts": restarts,
        "Network Receive Packets Dropped (p/s)": net_recv,
        "Network Transmit Packets Dropped (p/s)": net_trans,
        "Network Traffic (B/s)": net_traffic,
        "Network Transmit (B/s)": net_transmit,
        "Network Receive (B/s)": net_receive,
        "Network Transmit Errors": net_transmit_errors,
        "Network Receive Errors": net_receive_errors
    }])

    input_df = input_df[feature_names]
    scaled_input = scaler.transform(input_df)

    failure_prob = model.predict_proba(scaled_input)[0][1]
    prob_percent = round(failure_prob * 100, 2)

    # Identify root causes
    root_causes = []
    if cpu > CPU_HARD_THRESHOLD:
        root_causes.append("High CPU usage")
    if memory > MEMORY_HARD_THRESHOLD:
        root_causes.append("High Memory usage")
    if net_io > NET_IO_HARD_THRESHOLD:
        root_causes.append("Network packet drops")
    if cpu + (memory / 10) > CPU_MEMORY_COMBO_THRESHOLD and not root_causes:
        root_causes.append("High combined CPU+Memory usage")

    # Determine issue type
    if root_causes:
        if "High Memory usage" in root_causes or "High combined CPU+Memory usage" in root_causes:
            issue = "Resource Exhaustion (Memory)"
        elif "Network packet drops" in root_causes:
            issue = "Network Issues"
        elif "High CPU usage" in root_causes:
            issue = "Resource Exhaustion (CPU)"
        else:
            issue = "Node Failure"
    else:
        issue = "No Failure Detected"

    # Risk and suggestions
    if issue == "No Failure Detected":
        risk_level = "Low"
        expected_time = "N/A"
        suggested_action = "No Action Needed"
    else:
        risk_level = (
            "Critical" if failure_prob > 0.9 else
            "High" if failure_prob > 0.75 else
            "Medium"
        )
        expected_time = {
            "Critical": "Within 5-10 minutes",
            "High": "Within 30 minutes",
            "Medium": "Within 1–2 hours"
        }.get(risk_level, "Unknown")

        suggestion_map = {
            "Resource Exhaustion (Memory)": "Scale pod or optimize memory usage",
            "Resource Exhaustion (CPU)": "Limit CPU-bound processes or autoscale pods",
            "Network Issues": "Check service mesh / CNI configs / pod network policies",
            "Node Failure": "Migrate workload or verify node health"
        }
        suggested_action = suggestion_map.get(issue, "Monitor and log anomaly")

    return {
        "Predicted Issue": issue,
        "Pod/Node": pod_name,
        "Confidence (%)": prob_percent,
        "Risk Level": risk_level,
        "Expected Time": expected_time,
        "Suggested Action": suggested_action,
        "Causes": ", ".join(root_causes) if root_causes else "None"
    }

# -------------------- Routes --------------------
@app.route("/predict", methods=["POST"])
def predict():
    try:
        data = request.get_json()

        # ✅ Optional key check (sync with frontend)
        if data.get("predict_key") != "your-secure-key-here":
            return jsonify({"error": "Invalid prediction key"}), 403

        # Remove key before using data
        data.pop("predict_key", None)

        result = predict_failure(
            cpu=safe_float(data.get("cpu", 0)),
            memory=safe_float(data.get("memory", 0)),
            net_io=safe_float(data.get("net_io", 0)),
            pod_name=data.get("pod_name", "pod-x"),
            net_traffic=safe_float(data.get("network_traffic", 0)),
            net_transmit=safe_float(data.get("network_transmit", 0)),
            net_receive=safe_float(data.get("network_receive", 0)),
            net_transmit_errors=safe_float(data.get("network_transmit_errors", 0)),
            net_receive_errors=safe_float(data.get("network_receive_errors", 0))
        )

        return jsonify(result)

    except Exception as e:
        print("❌ Error in /predict route:", e)
        return jsonify({"error": str(e)}), 500

# -------------------- Optional HTML Form for Manual Testing --------------------
@app.route("/form")
def form():
    return """
    <h2>🔍 Real-Time Kubernetes Failure Predictor</h2>
    <form method="POST" action="/predict">
        Pod Name: <input name="pod_name"><br><br>
        CPU Usage (%): <input name="cpu"><br>
        Memory Usage (MB): <input name="memory"><br>
        Network IO: <input name="net_io"><br>
        Network Traffic (B/s): <input name="network_traffic"><br>
        Network Transmit (B/s): <input name="network_transmit"><br>
        Network Receive (B/s): <input name="network_receive"><br>
        Network Transmit Errors: <input name="network_transmit_errors"><br>
        Network Receive Errors: <input name="network_receive_errors"><br><br>
        <input type="submit" value="Predict">
    </form>
    """
@app.route("/api/gemini", methods=["POST"])
def ask_gemini():
    try:
        if not GEMINI_API_KEY:
            return jsonify({"error": "Gemini API key not set."}), 400

        question = request.get_json().get("question", "")

        restriction_prompt = (
            "You are a Kubernetes Advisor. "
            "Only answer questions related to Kubernetes, DevOps, pod failures, resource limits, container scaling, etc. "
            "If the question is not related to this domain, reply: "
            "'Sorry, I only provide advice related to Kubernetes topics.'"
        )

        model = genai.GenerativeModel("gemini-1.5-pro")
        chat = model.start_chat(history=[{"role": "user", "parts": [restriction_prompt]}])
        response = chat.send_message(question)

        return jsonify({"response": response.text})

    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@app.route("/api/more-info", methods=["POST"])
def more_info():
    try:
        data = request.get_json()
        issue = data.get("issue", "Unknown")

        default_info = {
            "Resource Exhaustion (CPU)": "Pods are hitting CPU limits. Use resource limits or autoscaling.",
            "Resource Exhaustion (Memory)": "Memory usage is high. Consider scaling or debugging leaks.",
            "Network Issues": "Packet loss detected. Check CNI, service mesh, or network policies.",
            "No Critical Issue": "System is stable. Continue monitoring."
        }

        explanation = default_info.get(issue, "This issue is not documented yet.")
        return jsonify({"issue": issue, "explanation": explanation})

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)
