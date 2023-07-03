import axios from "axios";
import jwtDecode from "jwt-decode";
import swal from "sweetalert2";
// const token: string = localStorage.getItem("token") || "";
const axiosJwt = axios.create({
  baseURL: "https://be-toko-8dh753x58-smokebeef.vercel.app/",
  // withCredentials: true,
  // headers: {
  //   Authorization: `Bearer ${localStorage.getItem("token")}`,
  // },
});

// axiosJwt.interceptors.request.use(async (config) => {
//   const exp: any = jwtDecode(token);
//   const date = new Date();

//   if (exp.exp * 1000 > date.getTime()) {
//   }

//   return config;
// });
axiosJwt.interceptors.response.use(async (res) => {
  console.log("ini erro " + res.data);

  if (res.status >= 400)
    swal.fire({
      title: "error",
      icon: "error",
    });

  return res;
});
export default axiosJwt;
