import React, { useState, useEffect, useRef } from "react";
import {
  SafeAreaView,
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from "react-native";
import assets from "../../assets";
import useStyle from "./style";
import usePallete from "../../assets/Pallete";
import { useIsMounted } from "./isMounted";
import { useNavigation } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";
import Button from "../../common_components/Button";
import OTPTextInput from "react-native-otp-textinput";
import { getStoredData, storeData } from "../../Storage/ApplicationStorage";
import auth from "@react-native-firebase/auth";
import { showToastMessage } from "../../utils/utilities";
import { dW } from "../../utils/dynamicHeightWidth";
import BackButton from "../../common_components/BackButton";
//import { useAnalytics } from "@segment/analytics-react-native";
var RESET_INTERVAL = 300;
//var RESET_INTERVAL = 720;
import * as RNLocalize from "react-native-localize";
var last_numbers = "";
const Otp_verify = ({ route }) => {
  const pallete = usePallete();
  const styles = useStyle();
  //const { track } = useAnalytics();
  const navigation = useNavigation();
  const [otp, setOtp] = useState("");
  const [currentState, setCurrentState] = useState(false);
  //const usernumber = route?.params?.phoneNumber;
  const [confirm, setConfirm] = useState(null);
  //const last_numbers = usernumber?.replace(/.(?=.{4,}$)/g, "");
  const [time, setTime] = useState(0);
  const [RESET_INTERVAL_S, setIntervalReset] = useState(RESET_INTERVAL);
  const isMounted = useIsMounted();
  useEffect(() => {
    setTimeout(() => {
      signInWithPhoneNumber();
    }, 1000);
  }, []);

  const setPaths = async () => {
    let data = await getStoredData("PATH");
    console.log("setpaths==", data);
    await storeData("PATH", { ...data, Verify_code: true }).then(() => {
      navigation.navigate(
        assets.NavigationConstants.STACKS.COMPLETE_PROFILE_STACK
      );
    });
  };

  useEffect(() => {
    var timerId = null;
    if (isMounted()) {
      if (confirm) {
        setIntervalReset(RESET_INTERVAL);
        timerId = setInterval(() => {
          time >= RESET_INTERVAL_S ? null : setTime((t) => t + 1);
        }, 1000);
      }
      return () => {
        if (timerId) clearInterval(timerId);
      };
    }
  }, [confirm, time]);

  const Timer = (time) => {
    const timeRemain = RESET_INTERVAL_S - (time % RESET_INTERVAL_S);
    return (
      <Text>
        {time >= RESET_INTERVAL_S
          ? null
          : `${"You can resend otp in "} ${formatTime(timeRemain)} ${"min"}`}
      </Text>
    );
  };
  const formatTime = (time) =>
    `${String(Math.floor(time / 60)).padStart(2, "0")}:${String(
      time % 60
    ).padStart(2, "0")}`;

  const signInWithPhoneNumber = async () => {
    let phoneNumber = await getStoredData("OTP_NUMBER");
    last_numbers = phoneNumber.replace(/.(?=.{4,}$)/g, "");
    try {
      const confirmation = await auth().signInWithPhoneNumber(
        RNLocalize.getCountry() == "IN"
          ? "+91" + phoneNumber
          : "+1" + phoneNumber
      );
      saveCodeSetting(confirmation);
    } catch (e) {
      console.log("error==", e);
    }
  };
  const saveCodeSetting = (data) => {
    console.log("saveCodeSetting.result", JSON.stringify(data));
    setCurrentState(!currentState);
    setConfirm(data);
    setTime(0);
  };

  const confirmCode = async () => {
    try {
      const res = await confirm.confirm(otp);
      console.log("OTP Success====", JSON.stringify(res));
      global.universalObject.logEvent("Account-Verified", {
        customData: {
          anonymousid: global.userId,
          device: Platform.OS,
          Screen: "Verify_code",
          URL: "https://projects.invisionapp.com/d/main?origin=v7#/console/21738858/462741871/preview?scrollOffset=71#project_console",
        },
      });
      if (res?.additionalUserInfo) {
        setPaths();
      } else {
        showToastMessage("OTP does't match");
      }
    } catch (error) {
      console.log("OTP error====", JSON.stringify(error));
      if (error.code == "auth/invalid-verification-code") {
        showToastMessage("Invalid code");
      } else if (error.code === "auth/provider-already-linked") {
      } else {
        showToastMessage("Invalid code");
        // showToastMessage(error.message);
      }
      // navigation.navigate(
      //   assets.NavigationConstants.STACKS.COMPLETE_PROFILE_STACK
      // );
    }
  };

  const resend = () => {
    signInWithPhoneNumber();
    // setTime(0);
  };

  const is_otp = () => {
    if (!otp.trim()) {
      showToastMessage("Please enter your OTP");
      return false;
    } else if (otp.trim().length != 6) {
      showToastMessage("Please enter 6 digit OTP");
      return false;
    }
    return true;
  };

  const verify_OTP = () => {
    if (is_otp()) {
      confirmCode();
    }
  };

  return (
    <SafeAreaView style={[pallete.mainContainor]}>
      <BackButton onBackPress={() => navigation.goBack()}></BackButton>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView style={styles.scrollContainer}>
          <View style={styles.screenContainer}>
            <Text style={styles.verify_id}>Verify Your Identity</Text>
            <Text style={styles.smallTxt}>
              Enter the 6-digit code we send to the phone number ending in{" "}
              {last_numbers}
            </Text>
            <OTPTextInput
              defaultValue={otp}
              inputCount={6}
              handleTextChange={(e) => setOtp(e)}
              containerStyle={styles.otp_container}
              textInputStyle={styles.otp_input}
              tintColor={assets.Colors.INACTIVE_STORE_BG_COLOR}
            />
            {time < RESET_INTERVAL ? (
              <Text style={styles.timer_txt}>
                {" "}
                {time != 0 ? (
                  <Text style={styles.timer_txt}>{Timer(time)}</Text>
                ) : null}
              </Text>
            ) : (
              <Text onPress={resend} style={styles.resendCode}>
                Resend Code
              </Text>
            )}
          </View>
        </ScrollView>
        <Button
          imgBG={""}
          style={styles.buttn}
          txt={assets.Colors.BACKGROUND_THEME_COLOR}
          event={verify_OTP}
          bgcolor={assets.Colors.BUTTON_THEME_COLOR}
          image={false}
          img={""}
          title="Continue"
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
export default Otp_verify;
