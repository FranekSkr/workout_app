import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, TextInput } from 'react-native'
import React from 'react'

import {COLORS } from '../assets/dummy'
import { Colors } from 'react-native/Libraries/NewAppScreen'

const Login = () => {
  return (
    <SafeAreaView style={styles.container}>
       <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor={COLORS.white}
      />
       <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor={COLORS.white}
      />

      <TouchableOpacity >
        <Text>Submit</Text>
      </TouchableOpacity>
       
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.lightGrey,
    flex: 1,  
    alignItems: 'center',
    justifyContent: 'center'
  },
  input: {
    backgroundColor: COLORS.blue,
    borderRadius: 10,
    width: '70%',
    marginVertical: 20,
    paddingVertical: 10,
    paddingHorizontal: 15,
    fontWeight: 'bold',
    fontSize: 15,
    color: COLORS.white
  },
  button: {
    backgroundColor: COLORS.darkBlue,
    paddingVertical: 10,
    paddingHorizontal: 15,
  }
})

export default Login