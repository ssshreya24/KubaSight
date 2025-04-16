
# 🧠 KubaSight - Model Folder

This folder contains the trained machine learning artifacts used by the **KubaSight** system to perform Kubernetes failure predictions.

These models were trained using real or synthetic metric data (CPU, memory, I/O) and persisted using Joblib for integration with the Flask backend.

---

## 📌 Contents

```plaintext
model/
├── classifier.pkl    # Trained RandomForestClassifier model
├── scaler.pkl        # StandardScaler used to normalize input metrics before prediction
```

---

## ⚙️ Description

- **classifier.pkl**: This file stores the serialized `RandomForestClassifier` model trained to predict failure types such as CPU Overload, Memory Spike, Network Saturation, etc., based on the user's metric inputs.
  
- **scaler.pkl**: This file contains the fitted `StandardScaler` instance used to normalize metric inputs (CPU, memory, I/O) before feeding them to the model for prediction.

These models are automatically loaded by the Flask backend (`backend/app.py`) at runtime to serve predictions through RESTful API calls.

---

## 🧪 Model Details

- **Algorithm Used**: Random Forest Classifier
- **Libraries**: scikit-learn, pandas, numpy
- **Training Location**: Refer to `notebook/model_training.ipynb`
- **Persistence**: Joblib used to dump models for reuse

---

## 🔌 Integration

These model files are used by:

- `app.py` in the backend
- API route: `POST /predict` → Input is scaled using `scaler.pkl`, and prediction is made using `classifier.pkl`

---

## 📄 Note

These files should **not be modified manually**. If you need to retrain the models, use the notebook provided in the `notebook/` folder and regenerate the `.pkl` files.

---

## 📁 Related Folders

- `backend/` → Loads and uses these models via Flask API
- `notebook/` → Contains the training logic and experiments

