import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_URL, // your backend
  withCredentials: true, // send httpOnly cookie
});

export default api;
