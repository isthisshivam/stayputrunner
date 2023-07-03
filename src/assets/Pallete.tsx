import { StyleSheet } from "react-native";
import assets from ".";
import { dW, dH } from "../utils/dynamicHeightWidth";
const usePallete = () => {
  return StyleSheet.create({
    mainContainor: {
      flex: 1,
      //height: "100%",
      backgroundColor: assets.Colors.BACKGROUND_THEME_COLOR,
    },
    screen_container: {
      paddingHorizontal: dW(25),
      flex: 1,
    },
    cardView: {
      flexDirection: "row",
      padding: dW(30),
      alignItems: "center",
      backgroundColor: "white",
      marginTop: dW(25),
      shadowColor: "#000",
      shadowOffset: { width: 1, height: 0 },
      shadowOpacity: 0.1,
      shadowRadius: 10,

      borderRadius: dW(6),
    },
    mt_30: {
      marginTop: dH(100),
    },
    mb_10: {
      marginBottom: dW(10),
    },
    mb_30: {
      marginBottom: dW(30),
    },
    mb_50: {
      marginBottom: dW(50),
      flex: 1,
    },
    Loader_View: {
      flex: 1,
      backgroundColor: assets.Colors.MODAL_BACKGROUND_COLOR,
    },
  });
};
export default usePallete;
