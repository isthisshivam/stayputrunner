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
  orderId,
  customerId,
  customerFCMTkn,
  ToolTipContent,
}) => {
  const { goBack, navigate } = useNavigation();
  const [tip, showTip] = useState(false);
  const sendMessageTo = () => {
    navigate(assets.NavigationConstants.CHATTING.NAME, {
      orderId: orderId,
      runnerId: global.RUNNER_ID,
      customerId: customerId,
      fcmTkn: customerFCMTkn,
    });
  };
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

        {icon2 == "help-circle-outline" ? (
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
            placement="bottom"
            topAdjustment={Platform.OS === "android" ? dH(0) : dH(0)}
          >
            <Pressable onPress={() => showTip(true)} style={styles.icon_style}>
              <MaterialCommunityIcons
                name={icon2}
                color={icon}
                size={dW(25)}
                style={{ alignSelf: "center" }}
              />
            </Pressable>
          </Tooltip>
        ) : (
          <Pressable
            onPress={() =>
              icon2 != "help-circle-outline"
                ? sendMessageTo()
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
          </Pressable>
        )}
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
    paddingTop: Platform.OS === "ios" ? dW(40) : 0,
    padding: dW(20),
  },
  shadow_Content: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: Platform.OS === "ios" ? dW(40) : 0,
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
    marginTop: dW(15),
    height: Platform.OS === "ios" ? 55 : 45,
  },
  icon_style: {
    width: dW(30),
    height: dW(30),
    alignItems: "center",
  },
});
