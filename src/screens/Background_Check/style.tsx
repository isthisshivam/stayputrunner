import { StyleSheet } from "react-native";
import { dW } from "../../utils/dynamicHeightWidth";
import assets from "../../assets";

const useStyle = () => {
  return StyleSheet.create({
    scrollContainer: {
      flex: 1,
      padding: dW(35),
    },
    dropdownSmall4BtnStyle: {
      marginTop: 20,
      width: "100%",
      height: 48,
      backgroundColor: "#FFF",
      borderRadius: 5,
      borderWidth: 0.1,
      borderColor: "gtay",
    },

    dropdownSmallBtnStyle: {
      // width: "8%",
      height: 35,
      backgroundColor: "white",
      paddingHorizontal: 0,
      borderWidth: 0.1,
      // borderRadius: 8,
      borderColor: "#444",
    },
    dropdown4BtnTxtStyle: { color: "gray", textAlign: "left" },
    dropdown4DropdownStyle: { backgroundColor: "#EFEFEF" },
    dropdown4RowStyle: {
      backgroundColor: "#EFEFEF",
      borderBottomColor: "#C5C5C5",
    },
    dropdown4RowTxtStyle: { color: "#444", textAlign: "left" },

    title: {
      color: assets.Colors.ACCOUNT_TXT_COLOR,
      fontSize: dW(24),
      fontFamily: assets.fonts.ROBOTO_MEDIUM,
      textAlign: "center",
      marginTop: dW(50),
    },
    smallTxt: {
      color: assets.Colors.INPUT_TITLE_COLOR,
      fontSize: dW(17),
      fontFamily: assets.fonts.ROBOTO_REGULAR,
      textAlign: "center",
      marginTop: dW(20),
    },
    topSpacer: {
      marginTop: dW(40),
    },
    row_inputs_view: {
      flexDirection: "row",
      justifyContent: "space-between",
    },
    input_row: {
      width: "45%",
    },
    horizontal_spacer: {
      width: dW(10),
    },
    space_vertical: {
      paddingVertical: dW(10),
    },
    buttn: {
      marginLeft: dW(35),
      marginRight: dW(35),
    },
    input_view: {
      flexDirection: "column",
      marginTop: dW(10),
      justifyContent: "center",
      width: "45%",
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
  });
};
export default useStyle;
