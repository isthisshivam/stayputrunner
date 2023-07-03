import { StyleSheet } from "react-native";
import { dW } from "../../utils/dynamicHeightWidth";
import assets from "../../assets";

const useStyle = () => {
  return StyleSheet.create({
    scrollContainer: {
      flex: 1,
      padding: dW(20),
    },
    current_blc: {
      color: assets.Colors.ACCOUNT_TXT_COLOR,
      fontSize: dW(17),
      fontFamily: assets.fonts.ROBOTO_MEDIUM,
      textAlign: "center",
      marginTop: dW(10),
    },
    bold_price: {
      color: assets.Colors.ACCOUNT_TXT_COLOR,
      fontSize: dW(30),
      fontFamily: assets.fonts.ROBOTO_BOLD,
      textAlign: "center",
      marginTop: dW(10),
    },
    will_recieve: {
      color: assets.Colors.PRICE_DETAILS_CLR,
      fontSize: dW(17),
      fontFamily: assets.fonts.ROBOTO_REGULAR,
      textAlign: "center",
      marginTop: dW(20),
    },
    buttn: {
      marginTop: dW(20),
      alignSelf: "center",
      width: dW(160),
    },
    title: {
      color: assets.Colors.PRICE_DETAILS_CLR,
      fontSize: dW(15),
      fontFamily: assets.fonts.ROBOTO_REGULAR,
      textAlign: "center",
      alignSelf: "flex-start",
      marginTop: dW(25),
      marginLeft: dW(10),
    },
    bottom_card: {
      marginTop: dW(25),
      flexDirection: "row",
      alignItems: "center",
      borderRadius: dW(8),
      padding: dW(20),
    },
    column: {
      flexDirection: "column",
      justifyContent: "center",
      marginLeft: dW(10),
    },
    make_up: {
      color: assets.Colors.BACKGROUND_THEME_COLOR,
      fontSize: dW(16),
      marginRight: 5,
      fontFamily: assets.fonts.ROBOTO_MEDIUM,
    },
    complete: {
      color: assets.Colors.BACKGROUND_THEME_COLOR,
      fontSize: dW(14),
      fontFamily: assets.fonts.ROBOTO_MEDIUM,
      marginTop: dW(5),
    },
    row: {
      marginTop: dW(10),
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    code: {
      color: assets.Colors.BACKGROUND_THEME_COLOR,
      fontSize: dW(18),
      marginRight: 5,
      fontFamily: assets.fonts.ROBOTO_MEDIUM,
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
    },
    price: {
      color: assets.Colors.ACCOUNT_TXT_COLOR,
      fontSize: dW(30),
      fontFamily: assets.fonts.ROBOTO_BOLD,
      textAlign: "center",
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
    rowTxt: {
      color: assets.Colors.ACCOUNT_TXT_COLOR,
      fontSize: dW(14),
      textAlign: "center",
    },
    transfer: {
      marginTop: dW(40),
      marginLeft: dW(20),
      marginRight: dW(20),
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
    // title: {
    //   color: assets.Colors.ACCOUNT_TXT_COLOR,
    //   fontSize: dW(24),
    //   fontFamily: assets.fonts.ROBOTO_MEDIUM,
    //   textAlign: "center",
    //   marginTop: dW(50),
    // },
    topSpacer: {
      marginTop: dW(40),
    },

    space_vertical: {
      paddingVertical: dW(10),
    },
    logo: {
      marginTop: dW(20),
      height: dW(130),
      width: dW(130),
      alignSelf: "center",
      resizeMode: "contain",
    },
    row_content: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: dW(26),
      marginTop: dW(5),
    },
    txt: {
      color: assets.Colors.INPUT_TITLE_COLOR,
      fontSize: dW(15),
      marginTop: 40,
      paddingHorizontal: dW(0),
      padding: 12,
      fontFamily: assets.fonts.ROBOTO_REGULAR,
      textAlign: "left",
    },
    bottom_content: {
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: dW(3),
    },
    bottomtxt: {
      color: assets.Colors.ACCOUNT_TXT_COLOR,
      fontSize: dW(13),
      fontFamily: assets.fonts.ROBOTO_REGULAR,
      textAlign: "center",
    },
    colortxt: {
      color: assets.Colors.TERMS_CONDITION_COLOR,
      fontSize: dW(13),
      fontFamily: assets.fonts.ROBOTO_REGULAR,
    },
    // buttn: {
    //   marginLeft: dW(35),
    //   marginRight: dW(35),
    // },
    list_item: {
      height: 55,
      backgroundColor: "transparent",
      width: "100%",
      flex: 1,
      alignItems: "center",
      flexDirection: "row",
      marginTop: 15,
      padding: 0,
    },
    list_img_small: { height: 24, width: 24, resizeMode: "contain" },
    list_img: { height: 55, width: 55, resizeMode: "cover" },
    list_item_row: {
      marginLeft: 20,
      height: 65,
      // width: "100%",
      justifyContent: "center",
      alignItems: "flex-start",
    },
    heading: {
      alignSelf: "flex-start",
      fontSize: 18,
      lineHeight: 24,
      color: assets.Colors.ACCOUNT_TXT_COLOR,
      fontFamily: assets.fonts.ROBOTO_MEDIUM,
    },
    bank_no: {
      alignSelf: "flex-start",
      fontSize: 16,
      lineHeight: 24,
      color: assets.Colors.PRODUCT_DETAILS_INPUT_TXT_CLR,
      fontFamily: assets.fonts.ROBOTO_MEDIUM,
    },
    list_item_content: {
      flex: 1,
      flexDirection: "row",
      alignItems: "center",
    },
    edit: {
      backgroundColor: "transparent",
      height: 25,
      width: 25,
      flex: 0.2,
      alignItems: "center",
      justifyContent: "center",
      marginLeft: 40,
    },
  });
};
export default useStyle;
