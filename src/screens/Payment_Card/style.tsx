import { StyleSheet } from "react-native";
import { dW } from "../../utils/dynamicHeightWidth";
import assets from "../../assets";

const useStyle = () => {
  return StyleSheet.create({
    scrollContainer: {
      ///flex: 0.5,
      padding: dW(20),
    },
    info: {
      fontSize: dW(16),
      fontFamily: assets.fonts.ROBOTO_REGULAR,
      color: assets.Colors.PRICE_DETAILS_CLR,
      marginTop: dW(10),
      paddingHorizontal: dW(20),
    },
    cardContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginTop: dW(10),
      // height: 120,
    },
    right: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    column: {
      flexDirection: "column",
      justifyContent: "space-between",
      alignContent: "center",
      marginLeft: dW(15),
    },
    cardName: {
      fontSize: dW(16),
      fontFamily: assets.fonts.ROBOTO_MEDIUM,
      color: assets.Colors.ACCOUNT_TXT_COLOR,
    },
    subtitle: {
      fontSize: dW(14),
      fontFamily: assets.fonts.ROBOTO_MEDIUM,
      color: assets.Colors.PRICE_DETAILS_CLR,
      marginTop: dW(5),
    },
    top: {
      marginTop: dW(30),
    },
    new_card: {
      fontSize: dW(16),

      fontFamily: assets.fonts.ROBOTO_MEDIUM,
      color: assets.Colors.TERMS_CONDITION_COLOR,
      marginTop: dW(15),
    },
    spacer: {
      borderWidth: dW(0.8),
      borderColor: assets.Colors.INACTIVE_STORE_BG_COLOR,
      marginTop: dW(15),
    },
  });
};
export default useStyle;
