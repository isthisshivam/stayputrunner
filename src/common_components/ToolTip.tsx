import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Platform,
  Pressable,
  ScrollView,
} from "react-native";
import assets from "../assets";
import { dH, dW } from "../utils/dynamicHeightWidth";
import Tooltip from "react-native-walkthrough-tooltip";
import { useNavigation } from "@react-navigation/native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

export const ToolTipMenu = ({ ToolTipContent, position, marginBottom }) => {
  const [tip, showTip] = useState(false);
  return (
    <Tooltip
      isVisible={tip}
      contentStyle={{ backgroundColor: "white" }}
      content={
        <View
          style={{
            padding: 15,
            backgroundColor: "white",
            width: dW(210),
          }}
        >
          <ScrollView>
            <Text
              style={{
                color: assets.Colors.INPUT_TITLE_COLOR,
                fontSize: dW(14),
                fontFamily: assets.fonts.ROBOTO_MEDIUM,
                textAlign: "left",
                lineHeight: 20,
              }}
            >
              {ToolTipContent}
            </Text>
          </ScrollView>
        </View>
      }
      onClose={() => showTip(false)}
      placement={position ? position : "left"}
      topAdjustment={
        Platform.OS === "android"
          ? dH(0)
          : marginBottom
          ? dH(marginBottom)
          : dH(0)
      }
    >
      <Pressable onPress={() => showTip(true)} style={styles.icon_style}>
        <MaterialCommunityIcons
          name={"help-circle-outline"}
          color={"#0E1423"}
          size={dW(25)}
          style={{ alignSelf: "center" }}
        />
      </Pressable>
    </Tooltip>
  );
};

const styles = StyleSheet.create({
  top_Content: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: dW(40),
    padding: dW(20),
  },
  shadow_Content: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // paddingTop: dW(40),
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
    // marginTop: dW(15),
    height: 55,
  },
  icon_style: {
    width: dW(30),
    height: dW(30),
    alignItems: "center",
  },
});
