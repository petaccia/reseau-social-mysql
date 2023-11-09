import axios from "axios";

const backendURL = import.meta.env.VITE_BACKEND_URL;

const instance = axios.create({
  baseURL: backendURL,
  withCredentials: true,
});
export default instance;
