import { useLocation, useNavigate } from "react-router-dom";
import "../styles/Result.css";

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

function Result() {
  const { state } = useLocation();
  const navigate = useNavigate();

  return (
    <div className="home-container">
      {/* Navbar */}
      <div className="navbar">
        <img src={kubeLogo} alt="KubeSight Logo" className="navbar-logo" />
      </div>

      {/* Result Section */}
      <div className="form-section">
        <div className="info-panel">
          <img src={KubeImg} alt="USB Icon" className="usbimage2" />
          <p>
            KubeSight is a real-time Kubernetes failure prediction system powered by AI. It continuously
            monitors critical pod metrics like CPU, memory, and network traffic to detect anomalies and
            predict potential failures before they occur.
          </p>
        </div>

        <div className="form-section compact">
          <div className="form-panel small-box result-style">
            <h2 className="form-title large-title">Real Time Kubernetes Failure Predictors</h2>
            <div className="form-grid result-form">
              {Object.entries(state || {}).map(([key, value]) => (
                <div key={key} className="input-row">
                  <label className="side-label">
                    {key.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}:
                  </label>
                  <span className="value-text">{value}</span>
                </div>
              ))}
              <div className="btn-group">
                {/* <button onClick={() => navigate("/")}>Back</button> */}
                <button className="solution-btn" onClick={() => navigate("/solution", { state })}>More Details</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Second Section - Focus Areas */}
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

      {/* Forth Section - Project Areas */}
      <div className="section-forth">
        <h2>Project Areas</h2>
        <p>We create forecasts and advance research, decision making, and policy in four main topic areas.</p>
        <div className="card-row1">
          <div className="card1">
            <img src={iconBio} alt="Biosecurity Icon" className="focus-icon" />
            <h3>Pod Name</h3>
            <p>Representing the name of a Kubernetes pod within the cluster, tracking its status and related failures.</p>
          </div>
          <div className="card1">
            <img src={iconAI} alt="AI Icon" className="focus-icon" />
            <h3>CPU Usage</h3>
            <p>Analyzing the CPU consumption levels to identify potential performance issues impacting Kubernetes.</p>
          </div>
          <div className="card1">
            <img src={iconNuclear} alt="Nuclear Icon" className="focus-icon" />
            <h3>Memory Usage</h3>
            <p>Monitoring memory consumption to detect overloads and pinpoint inefficient pod behavior.</p>
          </div>
          <div className="card1">
            <img src={iconClimate} alt="Climate Icon" className="focus-icon" />
            <h3>Network IO</h3>
            <p>Examining the flow of data to and from a pod in the Kubernetes cluster to assess network performance.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Result;