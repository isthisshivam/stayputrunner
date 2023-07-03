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
    marker: {
      height: dW(40),
      width: dW(40),
      resizeMode: "contain",
      alignSelf: "center",
    },
    mapView: {
      width: "100%",
      height: "100%",
      //backgroundColor:'red',
    },
    help: {
      fontSize: dW(15),
      color: assets.Colors.ACCOUNT_TXT_COLOR,
      fontFamily: assets.fonts.ROBOTO_MEDIUM,
      textAlign: "center",
      paddingHorizontal: dW(10),
      paddingVertical: dW(5),
    },
    map: {
      // width: Dimensions.get('window').width,
      // height: Dimensions.get('window').height,
      width: "100%",
      height: "100%",
    },
    header: {
      width: "100%",
      //padding:dW(40),
      backgroundColor: "green",
      //marginTop:dW(50),
    },
    priceView: {
      width: "100%",
      paddingHorizontal: dW(20),
      marginTop: dW(33),
    },
    paymentview: {
      width: "100%",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    price: {
      fontSize: dW(22),
      color: assets.Colors.BLACK_COLOR,
      fontFamily: assets.fonts.ROBOTO_BOLD,
    },
    deliveryfees: {
      fontSize: dW(17),
      color: assets.Colors.TEXT_COLOR,
      marginTop: dW(10),
      fontFamily: assets.fonts.ROBOTO_REGULAR,
    },
    IconView: {
      width: "100%",
      //backgroundColor:'green'
    },
    homeDepotText: {
      fontSize: dW(19),
      color: assets.Colors.BLACK_COLOR,
      fontFamily: assets.fonts.ROBOTO_MEDIUM,
      marginTop: dW(10),
      paddingHorizontal: dW(20),
    },
    ShoppingView: {
      width: "100%",
      //backgroundColor:'blue',
      flexDirection: "column",
      alignItems: "center",
      marginTop: dW(7),
      paddingHorizontal: dW(20),
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
    btnView: {
      padding: dW(10),
      backgroundColor: assets.Colors.BUTTON_COLOR,
      marginTop: dW(10),
      // margin: dW(15),
      // paddingRight: 20,
      borderRadius: dW(7),
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: dW(40),
    },
    arrow: {
      backgroundColor: assets.Colors.NEW_C,
      alignItems: "center",
      borderRadius: dW(5),
      padding: dW(17),
    },
    slideToText: {
      fontSize: dW(19),
      fontFamily: assets.fonts.ROBOTO_MEDIUM,
      color: assets.Colors.BLACK_COLOR,
      alignSelf: "center",
      textAlign: "center",
      width: "100%",
      // marginLeft: dW(110),
    },
    order: {
      fontSize: dW(16),
      fontFamily: assets.fonts.ROBOTO_REGULAR,
      color: assets.Colors.TEXT_COLOR,
      flex: 0.5,
    },
    netPrice: {
      flex: 0.4,
      fontSize: dW(17),
      //marginTop: 7,
      marginRight:5,
      color: assets.Colors.TEXT_COLOR,
      fontFamily: assets.fonts.ROBOTO_REGULAR,
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
      marginRight: dW(20),
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
    center: {
      marginTop: dW(40),
      alignSelf: "center",
      justifyContent: "center",
      borderWidth: dW(3),
      borderColor: assets.Colors.BUTTON_THEME_COLOR,
      borderRadius: dW(55),
      height: dW(110),
      width: dW(110),
    },
    row: {
      marginTop: dW(10),
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
  });
};
export default useStyle;
