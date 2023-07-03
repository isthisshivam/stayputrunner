import React from "react";
import { View, Text, StyleSheet, TextInput, Pressable } from "react-native";
import assets from "../assets";
import { dW } from "../utils/dynamicHeightWidth";
import { useNavigation } from "@react-navigation/native";

export default ({
  event,
  placeholdertxt,
  title,
  subtitle,
  style,
  edit,
  keyboard_type,
  secureEntry,
  editable,
}) => {
  return (
    <View style={[styles.input_view, style]}>
      <Text style={styles.input_title}>{title}</Text>
      <TextInput
        placeholder={subtitle}
        value={edit}
        placeholderTextColor={placeholdertxt}
        onChangeText={event}
        keyboardType={keyboard_type || "default"}
        secureTextEntry={secureEntry ? secureEntry : false}
        style={styles.placeholder}
        editable={editable && editable}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  input_view: {
    flexDirection: "column",
    marginTop: dW(10),
    justifyContent: "center",
    borderColor: assets.Colors.INPUT_BORDER_COLOR,
    width: "100%",
  },
  input_title: {
    fontSize: dW(14),
    fontFamily: assets.fonts.ROBOTO_REGULAR,
    color: assets.Colors.INPUT_TITLE_COLOR,
  },
  placeholder: {
    width: "100%",
    marginTop: dW(5),
    paddingVertical: dW(8),
    color: assets.Colors.BLACK_COLOR,
    borderColor: assets.Colors.INPUT_BORDER_COLOR,
    borderBottomWidth: dW(0.5),
    fontSize: dW(15),
    fontFamily: assets.fonts.ROBOTO_REGULAR,
  },
});
