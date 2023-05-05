
import { createDrawerNavigator } from "@react-navigation/drawer";

import HomeScreen from "../screens/HomeScreen";
import Settings from "../screens/Settings";

const Drawer = createDrawerNavigator()


const AppStack = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Strona Główna"
      screenOptions={{ headerShown: false }}
    >
      <Drawer.Screen name="Strona Główna" component={HomeScreen} />
      <Drawer.Screen name="Ustawienia" component={Settings} />
    </Drawer.Navigator>
  );
};

export default AppStack;
