import {
  LogBox,
  Text,
  View,
  Image,
  StyleSheet,
  useColorScheme,
  Platform,
  StatusBar,
} from "react-native";
import React, { useEffect, useState } from "react";

import Root from "./src/root";

import firebase from "@react-native-firebase/app";
import auth from "@react-native-firebase/auth";

import { dH, dW } from "./src/utils/dynamicHeightWidth";
LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
]);

import NetInfo from "@react-native-community/netinfo";
import assets from "./src/assets";

import BranchIoAnalytics from "./src/utils/branchIoAnalytics";
import crashlytics from "@react-native-firebase/crashlytics";
LogBox.ignoreAllLogs(); //Ignore all log notifications
import { Provider } from "react-redux";
import { Secrets } from "./src/assets/secrets";
import { store, persistor } from "./src/redux/store/index";
import { PersistGate } from "redux-persist/integration/react";

const App = () => {
  const [notConnected, setConnected] = useState(true);
  const isDarkMode = useColorScheme() === "dark";
  const logCrash = async () => {
    crashlytics().crash();
  };

  useEffect(() => {
    initBranchIo();
    if (!firebase.apps.length) {
      const firebaseConfig = {
        apiKey: Secrets.FIR_APIKEY,
        authDomain: Secrets.FIRE_AUTH_DOMAIN,
        databaseURL: Secrets.FIR_DB_URL,
        projectId: Secrets.FIR_PROJECT_ID,
        storageBucket: Secrets.FIR_STORAGE,
        messagingSenderId: Secrets.FIR_MESSENGER,
        appId: Secrets.FIR_APPID,
        measurementId: Secrets.FIR_MEAS_ID,
      };
      firebase.initalizing(firebaseConfig);
    }
    signInAnonymously();
    NetInfo.addEventListener((state) => {
      setConnected(state.isConnected);
    });
  }, []);
  const initBranchIo = async () => {
    let universalObject;

    try {
      universalObject = await BranchIoAnalytics.isInstance().init();
      global.universalObject = universalObject;
    } catch (e) {}
  };

  const signInAnonymously = async () => {
    try {
      await auth().signInAnonymously();
    } catch (e) {
      console.error(e);
    }
  };

  const NoInternet = () => {
    return (
      <View style={styleSheet.noInternet_container}>
        <View style={styleSheet.noInternet_inheritView}>
          <Image
            style={styleSheet.alert_img}
            source={assets.Images.ALERT}
          ></Image>
          <Text style={styleSheet.notConnected_text}>
            No Internet Connection
          </Text>
        </View>
      </View>
    );
  };
  return (
    <Provider store={store}>
      <PersistGate loading={false} persistor={persistor}></PersistGate>
      <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} />
      <Root />
      {!notConnected && <NoInternet />}
    </Provider>
  );
};

const styleSheet = StyleSheet.create({
  noInternet_container: {
    position: "relative",
    backgroundColor: assets.Colors.BACKGROUND_PRIMARY_COLOR,
    paddingHorizontal: 15,
  },
  noInternet_inheritView: {
    height: 55,
    width: "100%",
    backgroundColor: "red",
    marginBottom: dH(20),
    borderRadius: 10,
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 20,
  },
  alert_img: { height: 25, width: 25, resizeMode: "contain" },
  notConnected_text: { color: "white", marginLeft: 10, fontSize: 17 },
});
export default App;
