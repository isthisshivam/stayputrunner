import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  Pressable,
  StyleSheet,
  Image,
  Alert,
  Platform,
} from "react-native";
import assets from "../assets";
import usePallete from "../assets/Pallete";
import { useNavigation } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { dW } from "../utils/dynamicHeightWidth";
import { clearAsyncStorage } from "../Storage/ApplicationStorage";
import { resetStack } from "../utils/utilities";
import { useRest, CALL_TYPES, LOADING_TYPES } from "../Services/rest/api";
import Loader from "./Loader";
import { RUNNER_DEACTIVATE } from "../Services/ApiUrls";
const pallete = usePallete();
export const Drawer_Content = ({ navigation, props }) => {
  const { navigate } = useNavigation();
  //const { track } = useAnalytics();
  const [earning, setEarning] = useState(false);
  const [profile, setProfile] = useState(false);

  const payload = {
    status: 0,
  };
  const { data, loading, error, fetchData, responseCode } = useRest({
    URL: RUNNER_DEACTIVATE,
    PAYLOAD: payload,
    CALL_TYPE: CALL_TYPES.POST,
    lazy: true,
  });

  const logout = () => {
    Alert.alert("Logout?", "Do you want to logout?", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      {
        text: "OK",
        onPress: () => {
          clearAsyncStorage();
          // navigate(assets.NavigationConstants.AUTH_STACK.NAME, { screen: assets.NavigationConstants.LOG_IN.NAME })
          resetStack(
            assets.NavigationConstants.AUTH_STACK.NAME,
            null,
            navigation
          );
        },
      },
    ]);
  };
  useEffect(() => {
    if (data) {
      clearAsyncStorage();
      resetStack(assets.NavigationConstants.AUTH_STACK.NAME, null, navigation);
    }
  }, [data, responseCode, error]);
  const deactivateAccount = async () => {
    fetchData(0);
  };

  return (
    <View style={[pallete.mainContainor]}>
      <View style={styles.header}>
        <Loader isLoading={loading === LOADING_TYPES.LOADING}></Loader>
        <FontAwesome5
          name="times"
          color={assets.Colors.ACCOUNT_TXT_COLOR}
          size={dW(22)}
          style={{ alignSelf: "center" }}
          onPress={() => navigation.closeDrawer()}
        />
        <View style={styles.headerColumn}>
          <Image source={assets.Images.STAY_PUT_LOGO} style={styles.logo} />
          <Text style={styles.runnerapp}>Runner app</Text>
        </View>
        <View></View>
      </View>
      <ScrollView style={styles.scrollContainer}>
        <Pressable
          onPress={() => navigate("Dashboard")}
          style={[styles.space_between, styles.top]}
        >
          <Image source={assets.Images.DASHBOARD_ICON} style={styles.icons} />
          <Text style={styles.title}>Dashboard</Text>
        </Pressable>

        <Pressable
          onPress={() => navigate(assets.NavigationConstants.ORDERS.NAME)}
          style={styles.space_between}
        >
          <Image source={assets.Images.CART_ICON} style={styles.icons} />
          <Text style={styles.title}>Orders</Text>
        </Pressable>

        {/* <Pressable
          onPress={() => navigate(assets.NavigationConstants.CHATTING.NAME)}
          style={styles.space_between}
        >
          <FontAwesome5
            name="comment-dots"
            color={assets.Colors.INPUT_TITLE_COLOR}
            size={dW(22)}
          />
          <Text style={styles.title}>Messages</Text>
        </Pressable> */}
        {/* <Pressable
          onPress={() =>
            navigate(assets.NavigationConstants.HOW_EARNING_WORKS.NAME)
          }
          style={styles.space_between}
        >
          <Image source={assets.Images.SACK_DOLLAR} style={[styles.icons]} />
          <Text style={styles.title}>How Earning Works</Text>
        </Pressable> */}

        <Pressable
          onPress={() => {
            setEarning(!earning), setProfile(false);
          }}
          style={styles.space_between}
        >
          {/* <FontAwesome5 name="dollar-sign" color={earning == false ? assets.Colors.INPUT_TITLE_COLOR : assets.Colors.TERMS_CONDITION_COLOR} size={dW(22)} style={{ marginRight: dW(12) }} /> */}
          <Image
            source={assets.Images.SACK_DOLLAR}
            style={[
              styles.icons,
              {
                tintColor:
                  earning == false
                    ? assets.Colors.INPUT_TITLE_COLOR
                    : assets.Colors.TERMS_CONDITION_COLOR,
              },
            ]}
          />
          <Text
            style={[
              styles.title,
              {
                color:
                  earning == false
                    ? assets.Colors.INPUT_TITLE_COLOR
                    : assets.Colors.TERMS_CONDITION_COLOR,
              },
            ]}
          >
            Earnings
          </Text>
        </Pressable>
        {earning == false ? null : (
          <View style={styles.column}>
            <Text
              onPress={() => {
                navigate(assets.NavigationConstants.EARNING_CASH_OUT.NAME),
                  setEarning(false);
              }}
              style={styles.hideTxt}
            >
              Earnings & Cashout
            </Text>
            <Text
              onPress={() =>
                navigate(assets.NavigationConstants.HOW_EARNING_WORKS.NAME)
              }
              style={styles.hideTxt}
            >
              How earnings work
            </Text>
            <Text
              onPress={() =>
                navigate(assets.NavigationConstants.PAYMENT_METHOD.NAME)
              }
              style={styles.hideTxt}
            >
              Payment Methods
            </Text>
          </View>
        )}

        <Pressable
          onPress={() => navigate(assets.NavigationConstants.DEMO_SCREEN.NAME)}
          style={styles.space_between}
        >
          {/* <FontAwesome5 name="video" color={assets.Colors.INPUT_TITLE_COLOR} size={dW(22)} /> */}
          <Image source={assets.Images.DEMO_ORDER_ICON} style={styles.icons} />
          <Text style={styles.title}>Demo Orders</Text>
        </Pressable>

        <Pressable
          onPress={() => {
            setProfile(!profile), setEarning(false);
          }}
          style={styles.space_between}
        >
          <FontAwesome5
            name="user"
            color={
              profile == false
                ? assets.Colors.INPUT_TITLE_COLOR
                : assets.Colors.TERMS_CONDITION_COLOR
            }
            size={dW(22)}
          />
          <Text
            style={[
              styles.title,
              {
                color:
                  profile == false
                    ? assets.Colors.INPUT_TITLE_COLOR
                    : assets.Colors.TERMS_CONDITION_COLOR,
              },
            ]}
          >
            Profile
          </Text>
        </Pressable>
        {profile == false ? null : (
          <View style={styles.column}>
            <Text
              onPress={() => {
                navigate(assets.NavigationConstants.PAYMENT_CARD.NAME),
                  setProfile(false);
              }}
              style={styles.hideTxt}
            >
              My payment card
            </Text>
            <Text
              onPress={() => [
                navigate(assets.NavigationConstants.EDIT_PROFILE.NAME),
                setProfile(false),
                global.universalObject.logEvent("View-Profile", {
                  customData: {
                    anonymousid: global.userId,
                    device: Platform.OS,
                    URL: "https://projects.invisionapp.com/d/main#/console/21827194/462388245/preview#project_console",
                  },
                }),
              ]}
              style={styles.hideTxt}
            >
              Edit Profile
            </Text>
          </View>
        )}
        <Pressable
          onPress={() => deactivateAccount()}
          style={styles.space_between}
        >
          <Image
            style={{ height: dW(22), width: dW(22), resizeMode: "contain" }}
            source={require("../assets/image/toggle.png")}
          />
          <Text
            style={[styles.title, { color: assets.Colors.INPUT_TITLE_COLOR }]}
          >
            Deactivate Account
          </Text>
        </Pressable>
        <Pressable onPress={() => logout()} style={styles.space_between}>
          <FontAwesome5
            name="power-off"
            color={assets.Colors.INPUT_TITLE_COLOR}
            size={dW(22)}
          />
          <Text
            style={[styles.title, { color: assets.Colors.INPUT_TITLE_COLOR }]}
          >
            Logout
          </Text>
        </Pressable>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: dW(20),
    marginTop: dW(30),
    backgroundColor: assets.Colors.BACKGROUND_THEME_COLOR,
    shadowColor: assets.Colors.SHADOW_COLOR,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,
  },

  headerColumn: {
    flexDirection: "column",
    justifyContent: "flex-start",
    alignContent: "center",
  },
  logo: {
    height: dW(50),
    width: dW(100),
    alignSelf: "center",
    resizeMode: "contain",
  },
  runnerapp: {
    fontFamily: assets.fonts.ROBOTO_REGULAR,
    fontSize: dW(13),
    textAlign: "center",
    color: assets.Colors.INPUT_HOLDER_TXT_COLOR,
    marginTop: dW(5),
  },
  scrollContainer: {
    flex: 1,
    paddingHorizontal: dW(30),
  },
  top: {
    marginTop: dW(40),
  },
  space_between: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: dW(24),
  },
  icons: {
    tintColor: assets.Colors.INPUT_TITLE_COLOR,
    height: dW(23),
    width: dW(23),
    resizeMode: "contain",
    alignSelf: "center",
  },
  title: {
    fontFamily: assets.fonts.ROBOTO_MEDIUM,
    fontSize: dW(17),
    color: assets.Colors.INPUT_TITLE_COLOR,
    marginLeft: dW(15),
    textAlign: "center",
  },
  column: {
    marginLeft: dW(38),
    flexDirection: "column",
    justifyContent: "flex-start",
    alignContent: "center",
  },
  hideTxt: {
    fontFamily: assets.fonts.ROBOTO_REGULAR,
    fontSize: dW(17),
    color: assets.Colors.INPUT_TITLE_COLOR,
    marginTop: dW(24),
  },
});
