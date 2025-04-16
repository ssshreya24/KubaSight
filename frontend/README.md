
# 🌐 KubaSight - Frontend

This folder contains the frontend interface for **KubaSight**, an AI-powered Kubernetes failure prediction and remediation system. The interface is designed using **React**, built with **Vite**, and styled using **Tailwind CSS**.

---

## 📌 Key Responsibilities

- Collects Kubernetes metric inputs from the user (CPU, Memory, I/O).
- Sends input data to the backend Flask API for failure prediction.
- Displays predicted failure types, risk levels, and suggested remediation.
- Hosts a Gemini-powered chatbot interface for Kubernetes-specific Q&A.
- Ensures responsiveness and a futuristic dark UI theme across all screens.

---

## 🛠️ Tech Stack

- **React** – Component-based frontend framework  
- **Vite** – Lightning-fast bundler for React apps  
- **Tailwind CSS** – Utility-first CSS framework for responsive UI  
- **Axios** – For making HTTP requests to the backend  
- **React Router** – Navigation across multiple pages  
- **Framer Motion** – Smooth animations and transitions  
- **HeroIcons** – Clean and modern icon set  

---

## 📁 Folder Structure

```plaintext
frontend/
├── public/                       # Static assets and favicon
├── src/
│   ├── assets/                   # Images, icons, and logos
│   │   └── images/
│   ├── components/               # Reusable UI components (Navbar, Card, Chat, etc.)
│   ├── pages/                    # Pages: Home, Prediction, Solution (Gemini), Contact
│   ├── styles/                   # Custom CSS styles (e.g., dark mode, chatbot)
│   ├── App.jsx                   # Main App with routing
│   ├── main.jsx                  # Vite entry point
│   └── index.css                 # Tailwind base styles
├── package.json                  # Project dependencies and scripts
├── tailwind.config.js            # Tailwind configuration
├── postcss.config.js             # PostCSS setup
├── vite.config.js                # Vite configuration
```

---

## ⚙️ How to Run Locally

Follow these steps to run the frontend locally:

### 1. Clone the Repository

```bash
git clone https://github.com/ssshreya24/KubaSight.git
cd KubaSight/frontend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Run the Development Server

```bash
npm run dev
```

Then visit:  
🔗 http://localhost:5173

---

## 🔌 Backend API Integration

Make sure your backend server is running at `http://localhost:5000` or a deployed endpoint.

### Endpoints used by the frontend:

- `POST /predict`  
  → Sends CPU, memory, and I/O inputs; returns predicted failure class.

- `POST /explanation`  
  → Sends failure class; Gemini API provides a Kubernetes-focused explanation.

> ⚠️ Gemini responses are restricted to Kubernetes-specific queries only.  
> Asking irrelevant questions like _"What's the weather?"_ will return a friendly fallback message.

---

## 🌐 Live Website

The frontend is deployed and accessible here:  
🔗 https://kubesight.vercel.app

---

## 🖼️ Screenshots

Visual walkthrough of the project can be found in:

- 📁 `presentation/` → `KubaSight.pdf` with UI, architecture, and project pitch  
- 📁 `Demo Video/` → Contains a working demonstration  

---
