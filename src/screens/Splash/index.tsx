import React, { useState, useEffect, useRef } from "react";
import {
  SafeAreaView,
  View,
  Image,
  Platform,
  PermissionsAndroid,
  ActivityIndicator,
} from "react-native";
import assets from "../../assets";
import useStyle from "./style";
import usePallete from "../../assets/Pallete";
import { useNavigation } from "@react-navigation/native";
import Geolocation from "react-native-geolocation-service";

import {
  GetData,
  resetStack,
  SaveData,
  showToastMessage,
  validateEmail,
  logout,
} from "../../utils/utilities";
import {
  ACCESS_TOKEN,
  LOGIN_KEY,
  clearAsyncStorage,
  getStoredData,
  storeData,
} from "../../Storage/ApplicationStorage";
var action = null;
const Splash = (props) => {
  const pallete = usePallete();
  const styles = useStyle();
  const [isLoading, setLoading] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    setLoading(true);
    requestLocationPermission();
  }, []);
  const requestLocationPermission = async () => {
    if (Platform.OS === "ios") {
      getOneTimeLocation();
    } else {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: "Location Access Required",
            message: "Stayput want to Access your location",
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          //To Check, If Permission is granted
          getOneTimeLocation();
        }
      } catch (err) {
        setLoading(false);
        console.warn(err);
      }
    }
  };
  const getOneTimeLocation = async () => {
    Geolocation.getCurrentPosition(
      (position) => {
        const currentLongitude = JSON.stringify(position.coords.longitude);
        const currentLatitude = JSON.stringify(position.coords.latitude);
        let locationInfo = {
          latitude: currentLatitude,
          longitude: currentLongitude,
        };

        global.locationInfo = locationInfo;
        setLoading(false);
      },
      (error) => {
        // See error code charts below.
        console.log(error.code, error.message);
      },
      { enableHighAccuracy: false, timeout: 15000, maximumAge: 10000 }
    );
    setLoading(false);
    return;
  };

  useEffect(() => {
    getUserData();
  }, []);

  const getUserData = async () => {
    setLoading(true);
    const value = await GetData(LOGIN_KEY);
    setLoading(false);

    if (value) {
      const user_profile = JSON.parse(value);
      const is_completed = user_profile.is_completed;
      global.userId = user_profile?.id;
      setTimeout(() => {
        if (is_completed == "1") {
          resetStack(
            assets.NavigationConstants.DASHBOARD.NAME,
            null,
            navigation
          );
        } else if (is_completed == "0") {
          // resetStack(
          //   assets.NavigationConstants.STACKS.COMPLETE_PROFILE_STACK,
          //   null,
          //   navigation
          // );
          checkPaths();
        } else {
          null;
        }
      }, 3000);
    } else {
      setTimeout(() => {
        navigation.navigate(assets.NavigationConstants.AUTH_STACK.NAME);
      }, 3000);
    }
  };

  const checkPaths = async () => {
    let routes = await getStoredData("PATH");
    for (var key in routes) {
      if (routes.hasOwnProperty(key)) {
        if (!routes[key]) {
          resetStack(key, null, navigation);

          return;
        }
      }
    }
  };

  const Loader = () => {
    return (
      <ActivityIndicator
        animating={isLoading}
        size="small"
        color={"orange"}
      ></ActivityIndicator>
    );
  };
  return (
    <SafeAreaView style={[pallete.mainContainor]}>
      <View
        style={{
          height: "100%",
          width: "100%",
          backgroundColor: "transparent",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Image
          style={{ height: 250, width: 250, marginTop: -100 }}
          resizeMode="contain"
          source={assets.Images.APP_LOGO}
        ></Image>
        <Loader></Loader>
      </View>
    </SafeAreaView>
  );
};
export default Splash;
