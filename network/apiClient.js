import axios from "axios";
import { useSelector } from "react-redux";
import { store } from "../store";

const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001",
});

function AddHeaders() {
  const token = useSelector((state) => state.user);
  console.log(token);
  return (config) => {
    return {
      ...config,
      headers: {
        ...config.headers,
        "x-token": `${token}`,
      },
    };
  };
}

const HeaderAdder = AddHeaders();
axiosClient.interceptors.request.use(HeaderAdder);

export { axiosClient };
