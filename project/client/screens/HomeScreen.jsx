import { View, Text, TouchableOpacity, StyleSheet} from 'react-native'
import React, {useContext} from 'react'

import { AuthContext } from '../context/AuthContex'

import { COLORS } from '../assets/dummy'

const HomeScreen = () => {

  const { logout } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Text>Home Page</Text>

      <TouchableOpacity style={styles.button} onPress={logout}>
        <Text style={styles.buttonText}>Wyloguj się</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    flex: 1,
    paddingHorizontal: 30,
    paddingVertical: 50,
    alignItems: "center",
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
})
    

export default HomeScreen