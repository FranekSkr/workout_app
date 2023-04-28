import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/config";
import { Alert } from "react-native";

import checkToken from "./axiosFunction";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);

  const login = async (username, password) => {
    try {
      let data
      await axios.post(`${BASE_URL}/token/`, {
        username,
        password,
      }).then(res =>{
        if(res.status === 200){
          AsyncStorage.clear();
          data = res.data
        }}
      );

      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${data["access"]}`;

      await AsyncStorage.multiSet([
        ["accessToken", JSON.stringify(data.access)],
        ["refreshToken", JSON.stringify(data.refresh)],
      ]);
      setAccessToken(data.access);
      setRefreshToken(data.refresh);
    } catch (err) {
      Alert.alert("Bład", "Nie udało się zalogować, sprawdź czy napewno podałeś dobre dane");
      console.error(err);
    }
  };

  //logout
    const logout = async () => {
      checkToken()

      try {
        const refreshToken = await AsyncStorage.getItem("refreshToken").then(token => token.toString());
        axios.post(`${BASE_URL}/logout/`,{refreshToken:refreshToken})
        .then(response => console.log(response.data))
        .catch(error => console.log(error));


        
        await AsyncStorage.clear();
        axios.defaults.headers.common["Authorization"] = null;
        setAccessToken(null);
        setRefreshToken(null);
      } catch (err) {
        Alert.alert("Błąd", "Wylogowanie nie powiodło się");
        console.error(err);
      }
    };

  const isLoggedIn = async () => {
    try {
      let accessToken = await AsyncStorage.getItem("accessToken");
      let refreshToken = await AsyncStorage.getItem("refreshToken");
      accessToken && setAccessToken(accessToken);
      refreshToken && setRefreshToken(refreshToken);
    } catch (err) {
      Alert.alert("Error", err);
    }
  };

  useEffect(() => {
    isLoggedIn();
  }, []);

  return (
    <AuthContext.Provider value={{ login, logout, accessToken }}>
      {children}
    </AuthContext.Provider>
  );
};
