import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  Image
} from "react-native";
import React, { useContext, useState } from "react";
import { UserIcon, LockClosedIcon } from "react-native-heroicons/outline";

import { COLORS } from "../assets/dummy";

import { AuthContext } from "../context/AuthContex";

const Login = ({ navigation }) => {
  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const { login } = useContext(AuthContext);

  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={{uri: "https://picsum.photos/200"}}
        style={styles.icon}
      />

      <Text style={styles.loginTitle}>Zaloguj się do FitNow</Text>
      <View style={styles.inputContainer}>
        <UserIcon size={20} color={COLORS.lightGrey} />
        <TextInput
          style={styles.input}
          placeholder="Nazwa użytkownika"
          placeholderTextColor={COLORS.lightGrey}
          onChangeText={(username) => setForm(...form, username)}
        />
      </View>
      <View style={styles.inputContainer}>
        <LockClosedIcon size={20} color={COLORS.lightGrey} />
        <TextInput
          style={styles.input}
          placeholder="Hasło"
          secureTextEntry={true}
          placeholderTextColor={COLORS.lightGrey}
          onChangeText={(password) => setForm(...form, password)}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={login}>
        <Text style={styles.buttonText}>Zaloguj</Text>
      </TouchableOpacity>

      <Text style={{ color: COLORS.blue }}>Nie posiadasz jeszcze konta?</Text>
      <TouchableOpacity onPress={() => navigation.navigate("Register")} style={styles.button}>
        <Text style={styles.buttonText}>Zarejestruj się</Text></TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    flex: 1,
    paddingHorizontal: 30,
    paddingVertical: 50,
    alignItems: "center",
  },
  icon: { 
    alignSelf: "center",
    width: 100,
    height: 100,
    marginTop: 50,
    borderRadius: 20,
  },

  loginTitle: {
    fontSize: 25,
    fontWeight: "800",
    marginTop: 30,
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    width: "100%",
    marginVertical: 15,
    paddingVertical: 7,
    borderBottomColor: COLORS.lightGrey,
    borderBottomWidth: 1,
  },

  input: {
    fontWeight: "bold",
    fontSize: 16,
    color: COLORS.darkGrey,
    flex: 1,
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
