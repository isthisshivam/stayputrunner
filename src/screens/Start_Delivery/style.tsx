import { StyleSheet } from "react-native";
import { dW, windowWidth } from "../../utils/dynamicHeightWidth";
import assets from "../../assets";

const useStyle = () => {
  return StyleSheet.create({
    scrollContainer: {
      flex: 1,
      padding: dW(20),
    },
    left: {
      marginLeft: dW(20),
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
      flex: 0.6,
    },
    netPrice: {
      flex: 0.4,
      fontSize: dW(17),
      //marginTop: 7,

      color: assets.Colors.TEXT_COLOR,
      fontFamily: assets.fonts.ROBOTO_REGULAR,
    },
    title: {
      color: assets.Colors.ACCOUNT_TXT_COLOR,
      fontSize: dW(17),
      fontFamily: assets.fonts.ROBOTO_MEDIUM,
    },
    smallTxt: {
      color: assets.Colors.INPUT_HOLDER_TXT_COLOR,
      fontSize: dW(14),
      fontFamily: assets.fonts.ROBOTO_REGULAR,
      marginTop: dW(15),
    },

    timeTxt: {
      color: assets.Colors.ACCOUNT_TXT_COLOR,
      fontSize: dW(22),
      fontFamily: assets.fonts.ROBOTO_MEDIUM,
      marginTop: dW(10),
    },

    buttn: {
      marginTop: dW(20),
      flexDirection: "row",
      justifyContent: "space-between",
      backgroundColor: assets.Colors.INACTIVE_STORE_BG_COLOR,
      alignItems: "center",
      paddingHorizontal: dW(12),
      paddingVertical: dW(12),
      borderRadius: dW(5),
      borderColor: assets.Colors.COLORS_BORDER,
      borderWidth: dW(0.8),
    },
    row: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    arrow: {
      backgroundColor: assets.Colors.BUTTON_THEME_COLOR,
      alignItems: "center",
      borderRadius: dW(5),
      padding: dW(8),
    },
    bttnTxt: {
      color: assets.Colors.ACCOUNT_TXT_COLOR,
      fontSize: dW(17),
      fontFamily: assets.fonts.ROBOTO_MEDIUM,
      marginLeft: dW(25),
    },

    centeredView: {
      flex: 1,
      backgroundColor: assets.Colors.MODAL_BACKGROUND_COLOR,
    },
    modalView: {
      flex: 1,
      marginTop: dW(50),
      backgroundColor: assets.Colors.BACKGROUND_THEME_COLOR,
      borderTopLeftRadius: dW(15),
      borderTopRightRadius: dW(15),
    },
    container: {
      flexDirection: "column",
      // justifyContent: 'center',
      width: windowWidth(),
      marginTop: dW(20),
      padding: dW(15),
    },
    headerView: {
      width: "100%",
      //padding:dW(10),
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      //  marginTop: dW(50)
    },
    headerText: {
      fontSize: dW(25),
      fontFamily: assets.fonts.ROBOTO_MEDIUM,
      color: assets.Colors.ACCOUNT_TXT_COLOR,
    },
    flatlistRowView: {
      width: "100%",
      flexDirection: "row",
      marginTop: dW(30),
    },
    listCardView: {
      marginHorizontal: dW(5),
      backgroundColor: assets.Colors.SECONDRY_CARDS_BG_COLOR,
      padding: dW(18),
      borderRadius: dW(5),
      position: "relative",
      alignItems: "center",
    },
    daysname: {
      fontSize: dW(17),
      fontFamily: assets.fonts.ROBOTO_MEDIUM,
      color: assets.Colors.THEME_COLOR_PRIMARY,
    },
    numberText: {
      fontSize: dW(15),
      fontFamily: assets.fonts.ROBOTO_REGULAR,
      marginTop: dW(5),
      textAlign: "center",
      color: assets.Colors.THEME_COLOR_PRIMARY,
    },
    flatlistColumnView: {
      flexDirection: "column",
      marginTop: dW(20),
      width: "100%",
      height: "100%",
    },
    listColumnView: {
      flex: 1,
      flexDirection: "row",
      justifyContent: "space-between",
      //marginTop:dW(15),
      padding: dW(10),
      alignItems: "center",
    },
    timeschedule: {
      flexDirection: "row",
    },
    time: {
      marginLeft: dW(10),
      fontSize: dW(17),
      fontFamily: assets.fonts.ROBOTO_REGULAR,
      color: assets.Colors.ACCOUNT_TXT_COLOR,
    },
    price: {
      fontSize: dW(17),
      color: assets.Colors.BUTTON_THEME_COLOR,
      fontFamily: assets.fonts.ROBOTO_REGULAR,
    },
  });
};
export default useStyle;
