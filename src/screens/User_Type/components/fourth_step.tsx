import React from "react";
import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import assets from "../../../assets";
import { dW, windowWidth } from "../../../utils/dynamicHeightWidth";
import { useNavigation } from "@react-navigation/native";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import SVG_View from "../../../common_components/SVG_View";

export default () => {
  const { navigate } = useNavigation();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select store</Text>
      <Text style={styles.subtitle}>You can always change stores later.</Text>
      <Pressable
        onPress={() =>
          navigate(assets.NavigationConstants.STACKS.HOME_STACK, {
            screen: assets.NavigationConstants.HOME_SCREEN.NAME,
          })
        }
        style={styles.cardView}
      >
        <View style={styles.logoView}>
          <SVG_View
            width="50"
            height="50"
            path={assets.Images.CONTRACTOR_ICON}
          />
          <Text style={styles.depotText}>Home Depot</Text>
        </View>
        <View>
          <EvilIcons
            name="chevron-right"
            color={assets.Colors.ACCOUNT_TXT_COLOR}
            size={45}
          />
        </View>
      </Pressable>
      <Pressable
        style={styles.cardView}
        onPress={() =>
          navigate(assets.NavigationConstants.STACKS.HOME_STACK, {
            screen: assets.NavigationConstants.HOME_SCREEN.NAME,
          })
        }
      >
        <View style={styles.logoView}>
          <SVG_View
            width="50"
            height="50"
            path={assets.Images.CONTRACTOR_ICON}
          />
          <Text style={styles.depotText}>Lowe's</Text>
        </View>
        <View>
          <EvilIcons
            name="chevron-right"
            color={assets.Colors.ACCOUNT_TXT_COLOR}
            size={45}
          />
        </View>
      </Pressable>
      <Pressable
        style={styles.cardView}
        onPress={() =>
          navigate(assets.NavigationConstants.STACKS.HOME_STACK, {
            screen: assets.NavigationConstants.HOME_SCREEN.NAME,
          })
        }
      >
        <View style={styles.logoView}>
          <SVG_View
            width="50"
            height="50"
            path={assets.Images.CONTRACTOR_ICON}
          />
          <Text style={styles.depotText}>ACE Hardware</Text>
        </View>
        <View>
          <EvilIcons
            name="chevron-right"
            color={assets.Colors.ACCOUNT_TXT_COLOR}
            size={45}
          />
        </View>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    // justifyContent: 'center',
    width: windowWidth(),
    marginTop: dW(20),
    padding: dW(15),
  },
  cardView: {
    flexDirection: "row",
    padding: dW(23),
    alignItems: "center",
    backgroundColor: "#0000",
    marginTop: dW(30),
    shadowColor: assets.Colors.SHADOW_COLOR,
    shadowOffset: { width: 1, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    borderRadius: dW(6),
    justifyContent: "space-between",
    width: "100%",
    elevation: 5,
  },
  title: {
    fontSize: dW(30),
    textAlign: "center",
    marginTop: dW(40),
    fontFamily: assets.fonts.ROBOTO_MEDIUM,
    color: assets.Colors.ACCOUNT_TXT_COLOR,
  },
  subtitle: {
    marginTop: dW(15),
    fontSize: dW(18),
    color: assets.Colors.PLACEHOLDER_TEXT_COLOR,
    textAlign: "center",
    fontFamily: assets.fonts.ROBOTO_REGULAR,
  },
  logoStyle: {
    height: dW(50),
    width: dW(50),
    //alignSelf: 'center'
    //marginLeft: dW(15)
  },
  logoView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  depotText: {
    marginLeft: dW(20),
    fontSize: dW(18),
    fontFamily: assets.fonts.ROBOTO_MEDIUM,
    color: assets.Colors.INPUT_HOLDER_TXT_COLOR,
  },
});
