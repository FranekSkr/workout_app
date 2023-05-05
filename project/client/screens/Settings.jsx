import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, {useContext} from "react";
import GetBackNavbar from "../components/GetBackNavbar";

import { AuthContext } from '../context/AuthContex'

import { ArrowLeftOnRectangleIcon } from "react-native-heroicons/outline";
import { COLORS } from "../assets/dummy";
import useAxios from "../hooks/useAxios";
import { version } from "../package.json";


const Settings = ({ navigation }) => {

  const { logout } = useContext(AuthContext);

  const api = useAxios()

  const Logout = async() => {
    const response = await api.post("/logout/")
    if(response.status === 205  || response.status === 200) {
      logout()
    }
  }
  
  return (
    <>
    <GetBackNavbar navigation={navigation} screenName="Strona Główna" label="Ustawienia"/>
    <View style={styles.container}>
      

      <TouchableOpacity style={styles.button} onPress={Logout}>
        <ArrowLeftOnRectangleIcon color={COLORS.white} size={30}/>
        <Text style={styles.buttonText}>Wyloguj się</Text>
      </TouchableOpacity>

      <Text style={styles.version}>v. {version}</Text>
    </View>
    </>
    
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
  button: {
    backgroundColor: COLORS.blue,
    paddingVertical: 15,
    width: "100%",
    borderRadius: 10,
    marginVertical: 20,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10
  },
  buttonText: {
    color: COLORS.white,
    textAlign: "center",
    fontWeight: "800",
    fontSize: 20,
  },
  version: {
    fontSize: 14,
    position: 'absolute',
    right: 15,
    bottom: 10,
    color: COLORS.lightGrey
  }
});

export default Settings;
