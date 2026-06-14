"use client"
import PriceChart from "@/components/charts/price";
import { useEffect,useState } from "react";
import Dashboard from "@/components/search";
import { Link } from "lucide-react";
import { useTheme } from "next-themes";
import { toast } from "sonner";
import LoginButton from "@/components/login";
import { getFCMToken } from "@/lib/getToken";
import NotificationListener from "@/components/notification";

export default  function Home() {
  const [coins, setCoins] = useState([]);
  const { theme, setTheme } = useTheme();

  useEffect(()=>{
    async function getdata(){
       const res = await fetch("/api/fetch");
      const data = await res.json();
      setCoins(data);
      console.log(coins);
      
    }
    getdata()
     gettoken();
  },[])
  
  let token;
 async function gettoken() {
     token=await getFCMToken();
      await fetch("/api/notify", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ token }),
});
  console.log(token);
 }

  
  if (!coins.length)
  {return (
    <div className="grid grid-cols-4 gap-5 p-10">
      {[1,2,3,4,5,6].map((item) => (
        <div  key={item}  className="bg-slate-800 h-40 rounded-3xl animate-pulse" />    ))}
    </div>
  );}
  return (
    <div className="p-8">
      <NotificationListener />
      <h1 className="text-4xl font-bold mb-8">
        MarketVision Dashboard
      </h1>
      
      <div className="grid grid-cols-[75%_10%_10%] gap-4">
        <Dashboard coins={coins}/>
        <LoginButton/>
        <button onClick={() =>{
          setTheme(theme === "dark" ? "light" : "dark")
          toast.success('Theme changes')}}
           className="bg-gray-150 border-2 text-black dark:bg-slate-700 dark:text-black rounded-2xl ml-2 max-h-14">
         {theme === "dark" ? "🌙 Dark Mode" : "☀️ Light Mode"}</button>
     </div>
    
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">

        {coins.slice(0,9).map((coin) => (

          <div
            key={coin.id}
            className=" p-6 rounded-2xl shadow-lg text-slate-900 bg-gray-300 dark:bg-slate-800 dark:text-slate-50"
          >

            <h2 className="text-2xl font-semibold">
              {coin.name}
            </h2>

            <p className="text-xl mt-4">
              ${coin.current_price.toLocaleString()}
            </p>

          </div>

        ))}

      </div>

      <PriceChart coins={coins} />

    </div>
  );
}