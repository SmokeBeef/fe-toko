"use client";
import Modal from "@/components/Modal";
import Sidebar from "@/components/Sidebar";
import React, { FormEvent, useState } from "react";
import CurrencyInput, { formatValue } from "react-currency-input-field";

import { useEffect } from "react";
import axiosJwt from "@/utils/axios";
import Loader from "@/components/Loader";
import Toast from "@/components/Toast";
import swal from 'sweetalert2';

function Page() {
  const [visible, setVisble] = useState(false);
  const [loading, setLoading] = useState(false);
  const [nama, setNama] = useState("");
  const [harga, setHarga] = useState<string>("");
  const [data, setdata] = useState<Array<any>>();
  const [error, setError] = useState<string>();
  const [cari, setCari] = useState<string>("");

  const changeHandle = (
    e: React.ChangeEvent<HTMLInputElement>,
    set: React.Dispatch<React.SetStateAction<any>>
  ) => {
    set(e.target.value);
  };

  const tableData: Array<any> | undefined = data?.filter((item) =>
    item.nama.toLocaleLowerCase().includes(cari.toLocaleLowerCase())
  );

  const getData = async () => {
    setLoading(true);
    await axiosJwt
      .get("barang/")
      .then((res) => {
        if (res.status === 200) setdata(res.data.data);
      })
      .catch((err) => {
        setError("Terjadi Error");
      });
    setLoading(false);
  };
  useEffect(() => {
    getData();
  }, []);

  const formatHarga = (value: string): string => {
    return formatValue({
      value: value,
      groupSeparator: ".",
    });
  };

  const search = (e: any) => {
    setCari(e.target.value);
  };

  const submit = async () => {
    const price = harga.split(" ")[1].replace(/,/g, "");
    console.log(price);

    await axiosJwt
      .post("barang/add", {
        nama,
        harga: Number(price),
      })
      .then((res) => {
        Toast.fire({
          title: res.data.msg,
          icon: "success",
        });
        setVisble(false);
        getData();
        setNama("");
      })
      .catch((err) => {
        Toast.fire({
          title: err.response ? err.response.data.err : "error",
          icon: "error",
        });
      });
  };

  const onDelete = async (data: any) => {
    swal.fire({
      title: `Hapus Barang?`,
      text: `Barang ${data.nama} akan dihapus`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yakin",
      denyButtonText: "Batal",
      reverseButtons: true
    })
    .then(async res => {
      if(res.isConfirmed) {
        await axiosJwt.delete(`barang/del/${data.id}`)
        .then(res => {
          if(res.status === 201)
          Toast.fire({
            title: "Success Delete",
            icon: "success"
          })
          getData()
        }) 
      }
    })
  };
  const onEdit = () => {};

  return (
    <div className="font-Poppins">
      <div className="flex">
        <Sidebar />
        <main className="m-5">
          <div className="flex gap-5">
            <input
              type="search"
              className=" pb-1 pt-2 px-2 w-3/4 border-l drop-shadow-xl rounded-md  focus:drop-shadow-lg outline-none border-b transition-all border-blue-600 "
              placeholder="Cari Barang"
              value={cari}
              onChange={search}
            />
            <button
              onClick={() => setVisble(true)}
              className="bg-blue-600 text-slate-100 py-2 px-3 rounded-md hover:bg-blue-700"
            >
              Tambah
            </button>
          </div>
          <table className="max-md:text-sm bg-blue-300 rounded-md mt-5">
            <thead className="border text-left text-slate-100 bg-blue-500">
              <tr>
                <th className="p-2 ">No</th>
                <th className="p-2 min-w-[10rem] border">Nama</th>
                <th className="p-2 ">Harga {"(Rp.)"}</th>
              </tr>
            </thead>
            <tbody className="">
              {data ? (
                tableData &&
                tableData.map((data, index) => (
                  <tr className="border" key={index}>
                    <td className="p-2  text-center">{index + 1}</td>
                    <td className="p-2 capitalize border">
                      {data.nama}
                      <br />
                      <button
                      onClick={e => onDelete(data)}
                      className="outline-1 outline-red-400 hover:text-slate-100 hover:bg-red-500 transition-colors duration-100 outline px-2 rounded">
                        Hapus
                      </button>
                    </td>
                    <td className="p-2">
                      {formatHarga(data.harga.toString())}
                      <br />
                      <button className="outline-1 outline-green-600 hover:bg-green-500 hover:text-slate-100 transition-colors duration-100 outline px-2 rounded">
                        Edit
                      </button>
                    </td>
                  </tr>
                ))
              ) : error ? (
                ""
              ) : (
                <tr>
                  <td colSpan={2}>
                    <Loader size={50} />
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </main>
      </div>
      <Modal isVisible={visible} onClose={() => setVisble(false)}>
        <form action="" onSubmit={submit} method="post">
          <h1 className="text-2xl text-center font-bold mb-5">Tambah Barang</h1>
          <p>Nama Barang</p>
          <input
            type="text"
            className="mb-5 pb-1 pt-2 px-3 w-full border-l  rounded-md drop-shadow-sm focus:drop-shadow-lg outline-none border-b transition-all border-blue-600  "
            value={nama}
            onChange={(e) => changeHandle(e, setNama)}
            name="email"
            placeholder="Rokok Surya 12 atau Rinso 25gr"
            required
          />
          <p>Harga</p>
          <CurrencyInput
            prefix="Rp. "
            className="mb-5 pb-1 pt-2 px-3 w-full border-l  rounded-md drop-shadow-sm focus:drop-shadow-lg outline-none border-b transition-all border-blue-600  "
            onChange={(e) => changeHandle(e, setHarga)}
            name="harga"
            placeholder="2.000"
            required
          />
          <div className="flex">
            <button
              type="submit"
              className="bg-blue-600 text-slate-100 py-2 px-3 rounded-md hover:bg-blue-700"
            >
              Submit
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

export default Page;
