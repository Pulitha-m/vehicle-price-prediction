# 🚗 Vehicle Price Prediction

A full-stack web application that predicts the resale price of used vehicles in **Sri Lanka** based on multiple features such as brand, model, year, mileage, transmission, and engine capacity.  
Built using a **React frontend** and a **FastAPI backend** integrated with a machine learning model for real-time predictions.

---

## 🪪 License

Distributed under the **MIT License**.  
See the [LICENSE](LICENSE) file for details.

---

## ✨ Features

- 🤖 **Machine Learning Prediction:** Predicts the resale price of used vehicles using trained regression models.  
- 🧹 **Automated Preprocessing:** Cleans and transforms raw dataset for model input.  
- 🔍 **Multiple Model Comparison:** Includes Linear Regression, Ridge, Random Forest, and Gradient Boosting.  
- 🧠 **Best Model Selection:** Automatically selects the highest performing model (Gradient Boosting).  
- ⚡ **FastAPI Backend:** Lightweight, high-performance API for real-time predictions.  
- 🖥️ **React Frontend:** Modern, responsive interface built with Vite.  
- 💾 **Artifact Storage:** Saves pre-trained models and pipelines for reuse.  
- 🔐 **Environment Configuration:** Secure API key and environment variable management.  

---

## 🛠️ Tech Stack

### Frontend
- React.js (Vite)
- Axios
- TailwindCSS / Material UI

### Backend
- FastAPI (Python)
- Scikit-learn, Pandas, NumPy, Joblib
- Uvicorn (Server)

### Database (Optional)
- SQLite / MongoDB

### Version Control
- Git & GitHub

---

## 📊 Dataset

The project uses the **Sri Lankan Second Vehicle/Car Price Dataset** sourced from Kaggle, created by *Prasad Nirmal*.  
It contains around **10,000 vehicle listings** collected from online marketplaces in Sri Lanka, covering various brands and models across multiple years.

Each record includes detailed attributes such as:

- Brand / Model  
- Manufacture Year  
- Fuel Type  
- Transmission Type  
- Mileage (km)  
- Engine Capacity (cc)  
- Listed Price (LKR)  

This dataset provides a reliable foundation for analyzing factors affecting second-hand vehicle prices in the Sri Lankan market and training regression models for price prediction.

---

## 📁 Project Structure

```
car-price-predictor/
│
├── backend/
│   ├── app.py
│   ├── requirements.txt
│   └── artifacts/
│
├── dataset/
│   ├── raw/
│   └── processed/
│
├── frontend/
│   ├── public/
│   │   └── vite.svg
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   │   ├── Footer.jsx
│   │   │   ├── Header.jsx
│   │   │   ├── PredictionForm.jsx
│   │   │   └── Results.jsx
│   │   ├── App.css
│   │   ├── App.jsx
│   │   ├── Dashboard.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   └── node_modules/
│
├── notebooks/
│   ├── data_cleaning.ipynb
│   ├── feature_engineering.ipynb
│   ├── integration_service.ipynb
│   └── model_experiments.ipynb
│
├── .env
├── .gitignore
└── README.md
```

---

## 🚦 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- Python (3.9 or higher)
- Git

---

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/Pulitha-m/vehicle-price-prediction.git
cd vehicle-price-prediction
```

### 2️⃣ Setup the Backend
```bash
cd backend
python -m venv venv
source venv/bin/activate  # For Linux/Mac
venv\Scripts\activate     # For Windows
pip install -r requirements.txt
uvicorn app:app --reload
```
Backend runs on:  
👉 [http://localhost:8000](http://localhost:8000)

---

### 3️⃣ Setup the Frontend
```bash
cd ../frontend
npm install
npm run dev
```
Frontend runs on:  
👉 [http://localhost:5173](http://localhost:5173)

---

## 🧠 Model Overview

| Model              | MAE  | R² Score |
|--------------------|------|-----------|
| Linear Regression  | 5.41 | 0.909 |
| Ridge Regression   | 5.28 | 0.918 |
| Random Forest      | 3.00 | 0.954 |
| Gradient Boosting  | 3.81 | 0.962 |

🏆 **Best Model:** Random Forest Regressor

---

## 💡 Example Prediction (via FastAPI)

```bash
curl -X POST "http://127.0.0.1:8000/predict" -H "Content-Type: application/json" -d '{
  "year": 2018,
  "mileage": 45000,
  "fuel_type": "Petrol",
  "transmission": "Automatic",
  "engine_size": 1.6
}'
```

**Response Example:**
```json
{
  "predicted_price": 3.25
}
```

---

## ⚙️ Environment Variables

### Backend (.env)
```
MODEL_PATH="artifacts/model_pipeline.pkl"
PORT=8000
```

### Frontend (.env)
```
VITE_API_BASE_URL="http://localhost:8000"
```

---

## 📈 Future Enhancements

- Integrate MongoDB or PostgreSQL for data storage  
- Add analytics dashboard for trend visualization  
- Deploy backend (Railway/Render) and frontend (Vercel/Netlify)  
- Containerize with Docker for easier deployment  
- Implement user authentication for personalized prediction history  

---

## 🤝 Contributing

Contributions are welcome! 🎉  
Follow these steps:

```bash
# Fork the repository
# Create your feature branch
git checkout -b feature/amazing-feature

# Commit changes
git commit -m "Add amazing feature"

# Push to branch
git push origin feature/amazing-feature
```

Then open a **Pull Request** ✅

---

## 👥 Contributors

| Name | Role | GitHub |
|------|------|--------|
| [Pulitha Marasinghe](https://github.com/Pulitha-m) | Feature Engineering | [@Pulitha-m](https://github.com/Pulitha-m) |
| [Tashenchamika](https://github.com/tashi-ck) | Backend & Frontend Development | [@tashi-ck](https://github.com/tashi-ck) |
| [Senuda Hasapathirthna](https://github.com/Sthulnith) | Model Training & Evaluation | [@Sthulnith](https://github.com/Sthulnith) |
| [Pabasara Thilakarathna](https://github.com/Paba-sara) | Data Cleaning | [@Paba-sara](https://github.com/Paba-sara) |

💡 *Want to contribute?* See the [Contributing](#-contributing) section above.

---

## 🙏 Acknowledgments

- **Kaggle** — Dataset provider  
- **FastAPI Team** — Backend framework  
- **React & Vite** — Frontend ecosystem  
- **Scikit-learn** — Machine learning model training  
- **Shields.io** — Badges  

---

## 📧 Contact

**Pulitha Marasinghe**  
📍 Sri Lanka Institute of Information Technology (SLIIT)  
📧 [pulithamarasinghe@gmail.com](mailto:pulithamarasinghe@gmail.com)

🔗 [GitHub Profile](https://github.com/Pulitha-m)  
🔗 [Project Repository](https://github.com/Pulitha-m/vehicle-price-prediction)

---

## 🖼️ Preview Screenshots

You can later replace these placeholders with your actual screenshots:

![Frontend Screenshot](assets/frontend.png)  
![Prediction Form Screenshot](assets/form.png)  
![Backend API Screenshot](assets/backend.png)

---
