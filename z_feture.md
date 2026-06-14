import { Modern_Antiqua } from "next/font/google"

# Crypto Dashboard Feature Pack

## 1. Watchlist Feature

### Add watchlist API

`app/api/watchlist/route.js`

```js
import clientPromise from "@/lib/mongodb";

export async function GET() {

  const client = await clientPromise;
  const db = client.db("crypto");

  const data = await db.collection("watchlist").find({}).toArray();

  return Response.json(data);

}

export async function POST(req) {

  const body = await req.json();

  const client = await clientPromise;
  const db = client.db("crypto");

  await db.collection("watchlist").insertOne(body);

  return Response.json({ message: "Added" });

}
```

---

### Add button in coin card

```jsx
<button
  onClick={async () => {

    await fetch("/api/watchlist", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(coin),
    });

  }}
  className="bg-yellow-500 px-3 py-1 rounded-xl mt-2"
>
  Add to Watchlist
</button>
```

---

### Watchlist page

`app/watchlist/page.js`

```jsx
"use client";

import { useEffect, useState } from "react";

export default function Watchlist() {

  const [coins, setCoins] = useState([]);

  useEffect(() => {

    async function getData() {

      const res = await fetch("/api/watchlist");
      const data = await res.json();

      setCoins(data);

    }

    getData();

  }, []);

  return (

    <div className="p-10 text-white">

      <h1 className="text-5xl font-bold mb-10">
        Watchlist
      </h1>

      <div className="grid grid-cols-3 gap-5">

        {coins.map((coin) => (

          <div key={coin.id} className="bg-slate-900 p-5 rounded-3xl">
            <h2 className="text-2xl font-bold">{coin.name}</h2>
            <p>${coin.current_price}</p>
          </div>

        ))}

      </div>

    </div>

  );
}
```

# 2. PieChart Feature

Install:

```bash
npm install recharts
```

---

`app/charts/Piechart.js`

```jsx
"use client";

import {
  PieChart,
  Pie,
  Tooltip,
  Cell,
} from "recharts";

export default function CoinPieChart({ coin }) {

  const data = [
    {
      name: "Market Cap",
      value: coin.market_cap,
    },
    {
      name: "Volume",
      value: coin.total_volume,
    },
    {
      name: "Supply",
      value: coin.circulating_supply,
    },
  ];

  const colors = ["#22c55e", "#3b82f6", "#f59e0b"];

  return (

    <PieChart width={400} height={400}>

      <Pie
        data={data}
        dataKey="value"
        outerRadius={130}
      >
        {data.map((entry, index) => (
          <Cell key={index} fill={colors[index]} />
        ))}
      </Pie>

      <Tooltip />

    </PieChart>

  );
}
```

---

Use in `[id]/page.js`

```jsx
import CoinPieChart from "@/app/charts/Piechart";

<CoinPieChart coin={coin} />
```

# 3. Sorting Feature

```jsx
const [sort, setSort] = useState("default");

const sortedCoins = [...coins].sort((a, b) => {

  if (sort === "high")
    return b.current_price - a.current_price;

  if (sort === "low")
    return a.current_price - b.current_price;

  return 0;

});
```

---

```jsx
<select
  onChange={(e) => setSort(e.target.value)}
  className="bg-slate-800 p-3 rounded-xl"
>
  <option value="default">Default</option>
  <option value="high">High to Low</option>
  <option value="low">Low to High</option>
</select>
```

---

Replace:

```jsx
coins.map(...)
```

with:

```jsx
sortedCoins.map(...)
```

# 4. Skeleton Loading UI

```jsx
if (!coins.length)
  return (

    <div className="grid grid-cols-4 gap-5 p-10">

      {[1,2,3,4,5,6].map((item) => (

        <div
          key={item}
          className="bg-slate-800 h-40 rounded-3xl animate-pulse"
        />

      ))}

    </div>

  );
```

# 5. Debounced Search

```jsx
const [search, setSearch] = useState("");
const [debouncedSearch, setDebouncedSearch] = useState("");

useEffect(() => {

  const timer = setTimeout(() => {
    setDebouncedSearch(search);
  }, 400);

  return () => clearTimeout(timer);

}, [search]);
```

---

```jsx
const filteredCoins = coins.filter((coin) =>
  coin.name.toLowerCase().includes(
    debouncedSearch.toLowerCase()
  )
);
```

# 6. Last Updated Feature

### Save timestamp

```js
await db.collection("metadata").updateOne(
  { name: "coinsync" },
  {
    $set: {
      updatedAt: new Date(),
    },
  },
  { upsert: true }
);
```

---

### Fetch timestamp

```js
const lastUpdated = await db
  .collection("metadata")
  .findOne({ name: "coinsync" });
```

---

### Show in frontend

```jsx
<p className="text-slate-400">
  Last Synced:
  {
    new Date(lastUpdated.updatedAt)
      .toLocaleString()
  }
</p>
```

# 7. Google Login

Install:

```bash
npm install next-auth
```

---

`app/api/auth/[...nextauth]/route.js`

```js
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({

  providers: [

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),

  ],

});

export {
  handler as GET,
  handler as POST,
};
```

---

Login button:

```jsx
"use client";

import { signIn } from "next-auth/react";

<button
  onClick={() => signIn("google")}
  className="bg-white text-black px-5 py-2 rounded-xl"
>
  Login with Google
</button>
```

---

`.env.local`

```env
GOOGLE_CLIENT_ID=your_client_id
GOOGLE_CLIENT_SECRET=your_secret
NEXTAUTH_SECRET=randomsecret
NEXTAUTH_URL=http://localhost:3000
```
/*
dark mode
price history graph
portfolio simulator  form,state managememt 
compare 2 coin
command palette
notification
drag,drop or hide charts


*/