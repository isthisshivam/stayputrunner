import { StyleSheet } from "react-native";
import { dW } from "../../utils/dynamicHeightWidth";
import assets from "../../assets";

const useStyle = () => {
  return StyleSheet.create({
    scrollContainer: {
      flex: 1,
      padding: dW(35),
    },

    runner: {
      color: assets.Colors.ACCOUNT_TXT_COLOR,
      fontSize: dW(24),
      fontFamily: assets.fonts.ROBOTO_MEDIUM,
      textAlign: "center",
      marginTop: dW(50),
    },
    top: {
      marginTop: dW(30),
    },
    qualification_contents: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginTop: dW(12),
      marginLeft: dW(10),
    },
    smallTxt: {
      color: assets.Colors.INPUT_TITLE_COLOR,
      fontSize: dW(17),
      fontFamily: assets.fonts.ROBOTO_REGULAR,
      textAlign: "center",
      marginLeft: dW(15),
    },

    max_margin: {
      marginRight: dW(40),
      marginLeft: dW(40),
    },
    buttn: {
      marginTop: dW(15),
    },
    centeredView: {
      flex: 1,
      backgroundColor: assets.Colors.MODAL_BACKGROUND_COLOR,
    },
    modalView: {
      flex: 1,
      marginTop: dW(50),
      padding: dW(20),
      backgroundColor: assets.Colors.BACKGROUND_THEME_COLOR,
      borderTopLeftRadius: dW(15),
      borderTopRightRadius: dW(15),
    },
    instant_Cash: {
      color: assets.Colors.ACCOUNT_TXT_COLOR,
      fontSize: dW(20),
      fontFamily: assets.fonts.ROBOTO_MEDIUM,
      textAlign: "center",
    },
    price: {
      color: assets.Colors.ACCOUNT_TXT_COLOR,
      fontSize: dW(30),
      fontFamily: assets.fonts.ROBOTO_BOLD,
      textAlign: "center",
    },
    row_center: {
      flexDirection: "row",
      alignContent: "center",
      justifyContent: "center",
    },
    top: {
      marginTop: dW(30),
    },
    row_space: {
      flexDirection: "row",
      alignContent: "center",
      justifyContent: "space-between",
      borderBottomWidth: dW(1),
      paddingVertical: dW(10),
      borderColor: assets.Colors.INACTIVE_STORE_BG_COLOR,
    },
    rowTxt: {
      color: assets.Colors.ACCOUNT_TXT_COLOR,
      fontSize: dW(14),
      textAlign: "center",
    },
    transfer: {
      marginTop: dW(40),
      marginLeft: dW(20),
      marginRight: dW(20),
    },
    center: {
      marginTop: dW(40),
      alignSelf: "center",
      justifyContent: "center",
      // borderWidth: dW(3),
      // borderColor: assets.Colors.BUTTON_THEME_COLOR,
      // borderRadius: dW(55),
      height: dW(110),
      width: dW(110),
    },
    will_recieve: {
      color: assets.Colors.PRICE_DETAILS_CLR,
      fontSize: dW(17),
      fontFamily: assets.fonts.ROBOTO_REGULAR,
      textAlign: "center",
      marginTop: dW(10),
      lineHeight: 25,
    },
  });
};
export default useStyle;
