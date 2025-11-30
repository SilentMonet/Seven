export * from "./types";
export * from "./api";
export * from "./OofAPI";
import Axios from "axios";
import { OofAPIFactory } from "./OofAPI";

const axios = Axios.create({
  timeout: 5000,
  withCredentials: true,
  headers: { Accept: "*/*" }
});
axios.interceptors.response.use((response) => {
  return response.data;
});

export const OofAPI = new OofAPIFactory(req => {
  if (import.meta.env.DEV) {
    req.baseURL = undefined as any;
  }
    return axios(req);
});