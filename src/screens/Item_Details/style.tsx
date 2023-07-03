import { StyleSheet } from "react-native";
import { dW } from "../../utils/dynamicHeightWidth";
import assets from "../../assets";

const useStyle = () => {
  return StyleSheet.create({
    scrollContainer: {
      flex: 1,
      padding: dW(35),
    },
    image: {
      height: dW(130),
      width: dW(200),
      alignSelf: "center",
      resizeMode: "contain",
    },
    details: {
      marginTop: dW(20),
      alignItems: "center",
    },
    qty: {
      fontSize: dW(17),
      fontFamily: assets.fonts.ROBOTO_BOLD,
      color: assets.Colors.ACCOUNT_TXT_COLOR,
    },
    brand: {
      fontSize: dW(17),
      fontFamily: assets.fonts.ROBOTO_BOLD,
      color: assets.Colors.INPUT_HOLDER_TXT_COLOR,
    },
    desc: {
      fontSize: dW(17),
      fontFamily: assets.fonts.ROBOTO_REGULAR,
      color: assets.Colors.INPUT_HOLDER_TXT_COLOR,
    },
    buttn: {
      alignItems: "center",
      marginTop: dW(30),
    },
    payment_Container: {
      paddingVertical: dW(25),
      borderBottomWidth: dW(0.8),
      borderColor: assets.Colors.INACTIVE_STORE_BG_COLOR,
    },
    rowContent: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginTop: dW(10),
    },
    boldTxt: {
      fontSize: dW(17),
      fontFamily: assets.fonts.ROBOTO_MEDIUM,
      color: assets.Colors.ACCOUNT_TXT_COLOR,
    },
    regularTxt: {
      fontSize: dW(17),
      fontFamily: assets.fonts.ROBOTO_REGULAR,
      color: assets.Colors.ACCOUNT_TXT_COLOR,
    },
    bottom_Txt: {
      fontSize: dW(17),
      fontFamily: assets.fonts.ROBOTO_MEDIUM,
      color: assets.Colors.TERMS_CONDITION_COLOR,
      marginTop: dW(20),
    },
    row_msg: {
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 10,
      marginTop: 50,
    },
    message: {
      fontSize: dW(16),
      fontFamily: assets.fonts.ROBOTO_REGULAR,
      color: assets.Colors.ACCOUNT_TXT_COLOR,
      marginLeft: dW(15),
    },
  });
};
export default useStyle;
