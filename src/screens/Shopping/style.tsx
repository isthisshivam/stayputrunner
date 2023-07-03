import { StyleSheet } from "react-native";
import { dW } from "../../utils/dynamicHeightWidth";
import assets from "../../assets";

const useStyle = () => {
  return StyleSheet.create({
    mainContainer: {
      flex: 1,
      backgroundColor: assets.Colors.BACKGROUND_COLOR,
      flexDirection: "column",
    },
    mapView: {
      width: "100%",
      height: "35%",
      padding: dW(15),
      //backgroundColor:'red',
    },
    map: {
      // width: Dimensions.get('window').width,
      // height: Dimensions.get('window').height,
      width: "100%",
      height: "100%",
      borderRadius: dW(10),
    },
    header: {
      width: "100%",
      //padding:dW(40),
      backgroundColor: "green",
      //marginTop:dW(50),
    },

    btnView: {
      padding: dW(18),
      backgroundColor: assets.Colors.BUTTON_COLOR,
      marginTop: dW(30),
      marginHorizontal: dW(15),
      borderRadius: dW(7),
      textAlign: "center",
    },
    slideToText: {
      fontSize: dW(20),
      fontFamily: assets.fonts.ROBOTO_MEDIUM,
      color: assets.Colors.BLACK_COLOR,
      textAlign: "center",
    },
    IconView: {
      width: "100%",
      marginTop: dW(10),
      alignItems: "center",
      flexDirection: "row",
      paddingHorizontal: 20,
    },
    homeDepotText: {
      marginLeft: 0,
      fontSize: dW(19),
      color: assets.Colors.BLACK_COLOR,
      fontFamily: assets.fonts.ROBOTO_MEDIUM,
      // marginTop: dW(10),
      paddingHorizontal: dW(20),
    },
    priceView: {
      width: "100%",
      paddingHorizontal: dW(20),
      marginTop: dW(25),
    },
    paymentview: {
      width: "100%",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    order: {
      fontSize: dW(24),
      color: assets.Colors.BLACK_COLOR,
      fontFamily: assets.fonts.ROBOTO_BOLD,
    },
    deliveryfees: {
      fontSize: dW(17),
      color: assets.Colors.TEXT_COLOR,
      marginTop: dW(10),
      fontFamily: assets.fonts.ROBOTO_REGULAR,
    },
    nameview: {
      width: "100%",
      //backgroundColor:'red',
      padding: dW(12),
    },
    custmorName: {
      fontSize: dW(20),
      color: assets.Colors.BLACK_COLOR,
      fontFamily: assets.fonts.ROBOTO_MEDIUM,
    },
    item: {
      fontSize: dW(16),
      color: assets.Colors.LIGHT_TEXT_COLOR,
      marginLeft: dW(8),
    },
    shopping: {
      width: "100%",
      flexDirection: "row",
      alignItems: "center",
      marginHorizontal: dW(15),
    },
    shoppingbtnView: {
      padding: dW(18),
      backgroundColor: assets.Colors.BUTTON_THEME_COLOR,
      marginTop: dW(20),
      marginHorizontal: dW(15),
      borderRadius: dW(7),
      textAlign: "center",
    },
    shoppingText: {
      fontSize: dW(19),
      color: assets.Colors.WHITE,
      fontFamily: assets.fonts.ROBOTO_MEDIUM,
      textAlign: "center",
    },

    centeredView: {
      flex: 1,
      backgroundColor: "rgba(52, 52, 52, 0.4)",
      justifyContent: "center",
    },
    modalView: {
      padding: dW(30),
      backgroundColor: assets.Colors.BACKGROUND_THEME_COLOR,
      marginLeft: dW(30),
      marginRight: dW(30),
      borderRadius: dW(10),
    },
    shop: {
      fontSize: dW(21),
      color: assets.Colors.ACCOUNT_TXT_COLOR,
      fontFamily: assets.fonts.ROBOTO_BOLD,
      textAlign: "center",
    },
    rowContent: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginTop: dW(5),
    },
    space: {
      marginTop: dW(20),
    },
    rowTxt: {
      fontSize: dW(15),
      color: assets.Colors.ACCOUNT_TXT_COLOR,
      fontFamily: assets.fonts.ROBOTO_REGULAR,
      marginLeft: dW(10),
    },

    bttnSpace: {
      marginTop: dW(50),
      width: dW(140),
      alignSelf: "center",
    },
  });
};
export default useStyle;
