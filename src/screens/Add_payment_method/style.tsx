import { Platform, StyleSheet } from "react-native";
import { dW } from "../../utils/dynamicHeightWidth";
import assets from "../../assets";

const useStyle = () => {
  return StyleSheet.create({
    scrollContainer: {
      flex: 1,
      padding: dW(35),
    },
    input_view: {
      flexDirection: "column",
      marginTop: dW(10),
      justifyContent: "center",
      width: "100%",
    },
    choose: {
      marginTop: 8,
      height: 30,
      width: 120,
      justifyContent: "center",
      backgroundColor: assets.Colors.BUTTON_COLOR,
      alignItems: "center",
      borderColor: "gray",
      borderWidth: 0.6,
      borderRadius: 2,
    },
    input_title: {
      fontSize: dW(14),
      fontFamily: assets.fonts.ROBOTO_REGULAR,
      color: assets.Colors.INPUT_TITLE_COLOR,
    },
    placeholder: {
      width: "100%",
      marginTop: dW(5),
      paddingVertical: dW(8),
      color: assets.Colors.BLACK_COLOR,
      borderColor: assets.Colors.INPUT_BORDER_COLOR,
      borderBottomWidth: dW(0.5),
      fontSize: dW(15),
      fontFamily: assets.fonts.ROBOTO_REGULAR,
    },
    title: {
      color: assets.Colors.ACCOUNT_TXT_COLOR,
      fontSize: dW(24),
      fontFamily: assets.fonts.ROBOTO_MEDIUM,
      textAlign: "center",
      marginTop: dW(50),
    },
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
    logo_: {
      margin: dW(5),
      height: 80,
      width: 100,
      alignSelf: "center",
      resizeMode: "contain",
      borderRadius: 2,
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
      fontSize: dW(13),
      fontFamily: assets.fonts.ROBOTO_REGULAR,
      textAlign: "center",
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
    buttn: {
      marginLeft: dW(35),
      marginRight: dW(35),
    },
    list_item: {
      height: 65,
      backgroundColor: "transparent",
      width: "100%",
      alignItems: "center",
      flexDirection: "row",
    },
    list_img: { height: 55, width: 55, resizeMode: "cover" },
    list_item_row: {
      marginLeft: 20,
      height: 65,
      width: "100%",
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
      color: assets.Colors.PLACEHOLDER_TEXT_COLOR,
      fontFamily: assets.fonts.ROBOTO_MEDIUM,
    },

    ////////////
    header: {
      flexDirection: "row",
      // alignItems: 'center',
      justifyContent: "space-between",
      paddingTop: Platform.OS === "ios" ? dW(50) : dW(20),
      padding: dW(20),
      backgroundColor: assets.Colors.BACKGROUND_THEME_COLOR,
      shadowColor: assets.Colors.SEARCH_SHADOW_COLOR,
      shadowOffset: {
        width: dW(0),
        height: dW(3),
      },
      shadowRadius: dW(5),
      shadowOpacity: dW(1.8),
      elevation: 5,
    },
    titleH: {
      alignSelf: "center",
      fontSize: dW(18),
      color: assets.Colors.ACCOUNT_TXT_COLOR,
      fontFamily: assets.fonts.ROBOTO_MEDIUM,
    },
    location: {
      flexdirection: "column",
      alignSelf: "center",
    },
    subtitle: {
      textAlign: "center",
      fontSize: dW(15),
      color: assets.Colors.PRICE_DETAILS_CLR,
      fontFamily: assets.fonts.ROBOTO_MEDIUM,
      marginTop: dW(5),
    },
  });
};
export default useStyle;
