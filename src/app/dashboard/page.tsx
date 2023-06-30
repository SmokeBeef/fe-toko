"use client";
import React, { useState } from "react";
import Sidebar from "@/components/Sidebar";
import Loader from "@/components/Loader";

export default function Page() {
  const [loading, setLoading] = useState(false);
  return (
    <div className="flex font-Poppins">
      <Sidebar />

      <main className="m-5">
        page
        <button
          onClick={() => {
            setLoading(true);
            console.log("hore");
            setTimeout(() => {
              setLoading(false);
              alert("hore");
            }, 5000);
          }}
          className="bg-blue-600 w-24 text-slate-100 py-2 px-3 rounded-md hover:bg-blue-700"
        >
          {loading ? <Loader color={true} size={25} /> : "Tambah"}
        </button>
      </main>
    </div>
  );
}
