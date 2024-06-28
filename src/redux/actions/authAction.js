import axios from "axios";
import Swal from "sweetalert2";
import { setToken, setUser } from "../reducers/authReducer";

// Login
export const login = (user, navigate) => async (dispatch) => {
  try {
    const response = await axios.post("http://localhost:3000/login", user);
    localStorage.setItem("username", user.username);
    localStorage.setItem("role", response.data.payload.role);
    dispatch(setToken(response.data.payload.accessToken));
    dispatch(setUser(user));
    if (response.data.payload.role == "admin") {
      navigate("/products", { replace: true });
    } else {
      navigate("/", { replace: true });
    }
  } catch (error) {
    console.error(error);
    Swal.fire({
      title: error.response.data.message,
      text: "username atau password salah",
      icon: "error",
    });
  }
};

export const register = (user, navigate) => async () => {
  try {
    const response = await axios.post("http://localhost:3000/register", user); // Coba registrasi

    if (!response.status) {
      Swal.fire({
        title: "Error!",
        text: "Username dan email sudah terdaftar",
        icon: "error",
        confirmButtonText: "Ok",
      }); // Menampilkan alert jika registrasi gagal
    }

    Swal.fire({
      title: "Success!",
      text: "User baru berhasil ditambahkan",
      icon: "success",
      confirmButtonText: "Ok",
    }); // Menampilkan alert jika registrasi berhasil
    navigate("/login"); // Setelah user berhasil registrasi, akan dipindahkan ke halaman login
  } catch (error) {
    Swal.fire({
      title: "Error!",
      text: "Username dan email sudah terdaftar",
      icon: "error",
      confirmButtonText: "Ok",
    }); // Menampilkan alert jika registrasi gagal
    console.error("login page", error);
  }
};

export const logoutUser = () => (dispatch) => {
  dispatch(setToken(null));
  dispatch(setUser(null));
};
