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
import SVG_View from "../../common_components/SVG_View";
import {  launchImageLibrary } from "react-native-image-picker";

import { showToastMessage } from "../../utils/utilities";
import useFileUploadingRestApi from "../../Services/rest/apiVerifyLicense";
import { useRest, CALL_TYPES, LOADING_TYPES } from "../../Services/rest/api";
import BackButton from "../../common_components/BackButton";

const License_verification = () => {
  const pallete = usePallete();
  const styles = useStyle();
  const { navigate, goBack } = useNavigation();
  
  const [frontImg, setFrontImg] = useState(null);
  const [backImg, setbackImg] = useState(null);

  const {
    data: p_data,
    loading: p_loading,
    error: p_error,
    fetchData: p_fetchData,
    responseCode: p_responseCode,
  } = useFileUploadingRestApi({
    URL: "",
    PAYLOAD: null,
    CALL_TYPE: CALL_TYPES.POST,
    fileList: [],
    lazy: true,
  });

  useEffect(() => {}, []);

  useEffect(() => {
    console.log("DOCUMENT VERIFICATION MESSAGE=======", typeof p_data);
    const jsonRes = JSON.parse(p_data);
    if (jsonRes) {
      if (jsonRes?.result) {
        setTimeout(() => {
          showToastMessage(
            "Hi," + jsonRes?.result?.fullName + " your document verified"
          );
        }, 500);
        navigate(assets.NavigationConstants.TAKE_SELFIE.NAME);
      } else {
        showToastMessage("Document not valid");
      }
    }
  }, [p_data]);

  useEffect(() => {
    if (frontImg) {
      setTimeout(() => {
        chooseFile("please select back image", 2);
      }, 1000);
    }
  }, [frontImg]);

  const chooseFile = async (message, type) => {
    showToastMessage(message);
    const result = await launchImageLibrary({ mediaType: "photo" });
    console.log("RESULT====", result);

    var item;
    switch (type) {
      case 1:
        item = { path: result?.assets[0]?.uri, name: "file" };
        setFrontImg(item);
        break;
      case 2:
        setTimeout(() => {
          item = { path: result?.assets[0]?.uri, name: "file_back" };
          setbackImg(item);
          const fileList = [];
          fileList.push(frontImg);
          fileList.push(item);
          p_fetchData(0, fileList);
        }, 300);

        break;
    }
  };

  return (
    <SafeAreaView style={[pallete.mainContainor]}>
      <BackButton onBackPress={() => goBack()} />

      <ScrollView style={styles.scrollContainer}>
        <Text style={styles.runner}>Verify your license</Text>
        <View style={styles.Image}>
          <SVG_View
            width="150"
            height="150"
            path={assets.Images.LICENSE_ICON}
          />
        </View>
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
        event={() => chooseFile("please select front image", 1)}
        bgcolor={assets.Colors.BUTTON_THEME_COLOR}
        image={false}
        img={""}
        title="Take photo"
      />
      <Modal
        visible={
          p_loading === LOADING_TYPES.LOADING ||
          p_loading === LOADING_TYPES.REFRESHING ||
          p_loading === LOADING_TYPES.FETCHING_MORE
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
