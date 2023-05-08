
import { createDrawerNavigator } from "@react-navigation/drawer";

import HomeScreen from "../screens/HomeScreen";
import Settings from "../screens/Settings";
import NewExercise from "../screens/NewExercise";
import Calendar from "../screens/Calendar";

const Drawer = createDrawerNavigator()


const AppStack = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Strona Główna"
      screenOptions={{ headerShown: false }}
    >
      <Drawer.Screen name="Strona Główna" component={HomeScreen} />
      <Drawer.Screen name="Ustawienia" component={Settings} />
      <Drawer.Screen name="Dodaj Ćwiczenie" component={NewExercise} />
      <Drawer.Screen name="Kalendarz Ćwiczeń" component={Calendar} />
    </Drawer.Navigator>
  );
};

export default AppStack;
