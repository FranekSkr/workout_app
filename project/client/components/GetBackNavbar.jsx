import { View, TouchableOpacity, StatusBar, Text } from "react-native";
import React from "react";

import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { COLORS } from "../assets/dummy";

const GetBackNavbar = ({ navigation, screenName, label }) => {
  return (
    <View
      style={{
        width: "100%",
        paddingTop: StatusBar.currentHeight + 15,
        paddingBottom: 15,
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
        borderBottomColor: COLORS.lightGrey,
        borderBottomWidth: 1,
        paddingHorizontal: 10,
        backgroundColor: COLORS.white,
      }}
    >
      <TouchableOpacity onPress={() => navigation.navigate(screenName)} style={{zIndex: 2}}>
        <ChevronLeftIcon size={30} color={COLORS.lightGrey}/>
      </TouchableOpacity>   
      {label && <Text style={{flex: 1, textAlign: "center", fontSize: 20, fontWeight: 500, marginLeft: -40}}>{label}</Text>}
    </View>
  );
};

export default GetBackNavbar;
