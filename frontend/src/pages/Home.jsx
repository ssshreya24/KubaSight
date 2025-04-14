import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Home.css";

// Logos & Images
import kubeLogo from "../assets/logo.svg";
import KubeImg from "../assets/usb.svg";

// Icons for Focus Areas
import iconPod from "../assets/icon-pod.png";
import iconNode from "../assets/icon-node.png";
import iconNetwork from "../assets/icon-network.png";
import iconPredict from "../assets/icon-predict.png";

// Icons for Project Areas
import iconBio from "../assets/biosecurity.png";
import iconAI from "../assets/ai.png";
import iconNuclear from "../assets/nuclear.png";
import iconClimate from "../assets/climate.png";

function Home() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    pod_name: "",
    cpu: "",
    memory: "",
    net_io: "",
    network_traffic: "",
    network_transmit: "",
    network_receive: "",
    network_transmit_errors: "",
    network_receive_errors: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    for (const val of Object.values(form)) {
      if (val === "") {
        alert("⚠️ Please fill in all fields before submitting.");
        return;
      }
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_API_URL}/predict`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          predict_key: "your-secure-key-here"
        })
      });

      if (!response.ok) {
        const errText = await response.text();
        console.error("❌ Backend Error:", errText);
        alert("Prediction failed. Check backend logs.");
        return;
      }

      const result = await response.json();
      console.log("✅ Prediction Result:", result);
      navigate("/result", { state: result });
    } catch (error) {
      console.error("❌ Fetch error:", error);
      alert("Network error: couldn't connect to backend.");
    }
  };

  return (
    <div className="home-container">
      <div className="navbar">
        <img src={kubeLogo} alt="KubeSight Logo" className="navbar-logo" />
      </div>

      <div className="form-section">
        <div className="info-panel">
          <img src={KubeImg} alt="USB Icon" className="usbimage1" />
          <p>
            KubeSight is a real-time Kubernetes failure prediction system powered by AI. It continuously
            monitors critical pod metrics like CPU, memory, and network traffic to detect anomalies and
            predict potential failures before they occur.
          </p>
        </div>

        <div className="form-section compact">
          <div className="form-panel small-box result-style">
            <h2 className="form-title large-title">Real Time Kubernetes Failure Predictors</h2>
            <form onSubmit={handleSubmit} className="form-grid result-form">
              {Object.entries(form).map(([key, value]) => {
                const labelText = key.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
                const placeholderExamples = {
                  pod_name: "E.G.→nginx-pod-1",
                  cpu: "E.G.→85",
                  memory: "E.G.→750",
                  net_io: "E.G.→5.5",
                  network_traffic: "E.G.→100000",
                  network_transmit: "E.G.→50000",
                  network_receive: "E.G.→50000",
                  network_transmit_errors: "E.G.→0",
                  network_receive_errors: "E.G.→0"
                };

                return (
                  <div key={key} className="input-row">
                    <label className="side-label" htmlFor={key}>{labelText}:</label>
                    <input
                      id={key}
                      type="text"
                      name={key}
                      placeholder={placeholderExamples[key] || ""}
                      value={value}
                      onChange={handleChange}
                    />
                  </div>
                );
              })}
              <button type="submit">Predict</button>
            </form>
          </div>
        </div>
      </div>

      <div className="section-two">
        <h2>Focus Areas</h2>
        <p>We predict failures and suggest solutions across Kubernetes clusters through machine learning.</p>
        <div className="card-row">
          <div className="card card-green">
            <img src={iconPod} alt="Pod Failure" className="focus-icon" />
            <h3>Pod Failure Analysis</h3>
            <p>Identifying failure patterns in pods through resource metrics and anomaly detection.</p>
          </div>
          <div className="card card-purple">
            <img src={iconNode} alt="Node Health" className="focus-icon" />
            <h3>Node Health Monitoring</h3>
            <p>Continuous monitoring of node performance to prevent cluster-wide outages.</p>
          </div>
          <div className="card card-yellow">
            <img src={iconNetwork} alt="Network Traffic" className="focus-icon" />
            <h3>Network Traffic Insights</h3>
            <p>Analyzing network behavior to spot bottlenecks, transmission drops, and error spikes.</p>
          </div>
          <div className="card card-blue">
            <img src={iconPredict} alt="Predictive Actions" className="focus-icon" />
            <h3>Predictive Actions</h3>
            <p>AI-driven forecasting of failures and suggested mitigations before issues occur.</p>
          </div>
        </div>
      </div>

      <div className="section-forth">
        <h2>Project Areas</h2>
        <p>We create forecasts and advance research, decision making, and policy in four main topic areas.</p>
        <div className="card-row1">
          <div className="card1">
            <img src={iconBio} alt="Biosecurity Icon" className="focus-icon" />
            <h3>Pod Name</h3>
            <p>Tracking the name of a Kubernetes pod and analyzing its status & failure logs.</p>
          </div>
          <div className="card1">
            <img src={iconAI} alt="AI Icon" className="focus-icon" />
            <h3>CPU Usage</h3>
            <p>Analyzing CPU consumption levels to detect performance bottlenecks in pods.</p>
          </div>
          <div className="card1">
            <img src={iconNuclear} alt="Nuclear Icon" className="focus-icon" />
            <h3>Memory Usage</h3>
            <p>Monitoring memory load to detect excessive usage and crash risk.</p>
          </div>
          <div className="card1">
            <img src={iconClimate} alt="Climate Icon" className="focus-icon" />
            <h3>Network IO</h3>
            <p>Inspecting network traffic and anomalies across Kubernetes infrastructure.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
