import { StyleSheet } from "react-native";
import { dW } from "../../utils/dynamicHeightWidth";
import assets from "../../assets";

const useStyle = () => {
  return StyleSheet.create({
    mainContainer: {
      flex: 1,
      backgroundColor: assets.Colors.BACKGROUND_PRIMARY_COLOR,
    },

    popupView: {
      backgroundColor: assets.Colors.WHITE,
      padding: dW(15),
      marginTop: dW(15),
      margin: dW(15),
      borderRadius: 15,
    },
    orderKit: {
      width: "100%",
      marginTop: dW(10),
      textAlign: "center",
      fontSize: dW(19),
      fontFamily: assets.fonts.ROBOTO_MEDIUM,
      color: assets.Colors.BLACK_COLOR,
    },
    iconView: {
      width: "100%",
      flexDirection: "row",
      justifyContent: "center",
      marginTop: dW(10),
    },
    help: {
      textAlign: "center",
      marginTop: dW(10),
      fontSize: dW(15),
      color: assets.Colors.LIGHT_TEXT_COLOR,
    },
    activateSpace: {
      marginTop: dW(50),
    },
    space: {
      marginTop: dW(20),
    },
    dateView: {
      marginHorizontal: dW(20),
      //marginVertical:dW(20)
    },
    date: {
      fontSize: dW(18),
      fontFamily: assets.fonts.ROBOTO_MEDIUM,
    },
    cardView: {
      marginHorizontal: dW(20),
      backgroundColor: assets.Colors.WHITE,
      padding: dW(20),
      marginTop: dW(20),
      borderRadius: dW(10),
      alignItems: "center",
    },
    IconView: {
      width: "100%",
      flexDirection: "row",
      alignItems: "center",
      //backgroundColor:'green'
    },
    homeDepotText: {
      fontSize: dW(17),
      color: assets.Colors.BLACK_COLOR,
      fontFamily: assets.fonts.ROBOTO_MEDIUM,
      marginLeft: 18,
      //marginTop: dW(10),
    },
    prizeView: {
      width: "100%",
      // backgroundColor:'red',
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginTop: dW(7),
    },
    price: {
      fontSize: dW(21),
      color: assets.Colors.BLACK_COLOR,
      fontFamily: assets.fonts.ROBOTO_BOLD,
    },
    ShoppingView: {
      width: "100%",
      //backgroundColor:'blue',
      flexDirection: "row",
      alignItems: "center",
      marginTop: dW(7),
    },
    item: {
      fontSize: dW(17),
      color: assets.Colors.TEXT_COLOR,
      marginLeft: dW(8),
    },
  });
};
export default useStyle;
