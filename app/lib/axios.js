import axios from "axios";

const api = axios.create({
  baseURL: process.env.SERVER_URL, // your backend
  withCredentials: true, // send httpOnly cookie
});

export default api;
