"use client";
import CoinPieChart from "@/components/charts/pie";
import { useEffect, useState } from "react";

export default function CoinPage({ params }) {
  const [coin, setCoin] = useState(null);
  const [predict, setPredict] = useState({});
  useEffect(() => {
    async function getData() {
      const res = await fetch("/api/fetch");
      const data = await res.json();
      const p = await params;
      setCoin(data.find((c) => c.id === p.id));

      const res2 = await fetch(`/api/predict/${p.id}`)
      console.log("response: ", res2);

      const data2 = await res2.json()
      console.log("data", data2);
      setPredict(data2.prediction)
    }
    getData();
  }, [params]);
  if (!coin)
    return (
      <div className="h-screen flex items-center justify-center text-white text-3xl">
        Loading...
      </div>
    );

  return (
    <div className="min-h-screen bg-slate-950 text-white p-10">
      <div className="flex flex-col md:flex-row gap-10">
        <div className="bg-slate-900 p-8 rounded-3xl w-full md:w-[35%]">
          <div className="flex items-center gap-5">
            <img src={coin.image} alt={coin.name} className="w-24 h-24" />
            <div>
              <h1 className="text-5xl font-bold">{coin.name}</h1>
              <p className="text-slate-400 uppercase text-xl">{coin.symbol}</p>
            </div>
          </div>
          <div className="mt-8 space-y-4">
            <div className="bg-slate-800 p-4 rounded-2xl">
              <p className="text-slate-400">Current Price</p>
              <h2 className="text-3xl font-bold text-green-400">${coin.current_price}</h2>
            </div>
            <div className="bg-slate-800 p-4 rounded-2xl">
              <p className="text-slate-400">Market Rank</p>
              <h2 className="text-3xl font-bold">#{coin.market_cap_rank}</h2>
            </div>
            <div className="bg-slate-800 p-4 rounded-2xl">
              <p className="text-slate-400">Total Volume</p>
              <h2 className="text-2xl font-bold text-blue-400">${coin.total_volume}</h2>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-5 w-full">
          <div className="bg-slate-900 p-6 rounded-3xl">
            <p className="text-slate-400">Market Cap</p>
            <h2 className="text-2xl font-bold">${coin.market_cap}</h2>
          </div>

          <div className="bg-slate-900 p-6 rounded-3xl">
            <p className="text-slate-400">24h High</p>
            <h2 className="text-2xl font-bold text-green-400">${coin.high_24h}</h2>
          </div>

          <div className="bg-slate-900 p-6 rounded-3xl">
            <p className="text-slate-400">24h Low</p>
            <h2 className="text-2xl font-bold text-red-400">${coin.low_24h}</h2>
          </div>

          <div className="bg-slate-900 p-6 rounded-3xl">
            <p className="text-slate-400">Supply</p>
            <h2 className="text-2xl font-bold">{coin.circulating_supply}</h2>
          </div>
        </div>
      </div>

      <div className="mt-10 bg-slate-900 p-6 rounded-3xl">
        <h2 className="text-3xl font-bold mb-6">AI Prediction</h2>

        <div className="grid md:grid-cols-3 gap-5">
          <div className="bg-slate-800 p-5 rounded-2xl">
            <p className="text-slate-400">Predicted Price</p>
            <h3 className="text-3xl font-bold text-cyan-400">
              ${predict?.predicted_price?.toFixed(4)}
            </h3>
          </div>

          <div className="bg-slate-800 p-5 rounded-2xl">
            <p className="text-slate-400">Trend</p>
            <h3
              className={`text-3xl font-bold ${predict?.trend === "Bullish"
                  ? "text-green-400"
                  : "text-red-400"
                }`}
            >
              {predict?.trend}
            </h3>
          </div>

          <div className="bg-slate-800 p-5 rounded-2xl">
            <p className="text-slate-400">Data Points Used</p>
            <h3 className="text-3xl font-bold text-yellow-400">
              {predict?.days_used}
            </h3>
          </div>
        </div>

        <p className="mt-5 text-slate-400 text-sm">
          Current: ${predict?.current_price?.toFixed(4)} → Predicted: $
          {predict?.predicted_price?.toFixed(4)}
        </p>
      </div>
      <div className="mt-10 bg-slate-900 p-4 rounded-3xl">
        <h2 className="text-3xl font-bold ">Analytics</h2>
        <div className="h-120 border border-dashed border-slate-600 rounded-2xl flex items-center justify-center text-2xl text-slate-400">
          <CoinPieChart coin={coin} />
        </div>
      </div>
    </div>
  );
}