import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, {useContext} from "react";
import GetBackNavbar from "../components/GetBackNavbar";

import { AuthContext } from '../context/AuthContex'

import { ArrowLeftOnRectangleIcon } from "react-native-heroicons/outline";
import { COLORS } from "../assets/dummy";


const Settings = ({ navigation }) => {

  const { logout } = useContext(AuthContext);
  
  return (
    <>
    <GetBackNavbar navigation={navigation} screenName="Home" label="Ustawienia"/>
    <View style={styles.container}>
      

      <TouchableOpacity style={styles.button} onPress={logout}>
        <ArrowLeftOnRectangleIcon color={COLORS.white} size={30}/>
        <Text style={styles.buttonText}>Wyloguj się</Text>
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
});

export default Settings;
