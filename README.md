# 🚀 Customer Churn Prediction System

An **end-to-end AI-powered customer churn prediction platform** that combines  
**Machine Learning**, **FastAPI backend**, and a **futuristic React frontend** to deliver
real-time, explainable churn risk predictions with business-ready insights.

This project is designed as a **production-style ML system**, not a toy demo.

---

## 📌 What This Project Does

- Accepts real customer attributes (tenure, charges, contract, services)
- Uses a trained **Random Forest ML model** to predict churn probability
- Converts probability into **actionable risk tiers**
- Provides **business recommendations** for retention
- Displays results in a **modern, animated, glassmorphic UI**
- Fully integrated **frontend ↔ backend ↔ ML pipeline**

---

## 🧠 System Architecture
React (UI)
↓ REST API
FastAPI Backend
↓
ML Pipeline (Preprocessing → Model → Threshold Logic)
↓
Prediction + Risk Tier + Recommendations

---

## 🧠 Machine Learning Details

### 📊 Dataset
- Telecom customer churn dataset
- Contains demographic, contract, billing, and service usage data

### ⚙️ Feature Engineering
- Removed identifier & leakage columns
- Encoded categorical features (contract type, internet service)
- Scaled numerical features using `StandardScaler`
- Ensured training & inference pipelines are consistent

### 🤖 Model
- **Algorithm:** Random Forest Classifier
- **Why Random Forest?**
  - Handles non-linear relationships well
  - Robust to mixed feature types
  - Strong real-world churn performance

### 📈 Model Performance
- ROC-AUC ≈ **0.85**
- Balanced precision & recall
- Well-calibrated probabilities (no forced overconfidence)

### 🎯 Decision Logic
- Model outputs a churn probability (0–1)
- Probability is mapped to business decisions using a threshold

Probability < 40%  → LOW risk
Probability ≥ 40%  → HIGH risk

⚙️ Backend (FastAPI)

🔹 Responsibilities
	•	Load trained model, scaler, and feature metadata
	•	Validate incoming customer data
	•	Apply the same preprocessing used during training
	•	Run inference and apply threshold logic
	•	Return structured prediction response

🔹 API Endpoint

POST /predict
Request Body (JSON):

{
  "tenure_months": 12,
  "monthly_charges": 79.99,
  "total_charges": 1200,
  "contract_type": "Month-to-month",
  "internet_service": "Fiber Optic"
}

🔹 Backend Tech Stack
	•	FastAPI
	•	Scikit-learn
	•	Pandas / NumPy
	•	Joblib (model persistence)
	•	Uvicorn


🎨 Frontend (React)

🔹 Responsibilities
	•	Collect customer inputs via a dynamic form
	•	Send validated data to backend API
	•	Display live system status (Idle → Analyzing → Decision Ready)
	•	Visualize churn risk using animated UI components
	•	Provide recommendations based on risk tier
	•	Allow repeated predictions seamlessly

🔹 UI Highlights
	•	Glassmorphic cards & navbar
	•	Particle-based neural background
	•	Smooth Framer Motion animations
	•	Live status intelligence
	•	Premium prediction reveal with explainability

🔹 Risk Interpretation in UI
	•	LOW Risk: Maintain experience / reward loyalty
	•	HIGH Risk: Call customer / offer discount / retention action

🔹 Frontend Tech Stack
	•	React (Vite)
	•	Tailwind CSS
	•	Framer Motion
	•	Canvas-based particle system

⸻

🔁 End-to-End Flow
	1.	User enters customer data in UI
	2.	Frontend validates & sends JSON to FastAPI
	3.	Backend preprocesses input
	4.	ML model predicts churn probability
	5.	Probability is converted to risk tier
	6.	Response is returned to frontend
	7.	UI visualizes result with animations & recommendations

▶️ How to Run Locally

🧠 Backend
cd backend
source venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload

API available at:
http://127.0.0.1:8000

Swagger UI:
http://127.0.0.1:8000/docs

🎨 Frontend
cd frontend
npm install
npm run dev

🧠 Why This Project Stands Out
	•	Not a notebook → real ML product
	•	Consistent training & inference pipelines
	•	Business-aware decision thresholds
	•	Production-style API design
	•	Modern, non-generic UI
	•	Clear separation of concerns

⸻

📌 Future Improvements
	•	Probability calibration (Platt / Isotonic)
	•	Model monitoring & drift detection
	•	Authentication & user roles
	•	PDF report export
	•	Cloud deployment (Render / AWS / GCP)

⸻

👤 Author

Nitin Raj

Built with a focus on real-world ML system design, not just accuracy.

