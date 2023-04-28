import { NavigationContainer } from "@react-navigation/native";

import { useContext } from "react";
import { AuthContext } from "../context/AuthContex";
import AuthStack from "./AuthStack";
import AppStack from "./AppStack";

const AppNav = () => {
  const { accessToken } = useContext(AuthContext);

  return (
    <NavigationContainer>
      {accessToken ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default AppNav;
