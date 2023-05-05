import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { BASE_URL } from "../utils/config";
import { Alert } from "react-native";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authTokens, setAuthTokens] = useState(null);
  const [user, setUser] = useState(null)

  const login = async (username, password) => {
    try {
      if ((await AsyncStorage.getItem("authTokens")) !== null) {
        await AsyncStorage.removeItem("authItems");
      }
      const { data } = await axios.post(`${BASE_URL}/token/`, {
        username,
        password,
      });

      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${data["access"]}`;

      await AsyncStorage.setItem("authTokens", JSON.stringify(data));
      setAuthTokens(data);
      setUser(jwt_decode(data.access))

    } catch (err) {
      Alert.alert(
        "Bład",
        "Nie udało się zalogować, sprawdź czy napewno podałeś dobre dane"
      );
    }
  };

  //logout

  const logout = async () => {
    try {
      axios.post(
        `${BASE_URL}/logout/`,
        {
          refreshToken: JSON.parse(await AsyncStorage.getItem("authTokens")).refresh,
        },
        {
          headers: {
            Authorization: `Bearer ${
              JSON.parse(await AsyncStorage.getItem("authTokens")).access
            }`,
          },
        }
      );

      await AsyncStorage.clear();
      axios.defaults.headers.common["Authorization"] = null;
      setAuthTokens(null);
      setUser(null)
    } catch (err) {
      Alert.alert("Błąd", "Wylogowanie nie powiodło się");
    }
  };

  const isLoggedIn = async () => {
    try {
      const authTokens = JSON.parse(await AsyncStorage.getItem("authTokens"));
      if(authTokens) {
        setAuthTokens(authTokens) 
        setUser(jwt_decode(authTokens.access))
      }
    } catch (err) {
      Alert.alert("Error", err);
    }
  };

  useEffect(() => {
    isLoggedIn();
  }, []);

  return (
    <AuthContext.Provider value={{ login, logout, authTokens, setAuthTokens, setUser, user }}>
      {children}
    </AuthContext.Provider>
  );
};
