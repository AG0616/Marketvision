"use client";
import { useState,useRef,useEffect } from "react";
import Link from "next/link";

export default function Dashboard({ coins }) {
  const [search, setSearch] = useState("");
  const [issearch,setIssearch]=useState(false)
   const searchRef = useRef(null);

   useEffect(()=>{
    function handleOutclick(e){  //e.target is element which is clicked
      if(searchRef.current && !searchRef.current.contains(e.target)){
          setSearch("");
        setIssearch(false);
      }
    }
    document.addEventListener("mousedown",handleOutclick)

    return ()=>{
      document.removeEventListener("mousedown",handleOutclick)
    }
   },[])

  const filteredCoins = coins.filter((coin) =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div ref={searchRef}>
      <input  type="text"  placeholder="Search coin..." value={search} onChange={(e) =>
       {setSearch(e.target.value)
        if(e.target.value!=="")
        {setIssearch(true)}
        else {
            setIssearch(false);
          }
       }}
        className="bg-slate-250 border-2 border-black p-3 rounded-xl  w-[20%] outline-none  dark:text-slate-100 dark:bg-slate-800 dark:border-2 dark:border-black" />
    {issearch &&(
      <div className="bg-slate-500  mt-0 mb-10 w-[20%] p-2 ">
        {filteredCoins.map((coin) => (
         <Link href={`/coin/${coin.id}`} key={coin.id}>
         <div  key={coin.id}   className="bg-slate-700 m-0.5 border border-black p-2 rounded-2xl text-1xl font-semibold text-white " >
            {coin.name}
          </div> </Link>
        ))   }
      </div>)}
    </div>
  );
}


 