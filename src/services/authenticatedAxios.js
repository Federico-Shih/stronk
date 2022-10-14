import axios from "axios";
import { useProfileStore } from "../stores/profile";

axios.defaults.baseURL = "http://localhost:8080/api";
axios.defaults.headers = {
  "Content-Type": "application/json"
};

export const baseAxios = axios.create({});

export const authAxios = axios.create({});

authAxios.interceptors.request.use((req) => {
  const profile = useProfileStore();
  req.headers = {
    ...req.headers,
    Authorization: `bearer ${profile.token}`
  };
  return req;
});
