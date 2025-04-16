# 📊 KubaSight - Datasets Folder

This folder contains the datasets used to train, validate, and evaluate the machine learning models that power *KubaSight*, the Kubernetes failure prediction and remediation system.

These datasets include both synthetic and real-world metric logs (such as Google Borg traces and AKS performance data) that are processed and used in feature engineering and model development.

---

## 📁 File Descriptions

plaintext
datasets/
├── audit-logs.csv
├── borg_traces_data.csv
├── dataSynthetic.csv
├── kubernetes_performance_metrics_dataset.csv
├── kubernetes_resource_allocation_dataset.csv
├── metrics_aks.csv
├── metrics.csv
├── processed.csv


---

### 🔹 audit-logs.csv
- Logs Kubernetes API audit events.
- Used to track system access, user actions, and node behavior over time.

### 🔹 borg_traces_data.csv
- Contains extracted and preprocessed data from Google's Borg traces (large-scale cluster scheduler).
- Used for simulating real-world failures in training the model.
- Very large file (~313MB), ideal for high-volume batch model testing.

### 🔹 dataSynthetic.csv
- Artificially generated training dataset with labeled failures.
- Columns include:
  - cpu_usage, memory_usage, io_throughput, failure_type
- Used to bootstrap model accuracy in early iterations.

### 🔹 kubernetes_performance_metrics_dataset.csv
- Captures real cluster performance statistics over time.
- Useful for evaluating the model on time-series-based input.

### 🔹 kubernetes_resource_allocation_dataset.csv
- Records CPU/memory requests vs actual usage per pod/container.
- Enables detection of underutilization or saturation.

### 🔹 metrics_aks.csv and metrics.csv
- Performance logs from Azure Kubernetes Service (AKS) and standard clusters.
- Helps in testing the generalization of the ML model across environments.

### 🔹 processed.csv
- Final dataset after preprocessing and normalization.
- Ready-to-ingest format used directly by the model_training.ipynb.

---

## 🧪 Usage

These datasets are used in:
- 📁 notebook/model_training.ipynb → For training the RandomForestClassifier
- 📁 backend/ → Inference with pre-trained models using structured inputs

---

## 📄 Note

- Large files (like borg_traces_data.csv) should be handled using Git LFS or external storage solutions.
- If you are contributing or retraining, update the processed.csv after cleaning and scaling your new input data.

---

## 🔗 Dataset Access

You can access these datasets via the shared Google Drive link:

👉 [KubaSight_Dataset Drive Folder](https://drive.google.com/drive/folders/1RF5malgBMuukcQQxEW0S1dBaH5lhTj98)