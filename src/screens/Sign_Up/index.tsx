import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  Text,
  Image,
  Modal,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
} from "react-native";
import assets from "../../assets";
import useStyle from "./style";
import usePallete from "../../assets/Pallete";
import { useNavigation } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";
import Button from "../../common_components/Button";
import BackButton from "../../common_components/BackButton";
import Text_Input from "../../common_components/Text_Input";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { dW } from "../../utils/dynamicHeightWidth";
import {
  RUNNER_CREATE,
  TERM_CONDITION_LINK,
  PRIVACY_LINK,
} from "../../Services/ApiUrls";
import {
  SaveData,
  resetStack,
  showToastMessage,
  validateEmail,
  GetData,
  validateNumber,
} from "../../utils/utilities";
import { storeData, getStoredData } from "../../Storage/ApplicationStorage";
import { useRest, CALL_TYPES, LOADING_TYPES } from "../../Services/rest/api";
import { ACCESS_TOKEN, LOGIN_KEY } from "../../Storage/ApplicationStorage";
var TOKEN = null;
import * as RNLocalize from "react-native-localize";
// const registerActions = {
//   { Otp_verify: false, route_name: "Otp_verify" },
//   { Complete_Profile: false, route_name: "Complete_Profile" },
//   { Qualification: false, route_name: "Qualification" },
//   { Profile_Steps: false, route_name: "Profile_Steps" },
//   { License_Verification: false, route_name: "License_Verification" },
//   { Verified_License: false, route_name: "Verified_License" },
//   { Vehicle_Info: false, route_name: "Vehicle_Info" },
//   { Paperwork: false, route_name: "Paperwork" },
//   { BG_Ckeck_Copy: false, route_name: "BG_Ckeck_Copy" },
//   { Background_Check: false, route_name: "Background_Check" },
//   { Background_check_report: false, route_name: "Background_check_report" },
//   { Direct_Deposit: false, route_name: "Direct_Deposit" },
//   { StayPut_Card: false, route_name: "StayPut_Card" },
//   { Shipping_Information: false, route_name: "Shipping_Information" },
//   { Card_OnWay: false, route_name: "Card_OnWay" },
//   { dashboard: false, route_name: "dashboard" },
// };
const registerActions = {
  Verify_code: false,
  //route_name: "Otp_verify",

  // Complete_Profile: false,
  //route_name: "Complete_Profile",
  Qualification: false,
  //route_name: "Qualification",
  Profile_Steps: false,
  //route_name: "Profile_Steps",
  License_Verification: false,
  //route_name: "License_Verification",
  Verified_License: false,
  // route_name: "Verified_License",
  Vehicle_Info: false,
  //route_name: "Vehicle_Info",
  Paperwork: false,
  // route_name: "Paperwork",
  BG_Ckeck_Copy: false,
  //route_name: "BG_Ckeck_Copy",
  Background_Check: false,
  //route_name: "Background_Check",
  Background_check_report: false,
  //route_name: "Background_check_report",
  Direct_Deposit: false,
  // route_name: "Direct_Deposit",
  StayPut_Card: false,
  //route_name: "StayPut_Card",
  Shipping_Information: false,
  //route_name: "Shipping_Information",
  Card_OnWay: false,
  //route_name: "Card_OnWay",
  dashboard: false,
  //route_name: "dashboard",
};
const Sign_Up = () => {
  const pallete = usePallete();
  const styles = useStyle();
  const { navigate, goBack } = useNavigation();
  const navigation = useNavigation();
  const [check, setCheck] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [mob_numb, setMob_Numb] = useState("");
  const [password, setPassword] = useState("");
  const [confirm_Pass, setConfirm_Pass] = useState("");
  const [refrral, setReferral] = useState("");
  const [secure_pass, setSecure_pass] = useState(true);
  const [secure_confirmPass, setSecure_confirmPass] = useState(true);

  
  const sign_upPayload = {
    firstname: firstName.trim(),
    lastname: lastName.trim(),
    email: email.trim(),
    phone: mob_numb.trim(),
    password: password.trim(),
    referel_code: refrral.trim(),
    license_image: "",
    vehicle_type: "",
    vehicle_model: "",
    vehicle_color: "",
    vin: "",
    bg_firstname: "",
    bg_lastname: "",
    bg_address: "",
    bg_apt: "",
    bg_social_security_number: "",
    routing_number: "",
    account_number: "",
    shipping_address1: "",
    shipping_address2: "",
    city: "",
    state: "",
    firebase_token: TOKEN,
    zipcode: "",
    step: "0",
  };

  const { data, loading, error, fetchData, responseCode } = useRest({
    URL: RUNNER_CREATE,
    PAYLOAD: sign_upPayload,
    CALL_TYPE: CALL_TYPES.POST,
    lazy: true,
  });
  useEffect(() => {
    getFcToken();
    initalizeRoutes();
  }, []);
  const initalizeRoutes = async () => {
    await storeData("PATH", registerActions);
  };

  useEffect(() => {
    console.log("DATA==", data, error, responseCode);
    if (data) {
      if (data.status == 200) {
        saveLoginData(data);
      } else {
        setTimeout(() => {
          showToastMessage(data.message);
        }, 300);
      }
    }
  }, [data, error, responseCode]);

  const getFcToken = async () => {
    TOKEN = await GetData("F_TOKEN");
  };
  const saveLoginData = async (data) => {
    global.userId = data?.data?.id;
    global.currentUserId = data?.data?.id;
    global.userInfo = data?.data;
    await SaveData(LOGIN_KEY, JSON.stringify(data.data));
    await SaveData(ACCESS_TOKEN, data.data.access_token);
    await storeData("OTP_NUMBER", mob_numb).then(() => {
      navigate(assets.NavigationConstants.OTP_SCREEN.NAME);
    });
  };

  const isValid_signUp = () => {
    if (!firstName.trim()) {
      showToastMessage("first name is required");
      return false;
    } else if (!lastName.trim()) {
      showToastMessage("last name is required");
      return false;
    } else if (!email.trim()) {
      showToastMessage("Email Address is required");
      return false;
    } else if (!validateEmail(email.trim())) {
      showToastMessage("enter valid email address");
      return false;
    } else if (!mob_numb.trim()) {
      showToastMessage("mobile number is required");
      return false;
    } else if (!validateNumber(mob_numb.trim())) {
      showToastMessage("Please enter valid mobile number");
      return false;
    } else if (mob_numb.trim().length != 10) {
      showToastMessage("enter 10 digit mobile number");
      return false;
    } else if (!password.trim()) {
      showToastMessage("Password is required");
      return false;
    } else if (password.trim().length < 8) {
      showToastMessage("Password requires a minimum of 8 digits");
      return false;
    } else if (!confirm_Pass.trim()) {
      showToastMessage("confirm password is required");
      return false;
    } else if (confirm_Pass.trim().length < 8) {
      showToastMessage("Confirm Password requires a minimum of 8 digits");
      return false;
    } else if (password.trim() != confirm_Pass.trim()) {
      showToastMessage("password are not match");
      return false;
    } else if (!check) {
      showToastMessage("Please agree to terms & conditions");
      return false;
    }
    return true;
  };

  const Validsign_up = () => {
    if (isValid_signUp()) {
      fetchData(0);
    }
  };
  return (
    <SafeAreaView style={[pallete.mainContainor]}>
      <BackButton onBackPress={() => goBack()} />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView style={[pallete.screen_container]}>
          <View style={styles.center_content}>
            <Modal
              visible={
                loading === LOADING_TYPES.LOADING ||
                loading === LOADING_TYPES.FETCHING_MORE
              }
              transparent={true}
            >
              <View style={[pallete.Loader_View]}>
                <ActivityIndicator
                  size="large"
                  color="white"
                  justifyContent={"center"}
                  marginTop="100%"
                />
              </View>
            </Modal>
            <Image source={assets.Images.LOGO} style={styles.logoStyle} />
          </View>
          <Text style={styles.title}>Welcome to StayPut </Text>
          <Text style={styles.subtitle}>Get Ready to Run!</Text>
          <View style={styles.accountSignin_View}>
            <Text style={styles.hveAccnt}>Already have an account? </Text>
            <Text
              onPress={() => navigate(assets.NavigationConstants.LOG_IN.NAME)}
              style={styles.sign_in}
            >
              Sign in
            </Text>
          </View>
          <View style={styles.bttn_width}>
            <View style={styles.row_inputs_view}>
              <Text_Input
                keyboard_type={""}
                placeholdertxt={assets.Colors.PLACEHOLDER_TEXT_COLOR}
                event={(text) => setFirstName(text)}
                edit={firstName}
                style={[styles.space_vertical, styles.input_row]}
                subtitle={""}
                title="First Name"
              />
              <View style={styles.horizontal_spacer} />
              <Text_Input
                keyboard_type={""}
                placeholdertxt={assets.Colors.PLACEHOLDER_TEXT_COLOR}
                event={(text) => setLastName(text)}
                edit={lastName}
                style={[styles.space_vertical, styles.input_row]}
                subtitle={""}
                title="Last Name"
              />
            </View>
            <Text_Input
              keyboard_type={""}
              placeholdertxt={assets.Colors.PLACEHOLDER_TEXT_COLOR}
              event={(text) => setEmail(text)}
              edit={email}
              style={styles.space_vertical}
              subtitle={""}
              title="Email Address"
            />
            <Text_Input
              keyboard_type="numeric"
              placeholdertxt={assets.Colors.PLACEHOLDER_TEXT_COLOR}
              event={(text) => setMob_Numb(text)}
              edit={mob_numb}
              style={styles.space_vertical}
              subtitle={RNLocalize.getCountry() == "IN" ? "+91" : "+1"}
              title="Mobile Number"
            />
            <View style={styles.row_inputs_view}>
              <Text_Input
                keyboard_type={""}
                placeholdertxt={assets.Colors.INPUT_HOLDER_TXT_COLOR}
                event={(text) => setPassword(text)}
                edit={password}
                style={styles.space_vertical}
                title="Password"
                // secureEntry={secure_pass}
                subtitle={"at least 8 characters"}
              />
              <Text
                onPress={() => setSecure_pass(!secure_pass)}
                style={styles.show}
              >
                {secure_pass ? "Show" : "Hide"}
              </Text>
            </View>
            <View style={styles.row_inputs_view}>
              <Text_Input
                keyboard_type={""}
                placeholdertxt={assets.Colors.PLACEHOLDER_TEXT_COLOR}
                event={(text) => setConfirm_Pass(text)}
                edit={confirm_Pass}
                style={styles.space_vertical}
                title="Confirm Password"
                // secureEntry={secure_confirmPass}
                subtitle={""}
              />
              <Text
                onPress={() => setSecure_confirmPass(!secure_confirmPass)}
                style={styles.show}
              >
                {secure_confirmPass ? "Show" : "Hide"}
              </Text>
            </View>
            <Text_Input
              keyboard_type={""}
              placeholdertxt={assets.Colors.INPUT_HOLDER_TXT_COLOR}
              event={(text) => setReferral(text)}
              edit={refrral}
              style={styles.space_vertical}
              subtitle={"Optional"}
              title="Referral Code"
            />
          </View>
          <View style={[styles.bottom_row, styles.space_vertical]}>
            <FontAwesome
              name={check == false ? "square-o" : "check-square-o"}
              color={assets.Colors.ACCOUNT_TXT_COLOR}
              size={25}
              style={{ marginRight: dW(10) }}
              onPress={() => setCheck(!check)}
            />
            <Text style={styles.checked}>I'm over 18 years old</Text>
          </View>
          <View style={styles.bottom_view}>
            <View style={styles.bottom_row}>
              <Text style={styles.bottomTxt}>
                By signing up, you agree to StayPut's
              </Text>

              <Pressable
                onPress={() =>
                  navigate(assets.NavigationConstants.WEBVIEW_LINK.NAME, {
                    Link: TERM_CONDITION_LINK,
                    title: "Terms and Conditions",
                  })
                }
              >
                <Text style={styles.terms_condition}> Terms and </Text>
              </Pressable>
            </View>
            <View style={styles.bottom_row}>
              <Pressable
                onPress={() =>
                  navigate(assets.NavigationConstants.WEBVIEW_LINK.NAME, {
                    Link: TERM_CONDITION_LINK,
                    title: "Terms and Conditions",
                  })
                }
              >
                <Text style={styles.terms_condition}> Conditions </Text>
              </Pressable>
              <Text style={styles.bottomTxt}> and acknowledge you have</Text>
            </View>
            <View style={styles.bottom_row}>
              <Text style={styles.bottomTxt}> read the</Text>
              <Pressable
                onPress={() =>
                  navigate(assets.NavigationConstants.WEBVIEW_LINK.NAME, {
                    Link: PRIVACY_LINK,
                    title: "Privacy Policy",
                  })
                }
              >
                <Text style={styles.terms_condition}> Privacy Policy.</Text>
              </Pressable>
            </View>
          </View>
          <View style={[styles.center_content, pallete.mb_30]}>
            <Button
              imgBG={""}
              style={styles.bttn}
              txt={assets.Colors.BACKGROUND_THEME_COLOR}
              event={Validsign_up}
              bgcolor={assets.Colors.BUTTON_THEME_COLOR}
              image={false}
              img={""}
              title="Sign up"
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
export default Sign_Up;
