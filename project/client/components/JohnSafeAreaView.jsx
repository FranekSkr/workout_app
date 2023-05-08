import { View, Text } from "react-native";
import React from "react";

import { COLORS } from "../assets/dummy";

const JohnSafeAreaView = ({props}) => {
  return (
    <View
      style={{
        backgroundColor: COLORS.white,
        flex: 1,
        paddingHorizontal: 30,
        paddingVertical: 50,
        alignItems: "center",
      }}
    >
      {props}
    </View>
  );
};

export default JohnSafeAreaView;
