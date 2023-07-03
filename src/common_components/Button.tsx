import React from "react";
import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import assets from "../assets";
import { dW } from "../utils/dynamicHeightWidth";
import SVG_View from "./SVG_View";

export default ({ bgcolor, title, event, img, image, style, imgBG, txt }) => {
  return (
    <View style={[{ backgroundColor: bgcolor, borderRadius: dW(5) }, style]}>
      {image == true ? (
        <Pressable onPress={event} style={styles.mainContainer}>
          <View style={[styles.icon_Bg, { backgroundColor: imgBG }]}>
            <Image source={img} style={styles.bttn_icon} />
          </View>
          <Text style={[styles.bttn_txt]}>{title}</Text>
        </Pressable>
      ) : (
        <Pressable onPress={event} style={styles.mainContainer}>
          <Text style={[styles.bttn_txt, { color: txt }]}>{title}</Text>
        </Pressable>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    width: "100%",
    // backgroundColor: assets.Colors.BUTTON_THEME_COLOR,
    // padding: dW(20),
    // marginTop: dW(25),
    borderRadius: dW(7),
  },
  bttn_txt: {
    fontSize: dW(17),
    fontFamily: assets.fonts.ROBOTO_BOLD,
    alignSelf: "center",
    paddingVertical: dW(15),
  },
  button: {
    fontSize: dW(19),
    color: assets.Colors.WHITE,
    fontFamily: assets.fonts.ROBOTO_MEDIUM,
    textAlign: "center",
  },
});
