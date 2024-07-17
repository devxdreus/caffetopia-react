import axios from "axios";

export const BASE_URL =
  process.env.NODE_ENV !== "production"
    ? "http://localhost:3000/api"
    : "http://api.coffetopia.my.id/";

export default axios.create({
  baseURL: BASE_URL,
});

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});
