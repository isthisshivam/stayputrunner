import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import assets from "../assets";
import { dW } from "../utils/dynamicHeightWidth";
import { useNavigation } from "@react-navigation/native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { ToolTipMenu } from "./ToolTip";

export default ({
  title,
  sub,
  subtitle,
  icon1,
  icon2,
  event,
  tooltipContent,
}) => {
  const { goBack } = useNavigation();
  return (
    <View style={styles.header}>
      <MaterialCommunityIcons
        name={icon1}
        color={assets.Colors.BLACK_COLOR}
        size={dW(30)}
        onPress={() => goBack()}
      />
      <View style={styles.location}>
        <Text style={styles.title}>{title}</Text>
        {sub == true ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
      </View>
      {/* <MaterialCommunityIcons
        name={icon2}
        color={assets.Colors.BLACK_COLOR}
        size={dW(25)}
        onPress={event}
      /> */}
      <ToolTipMenu
        marginBottom={subtitle ? dW(-5) : dW(0)}
        position={"bottom"}
        ToolTipContent={tooltipContent ? tooltipContent : ""}
      ></ToolTipMenu>
      {/* <View></View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    // alignItems: 'center',
    justifyContent: "space-between",
    paddingTop: Platform.OS === "ios" ? dW(50) : 20,
    padding: dW(20),
    backgroundColor: assets.Colors.BACKGROUND_THEME_COLOR,
    shadowColor: assets.Colors.SEARCH_SHADOW_COLOR,
    shadowOffset: {
      width: dW(0),
      height: dW(3),
    },
    shadowRadius: dW(5),
    shadowOpacity: dW(1.8),
    elevation: 5,
  },
  title: {
    alignSelf: "center",
    fontSize: dW(18),
    color: assets.Colors.ACCOUNT_TXT_COLOR,
    fontFamily: assets.fonts.ROBOTO_MEDIUM,
  },
  location: {
    flexdirection: "column",
    alignSelf: "center",
    marginRight: dW(14),
  },
  subtitle: {
    textAlign: "center",
    fontSize: dW(15),
    color: assets.Colors.PRICE_DETAILS_CLR,
    fontFamily: assets.fonts.ROBOTO_MEDIUM,
    marginTop: dW(5),
  },
});
