import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  Modal,
  ActivityIndicator,
  Image,
} from "react-native";
import assets from "../../assets";
import useStyle from "./style";
import usePallete from "../../assets/Pallete";
import { useNavigation } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";
import Button from "../../common_components/Button";

import { GetData, SaveData, showToastMessage } from "../../utils/utilities";
import {
  useRest,
  CALL_TYPES,
  LOADING_TYPES,
} from "../../Services/rest/api_onfido";
import {
  CREATE_APPICANT_LINK,
  UPLOAD_DOCUMENT,
  CREATE_CHECK,
  SDK_TOKEN,
} from "../../Services/ApiUrls";
import {
  ACCESS_TOKEN,
  APPLICANT_ID,
  getData,
  LOGIN_KEY,
  ONFIDO_SDK_TOKEN,
} from "../../Storage/ApplicationStorage";
import BackButton from "../../common_components/BackButton";
import { onfidoStartSdk } from "../../utils/onfido";
import { getStoredData, storeData } from "../../Storage/ApplicationStorage";
const License_verification = () => {
  const pallete = usePallete();
  const styles = useStyle();
  const { navigate, goBack } = useNavigation();
  //const [frontImg, setFrontImg] = useState(null);
  const [loginData, setLoginData] = useState(null);
  const [applicant_id, setApplicantId] = useState(null);
  const [checkId, setCheckId] = useState(null);

  const CREATE_APPLICANT_PAYLOAD = {
    first_name: loginData?.firstname,
    last_name: loginData?.lastname,
    email: loginData?.email,
  };
  const CREATE_CHECK_PAYLOAD = {
    applicant_id: applicant_id,
    report_names: ["document"],
    privacy_notices_read_consent_given: "true",
  };
  const SDKTOKEN_PAYLOAD = {
    applicant_id: applicant_id,
  };
  const {
    data: a_data,
    loading: a_loading,
    error: a_error,
    fetchData: a_fetchData,
    responseCode: a_responseCode,
  } = useRest({
    URL: CREATE_APPICANT_LINK,
    PAYLOAD: CREATE_APPLICANT_PAYLOAD,
    CALL_TYPE: CALL_TYPES.POST,
    lazy: true,
  });
  const {
    data: sdkTokenData,
    loading: sdkTokenLoading,
    fetchData: fetchSdkToken,
  } = useRest({
    URL: SDK_TOKEN,
    PAYLOAD: SDKTOKEN_PAYLOAD,
    CALL_TYPE: CALL_TYPES.POST,
    lazy: true,
  });

  const {
    data: cre_data,
    loading: cre_loading,
    fetchData: cre_fetchData,
  } = useRest({
    URL: CREATE_CHECK,
    PAYLOAD: CREATE_CHECK_PAYLOAD,
    CALL_TYPE: CALL_TYPES.POST,
    lazy: true,
  });

  const {
    data: ret_data,
    loading: ret_loading,
    fetchData: ret_fetchData,
    error: ret_error,
  } = useRest({
    URL: `${CREATE_CHECK}/${checkId}`,
    PAYLOAD: null,
    CALL_TYPE: CALL_TYPES.GET,
    lazy: true,
  });

  useEffect(() => {
    getLoginData();
  }, []);
  const getLoginData = async () => {
    const data = await GetData(LOGIN_KEY);

    await setLoginData(JSON.parse(data));
  };

  useEffect(() => {
    if (loginData != null) {
      a_fetchData(0);
    }
  }, [loginData]); //sdkTokenData

  useEffect(() => {
    if (sdkTokenData != null) {
      SaveData(ONFIDO_SDK_TOKEN, sdkTokenData?.token);
    }
  }, [sdkTokenData]);
  useEffect(() => {
    if (cre_data) {
      setCheckId(cre_data?.id);
    }
  }, [cre_data]);

  useEffect(() => {
    if (checkId) setTimeout(() => ret_fetchData(0), 1000);
  }, [checkId]);

  const setPaths = async () => {
    let data = await getStoredData("PATH");
    console.log("setpaths==", data);
    await storeData("CHECK_ID", checkId);
    await storeData("PATH", { ...data, License_Verification: true }).then(
      () => {
        navigate(assets.NavigationConstants.LICENSE_VERIFIED.NAME);
      }
    );
  };
  useEffect(() => {
    if (ret_data) {
      if (ret_data?.error) {
        showToastMessage("Your documents are pending for verification");

        setPaths();
        return;
      } else if (ret_data?.status === "complete") {
        setTimeout(() => {
          showToastMessage(`Hi, your document is verified!`);
        }, 500);

        setPaths();
      } else {
        showToastMessage("Your documents are pending for verification");
        setPaths();
      }
    }
  }, [ret_data]);

  useEffect(() => {
    if (a_data) {
      saveData(a_data.id);
    }
  }, [a_data]);
  useEffect(() => {
    if (applicant_id != null) {
      fetchSdkToken(0);
    }
  }, [applicant_id]);

  const saveData = async (id) => {
    setApplicantId(id);
    await SaveData(APPLICANT_ID, id + "");
  };

  const startOnfido = async () => {
    const token = await getData(ONFIDO_SDK_TOKEN);

    await onfidoStartSdk(token, callbackOnfidoSuccess);
  };
  const callbackOnfidoSuccess = async () => {
    cre_fetchData(0);
  };

  return (
    <SafeAreaView style={[pallete.mainContainor]}>
      <BackButton
        onBackPress={() =>
          navigate(assets.NavigationConstants.PROFILE_STEPS.NAME)
        }
      />

      <ScrollView style={styles.scrollContainer}>
        <Text style={styles.runner}>Verify your license</Text>

        <Image source={assets.Images.LICENSE_PNG} style={styles.logo} />
        <Text style={styles.smallTxt}>
          Use your phone to take front and back photo's of your valid driver's
          license
        </Text>
      </ScrollView>
      <Button
        imgBG={""}
        style={[styles.buttn, pallete.mb_30]}
        txt={assets.Colors.BACKGROUND_THEME_COLOR}
        //event={() => chooseFile("please select front image", 1)}
        event={async () => {
          await startOnfido();
        }}
        bgcolor={assets.Colors.BUTTON_THEME_COLOR}
        image={false}
        img={""}
        title="Start Verification"
      />
      <Modal
        visible={
          a_loading === LOADING_TYPES.LOADING ||
          sdkTokenLoading === LOADING_TYPES.LOADING ||
          cre_loading === LOADING_TYPES.LOADING ||
          ret_loading === LOADING_TYPES.LOADING
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
    </SafeAreaView>
  );
};
export default License_verification;
