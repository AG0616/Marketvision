"use client";

import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

export default function CoinPieChart({ coin }) {
  const data = [
    { name: "Market Cap", value: coin.market_cap },
    { name: "Volume", value: coin.total_volume },
    { name: "Supply", value: coin.circulating_supply },
  ];

  const COLORS = ["#22c55e", "#3b82f6", "#f59e0b"];

  return (
    <div className="bg-slate-700 p-8 rounded-3xl w-full h-full">
      <h1 className="text-3xl font-bold text-white mb-5">Coin Analytics</h1>

      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie data={data} dataKey="value" cx="50%" cy="50%" outerRadius={130} labelLine={false}
            label={({ name, percent, x, y }) => (
              <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" fontSize={14} fontWeight="bold">
                {`${name} ${(percent * 100).toFixed(0)}%`}
              </text>
            )}
          >
            {data.map((_, index) => <Cell key={index} fill={COLORS[index % COLORS.length]} />)}
          </Pie>

          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}