from fastapi import FastAPI
from pydantic import BaseModel
import pandas as pd
import joblib
from fastapi.middleware.cors import CORSMiddleware
import os

# ==========================
# FastAPI Setup
# ==========================

app = FastAPI(title="Car Price Prediction API")

# Load frontend URL from environment (Render) or fall back to localhost
FRONTEND_URL = os.getenv("FRONTEND_URL", "http://localhost:5173")

# Define allowed origins
origins = [
    "http://localhost:5173",   # Vite default dev server
    "http://127.0.0.1:5173",   # Sometimes React runs here
    FRONTEND_URL               # Deployed frontend (from Render env var)
]

# ✅ Use the origins list here, not "*"
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



# ==========================
# Load model + saved maps
# ==========================
pipe = joblib.load("./artifacts/car_price_model.pkl")
brand_freq_map = joblib.load("./artifacts/brand_freq_map.pkl")
model_freq_map = joblib.load("./artifacts/model_freq_map.pkl")
brand_avg_map = joblib.load("./artifacts/brand_avg_map.pkl")
model_avg_map = joblib.load("./artifacts/model_avg_map.pkl")
global_avg_price = joblib.load("./artifacts/global_avg_price.pkl")

luxury_brands = {"AUDI", "BMW", "MERCEDES", "LEXUS",
                 "JAGUAR", "LAND ROVER", "PORSCHE", "VOLVO"}

# ==========================
# Feature builder
# ==========================
def create_test_vehicle(yom, mileage, engine, brand, model, gear, fuel, condition,
                        town="Colombo", aircon=1, ps=1, pm=1, pw=1, leasing=0,
                        year_listed=2025, month_listed=1):
    car_age = 2025 - yom
    mileage_per_year = mileage / (car_age if car_age > 0 else 1)

    return pd.DataFrame([{
        "YOM": yom,
        "Millage(KM)": mileage,
        "Engine (cc)": engine,
        "Gear": gear,
        "Fuel Type": fuel,
        "Town": town,
        "Condition": condition,
        "AIR CONDITION": aircon,
        "POWER STEERING": ps,
        "POWER MIRROR": pm,
        "POWER WINDOW": pw,
        "Leasing": leasing,
        "Brand": brand,
        "Car_Age": car_age,
        "Mileage_per_Year": mileage_per_year,
        "Engine_Category": pd.cut([engine],
                                  bins=[0, 1000, 2000, 4000, float("inf")],
                                  labels=["Small", "Medium", "Large", "Very Large"])[0],
        "Year_Listed": year_listed,
        "Month_Listed": month_listed,
        "Brand_Freq": brand_freq_map.get(brand, 0),
        "Model_Freq": model_freq_map.get(model, 0),
        "Brand_AvgPrice": brand_avg_map.get(brand, global_avg_price),
        "Model_AvgPrice": model_avg_map.get(model, global_avg_price),
        "Luxury_Brand": 1 if brand.upper() in luxury_brands else 0
    }])

# ==========================
# FastAPI Setup
# ==========================



# Request schema
class VehicleRequest(BaseModel):
    yom: int
    mileage: float
    engine: float
    brand: str
    model: str
    gear: str
    fuel: str
    condition: str
    town: str = "Colombo"
    aircon: int = 1
    ps: int = 1
    pm: int = 1
    pw: int = 1
    leasing: int = 0
    year_listed: int = 2025
    month_listed: int = 1

# Predict endpoint
@app.post("/predict")
def predict_price(vehicle: VehicleRequest):
    df_input = create_test_vehicle(
        yom=vehicle.yom,
        mileage=vehicle.mileage,
        engine=vehicle.engine,
        brand=vehicle.brand,
        model=vehicle.model,
        gear=vehicle.gear,
        fuel=vehicle.fuel,
        condition=vehicle.condition,
        town=vehicle.town,
        aircon=vehicle.aircon,
        ps=vehicle.ps,
        pm=vehicle.pm,
        pw=vehicle.pw,
        leasing=vehicle.leasing,
        year_listed=vehicle.year_listed,
        month_listed=vehicle.month_listed
    )
    prediction = pipe.predict(df_input)[0]
    prediction_in_lakhs = prediction * 100000
    return {"Predicted Price": round(float(prediction_in_lakhs), 2)}

# ==========================
# Test with sample vehicles
# ==========================
if __name__ == "__main__":
    # Example 1: Toyota Aqua
    sample1 = create_test_vehicle(
        yom=2012, mileage=120000, engine=1500,
        brand="TOYOTA", model="AQUA",
        gear="Auto", fuel="Petrol", condition="Used"
    )
    print("Toyota Aqua 2012 →", pipe.predict(sample1)[0])

    # Example 2: Suzuki Wagon R
    sample2 = create_test_vehicle(
        yom=2018, mileage=100000, engine=660,
        brand="SUZUKI", model="WAGON R",
        gear="Auto", fuel="Petrol", condition="Used"
    )
    print("Suzuki WagonR 2018 →", pipe.predict(sample2)[0])

    # Example 3: Suzuki Alto
    sample3 = create_test_vehicle(
        yom=2015, mileage=80000, engine=800,
        brand="SUZUKI", model="ALTO",
        gear="Manual", fuel="Petrol", condition="Used"
    )
    print("Suzuki Alto 2015 →", pipe.predict(sample3)[0])