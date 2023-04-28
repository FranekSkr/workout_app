import { NavigationContainer } from "@react-navigation/native";
import { View, ActivityIndicator } from 'react-native'

import { useContext } from "react";
import { AuthContext } from "../context/AuthContex";
import AuthStack from './AuthStack'
import AppStack from './AppStack'

const AppNav = () => {

    const {isLoading, userToken } = useContext(AuthContext)

    if(isLoading) (
        <View style={{flex: 1, justifyContent: 'center', alignItems:'center'}}>
            <ActivityIndicator size={"large"} />
        </View>
    )

  return (
    <NavigationContainer>
        { userToken ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  )
}

export default AppNav