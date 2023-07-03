import { StyleSheet } from "react-native";
import { dW } from "../../../utils/dynamicHeightWidth";
import assets from "../../../assets";

const useStyle = () => {
  return StyleSheet.create({
    category_list: {
      flex: 1,
      marginTop: dW(10),
      backgroundColor: assets.Colors.BACKGROUND_THEME_COLOR,
      paddingVertical: dW(15),
      borderRadius: dW(8),
      shadowColor: assets.Colors.SHADOW_COLOR,
      shadowOffset: { width: 1, height: 8 },
      shadowOpacity: 4,
      shadowRadius: 10,
      elevation: 5,
    },
    itemContainer: {
      paddingHorizontal: dW(20),
      paddingVertical: dW(10),
      alignItems: "center",
      flexDirection: "row",
      justifyContent: "space-between",
    },
    day: {
      fontSize: dW(17),
      fontFamily: assets.fonts.ROBOTO_REGULAR,
      color: assets.Colors.ACCOUNT_TXT_COLOR,
    },
    price: {
      fontSize: dW(17),
      fontFamily: assets.fonts.ROBOTO_MEDIUM,
      color: assets.Colors.ACCOUNT_TXT_COLOR,
    },
    view_all: {
      fontSize: dW(17),
      fontFamily: assets.fonts.ROBOTO_MEDIUM,
      color: assets.Colors.TERMS_CONDITION_COLOR,
      alignSelf: "flex-end",
      paddingHorizontal: dW(20),
    },
    row: {
      flexDirection: "row",
      alignItems: "center",
    },
    border: {
      borderBottomWidth: dW(0.8),
      borderColor: assets.Colors.INACTIVE_STORE_BG_COLOR,
    },
    ti: {
      color: assets.Colors.PRICE_DETAILS_CLR,
      fontSize: dW(15),
      fontFamily: assets.fonts.ROBOTO_REGULAR,
      textAlign: "center",
      //alignSelf: "flex-start",
      //marginTop: dW(25),
      //marginLeft: dW(10),
    },
  });
};
export default useStyle;
