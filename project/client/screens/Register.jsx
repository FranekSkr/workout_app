import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState } from "react";

import { BASE_URL } from "../utils/config";

import { COLORS, regex } from "../assets/dummy";
import Input from "../components/Input";
import GetBackNavbar from "../components/GetBackNavbar";

const Register = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [username, setUsername] = useState("");


  const handleRegister = async () => {
    if (
      !regex.usernameRegex.test(username)  || !regex.emailRegex.test(email)  || !regex.passwordRegex.test(password)  || repeatPassword !== password
      ) {
      Alert.alert('Błąd', 'Proszę poprawnie wypełnić formularz')
    } else {
      const res = await fetch(BASE_URL + "/register/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          email: email,
          password: password,
        }),
      });

      if (res.ok) {
        navigation.navigate("Login");
        Alert.alert(
          "Udało się",
          "Cieszymy się, że dołączyłeś do naszej społności"
        );
      } else if (res.status === 400) {
        Alert.alert("Bład", "Konto już istnieje");
      }
    }
  };

  return (
    <>
    <GetBackNavbar navigation={navigation} screenName="Login" label="Rejestracja"/>
    <View style={styles.container}>
      <Text style={styles.title}>Zarejestruj się do Mojej Siłowni</Text>

      <Input
        type="username"
        label="wpisz nazwę użytkownika"
        value={username}
        setValue={setUsername}
        checkIsValid={() => {return regex.usernameRegex.test(username)}}
      />

      <Input
        type="email"
        label="wpisz adres email"
        value={email}
        setValue={setEmail}
        checkIsValid={() => {return regex.emailRegex.test(email)}}
      />

      <Input
        type="password"
        label="wpisz hasło"
        value={password}
        setValue={setPassword}
        checkIsValid={() => {return regex.passwordRegex.test(password)}}
      />

      <Input
        type="password"
        label="powtórz hasło"
        value={repeatPassword}
        setValue={setRepeatPassword}
        checkIsValid={() => {return (repeatPassword === password)}}
      />

      <TouchableOpacity onPress={handleRegister} style={styles.button}>
        <Text style={styles.buttonText}>Stwórz konto</Text>
      </TouchableOpacity>
    </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    flex: 1,
    paddingHorizontal: 30,
    paddingVertical: 10,
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    marginVertical: 20,
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

export default Register;
