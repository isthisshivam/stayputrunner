import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  FlatList,
} from "react-native";
import assets from "../../../assets";
import { data, columnData } from "../../../assets/Constants/Constants";
import { dW, windowWidth } from "../../../utils/dynamicHeightWidth";
import { useNavigation } from "@react-navigation/native";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from "react-native-simple-radio-button";

export default () => {
  const navigation = useNavigation();

  const { navigate, goBack } = useNavigation();

  const [daySelected, setDaySelected] = useState(0);
  const [timeSelected, setTimeSelected] = useState(0);

  const dayItem = (item) => (
    <Pressable
      style={[
        styles.listCardView,
        item.id === daySelected && {
          backgroundColor: assets.Colors.THEME_COLOR_PRIMARY,
        },
      ]}
      onPress={() => setDaySelected(item.id)}
    >
      <Text
        style={[
          styles.daysname,
          item.id === daySelected && {
            color: assets.Colors.BACKGROUND_THEME_COLOR,
          },
        ]}
      >
        {item.day}
      </Text>
      <Text
        style={[
          styles.numberText,
          item.id === daySelected && {
            color: assets.Colors.BACKGROUND_THEME_COLOR,
          },
        ]}
      >
        {item.date}
      </Text>
    </Pressable>
  );

  const timeItem = (item) => (
    <Pressable
      style={[styles.listColumnView]}
      onPress={() => setTimeSelected(item.id)}
    >
      <View style={styles.timeschedule}>
        <RadioButton labelHorizontal={true}>
          <RadioButtonInput
            obj={{ label: "param1", value: 0 }}
            isSelected={item.id === timeSelected}
            onPress={() => setTimeSelected(item.id)}
            borderWidth={1}
            buttonInnerColor={"#e74c3c"}
            buttonOuterColor={"black"}
            buttonSize={17}
            buttonOuterSize={22}
            buttonStyle={{}}
            buttonWrapStyle={{ marginLeft: 10 }}
          />
        </RadioButton>
        <Text style={styles.time}>{item.time}</Text>
      </View>
      <Text style={styles.price}>{item.price}</Text>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerView}>
        <EvilIcons
          name="chevron-left"
          color={assets.Colors.ACCOUNT_TXT_COLOR}
          size={45}
          onPress={goBack}
        />
        <Text style={styles.headerText}>Schedule</Text>
        <View></View>
      </View>

      <View style={styles.flatlistRowView}>
        <FlatList
          data={data}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => dayItem(item)}
        />
      </View>
      <View style={styles.flatlistColumnView}>
        <FlatList
          data={columnData}
          showsverticalScrollIndicator={false}
          renderItem={({ item }) => timeItem(item)}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    // justifyContent: 'center',
    width: windowWidth(),
    marginTop: dW(20),
    padding: dW(15),
  },
  headerView: {
    width: "100%",
    //padding:dW(10),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    //  marginTop: dW(50)
  },
  headerText: {
    fontSize: dW(25),
    fontFamily: assets.fonts.ROBOTO_MEDIUM,
    color: assets.Colors.ACCOUNT_TXT_COLOR,
  },
  flatlistRowView: {
    width: "100%",
    flexDirection: "row",
    marginTop: dW(30),
  },
  listCardView: {
    marginHorizontal: dW(5),
    backgroundColor: assets.Colors.SECONDRY_CARDS_BG_COLOR,
    padding: dW(18),
    borderRadius: dW(5),
    position: "relative",
    alignItems: "center",
  },
  daysname: {
    fontSize: dW(17),
    fontFamily: assets.fonts.ROBOTO_MEDIUM,
    color: assets.Colors.THEME_COLOR_PRIMARY,
  },
  numberText: {
    fontSize: dW(15),
    fontFamily: assets.fonts.ROBOTO_REGULAR,
    marginTop: dW(5),
    textAlign: "center",
    color: assets.Colors.THEME_COLOR_PRIMARY,
  },
  flatlistColumnView: {
    flexDirection: "column",
    marginTop: dW(20),
    width: "100%",
    height: "100%",
  },
  listColumnView: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    //marginTop:dW(15),
    padding: dW(10),
    alignItems: "center",
  },
  timeschedule: {
    flexDirection: "row",
  },
  time: {
    marginLeft: dW(10),
    fontSize: dW(17),
    fontFamily: assets.fonts.ROBOTO_REGULAR,
    color: assets.Colors.ACCOUNT_TXT_COLOR,
  },
  price: {
    fontSize: dW(17),
    color: assets.Colors.BUTTON_THEME_COLOR,
    fontFamily: assets.fonts.ROBOTO_REGULAR,
  },
});
