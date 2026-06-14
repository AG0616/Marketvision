import requests
import pandas as pd
import numpy as np
from pymongo import MongoClient
from dotenv import load_dotenv
import os
import sys
from sklearn.linear_model import LinearRegression

load_dotenv()
mongo_url = os.getenv("MONGODB_URI")
client = MongoClient(mongo_url)
db = client["crypto"]

coin = sys.argv[1]
print(coin)
url = f"https://api.coingecko.com/api/v3/coins/{coin}/market_chart?vs_currency=usd&days=90"

data = requests.get(url).json()


prices = data["prices"]

df = pd.DataFrame(
    prices,
    columns=["timestamp", "price"]
)
df["Date"]=pd.to_datetime(df["timestamp"],unit="ms")
df = df[["Date", "price"]] #keep only this 2 col in df

df["day"] = np.arange(len(df))
df["ma7"] = df["price"].rolling(7).mean()
df["ma30"] = df["price"].rolling(30).mean()
df = df.fillna(0)

X=df[["day"]]
y = df["price"]
model=LinearRegression()
model.fit(X, y)

future_day = [[len(df)]]
predicted_price =model.predict(future_day)[0]
latest = df.iloc[-1]

trend = (
    "Bullish"
    if latest["ma7"] > latest["ma30"]
    else "Bearish"
)

predictions_collection = db["predictions"]

prediction_doc = {
    "coin": coin,
    "current_price": float(df.iloc[-1]["price"]),
    "predicted_price": float(predicted_price),
    "trend": trend,
    "days_used": len(df)
}
predictions_collection.update_one(
    {"coin": coin},
    {"$set": prediction_doc},
    upsert=True
)