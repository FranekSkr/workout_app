import { View, Text, StyleSheet,  TouchableOpacity } from "react-native";
import React, {useState} from "react";
import { COLORS } from "../assets/dummy";
import GetBackNavbar from "../components/GetBackNavbar";
import Input from '../components/Input'

const NewExercise = ({ navigation }) => {
  const [exerciseName, setExerciseName] = useState("")
  const [repsCount, setRepsCount] = useState("") 
  const [weight, setWeight] = useState("")

  const jaja =() => {
    if(exerciseName && repsCount && weight)
    console.log(exerciseName)
    console.log(weight)
    console.log(repsCount)
  }

  return (
    <>
      <GetBackNavbar
        navigation={navigation}
        screenName="Strona Główna"
        label="Dodawanie Ćwiczeń"
      />
      <View style={styles.container}>
        <Text style={styles.title}>Dodaj Nowe Ćwiczenie 💪</Text>
        <Input 
          label="Nazwa Ćwiczenia"
          value={exerciseName}
          setValue={setExerciseName}
          checkIsValid={() => {
          return undefined;
        }}
        />
        <Input 
          label="Waga"
          value={weight}
          setValue={setWeight}
          checkIsValid={() => {
          return undefined;
        }}
        />
        <Input 
          label="Ilość powtórzeń"
          value={repsCount}
          setValue={setRepsCount}
          checkIsValid={() => {
          return undefined;
        }}
        />

        <TouchableOpacity style={styles.button} onPress={jaja}>
          <Text style={styles.buttonText}>Dodaj ćwiczenie</Text>
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
  },
  title: {
    fontWeight: 700,
    fontSize: 25,
    textAlign: 'center',
    marginBottom: 30
  },
  button: {
    backgroundColor: COLORS.blue,
    paddingVertical: 15,
    width: "100%",
    borderRadius: 10,
    marginVertical: 20,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
  },
  buttonText: {
    color: COLORS.white,
    textAlign: "center",
    fontWeight: "800",
    fontSize: 20,
  }
});

export default NewExercise;
