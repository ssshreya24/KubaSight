import { useLocation } from "react-router-dom";
import { useState } from "react";
import "../styles/Solution.css";
import logo from "../assets/usb.svg";

function Solution() {
  const { state } = useLocation();
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const issue = state?.["Predicted Issue"] || "No Critical Issue";

  const defaultExplanations = {
    "Resource Exhaustion (CPU)": (
      <div>
        <p><strong>Pods are consuming more CPU than allocated.</strong> This can lead to throttling, degraded performance, and slow response times.</p>
        <ul>
          <li>Use <code>limits.cpu</code> in your pod definitions</li>
          <li>Monitor <code>container_cpu_usage_seconds_total</code> or <code>container_cpu_cfs_throttled_seconds_total</code></li>
        </ul>
        <p><strong>Mitigation Steps:</strong></p>
        <ol>
          <li>Set proper CPU requests and limits</li>
          <li>Use Horizontal Pod Autoscaler (HPA)</li>
          <li>Distribute workloads across nodes</li>
        </ol>
      </div>
    ),
    "Resource Exhaustion (Memory)": (
      <div>
        <p><strong>Memory usage exceeds limits</strong>, causing OOM errors or pod evictions.</p>
        <ul>
          <li>Use Prometheus/Grafana to monitor <code>container_memory_usage_bytes</code></li>
        </ul>
        <p><strong>Mitigation Steps:</strong></p>
        <ol>
          <li>Review and increase memory limits</li>
          <li>Optimize container code for memory leaks</li>
          <li>Use Vertical Pod Autoscaler (VPA)</li>
        </ol>
      </div>
    ),
    "Network Issues": (
      <div>
        <p><strong>Experiencing packet loss, latency, or DNS failures.</strong></p>
        <ul>
          <li>Causes may include CNI misconfigurations, kube-proxy issues, or broken service mesh</li>
        </ul>
        <p><strong>Mitigation Steps:</strong></p>
        <ol>
          <li>Ensure proper CNI plugin setup (Calico, Flannel)</li>
          <li>Check kube-proxy rules and node routes</li>
          <li>Enable Network Policies</li>
          <li>Run diagnostics with <code>kubectl exec</code> for ping/nslookup</li>
        </ol>
      </div>
    ),
    "No Critical Issue": (
      <div>
        <p><strong>The system is stable and operating within safe thresholds.</strong></p>
        <p>Still, continue to monitor CPU, memory, and network with Grafana and Prometheus.</p>
        <p><strong>Tips:</strong></p>
        <ul>
          <li>Set alerts proactively</li>
          <li>Review long-term trends in dashboards</li>
        </ul>
      </div>
    )
  };

  const explanation = defaultExplanations[issue] || <p>This issue is currently not documented.</p>;

  const askGemini = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_API_URL}/api/gemini`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question })
      });
      const data = await res.json();
      const formatted = (data.response || "No response from Gemini.")
        .replace(/```[\s\S]*?```/g, match => `<pre class='code-block'>${match.replace(/```/g, "")}</pre>`)
        .replace(/`([^`]+)`/g, "<code>$1</code>")
        .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
        .replace(/\n/g, "<br />");
      setAnswer(formatted);
    } catch (err) {
      setAnswer("❌ Error fetching response.");
    }
  };

  return (
    <div className="solution-container">
      <div className="answer-box">
        <div className="top">
          <img src={logo} alt="KubeSight Logo" className="logo" />
        </div>

        <div className="explanation-box">
          <h3>📝 Detailed Explanation</h3>
          <h4>{issue}</h4>
          {explanation}
        </div>

        <div className="qa-box">
          <label>Ask the Question....</label>
          <input
            type="text"
            placeholder="Sample Question → How to Solve Pod Failure Due to Network IO Errors?"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
          <button onClick={askGemini}>Solve</button>

          {answer && (
            <div className="gemini-answer">
              <strong>Answer:</strong>
              <div className="answer-content" dangerouslySetInnerHTML={{ __html: answer }}></div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

export default Solution;
