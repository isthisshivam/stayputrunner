import { StyleSheet } from "react-native";
import { dW } from "../../utils/dynamicHeightWidth";
import assets from "../../assets";

const useStyle = () => {
  return StyleSheet.create({
    scrollContainer: {
      flex: 1,
      padding: dW(20),
    },

    runner: {
      color: assets.Colors.ACCOUNT_TXT_COLOR,
      fontSize: dW(24),
      fontFamily: assets.fonts.ROBOTO_MEDIUM,
      textAlign: "center",
      marginTop: dW(50),
    },
    Image: {
      marginTop: dW(20),
      alignSelf: "center",
      height: dW(150),
      width: "100%",
      resizeMode: "contain",
    },
    smallTxt: {
      color: assets.Colors.INPUT_TITLE_COLOR,
      fontSize: dW(15),
      fontFamily: assets.fonts.ROBOTO_REGULAR,
      textAlign: "left",
      // marginTop: dW(30),
    },
    toggle_switch: {
      justifyContent: "center",
      alignItems: "center",
      marginTop: dW(30),
    },
    label: {
      color: assets.Colors.INPUT_TITLE_COLOR,
      fontSize: dW(17),
      fontFamily: assets.fonts.ROBOTO_REGULAR,
      textAlign: "center",
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
      backgroundColor: assets.Colors.BACKGROUND_THEME_COLOR,
      shadowColor: assets.Colors.SHADOW_COLOR,
      shadowOffset: { width: 1, height: 5 },
      shadowOpacity: dW(4),
      shadowRadius: dW(10),
      borderRadius: dW(6),
      elevation: dW(5),
      marginTop: dW(10),
      marginBottom: "30%",
    },
    dropDown_txt: {
      paddingVertical: dW(5),
      borderBottomWidth: dW(0.7),
      borderColor: assets.Colors.INPUT_BORDER_COLOR,
      justifyContent: "center",
    },
    select_size: {
      color: assets.Colors.ACCOUNT_TXT_COLOR,
      fontSize: dW(16),
      fontFamily: assets.fonts.ROBOTO_REGULAR,
      alignSelf: "flex-start",
      textAlign: "center",
      margin: dW(6),
    },
    options_text: {
      color: assets.Colors.ACCOUNT_TXT_COLOR,
      fontSize: dW(16),
      fontFamily: assets.fonts.ROBOTO_REGULAR,
      alignSelf: "flex-start",
      textAlign: "center",
      margin: dW(6),
      marginLeft: dW(17),
    },
    optionsList: {
      flex: 1,
      width: "100%",
    },
    buttn: {
      marginLeft: dW(35),
      marginRight: dW(35),
    },
  });
};
export default useStyle;
