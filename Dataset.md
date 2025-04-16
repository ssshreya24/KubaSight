
# 📊 KubaSight - Datasets Folder

This folder contains the datasets used to train, validate, and evaluate the machine learning models that power *KubaSight*, the Kubernetes failure prediction and remediation system.

These datasets include both synthetic and real-world metric logs (such as Google Borg traces and AKS performance data) that are processed and used in feature engineering and model development.

---

## 🔗 Dataset Access

You can access these datasets via the shared Google Drive link:  
👉 [KubaSight_Dataset Drive Folder](https://drive.google.com/drive/folders/1RF5malgBMuukcQQxEW0S1dBaH5lhTj98)

---

## 📁 Folder Structure

```plaintext
datasets/
├── audit-logs.csv                             # Kubernetes API audit logs
├── borg_traces_data.csv                       # Google Borg traces data (real-world failure simulation)
├── dataSynthetic.csv                          # Artificially generated labeled dataset
├── kubernetes_performance_metrics_dataset.csv # Cluster performance metrics over time
├── kubernetes_resource_allocation_dataset.csv # CPU/Memory request vs actual usage
├── metrics_aks.csv                            # Azure Kubernetes Service metrics
├── metrics.csv                                # General Kubernetes metrics
├── processed.csv                              # Final cleaned + normalized dataset used for training
```

---

## 📂 File Descriptions

### 🔹 `audit-logs.csv`
- Logs Kubernetes API audit events.
- Used to track system access, user actions, and node behavior over time.

### 🔹 `borg_traces_data.csv`
- Contains extracted and preprocessed data from Google's Borg traces (large-scale cluster scheduler).
- Used for simulating real-world failures in training the model.
- Very large file (~313MB), ideal for high-volume batch model testing.

### 🔹 `dataSynthetic.csv`
- Artificially generated training dataset with labeled failures.
- Columns include:
  - `cpu_usage`, `memory_usage`, `io_throughput`, `failure_type`
- Used to bootstrap model accuracy in early iterations.

### 🔹 `kubernetes_performance_metrics_dataset.csv`
- Captures real cluster performance statistics over time.
- Useful for evaluating the model on time-series-based input.

### 🔹 `kubernetes_resource_allocation_dataset.csv`
- Records CPU/memory requests vs actual usage per pod/container.
- Enables detection of underutilization or saturation.

### 🔹 `metrics_aks.csv` and `metrics.csv`
- Performance logs from Azure Kubernetes Service (AKS) and standard clusters.
- Helps in testing the generalization of the ML model across environments.

### 🔹 `processed.csv`
- Final dataset after preprocessing and normalization.
- Ready-to-ingest format used directly by `notebook/model_training.ipynb`.

---

## 🧪 Usage

These datasets are used in:

- 📁 `notebook/model_training.ipynb`  
  → For training the `RandomForestClassifier`  
- 📁 `backend/`  
  → Used for real-time inference with structured inputs

---

## 📄 Notes

- Large files (like `borg_traces_data.csv`) should be handled using Git LFS or stored in shared cloud drives.
- If contributing or retraining the model, make sure to regenerate `processed.csv` after cleaning and scaling updated input data.

---

