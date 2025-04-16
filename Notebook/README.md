# 📓 KubaSight - Model Training Notebook

This folder contains the Jupyter Notebook used for training and evaluating the machine learning model behind **KubaSight**, a Kubernetes Failure Prediction System.

---

## 📁 File Included

| Filename              | Description |
|-----------------------|-------------|
| `model_training.ipynb` | Contains the complete pipeline for loading data, preprocessing, training, evaluating, and exporting the failure prediction model. |

---

## 📌 Notebook Objectives

- Load historical Kubernetes pod metrics (CPU, Memory, Network I/O).
- Preprocess and normalize the data.
- Train a baseline machine learning model (RandomForestClassifier).
- Evaluate model performance using accuracy, confusion matrix, and classification report.
- Export the trained model (`classifier.pkl`) and scaler (`scaler.pkl`) for backend integration.

---

## 🧪 Libraries Used

- `pandas`
- `numpy`
- `scikit-learn`
- `matplotlib`
- `seaborn`
- `joblib`

---

## 🚀 Running the Notebook

### 1. Setup Environment

```bash
cd Notebook/
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r ../requirements.txt
