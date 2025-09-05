import axios from "axios";
import { Auth } from "./auth";

export const api = axios.create({
  baseURL: "https://bootcamp-api.codeit.kr/api/17-3/the-julge",
  // withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = Auth.getToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});
