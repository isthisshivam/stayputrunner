import React, { useState, useEffect, useRef } from "react";
import {
  SafeAreaView,
  View,
  Text,
  Modal,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Image,
  Pressable,
} from "react-native";
import assets from "../../assets";

import useStyle from "./style";
import ImagePicker from "react-native-image-crop-picker";
import usePallete from "../../assets/Pallete";
import { useNavigation } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";
import Text_Input from "../../common_components/Text_Input";
import Button from "../../common_components/Button";
import { TextInputMask } from "react-native-masked-text";
import Imagepicker_View from "../../common_components/Imagepicker_View";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { RUNNER_ADD_PAYMENT_METHOD } from "../../Services/ApiUrls";
import {
  showToastMessage,
  requestAndroidCameraPermission,
} from "../../utils/utilities";
import { useRest, CALL_TYPES, LOADING_TYPES } from "../../Services/rest/api";
var DOC_TYPE = null;
const Add_Payment_Method = ({ route }) => {
  const pallete = usePallete();
  const styles = useStyle();
  const { navigate, goBack } = useNavigation();
  const [popup, setPopup] = useState(false);
  const [rout_numb, setRout_Numb] = useState("");
  const [acct_numb, setAcct_Numb] = useState("");

  const [dob, setDOB] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [businessUrl, setBusinessUrl] = useState("");

  const [businessCity, setBusinessCity] = useState("");
  const [businessAddressLine, setBusinessAddressLine] = useState("");

  const [businessPostalCode, setBusinessPostalCode] = useState("");
  const [taxId, setTaxId] = useState("");

  const [last4Ssn, setLast4Ssn] = useState("");
  const [phnNumber, setPhnNumber] = useState("");

  const [verifiedImage, setverifiedImage] = useState(null);
  const [verifiedBankImage, setverifiedBankImage] = useState(null);

  const [account_holder_name, setAcc_holderName] = useState("");

  const CARD_DETAILS_PAYLOAD = {
    routing_number: rout_numb,
    account_number: acct_numb,
    account_holder_name: account_holder_name,
  };
  const { data, loading, error, fetchData, responseCode } = useRest({
    URL: RUNNER_ADD_PAYMENT_METHOD,
    PAYLOAD: CARD_DETAILS_PAYLOAD,
    CALL_TYPE: CALL_TYPES.POST,
    lazy: true,
  });

  useEffect(() => {
    if (data) {
      const status = data.status;
      if (status == 200) {
        setTimeout(() => {
          showToastMessage("Payment Method added Successfully.");
        }, 300);
        setTimeout(() => {
          navigate(assets.NavigationConstants.PAYMENT_METHOD.NAME);
        }, 500);
      } else {
        setTimeout(() => {
          showToastMessage(data.message);
        }, 300);
      }
    }
  }, [data, error, responseCode]);

  const isValid_directDeposit = () => {
    if (!businessName.trim()) {
      showToastMessage("Please enter Business Name");
      return false;
    } else if (!businessUrl.trim()) {
      showToastMessage("Please enter Business Url");
      return false;
    } else if (!businessCity.trim()) {
      showToastMessage("Please enter Business City");
      return false;
    } else if (!businessAddressLine.trim()) {
      showToastMessage("Please enter Business Address Line");
      return false;
    } else if (!businessPostalCode.trim()) {
      showToastMessage("Please enter Business Postal Code");
      return false;
    } else if (!taxId.trim()) {
      showToastMessage("Please enter Tax ID");
      return false;
    } else if (!last4Ssn.trim()) {
      showToastMessage("Please enter SSN Number");
      return false;
    } else if (last4Ssn.trim().length != 4) {
      showToastMessage("Please enter 4 digit SSN Number");
      return false;
    } else if (!phnNumber.trim()) {
      showToastMessage("Please enter Phone Number");
      return false;
    } else if (phnNumber.trim().length != 10) {
      showToastMessage("Please enter 10 digit Phone Number");
      return false;
    } else if (!dob.trim()) {
      showToastMessage("Please enter Date of Birth");
      return false;
    } else if (!account_holder_name.trim()) {
      showToastMessage("Please enter account holder name");
      return false;
    } else if (!rout_numb.trim()) {
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

  const chooseFile = async () => {
    await ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
    }).then((image) => {
      if (DOC_TYPE == "BAVD") setverifiedBankImage(image?.path);
      else setverifiedImage(image?.path);
    });
  };
  const waitChooseFile = () => {
    setTimeout(() => {
      chooseFile();
    }, 500);
  };
  const requestCameraPermission = async () => {
    if (Platform.OS === "android") {
      const permission = await requestAndroidCameraPermission();
      if (permission) openCamera();
    } else {
      waitCameraInflation();
    }
  };
  const waitCameraInflation = () => {
    setTimeout(() => {
      openCamera();
    }, 1000);
  };
  const openCamera = async () => {
    await launchCamera({
      mediaType: "photo",
      cameraType: "front" || "back",
    })
      .then((result) => {
        if (DOC_TYPE == "BAVD") setverifiedBankImage(result?.assets[0]?.uri);
        else setverifiedImage(result?.assets[0]?.uri);
      })
      .catch((e) => {
        console.log("Camera-error====", JSON.stringify(e));
      });
  };
  const Header = () => {
    return (
      <View style={styles.header}>
        <MaterialCommunityIcons
          name="arrow-left"
          color={assets.Colors.BLACK_COLOR}
          size={35}
          onPress={() =>
            navigate(assets.NavigationConstants.PAYMENT_METHOD.NAME)
          }
        />
        <View style={styles.location}>
          <Text style={styles.titleH}>{"Bank Information"}</Text>
          <Text style={styles.subtitle}>{"Direct Deposit"}</Text>
        </View>
        <View></View>
      </View>
    );
  };
  return (
    <View style={[pallete.mainContainor]}>
      {Header()}
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

            <Text_Input
              placeholdertxt={assets.Colors.PLACEHOLDER_TEXT_COLOR}
              event={(text) => setBusinessName(text)}
              edit={businessName}
              style={styles.space_vertical}
              subtitle={""}
              title="Business Name"
              // editable={false}
            />
            <Text_Input
              placeholdertxt={assets.Colors.PLACEHOLDER_TEXT_COLOR}
              event={(text) => setBusinessUrl(text)}
              edit={businessUrl}
              style={styles.space_vertical}
              subtitle={""}
              title="Business URL"
              // editable={false}
            />
            <Text_Input
              placeholdertxt={assets.Colors.PLACEHOLDER_TEXT_COLOR}
              event={(text) => setBusinessCity(text)}
              edit={businessCity}
              style={styles.space_vertical}
              subtitle={""}
              title="Business Address City"
              // editable={false}
            />
            <Text_Input
              placeholdertxt={assets.Colors.PLACEHOLDER_TEXT_COLOR}
              event={(text) => setBusinessAddressLine(text)}
              edit={businessAddressLine}
              style={styles.space_vertical}
              subtitle={""}
              title="Business Address Line"
              // editable={false}
            />
            <Text_Input
              placeholdertxt={assets.Colors.PLACEHOLDER_TEXT_COLOR}
              event={(text) => setBusinessPostalCode(text)}
              edit={businessPostalCode}
              style={styles.space_vertical}
              subtitle={""}
              title="Business Address Postal Code"
              // editable={false}
            />
            <Text_Input
              keyboard_type="numeric"
              placeholdertxt={assets.Colors.PLACEHOLDER_TEXT_COLOR}
              event={(text) => setTaxId(text)}
              edit={taxId}
              style={styles.space_vertical}
              subtitle={""}
              title="Tax ID Number"
              // editable={false}
            />
            <Text_Input
              keyboard_type="numeric"
              placeholdertxt={assets.Colors.PLACEHOLDER_TEXT_COLOR}
              event={(text) => setLast4Ssn(text)}
              edit={last4Ssn}
              style={styles.space_vertical}
              subtitle={""}
              title="SSN Last 4 Digits*"
              // editable={false}
            />
            <Text_Input
              keyboard_type="numeric"
              placeholdertxt={assets.Colors.PLACEHOLDER_TEXT_COLOR}
              event={(text) => setPhnNumber(text)}
              edit={phnNumber}
              style={styles.space_vertical}
              subtitle={""}
              title="Phone Number"
              // editable={false}
            />
            <View style={styles.input_view}>
              <Text style={styles.input_title}>Date Of Birth</Text>
              <TextInputMask
                type={"datetime"}
                options={{
                  format: "YYYY-MM-DD",
                }}
                placeholder={"YYYY-MM-DD"}
                placeholderTextColor={assets.Colors.INPUT_HOLDER_TXT_COLOR}
                maxLength={10}
                returnKeyType={"done"}
                keyboardType={"numeric"}
                numberOfLines={1}
                value={dob}
                onChangeText={(text) => {
                  setDOB(text);
                }}
                style={styles.placeholder}
                ref={(ref) => (datetimeField = ref)}
              />
            </View>

            <Text_Input
              placeholdertxt={assets.Colors.PLACEHOLDER_TEXT_COLOR}
              event={(text) => setAcc_holderName(text)}
              edit={account_holder_name}
              style={styles.space_vertical}
              subtitle={""}
              title="Account Holder Name"
              // editable={false}
            />

            <Text_Input
              keyboard_type="numeric"
              placeholdertxt={assets.Colors.PLACEHOLDER_TEXT_COLOR}
              event={(text) => setRout_Numb(text)}
              edit={rout_numb}
              style={[styles.space_vertical, styles.topSpacer]}
              subtitle={""}
              title="Routing number"
              // editable={false}
            />
            <Text_Input
              keyboard_type="numeric"
              placeholdertxt={assets.Colors.PLACEHOLDER_TEXT_COLOR}
              event={(text) => setAcct_Numb(text)}
              edit={acct_numb}
              style={styles.space_vertical}
              subtitle={""}
              title="Account number"
              // editable={false}
            />

            <Image
              source={assets.Images.CHECK_ROUTING_ICON}
              style={styles.logo}
            />
            <View style={styles.row_content}>
              <Text style={styles.txt}>Routing number</Text>
              <Text style={styles.txt}>Account number</Text>
            </View>

            <View style={{ marginTop: 30 }}>
              <Text style={styles.input_title}>
                Upload Verification Document
              </Text>
              <Pressable
                onPress={() => [(DOC_TYPE = "UVD"), setPopup(true)]}
                style={styles.choose}
              >
                <Text style={styles.input_title}>Choose File</Text>
              </Pressable>
              {verifiedImage && (
                <Image source={{ uri: verifiedImage }} style={styles.logo_} />
              )}
            </View>
            <View style={{ marginTop: 30 }}>
              <Text style={styles.input_title}>
                Bank Account Verified Document
              </Text>
              <Pressable
                onPress={() => [(DOC_TYPE = "BAVD"), setPopup(true)]}
                style={styles.choose}
              >
                <Text style={styles.input_title}>Choose File</Text>
              </Pressable>
              {verifiedBankImage && (
                <Image
                  source={{ uri: verifiedBankImage }}
                  style={styles.logo_}
                />
              )}
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
          style={[styles.buttn, pallete.mb_30]}
          txt={assets.Colors.BACKGROUND_THEME_COLOR}
          event={Valid_Deposit}
          bgcolor={assets.Colors.ACTIVE_STORES_BG_COLOR}
          image={false}
          img={""}
          title="Add & Continue"
        />
        <Imagepicker_View
          visible={popup}
          setVisible={setPopup}
          camera={() => requestCameraPermission()}
          gallery={() => waitChooseFile()}
        />
      </KeyboardAvoidingView>
    </View>
  );
};
export default Add_Payment_Method;
