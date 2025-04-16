# 🔧 KubaSight - Backend

This folder contains the backend server logic for **KubaSight**, an AI-powered system that predicts and explains potential failures in Kubernetes clusters using machine learning and generative AI.

---

## 📌 Key Responsibilities

- Receives real-time Kubernetes pod metrics (CPU, Memory, I/O).
- Preprocesses incoming data using a pre-fitted scaler.
- Predicts potential failures using a trained ML model (RandomForestClassifier).
- Returns risk levels and suggested actions via a RESTful API.
- Integrates with Gemini API for interactive failure explanations and remediation support.

---

## 🛠️ Tech Stack

- **Python 3.8+**
- **Flask** - Lightweight backend API server
- **Scikit-learn** - For model training and inference
- **Pandas & NumPy** - Data manipulation
- **Joblib** - Model and scaler persistence
- **Google Generative AI** - Gemini-powered Q&A for failure advice
- **Flask-CORS** - Frontend-backend communication

---

## 📁 Folder Structure
backend/
├── app.py                # Main Flask server
├── model/
│   ├── classifier.pkl    # Trained RandomForest model
│   └── scaler.pkl        # StandardScaler for input normalization
├── .env                  # API key for Gemini (not tracked)
├── requirements.txt      # Python dependencies

---




