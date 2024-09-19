"use client";

import { localDomain } from "@/types/domain";

export default function page() {
  const getUser = async () => {
    try {
      const res = await fetch("/api/profile", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Para enviar cookies
      });
      if (!res.ok) {
        const data = await res.json();
        console.log(data);
        throw new Error(data.message);
      }
      const data = await res.json();
      console.log(data);
    } catch (e) {
      console.log(e);
    }
  };
  const LogOut = async () => {
    const res = await fetch(localDomain + "user/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    if (!res.ok) {
      const data = await res.json();
      console.log(data);
      throw new Error(data.message);
    }
    const data = await res.json();
    console.log(data);
  };
  return (
    <div className="m-4 flex h-full w-full flex-col flex-wrap items-center justify-center gap-4">
      <h1>Dashboard</h1>
      <button
        className="rounded-xl bg-orange-400 p-4 text-white"
        onClick={getUser}
      >
        Get User
      </button>
      <button
        className="rounded-xl bg-orange-400 p-4 text-white"
        onClick={LogOut}
      >
        Log Out
      </button>
    </div>
  );
}
