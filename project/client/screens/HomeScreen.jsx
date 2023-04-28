import { View, Text, TouchableOpacity, StyleSheet} from 'react-native'
import React from 'react'

import { COLORS } from '../assets/dummy'

import { Cog6ToothIcon } from "react-native-heroicons/outline";

const HomeScreen = ({ navigation }) => {
  
  const name = "John"

  return (
    <View style={styles.container}>
      <View style={styles.navbar}>
        <Text style={styles.navbarText}>Hello, {name} 💪</Text>
        <TouchableOpacity onPress={() =>{ navigation.navigate("Settings")}}>
        <Cog6ToothIcon size={30} color={COLORS.lightGrey}/>
        </TouchableOpacity>
      </View>

      
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
  navbar: {
    width: '100%',
    height: 70,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  navbarText: {
    fontSize: 25,
    fontWeight: "700",
  },
})
    

export default HomeScreen