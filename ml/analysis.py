import pandas as pd
import numpy as np
import requests
import json

url = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&per_page=9&page=1"
data = requests.get(url).json()

df=pd.DataFrame(data)
numeric_cols = [
    "current_price",
    "market_cap",
    "total_volume",
    "price_change_percentage_24h"
]

for col in numeric_cols:
    df[col] = pd.to_numeric(df[col], errors="coerce")

df[numeric_cols] = df[numeric_cols].replace(
    [np.inf, -np.inf],
    np.nan
)

df[numeric_cols] = df[numeric_cols].fillna(0)
df = df.fillna("null")
df["volume_marketcap_ratio"] = (
    df["total_volume"] /
    df["market_cap"]
)

df["risk_score"] = np.where(
    abs(df["price_change_percentage_24h"]) > 5,
    "High",
    "Low"
)
result = df.to_dict(orient="records")
print(json.dumps(result))