"use client";

import { useEffect, useState } from "react";

export default function LoginButton() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = () => {
    const dummyUser = {
      id: "user123",
      name: "Amisha",
    };

    localStorage.setItem("user", JSON.stringify(dummyUser));
    setUser(dummyUser);
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return user ? (
      <button onClick={logout} className="bg-slate-700  rounded-2xl ">Logout</button>
  ) : (
    <button onClick={login} className="bg-slate-700  rounded-2xl ">Login</button>
  );
}