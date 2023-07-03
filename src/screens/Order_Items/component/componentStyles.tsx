import { StyleSheet } from "react-native";
import { dW, dH } from "../../../utils/dynamicHeightWidth";
import assets from "../../../assets";

const useStyle = () => {
  return StyleSheet.create({
    category_list: {
      flex: 1,
      // marginTop: dW(10),
    },
    empty_c: {
      height: dH(450),
      width: "100%",
      alignItems: "center",
      justifyContent: "center",
    },
    item_done: {
      fontSize: dW(16),
      fontFamily: assets.fonts.ROBOTO_REGULAR,
      color: assets.Colors.ACCOUNT_TXT_COLOR,
      textAlign: "center",
    },
    title: {
      fontSize: dW(15),
      fontFamily: assets.fonts.ROBOTO_MEDIUM,
      color: assets.Colors.INPUT_HOLDER_TXT_COLOR,
      padding: dW(15),
    },
    itemContainer: {
      borderTopWidth: dW(0.8),
      borderColor: assets.Colors.INACTIVE_STORE_BG_COLOR,
      padding: dW(20),
      alignItems: "center",
      flexDirection: "row",
      justifyContent: "space-between",
    },
    image: {
      height: dW(70),
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
      padding: dW(15),
    },
  });
};
export default useStyle;
