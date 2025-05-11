
# 🚀 KubaSight - AI-Driven Kubernetes Failure Prediction & Remediation System



KubaSight is an end-to-end intelligent system designed to **predict**, **analyze**, and **recommend solutions** for failures in Kubernetes clusters using AI/ML. It combines a powerful machine learning engine with an interactive frontend and Gemini-powered chatbot, making Kubernetes infrastructure management smarter and more resilient.

🎯 **Hackathon Project Submission**  
This repository showcases the complete architecture, source code, model, and demo of the KubaSight platform built for AI + DevOps based hackathon challenges.

---

## 📌 Key Features

- ✅ Real-time failure prediction based on Kubernetes metrics (CPU, memory, I/O)
- 🔁 Scalable Flask backend with trained ML model (RandomForest)
- 🤖 Gemini-powered chatbot for Kubernetes-only guidance
- 💡 Smart UI: Enter metrics and get predictions + recommendations
- 🧠 Modular and offline-capable ML pipeline (no cloud API needed for inference)
- 🌑 Futuristic dark-themed, mobile-friendly React frontend

---

## 🛠️ Tech Stack

| Layer      | Tools/Frameworks |
|------------|------------------|
| Frontend   | React, Vite, Tailwind CSS, Axios, Framer Motion |
| Backend    | Flask, scikit-learn, Pandas, Joblib, Flask-CORS |
| Model      | RandomForestClassifier, StandardScaler |
| Assistant  | Gemini Pro (Google Generative AI) |
| Deployment | Vercel (Frontend), Render (Backend) |

---

## 🧩 Project Structure

```plaintext
KubaSight/
├── backend/           # Flask backend with ML model inference and Gemini integration
├── frontend/          # React + Vite based user interface
├── model/             # Serialized ML model and scaler files
├── notebook/          # Jupyter notebook used to train model
├── presentation/      # Final project deck (KubaSight.pdf)
├── Demo Video/        # Hackathon demonstration video (linked externally)
├── README.md          # Project documentation
```

---

## 📁 Folder-wise Breakdown

### 🔧 [`/backend`](https://github.com/ssshreya24/KubaSight/tree/main/backend)
- Hosts the Flask server
- Loads ML model and scaler from `/model`
- Provides two REST API routes:
  - `POST /predict` → Returns predicted failure class
  - `POST /explanation` → Returns Gemini-generated Kubernetes-focused suggestions

### 🌐 [`/frontend`](https://github.com/ssshreya24/KubaSight/tree/main/frontend)
- Clean React-based dashboard with:
  - Input form for metrics
  - Dynamic result section
  - Gemini Chatbot restricted to Kubernetes Q&A
- Tailwind + Framer Motion used for styling and animation

### 🧠 [`/model`](https://github.com/ssshreya24/KubaSight/tree/main/model)
- Contains `classifier.pkl` (RandomForest model)
- Contains `scaler.pkl` (StandardScaler)
- Both used during backend inference for real-time predictions

### 📓 [`/notebook`](https://github.com/ssshreya24/KubaSight/tree/main/notebook)
- `model_training.ipynb` notebook
- Includes:
  - Data preprocessing
  - Model training and evaluation
  - Joblib export logic


### 📽️[`/Final Demo Video`](https://drive.google.com/file/d/1KrHtcam7Si2_Nheb2OBXHKdbmHZnfNhi/view?usp=sharing)
 - After receiving the feedback for the final video
### 📽️ [`/Demo Video`](https://drive.google.com/file/d/1g3C7yC7yZGptnkACpHKP7bEcg2kZVx_r/view?usp=sharing)
- Google Drive video demo of live system walkthrough

### 🧾 [`/presentation`](https://github.com/ssshreya24/KubaSight/tree/main/presentation)
- Final project presentation deck: `KubaSight.pdf`
- Includes:
  - System architecture
  - Screenshots
  - Unique selling points
  - AI explanation integration

---

## ⚙️ How to Run Locally

```bash
cd frontend
npm install
npm run dev
```
Visit: http://localhost:5173



## 🔌 API Integration

### From Frontend to Backend:

- `POST /predict` — Send CPU, memory, I/O → get failure class
- `POST /explanation` — Send failure class → get Gemini-based suggestion

---

## 🌐 Live Deployment

- 🔗 Frontend: [https://kubesight.vercel.app](https://kubesight.vercel.app)
- 🔧 Backend: Render hosted (configured to load `.env` and models)

---

## 📸 Videos 
[`KubeSight_Video`](https://drive.google.com/file/d/1d4LXaCOl2NZrEBP6Br8ullzGhBzJndVx/view)
- Metric Input UI  
- Prediction Output Card  
- Gemini Chatbot Interface  
- Mobile Responsive View  

---

## 🏁 Unique Selling Points (USP)

- 🔐 Completely offline-capable inference (ML model runs without external API)
- 🤖 Gemini answers restricted to Kubernetes to avoid irrelevant AI misuse
- ⚡ Fast UI with futuristic look and guided animations
- 📦 Easily deployable on Render/Vercel in minutes

---

## 👥 Team

Built with ❤️ by:

- **AI/ML Lead**: [Shreya Singh](https://github.com/ssshreya24)
- **Backend Developer**: [Prince Kumar](https://github.com/Ranaprince19)
- **Frontend Developer**: [Harshit Gola](https://github.com/itsharshit07)

- **AI/ML Integration**: Flask + Gemini
- **Hackathon Role**: DevOps x AI Automation Track

---

## 📄 License

This project is licensed under the [MIT License](./LICENSE)
