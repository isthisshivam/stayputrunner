import { StyleSheet } from "react-native";
import { dW } from "../../utils/dynamicHeightWidth";
import assets from "../../assets";

const useStyle = () => {
  return StyleSheet.create({
    scrollContainer: {
      // flex: 1,
      padding: dW(20),
    },

    title: {
      color: assets.Colors.ACCOUNT_TXT_COLOR,
      fontSize: dW(24),
      fontFamily: assets.fonts.ROBOTO_MEDIUM,
      textAlign: "center",
      marginTop: dW(25),
    },
    cardViewContainer: {
      backgroundColor: assets.Colors.BACKGROUND_THEME_COLOR,
      shadowColor: assets.Colors.SHADOW_COLOR,
      shadowOffset: { width: 1, height: 5 },
      shadowOpacity: 4,
      shadowRadius: 10,
      borderRadius: dW(6),
      elevation: 5,
      padding: dW(10),
      marginTop: dW(10),
      flexDirection: "column",
    },
    cardView: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    dropdown: {
      flexDirection: "column",
      alignItems: "flex-start",
      justifyContent: "space-between",
      // backgroundColor: assets.Colors.SHADOW_COLOR,
      backgroundColor: assets.Colors.WHITE,
      shadowColor: assets.Colors.SHADOW_COLOR,
      shadowOffset: { width: 1, height: 5 },
      shadowOpacity: dW(4),
      shadowRadius: dW(4),
      //borderRadius: dW(6),
      borderBottomLeftRadius: dW(6),
      borderBottomRightRadius: dW(6),
      elevation: dW(5),
      marginTop: dW(3),
    },
    dropDown_txt: {
      paddingVertical: dW(10),
      borderBottomWidth: dW(0.3),
      borderColor: assets.Colors.WHITE,
      width: "100%",
      borderRadius: dW(1),
    },
    tesla: {
      color: assets.Colors.ACCOUNT_TXT_COLOR,
      fontSize: dW(16),
      fontFamily: assets.fonts.ROBOTO_REGULAR,
      alignSelf: "flex-start",
      textAlign: "center",
      margin: dW(6),
    },
    options_text: {
      color: assets.Colors.ACCOUNT_TXT_COLOR,
      fontSize: dW(15),
      fontFamily: assets.fonts.ROBOTO_REGULAR,
      alignSelf: "flex-start",
      textAlign: "center",
      margin: dW(6),
      marginLeft: dW(17),
    },
    input_View: {
      borderWidth: dW(0.8),
      borderColor: assets.Colors.INPUT_BORDER_COLOR,
      borderRadius: dW(5),
      alignItems: "center",
      padding: dW(15),
      marginTop: dW(20),
    },
    placeholder: {
      width: "100%",
      fontSize: dW(16),
      fontFamily: assets.fonts.ROBOTO_REGULAR,
      color: assets.Colors.ACCOUNT_TXT_COLOR,
    },

    topSpacer: {
      marginTop: dW(15),
    },
    checked: {
      fontSize: dW(14),
      fontFamily: assets.fonts.ROBOTO_REGULAR,
      color: assets.Colors.BLACK_COLOR,
      marginLeft: dW(15),
    },
    bottom_row: {
      flexDirection: "row",
      alignItems: "center",
      marginTop: dW(3),
    },
    bottomtxt: {
      fontSize: dW(14),
      fontFamily: assets.fonts.ROBOTO_REGULAR,
      color: assets.Colors.BLACK_COLOR,
    },
    terms_condition: {
      fontSize: dW(14),
      fontFamily: assets.fonts.ROBOTO_REGULAR,
      color: assets.Colors.TERMS_CONDITION_COLOR,
      textAlign: "auto",
      textDecorationLine: "underline",
    },
    buttn: {
      marginTop: dW(30),
      marginRight: dW(15),
      marginLeft: dW(15),
    },
  });
};
export default useStyle;
