import { StyleSheet } from "react-native";
import { dH, dW } from "../../utils/dynamicHeightWidth";
import assets from "../../assets";

const useStyle = () => {
  return StyleSheet.create({
    space: {
      paddingHorizontal: dW(30),
    },
    netPrice: {
      flex: 0.4,
      fontSize: dW(17),
      //marginTop: 7,

      color: assets.Colors.TEXT_COLOR,
      fontFamily: assets.fonts.ROBOTO_REGULAR,
    },
    order: {
      fontSize: dW(16),
      fontFamily: assets.fonts.ROBOTO_REGULAR,
      color: assets.Colors.TEXT_COLOR,
      flex: 0.6,
    },
    ShoppingView: {
      width: "100%",
      //backgroundColor:'blue',
      flexDirection: "column",
      alignItems: "center",
      marginTop: dW(7),
      paddingHorizontal: dW(20),
      paddingVertical: 30,
    },
    item: {
      fontSize: dW(16),
      color: assets.Colors.BLACK_COLOR,
      marginLeft: dW(8),
    },
    shopping: {
      width: "100%",
      flexDirection: "row",
      alignItems: "center",
    },
    ViewOrder: {
      width: "100%",
      flexDirection: "row",
      marginTop: dW(15),
      justifyContent: "space-around",
    },
    boldTxt: {
      color: assets.Colors.ACCOUNT_TXT_COLOR,
      fontSize: dW(17),
      fontFamily: assets.fonts.ROBOTO_MEDIUM,
      marginTop: dW(10),
    },
    row_containor: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginTop: dW(10),
      backgroundColor: assets.Colors.BACKGROUND_THEME_COLOR,
    },
    column: {
      flexDirection: "column",
      justifyContent: "space-between",
      alignItems: "center",
    },
    mapview: {
      width: "90%",
      // backgroundColor: "red",
      height: dH(170),
      marginTop: dW(20),
      borderRadius: dW(10),
      alignSelf: "center",
    },
    map: {
      width: "100%",
      height: "100%",
      borderRadius: dW(8),
    },
    time: {
      color: assets.Colors.TERMS_CONDITION_COLOR,
      fontSize: dW(17),
      fontFamily: assets.fonts.ROBOTO_MEDIUM,
    },
    due: {
      color: assets.Colors.INPUT_HOLDER_TXT_COLOR,
      fontSize: dW(14),
      fontFamily: assets.fonts.ROBOTO_REGULAR,
    },
    smallTxt: {
      color: assets.Colors.INPUT_HOLDER_TXT_COLOR,
      fontSize: dW(14),
      fontFamily: assets.fonts.ROBOTO_REGULAR,
      marginTop: dW(10),
    },

    buttn: {
      marginTop: dW(20),
    },
    notify: {
      color: assets.Colors.ACCOUNT_TXT_COLOR,
      fontSize: dW(15),
      fontFamily: assets.fonts.ROBOTO_REGULAR,
      marginRight: dW(22),
      marginLeft: 5,
    },
  });
};
export default useStyle;
