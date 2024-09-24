import axios, { AxiosInstance, AxiosStatic } from "axios";
import applyMockAdapter from "@/app/api/mock/mockProvider";

const loginURI = process.env.NEXT_PUBLIC_BACKEND_URI;

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000",
});

applyMockAdapter(axiosInstance);

export default axiosInstance;
