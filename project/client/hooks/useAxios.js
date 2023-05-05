import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContex"
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

    const response = await axios.post(`${BASE_URL}/token/refresh`, {
      refresh: authTokens.refresh,
    });

    await AsyncStorage.setItem("authTokens", JSON.stringify(response.data))

    setAuthTokens(response.data)   
    setUser(jwt_decode(response.data.access))

    req.headers.Authorization = `Bearer ${response.data.access}`;
    return req;
  });

  return axiosInstance;
};

export default useAxios;
