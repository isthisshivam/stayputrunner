import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  Text,
  Modal,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Image,
} from "react-native";
import assets from "../../assets";
import useStyle from "./style";
import usePallete from "../../assets/Pallete";
import { useNavigation } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";
import Text_Input from "../../common_components/Text_Input";
import SVG_View from "../../common_components/SVG_View";
import Button from "../../common_components/Button";
import { RUNNER_CREATE, CREATE_STRIPE_HOLDER } from "../../Services/ApiUrls";
import {
  SaveData,
  showToastMessage,
  validateEmail,
} from "../../utils/utilities";
import { useRest, CALL_TYPES, LOADING_TYPES } from "../../Services/rest/api";

import {
  ACCESS_TOKEN,
  getData,
  LOGIN_KEY,
} from "../../Storage/ApplicationStorage";
import BackButton from "../../common_components/BackButton";
import { getStoredData, storeData } from "../../Storage/ApplicationStorage";
const Deposit = ({ route }) => {
  const background = route?.params?.payload;
  const pallete = usePallete();
  const styles = useStyle();
  const { navigate, goBack } = useNavigation();
  const [rout_numb, setRout_Numb] = useState("");
  const [acct_numb, setAcct_Numb] = useState("");
  const [applicant_id, setapplicant_id] = useState("");
  const [back_info, setBackInfo] = useState(null);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  // background.routing_number = rout_numb.trim();
  // background.account_number = acct_numb.trim();
  // background.step = "3";

  const payload = {
    applicant_id: applicant_id,
    routing_number: rout_numb.trim(),
    account_number: acct_numb.trim(),
    step: "3",
  };
  const { data, loading, error, fetchData, responseCode } = useRest({
    URL: RUNNER_CREATE,
    PAYLOAD: payload,
    CALL_TYPE: CALL_TYPES.POST,
    lazy: true,
  });

  const setPaths = async () => {
    let data = await getStoredData("PATH");

    await storeData("PATH", { ...data, Direct_Deposit: true }).then(() => {
      navigate(assets.NavigationConstants.STAYPUT_CARD.NAME);
    });
  };
  const getbackInfo = async () => {
    let BACKGROUND_PAYLOAD_EXTRACTED = await getStoredData(
      "BACKGROUND_PAYLOAD_EXTRACTED"
    );
    setapplicant_id(BACKGROUND_PAYLOAD_EXTRACTED?.applicant_id);
  };
  useEffect(() => {
    getbackInfo();
    console.log("Deposit Data==", data, error, responseCode);
    if (data) {
      const status = data.status;
      if (status == 200) {
        saveLoginData(data);
        showToastMessage(data.message);
        setPaths();
      } else {
        setTimeout(() => {
          showToastMessage(data.message);
        }, 300);
      }
    }
  }, [data, error, responseCode]);
  useEffect(() => {
    _getLoginData();
  }, []);
  const _getLoginData = async () => {
    var login_data = await getData(LOGIN_KEY);
    login_data = JSON.parse(login_data);
    setEmail(login_data.email);
    setName(login_data.firstname + " " + login_data.lastname);
  };

  const saveLoginData = async (data) => {
    await SaveData(LOGIN_KEY, JSON.stringify(data.data));
    await SaveData(ACCESS_TOKEN, data.data.access_token);
  };

  const isValid_directDeposit = () => {
    if (!rout_numb.trim()) {
      showToastMessage("Please enter routing number");
      return false;
    } else if (!acct_numb.trim()) {
      showToastMessage("Please enter account number");
      return false;
    }
    return true;
  };
  const Valid_Deposit = () => {
    if (isValid_directDeposit()) {
      fetchData(0);
    }
  };
  return (
    <SafeAreaView style={[pallete.mainContainor]}>
      <BackButton
        onBackPress={() =>
          navigate(assets.NavigationConstants.BACKCHECK_REPORT.NAME)
        }
      ></BackButton>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView style={styles.scrollContainer}>
          <View style={[pallete.mb_50]}>
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
            <Text style={styles.title}>Set up direct deposit</Text>
            <Text_Input
              keyboard_type="numeric"
              placeholdertxt={assets.Colors.PLACEHOLDER_TEXT_COLOR}
              event={(text) => setRout_Numb(text)}
              edit={rout_numb}
              style={[styles.space_vertical, styles.topSpacer]}
              subtitle={""}
              title="Routing number"
            />
            <Text_Input
              keyboard_type="numeric"
              placeholdertxt={assets.Colors.PLACEHOLDER_TEXT_COLOR}
              event={(text) => setAcct_Numb(text)}
              edit={acct_numb}
              style={styles.space_vertical}
              subtitle={""}
              title="Account number"
            />
            <Image
              source={assets.Images.CHECK_ROUTING_ICON}
              style={styles.logo}
            />
            <View style={styles.row_content}>
              <Text style={styles.txt}>Routing number</Text>
              <Text style={styles.txt}>Account number</Text>
            </View>
            <View style={[styles.bottom_content, styles.topSpacer]}>
              <Text style={styles.bottomtxt}>
                By clicking save, you agree to{" "}
              </Text>
              <Text style={styles.colortxt}> Stripe's</Text>
            </View>
            <Text style={styles.colortxt}>Connected Account Agreement.</Text>
          </View>
        </ScrollView>
        <Button
          imgBG={""}
          style={[styles.buttn, pallete.mb_10]}
          txt={assets.Colors.BACKGROUND_THEME_COLOR}
          event={Valid_Deposit}
          bgcolor={assets.Colors.BUTTON_THEME_COLOR}
          image={false}
          img={""}
          title="Save & Continue"
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
export default Deposit;
