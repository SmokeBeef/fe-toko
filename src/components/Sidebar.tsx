"use client";
import React, { useEffect, useState } from "react";
import { BsArrowRightShort, BsFillBoxSeamFill } from "react-icons/bs";
import { AiFillHome, AiOutlineHistory } from "react-icons/ai";
import { IconType } from "react-icons/lib/esm/iconBase";
import { usePathname, useRouter } from "next/navigation";
import { MdLogout } from "react-icons/md";
import axiosJwt from "@/utils/axios";
import LoaderScreen from "./LoaderScreen";

interface array {
  link: String;
  icon: IconType;
  href: string;
}

export default function Sidebar(): React.JSX.Element {
  const [open, setOpen] = useState(false);
  const [loadingScreen, setLoadingScreen] = useState(false);
  const router = usePathname();
  const Router = useRouter();

  const li: Array<array> = [
    { link: "dashboard", icon: AiFillHome, href: "/dashboard" },
    { link: "barang", icon: BsFillBoxSeamFill, href: "/barang" },
    // { link: "transaksi", icon:  },
    // { link: "history", icon: AiOutlineHistory },
  ];

  // useEffect(() => {
  //   function handleResize() {
  //     setOpen(768 < window.innerWidth);
  //   }

  //   if (typeof window !== "undefined") {
  //     setOpen(768 < window.innerWidth);
  //     window.addEventListener("resize", handleResize);
  //   }

  //   return () => {
  //     if (typeof window !== "undefined") {
  //       window.removeEventListener("resize", handleResize);
  //     }
  //   };
  // }, []);

  useEffect(() => {}, []);

  const onDelete = () => {
    axiosJwt
      .delete(`user/logout/${localStorage.getItem("id")}`)
      .then((res) => {});
  };

  return (
    <div
      className={`${
        open ? "w-72 rounded-e-3xl" : " w-16"
      } px-4 pt-8 bg-blue-800 font-Poppins text-slate-50 min-h-screen relative duration-300 `}
    >
      <BsArrowRightShort
        size={30}
        onClick={() => setOpen(!open)}
        className={`${
          open && "rotate-180"
        } bg-slate-100 absolute cursor-pointer text-blue-500 -right-3 top-16 border-2 rounded-full border-blue-500  duration-300`}
      />
      <div className={`${!open && ""}`}>
        <div className={`flex gap-x-4 items-center `}>
          <h1
            onClick={() => (window.location.href = "/dashboard")}
            className="cursor-pointer w-8 text-center duration-500 text-2xl font-bold"
          >
            TB
          </h1>
          <span
            className={`
           my-auto font-medium text-md origin-left duration-300 ${
             !open && "-m-72"
           }`}
          >
            Toko Bu Nur
          </span>
        </div>
        <hr className="mt-4" />
        <ul className="flex flex-col gap-2 pt-7 ">
          {li.map((data, index) => (
            <li
              key={index}
              className={`${
                router === "/" + data.link && "bg-blue-500"
              } capitalize rounded-md py-1 duration-100 flex items-center gap-5 cursor-pointer hover:bg-blue-500`}
              onClick={() => {
                setLoadingScreen(true);
                Router.push(data.href);
                setLoadingScreen(false);
              }}
            >
              <data.icon size={25} className="w-8 " />{" "}
              <span
                className={`my-auto font-medium text-md origin-left duration-300 ${
                  !open && "-m-72"
                }`}
              >
                {data.link}
              </span>
            </li>
          ))}
          <li className=" capitalize rounded-md py-1 duration-100 flex items-center  gap-5 cursor-pointer hover:bg-blue-500">
            <MdLogout size={25} className="w-8  " />
            <span
              className={`my-auto font-medium text-md origin-left duration-300 ${
                !open && "-m-72"
              }`}
            >
              Logout
            </span>
          </li>
        </ul>
      </div>
      {loadingScreen && <LoaderScreen />}
    </div>
  );
}
