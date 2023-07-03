import { StyleSheet } from "react-native";
import { dW } from "../../utils/dynamicHeightWidth";
import assets from "../../assets";

const useStyle = () => {
  return StyleSheet.create({
    scrollContainer: {
      flex: 1,
    },
    itemContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      padding: dW(20),
    },
    image: {
      height: dW(90),
      width: dW(100),
      resizeMode: "contain",
      alignSelf: "center",
    },
    details: {
      flexDirection: "row",
      alignItems: "center",
      width: dW(180),
    },
    qty: {
      fontSize: dW(15),
      fontFamily: assets.fonts.ROBOTO_BOLD,
      color: assets.Colors.ACCOUNT_TXT_COLOR,
    },
    brand: {
      fontSize: dW(15),
      fontFamily: assets.fonts.ROBOTO_BOLD,
      color: assets.Colors.INPUT_HOLDER_TXT_COLOR,
    },
    desc: {
      fontSize: dW(15),
      fontFamily: assets.fonts.ROBOTO_REGULAR,
      color: assets.Colors.INPUT_HOLDER_TXT_COLOR,
    },
    scanner: {
      marginTop: dW(20),
      flex: 1,
      height: "100%",
      width: "100%",
    },
    row: {
      flexDirection: "row",
      justifyContent: "flex-start",
      alignItems: "center",
      backgroundColor: assets.Colors.INPUT_TITLE_COLOR,
      paddingVertical: dW(8),
      paddingHorizontal: dW(15),
    },
    txt: {
      fontSize: dW(15),
      fontFamily: assets.fonts.ROBOTO_MEDIUM,
      color: assets.Colors.BACKGROUND_THEME_COLOR,
      marginLeft: dW(15),
    },
    code_container: {
      borderWidth: dW(1),
      width: dW(300),
      height: dW(120),
      borderColor: assets.Colors.BACKGROUND_THEME_COLOR,
      borderRadius: dW(10),
    },

    centeredView: {
      flex: 1,
    },
    modalView: {
      flex: 1,
      height: "30%",
      width: "100%",
      zIndex: 1,
      position: "absolute",
      padding: dW(20),
      bottom: 0,
      backgroundColor: assets.Colors.BACKGROUND_THEME_COLOR,
      borderTopLeftRadius: dW(15),
      borderTopRightRadius: dW(15),
    },
    sku: {
      fontSize: dW(17),
      fontFamily: assets.fonts.ROBOTO_MEDIUM,
      color: assets.Colors.ACCOUNT_TXT_COLOR,
      textAlign: "center",
      padding: dW(20),
    },
    code_bg: {
      borderRadius: dW(10),
      backgroundColor: assets.Colors.INACTIVE_STORE_BG_COLOR,
      alignItems: "center",
      height: 60,
      paddingHorizontal: 20,
      fontSize: dW(17),
      fontFamily: assets.fonts.ROBOTO_MEDIUM,
      color: assets.Colors.ACCOUNT_TXT_COLOR,
      textAlign: "center",
      //padding: dW(20),
    },
    spacer: {
      marginTop: dW(10),
    },
  });
};
export default useStyle;
