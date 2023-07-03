import { StyleSheet } from "react-native";
import { dW } from "../../utils/dynamicHeightWidth";

const useStyle = () => {
  return StyleSheet.create({
    scrollContainer: {
      flex: 1,
      padding: dW(35),
    },
    webView: {
      height: "85%",
      width: "90%",
      alignSelf: "center",
      // backgroundColor: "red",
      marginTop: dW(10),
      justifyContent: "center",
    },

    buttn: {
      width: "90%",
      alignSelf: "center",
      position: "absolute",
      bottom: dW(10),
    },
  });
};
export default useStyle;
