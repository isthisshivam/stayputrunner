import React from "react";
import { View, Text, StyleSheet, Platform, Pressable } from "react-native";
import assets from "../assets";
import { dH, dW } from "../utils/dynamicHeightWidth";
import { useNavigation } from "@react-navigation/native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import dashboard_stack from "../root/dash-navigator";

export default ({
  bg,
  shadow,
  txt,
  icon,
  title,
  icon1,
  icon2,
  event,
  event2,
}) => {
  const { goBack, navigate } = useNavigation();
  return (
    <View
      style={[
        shadow == false ? styles.top_Content : styles.shadow_Content,
        { backgroundColor: bg },
      ]}
    >
      <View style={styles.header}>
        <Pressable onPress={event}>
          <MaterialCommunityIcons
            name={icon1}
            color={icon}
            size={dW(30)}
            style={{ alignSelf: "center" }}
          />
        </Pressable>
        <Text
          numberOfLines={1}
          style={[styles.dashboard, { color: txt, width: "60%" }]}
        >
          {title}
        </Text>
        {/* <Pressable
          onPress={() =>
            icon2 != "help-circle-outline"
              ? navigate("Chatting")
              : event2 && event2()
          }
          style={styles.icon_style}
        >
          <MaterialCommunityIcons
            name={icon2}
            color={icon}
            size={dW(25)}
            style={{ alignSelf: "center" }}
          />
        </Pressable> */}
        <View style={styles.icon_style}></View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  top_Content: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: Platform.OS === "ios" ? dW(40) : dH(0),
    padding: Platform.OS === "android" ? dW(0) : dW(20),
    paddingHorizontal: dW(20),
  },
  shadow_Content: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: dW(40),
    padding: dW(20),

    ...Platform.select({
      ios: {
        shadowColor: assets.Colors.INACTIVE_STORE_BG_COLOR,
        shadowOffset: {
          width: dW(0),
          height: dW(8),
        },
        shadowRadius: dW(5),
        shadowOpacity: dW(1.8),
      },
      android: {
        elevation: 5,
      },
      default: {
        // other platforms, web for example
      },
    }),
  },
  dashboard: {
    fontSize: dW(21),
    fontFamily: assets.fonts.ROBOTO_MEDIUM,
    textAlign: "center",
  },
  header: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: Platform.OS === "android" ? dW(0) : dW(15),
    height: Platform.OS === "android" ? 65 : 55,
  },
  icon_style: {
    width: dW(30),
    height: dW(30),
    alignItems: "center",
  },
});
