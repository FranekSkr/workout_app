import { View, Text, StyleSheet } from "react-native";
import React, { useState } from "react";
import GetBackNavbar from "../components/GetBackNavbar";
import { generateDate, months, days } from "../utils/calendar";
import { COLORS } from "../assets/dummy";
import dayjs from "dayjs";
import { ChevronLeftIcon, ChevronRightIcon } from "react-native-heroicons/outline";

const Calendar = ({ navigation }) => {

  const currentDay = dayjs()
  const [today, setToday] = useState(currentDay)  
  const [selectedDate, setSelectedDate] = useState(currentDay)  
  return (
    <>
      <GetBackNavbar
        navigation={navigation}
        screenName="Strona Główna"
        label="Kalendarz Ćwiczeń"
      />
      <View style={styles.container}>
        <View style={styles.calendarContainer}>
          <View style={{
            width: "100%",
            height: "12.5%",
            alignItems: "center",
            justifyContent: "space-between",
            flexDirection: 'row',
            paddingHorizontal: 20
          }}>
            <Text style={{fontWeight: 700, fontSize: 18}}>{months[today.month()]}, {today.year()}</Text>
            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 10
            }}>
              <ChevronLeftIcon size={25} color="black" onPress={() => setToday(today.month(today.month() - 1))}/>
              <Text style={{fontSize: 16, fontWeight: 600}} onPress={() => setToday(currentDay)}>Today</Text>
              <ChevronRightIcon size={25} color="black" onPress={() => setToday(today.month(today.month() + 1))}/>
            </View>
          </View>

          {days.map((day, index) => (
            <View
              key={index}
              style={{
                width: "14.28%",
                height: "12.5%",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text style={{ fontWeight: 700, fontSize: 16 }}>{day}</Text>
            </View>
          ))}
          {generateDate(today.month(), today.year()).map(({ date, currentMonth, today }, index) => (
            <View
              key={index}
              style={{
                borderTopColor: COLORS.lightGrey,
                borderTopWidth: 1,
                width: "14.28%",
                height: "12.5%",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <View
                style={{
                  width: '85%',
                  height: '85%',
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: today ? COLORS.blue : selectedDate.toDate().toDateString() === date.toDate().toDateString() ? "black" : "transparent",
                  borderRadius: 1000,
                }}
              >
                <Text
                  style={{
                    color: today || selectedDate.toDate().toDateString() === date.toDate().toDateString() ? COLORS.white : currentMonth ? "#000" : COLORS.lightGrey,
                    fontWeight: today ? 800 : 500,
                  }}
                  onPress={() => setSelectedDate(date)}
                >
                  {date.date()}
                </Text>
              </View>
            </View>
          ))}
        </View>
        <View style={{marginTop: 20}}>
          <Text style={{fontSize: 17, fontWeight: 600, textTransform: 'capitalize'}} >Wybrane na: {selectedDate.toDate().toLocaleDateString("pl-PL", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</Text>
          <Text></Text>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    flex: 1,
    alignItems: "center",
    backgroundColor: COLORS.white,
  },
  calendarContainer: {
    width: "90%",
    aspectRatio: '7 / 8',
    backgroundColor: COLORS.lightBlue,
    flexDirection: "row",
    flexWrap: "wrap",
    padding: 10,
  },
});

export default Calendar;
