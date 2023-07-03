import React from "react";
import { View, Text, StyleSheet, Pressable, Image } from "react-native";
import assets from "../assets";
import { dW } from "../utils/dynamicHeightWidth";
import { useNavigation } from "@react-navigation/native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const BackButton = ({ onBackPress }) => {
  return (
    <View
      style={{
        height: 55,
        paddingHorizontal: 10,
        justifyContent: "center",
        backgroundColor: "transparent",
      }}
    >
      <Pressable
        onPress={() => onBackPress()}
        style={{ height: 40, width: 40, justifyContent: "center" }}
      >
        <Image
          style={{ height: 35, width: 35, resizeMode: "contain" }}
          source={assets.Images.BACK}
        ></Image>
      </Pressable>
    </View>
  );
};
export default BackButton;
