import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContex";
import AsyncStorage from "@react-native-async-storage/async-storage";
import dayjs from "dayjs";
import jwt_decode from "jwt-decode";
import { BASE_URL } from "../utils/config";

const useAxios = () => {
  const { authTokens, setAuthTokens, setUser } = useContext(AuthContext);

  const axiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: { Authorization: `Bearer ${authTokens.access}` },
  });

  axiosInstance.interceptors.request.use(async (req) => {
    const user = jwt_decode(authTokens.access);
    const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;

    if (!isExpired) return req;

    // const response = await axios
    //   .post(`${BASE_URL}/token/refresh`, {
    //     refresh: authTokens.refresh,
    //   })
    //   .catch(async(err) => {
    //     if (err.response.status === 401) {
    //       console.log(err.response.status)
    //     }
    //   });

    const response = await fetch(`${BASE_URL}/token/refresh`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        refresh: authTokens.refresh,
      }),
    });

    const data = await response.json();
    await AsyncStorage.setItem("authTokens", JSON.stringify(data.data));

    setAuthTokens(data.data);
    setUser(jwt_decode(data.data.access));

    req.headers.Authorization = `Bearer ${data.data.access}`;
    return req;
  });

  return axiosInstance;
};

export default useAxios;
