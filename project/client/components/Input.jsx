import { View, StyleSheet, TextInput, Text } from "react-native";
import React, { useEffect, useState } from "react";

import { COLORS } from "../assets/dummy";

import {
  UserIcon,
  LockClosedIcon,
  EnvelopeIcon,
  EyeSlashIcon,
  EyeIcon,
} from "react-native-heroicons/outline";

const Input = ({ label, type, value, setValue, checkIsValid }) => {
  const [hideText, setHideText] = useState(true);

  useEffect(() => {
    checkIsValid();
  }, [value, hideText])
  return (
    <>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 5,
          width: "100%",
          marginVertical: 15,
          paddingVertical: 7,
          borderBottomColor:
          value === "" ? COLORS.lightGrey : checkIsValid() === undefined ? COLORS.blue : checkIsValid() ? "green" : "red",
          borderBottomWidth: 1,
        }}
      >
        {type === "email" ? (
          <EnvelopeIcon size={20} color={COLORS.lightGrey} />
        ) : type === "password" ? (
          <LockClosedIcon size={20} color={COLORS.lightGrey} />
        ) : type === "username" ? (
          <UserIcon size={20} color={COLORS.lightGrey} />
        ) : null}
        <TextInput
          style={styles.input}
          placeholder={label}
          placeholderTextColor={COLORS.lightGrey}
          value={value}
          autoCapitalize="none"
          secureTextEntry={type === "password" && hideText}
          keyboardType={type === "email" ? "email-address" : "default"}
          onChangeText={(text) => {
            type === "username" ? setValue(text.toLowerCase().trim()) : setValue(text.trim());
          }}
        />
        {type === "password" ? (
          hideText ? (
            <EyeIcon
              size={20}
              color={COLORS.lightGrey}
              onPress={() => {setHideText(false); }}
            />
          ) : (
            <EyeSlashIcon
              color={COLORS.lightGrey}
              onPress={() => { setHideText(true);}}
              size={20}
            />
          )
        ) : null}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  input: {
    fontWeight: "bold",
    fontSize: 16,
    color: COLORS.darkGrey,
    flex: 1,
  },
});

export default Input;
