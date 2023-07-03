import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  Text,
  Image,
  Modal,
  ActivityIndicator,
  Pressable,
  Platform,
  KeyboardAvoidingView,
  Linking,
  AppState,
} from "react-native";
import assets from "../../assets";
import useStyle from "./style";
import usePallete from "../../assets/Pallete";
import { useNavigation, useFocusEffect } from "@react-navigation/native";

import Button from "../../common_components/Button";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import RNPermissions, {
  NotificationsResponse,
  Permission,
  PERMISSIONS,
  PermissionStatus,
} from "react-native-permissions";

import {
  IosLocationPermission,
  AndroidLocationPermission,
} from "../../assets/Constants/Constants";
var isBlocked = false;
const LocationPermission = () => {
  const pallete = usePallete();
  const styles = useStyle();
  const { navigate, goBack } = useNavigation();
  const navigation = useNavigation();
  const [appPermission, setappPermission] = useState("Enable Location");
  const permissionArray =
    Platform.OS === "android"
      ? AndroidLocationPermission
      : IosLocationPermission;
  const openSetting = React.useCallback(async () => {
    if (Platform.OS === "ios") {
      await Linking.openURL("app-settings:");
    } else {
      await Linking.openSettings();
    }

    console.log("REturned from setttings");
  }, []);

  const _handleAppStateChange = (nextAppState) => {
    if (nextAppState === "active") {
      isBlocked = false;
      console.log("App has come to the foreground!");
      goBack();
    }
  };
  useEffect(() => {
    const listener = AppState.addEventListener("change", _handleAppStateChange);
    return () => listener.remove();
  }, []);

  const check = React.useCallback(() => {
    isBlocked = false;
    RNPermissions.checkMultiple(permissionArray)
      .then((data) => {
        for (let index = 0; index < permissionArray.length; index++) {
          if (
            data[permissionArray[index]] === "blocked" ||
            data[permissionArray[index]] === "denied" ||
            data[permissionArray[index]] === "unavailable"
          ) {
            isBlocked = true;
            openSetting();
          }
        }

        if (!isBlocked) {
          setTimeout(() => {
            navigation.goBack();
          }, 200);
        }
        console.log("location blocked==", isBlocked);
      })
      .then(() => RNPermissions.checkNotifications())
      .then((data) => {})
      .catch((error) => console.warn(error));
  }, []);

  const requestPermission = () => {
    RNPermissions.requestMultiple(permissionArray)
      .then(check)
      .catch((error) => console.error("error_requesting_permission", error));
  };
  return (
    <SafeAreaView style={[pallete.mainContainor]}>
      <KeyboardAwareScrollView style={styles.scrollContainer}>
        <Image source={assets.Images.STAY_PUT_LOGO} style={styles.logo} />
        <Text style={styles.subtitle}>Enable Geolocation</Text>
        <Image
          source={assets.Images.LOCATION_ICON}
          style={[styles.logo, { marginTop: 50 }]}
        />
        <Text style={[styles.subtitle, { marginTop: 20 }]}>
          By allowing geolocation you are able to fetch your current location in
          stayput and help your runner to deliever the goodies easily to your
          door step.
        </Text>

        <Button
          style={styles.spaceTop}
          event={() => requestPermission()}
          bgcolor={assets.Colors.BUTTON_THEME_COLOR}
          title={appPermission}
          txt={"white"}
        />
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};
export default LocationPermission;
