import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContex";

import { COLORS } from "../assets/dummy";
import {
  Cog6ToothIcon,
  PlusIcon,
  ArrowPathIcon,
  TrashIcon,
  PencilSquareIcon,
} from "react-native-heroicons/outline";

import { useSwipe } from "../hooks/useSwipe";

const HomeScreen = ({ navigation }) => {
  const { user } = useContext(AuthContext);
  const training = {
    name: "Bench Press",
    weight: 50,
    reps: 10,
  };
  const [showSideOptions, setShowSideOptions] = useState(false);
  const [showExercisePopup, setShowExercisePopup] = useState(false)
  const { onTouchStart, onTouchEnd } = useSwipe(onSwipeLeft, onSwipeRight, 2);

  function onSwipeLeft() {
    setShowSideOptions(false);
  }

  function onSwipeRight() {
    setShowSideOptions(true);
  }

  return (
    <View style={styles.container}>
      <View style={styles.navbar}>
        <Text style={styles.navbarText}>Witaj, {user?.username} 💪</Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Ustawienia");
          }}
        >
          <Cog6ToothIcon size={30} color={COLORS.lightGrey} />
        </TouchableOpacity>
      </View>
      <View style={styles.main}>
        <View style={styles.todayTrainingContainer}>
          <Text style={styles.todayTraining}>Dzisiejszy Trening</Text>
          <TouchableOpacity style={styles.plusContainer} onPress={() => {
            navigation.navigate("Dodaj Ćwiczenie");
          }}>
            <PlusIcon size={35} color={COLORS.white} />
          </TouchableOpacity>
        </View>
        <View style={styles.gridContainer}>
          <View style={{ flexDirection: "row" }}>
            <Text style={{ flex: 2, textAlign: "center", fontWeight: 500 }}>
              Nazwa
            </Text>
            <Text style={{ flex: 1.5, textAlign: "center", fontWeight: 500 }}>
              Waga (kg)
            </Text>
            <Text style={{ flex: 1.75, textAlign: "center", fontWeight: 500 }}>
              Powtórzenia
            </Text>
          </View>

          <ScrollView onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
            <View style={styles.gridItem}>
              <Text style={styles.flexTwo}>{training.name}</Text>
              {!showSideOptions ? (
                <>
                  <Text style={styles.flexOne}>{training.weight}</Text>
                  <Text style={styles.flexThree}>{training.reps}</Text>
                </>
              ) : (
                <>
                  <TouchableOpacity style={{ flex: 1.5 }}>
                    <PencilSquareIcon
                      color="blue"
                      size={25}
                      style={{ alignSelf: "center" }}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity style={{ flex: 1.75 }}>
                    <TrashIcon
                      color="red"
                      size={25}
                      style={{ alignSelf: "center" }}
                    />
                  </TouchableOpacity>
                </>
              )}
            </View>
          </ScrollView>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    flex: 1,
    paddingHorizontal: 30,
    paddingVertical: 50,
  },
  navbar: {
    width: "100%",
    height: 70,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  navbarText: {
    fontSize: 28,
    fontWeight: 800,
  },
  main: {
    marginTop: 20,
  },
  todayTrainingContainer: {
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
  todayTraining: {
    fontSize: 25,
    fontWeight: 600,
  },
  plusContainer: {
    backgroundColor: "#4CBB17",
    borderRadius: 100,
    padding: 5,
  },
  gridContainer: {
    marginTop: 35,
    gap: 17,
  },
  gridItem: {
    flexDirection: "row",
    backgroundColor: COLORS.lightBlue,
    paddingHorizontal: 10,
    paddingVertical: 20,
    borderRadius: 10,
  },
  flexTwo: {
    flex: 2,
    textAlign: "center",
    fontSize: 18,
  },
  flexOne: {
    flex: 1.5,
    textAlign: "center",
    fontSize: 18,
  },
  flexThree: {
    flex: 1.75,
    textAlign: "center",
    fontSize: 18,
  },
});

export default HomeScreen;
