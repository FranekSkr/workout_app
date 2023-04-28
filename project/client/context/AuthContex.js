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
      await AsyncStorage.clear();
      const { data } = await axios.post(`${BASE_URL}/token/`, {
        username,
        password,
      });

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
      Alert.alert("Bład", "Przepraszamy wystąpił jakiś problem");
      console.error(err);
    }
  };

  //logout
  const logout = async () => {

    // checkToken()
   
    const refreshToken = await AsyncStorage.getItem("refreshToken")   

    try {
      fetch(`${BASE_URL}/logout/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          "refresh_token":  refreshToken,
        })
      }).then(res => console.log(res))

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
