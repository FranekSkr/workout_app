import axios from "axios";
import { BASE_URL } from "../utils/config";
import AsyncStorage from "@react-native-async-storage/async-storage";

const checkToken = () => {
console.log("checking Token")
let refresh = false;
axios.interceptors.response.use(
  (resp) => resp,
  async (error) => {
    if (error.response.status === 401 && !refresh) {
      console.log("expired")
      refresh = true;
      const response = await axios.post(`${BASE_URL}/token/refresh/`, {
        "refresh": await AsyncStorage.getItem("refreshToken"),
      });
      if (response.status === 200) {
        axios.defaults.headers.common["Authorization"] = `Bearer 
       ${response.data["access"]}`;
        await AsyncStorage.multiSet([["accessToken", response.data.access], ["refreshToken", response.data.refresh]])
        console.log(await AsyncStorage.multiGet([["accessToken"], ["refreshToken"]]))
        return axios(error.config);
      }
    }
    refresh = false;
    return error;
  }
);}

export default checkToken

