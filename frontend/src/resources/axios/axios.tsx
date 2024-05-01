import axios from "axios";

const headers = {
  "Content-Type": "application/json",
  Accept: "application/json",
};

const axiosProvider = axios.create({
  baseURL: process.env.NEXT_PUBLIC_APP_URLAPI || "",
  headers,
});

const setBearerToken = (token: string) => {
  axiosProvider.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

export { axiosProvider, setBearerToken };
export default axiosProvider;
