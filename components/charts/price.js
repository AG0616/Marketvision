"use client";
import {LineChart, Line, XAxis,YAxis, Tooltip, ResponsiveContainer} from "recharts";


export default  function PriceChart({coins}) {
    const data=coins.map((coin)=>({
        name:coin.name.toUpperCase(),
        price: coin.current_price,
    }))
   
    
  return (
    <div className="rounded-2xl mt-8 h-[300px] w-full m-auto p-3 text-slate-900 bg-slate-200 border-2 border-black dark:bg-slate-800 ">
      <h2 className="text-2xl mb-4">
        BTC Weekly Price
      </h2>

      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="price" stroke="#3b82f6"
strokeWidth={3} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}