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
} from "react-native";
import assets from "../../assets";
import useStyle from "./style";
import usePallete from "../../assets/Pallete";
import { useNavigation } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";
import Text_Input from "../../common_components/Text_Input";
import Button from "../../common_components/Button";
import { SEND_OTP_URL } from "../../Services/ApiUrls";
import {
  SaveData,
  showToastMessage,
  validateEmail,
} from "../../utils/utilities";
import { useRest, CALL_TYPES, LOADING_TYPES } from "../../Services/rest/api";
import { OTP_KEY } from "../../Storage/ApplicationStorage";
import BackButton from "../../common_components/BackButton";
const Pass_forgot = () => {
  const pallete = usePallete();
  const styles = useStyle();
  const { navigate, goBack } = useNavigation();
  const navigation = useNavigation();
  const [email, setEmail] = useState("");

  const otp_payload = {
    email: email.trim(),
    type: "1",
  };

  const { data, loading, error, fetchData, responseCode } = useRest({
    URL: SEND_OTP_URL,
    PAYLOAD: otp_payload,
    CALL_TYPE: CALL_TYPES.POST,
    lazy: true,
  });

  useEffect(() => {
    console.log("DATA==", data, error, responseCode);
    if (data) {
      setTimeout(() => {
        showToastMessage(data.message);
      }, 300);
      if (data.status == 200) {
        navigate(assets.NavigationConstants.FORGOT_PASSWORD_OTP.NAME, {
          Email: email.trim(),
          otp: data?.data?.otp,
        });
      }
    }
  }, [data, error, responseCode]);

  const isLoginValid = () => {
    if (!email.trim()) {
      showToastMessage("email id is required");
      return false;
    } else if (!validateEmail(email.trim())) {
      showToastMessage("enter valid email address");
      return false;
    }
    return true;
  };
  const Otp_send = () => {
    if (isLoginValid()) {
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
        <ScrollView style={styles.scrollContainer}>
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
          <Image source={assets.Images.STAY_PUT_LOGO} style={styles.logo} />
          <Text style={styles.subtitle}>Stay put, we'll get it for you!</Text>
          <Text_Input
            placeholdertxt={assets.Colors.INPUT_HOLDER_TXT_COLOR}
            event={(text) => setEmail(text)}
            edit={email}
            style={[styles.space_vertical, styles.spaceTop]}
            subtitle={"greg@nakedconstruction.com"}
            title="Email Address"
          />
          <Button
            imgBG={""}
            style={styles.spaceTop}
            txt={assets.Colors.BACKGROUND_THEME_COLOR}
            event={Otp_send}
            bgcolor={assets.Colors.BUTTON_THEME_COLOR}
            image={false}
            img={""}
            title="Next"
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
export default Pass_forgot;
