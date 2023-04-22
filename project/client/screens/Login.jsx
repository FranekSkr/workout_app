import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import axios from "axios";
import { UserIcon } from 'react-native-heroicons/outline'

import { COLORS } from "../assets/dummy";


const Login = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const submit = async () => {
    const user = {
      username: username.toLowerCase(),
      password: password,
    };
    alert(user.username)

    const { data } = await axios.post("http://127.0.0.1:8000/api/token/", user, {
      headers: { "Content-Type": "application/json" },
    }).catch(error =>{
      alert(error)
    })

    //Initialize the access & refresh token in AsyncStorage.
    AsyncStorage.clear()
    AsyncStorage.setItem("access_token", data.access);
    AsyncStorage.setItem("refresh_token", data.refresh);
    axios.defaults.headers.common["Authorization"] = `Bearer ${data["access"]}`;
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.loginTitle}>Login</Text>
      <View style={styles.inputContainer}>
        <UserIcon size={24} color={COLORS.lightGrey}/>
        <TextInput
        style={styles.input}
        placeholder="Type a username"
        placeholderTextColor={COLORS.lightGrey}
        onChangeText={(username) => setUsername(username)}
      />
      </View>
      <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry={true}
        placeholderTextColor={COLORS.lightGrey}
        onChangeText={(password) => setPassword(password)}
      />
      </View>

      <TouchableOpacity style={styles.button} onPress={submit}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    flex: 1,
    paddingHorizontal: 30,
    paddingVertical: 50
  },
  loginTitle: {
    fontSize: 25,
    fontWeight: '800'
  },
  inputContainer: {
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
  },
  button: {
    backgroundColor: COLORS.blue,
    paddingVertical: 15,
    width: "100%",
    borderRadius: 10,
    marginTop: 20,
  },
  buttonText: {
    color: COLORS.white,
    textAlign: "center",
    fontWeight: "800",
    fontSize: 20,
  },
});

export default Login;
