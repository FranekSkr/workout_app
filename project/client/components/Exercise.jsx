import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { useSwipe } from "../hooks/useSwipe";
import { COLORS } from "../assets/dummy";
import { TrashIcon, PencilSquareIcon } from "react-native-heroicons/outline";

const Exercise = ({ training }) => {
  const [showSideOptions, setShowSideOptions] = useState(false);
  const { onTouchStart, onTouchEnd } = useSwipe(onSwipeLeft, onSwipeRight, 2);

  function onSwipeLeft() {
    setShowSideOptions(true);
  }

  function onSwipeRight() {
    setShowSideOptions(false);
  }

  return (
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
  );
};

const styles = StyleSheet.create({
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

export default Exercise;
