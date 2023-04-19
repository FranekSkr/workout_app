import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { TextInput } from "react-native-paper";

import { COLORS } from "../assets/dummy";

const Login = () => {
  const [usernameValue, setUsernameValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");

  handleOnPress = () => {
    alert(usernameValue);
  };

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        style={styles.input}
        mode="underlined"
        label="Username"
        placeholder="Type a username"
        value={usernameValue}
        onChangeText={(usernameValue) => setUsernameValue(usernameValue)}
      />

      {/* <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor={COLORS.white}
        onChangeText={(text) => setPasswordValue(text)}
      /> */}

      <TouchableOpacity style={styles.button} onPress={handleOnPress}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.lightGrey,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    backgroundColor: COLORS.blue,
    width: "70%",
    marginVertical: 15,
    paddingVertical: 10,
    paddingHorizontal: 15,
    fontWeight: "bold",
    fontSize: 17,
    color: COLORS.white,
  },
  button: {
    backgroundColor: COLORS.darkBlue,
    paddingVertical: 20,
    width: "40%",
    borderRadius: 20,
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
