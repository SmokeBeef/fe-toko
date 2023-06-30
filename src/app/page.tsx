"use client";
import "./app.css";
import React, { useState, FormEvent, useEffect } from "react";
import swal from "sweetalert2";
import axios from "@/utils/axios";
import {useRouter} from "next/navigation"
import Loader from "@/components/Loader";
import Toast from "@/components/Toast";


export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loader, setLoader] = useState(false)
  const router = useRouter()
  const changeHandle = (e: any, set: any) => {
    set(e.target.value);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoader(true)
    await axios
      .post("user/login", { email, password })
      .then((res) => {
        console.log(res);

        if (res.status === 200) {
          localStorage.setItem("id", res.data.data.id);
          localStorage.setItem("nama", res.data.data.nama);
          localStorage.setItem("email", res.data.data.email);
          localStorage.setItem("role", res.data.data.role);
          localStorage.setItem("token", res.data.data.token);
          setLoader(false)
          Toast.fire({
            title: "Success Login",
            timer: 1000,
            icon: "success",
          })
          router.push("/barang")

        }
      })
      .catch((err) => {
        console.log(err);

        setLoader(false)
        Toast.fire({
          title: err.response ? err.response.data.err : "error",
          icon: "error",
        });
      });
  };

  useEffect(() => {

  }, [])

  return (
    <main className="font-Poppins bg-blue-300 min-h-screen min-w-full flex items-center">
      <div className="py-5 drop-shadow-md my-auto mx-auto rounded-md bg-slate-100 w-96 h-80 flex justify-center flex-col items-center">
        <h1 className="text-4xl mb-10">Login</h1>
        <form
          action=""
          className="w-full px-5 "
          onSubmit={(e) => handleSubmit(e)}
          method="post"
        >
          <p>Email</p>
          <input
            type="email"
            className="mb-5 pb-1 pt-2 px-3 w-full border-l  rounded-md drop-shadow-sm focus:drop-shadow-lg outline-none border-b transition-all border-blue-600  "
            value={email}
            onChange={(e) => changeHandle(e, setEmail)}
            name="email"
            placeholder="example@gmail.com"
            required
          />
          <p>Password</p>
          <input
            type="password"
            className="mb-5 pb-1 pt-2 px-3 w-full border-l rounded-md outline-none border-b drop-shadow-sm focus:drop-shadow-lg transition-all border-blue-600  "
            value={password}
            onChange={(e) => changeHandle(e, setPassword)}
            name="password"
            id=""
            placeholder="*******"
            required
          />
          <br />
          <button
            type="submit"
            className="bg-blue-500 w-full text-slate-100 py-2 px-3 rounded-lg hover:bg-blue-600 transition-colors"
          >
            {loader? <Loader size={25} /> : "Login"}
          </button>
        </form>
      </div>
    </main>
  );
}
