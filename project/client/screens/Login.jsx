import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import React, { useContext, useState } from "react";

import { COLORS } from "../assets/dummy";

import { AuthContext } from "../context/AuthContex";
import Input from "../components/Input";

const Login = ({ navigation }) => {
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const { login } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/logo.png")}
        style={styles.icon}
      />

      <Text style={styles.loginTitle}>Zaloguj się do Mojej Siłowni</Text>

      <Input
        type="username"
        label="wpisz nazwę użytkownika"
        value={username}
        setValue={setUsername}
        checkIsValid={() => {
          return undefined;
        }}
      />

      <Input
        type="password"
        label="wpisz hasło"
        value={password}
        setValue={setPassword}
        checkIsValid={() => {
          return undefined;
        }}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          login(username, password);
        }}
      >
        <Text style={styles.buttonText}>Zaloguj</Text>
      </TouchableOpacity>

      <Text style={{ color: COLORS.blue }}>Nie posiadasz jeszcze konta?</Text>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Register");
        }}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Zarejestruj się</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    flex: 1,
    paddingHorizontal: 30,
    paddingVertical: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    alignSelf: "center",
    width: 150,
    height: 150,
    borderRadius: 20,
  },

  loginTitle: {
    fontSize: 28,
    fontWeight: "800",
    marginTop: 30,
    marginBottom: 20,
    textAlign: "center",
  },
  button: {
    backgroundColor: COLORS.blue,
    paddingVertical: 15,
    width: "100%",
    borderRadius: 10,
    marginVertical: 20,
  },
  buttonText: {
    color: COLORS.white,
    textAlign: "center",
    fontWeight: "800",
    fontSize: 20,
  },
});

export default Login;
