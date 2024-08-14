import axios from "axios";

export const AUTH_URL = process.env.AUTH_URL || "";
export const PORT = process.env.API_PORT || 4000;

export const axiosAuthClient = axios.create({
  baseURL: AUTH_URL,
});
