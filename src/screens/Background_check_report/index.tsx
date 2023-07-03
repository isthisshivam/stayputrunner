import React, { useEffect, useState, useCallback } from "react";
import {
  SafeAreaView,
  View,
  Text,
  Modal,
  ActivityIndicator,
  Image,
  Alert,
  BackHandler,
  Linking,
  Platform,
} from "react-native";
import assets from "../../assets";
import useStyle from "./style";
import usePallete from "../../assets/Pallete";
import { useNavigation } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";
import Button from "../../common_components/Button";
import { GetData, SaveData, showToastMessage } from "../../utils/utilities";
import BackButton from "../../common_components/BackButton";
import SafariView from "react-native-safari-view";
import { getStoredData, storeData } from "../../Storage/ApplicationStorage";
const Background_Check_Report = (props) => {
  const pallete = usePallete();
  const styles = useStyle();
  const { navigate, goBack } = useNavigation();
  const [report, setReport] = useState(null);
  const [isLoading, setLoader] = useState(false);
  const [url, setUrl] = useState("");

  useEffect(() => {
    getUrl();
  }, []);
  const getUrl = async () => {
    let BACKGROUND_PAYLOAD = await getStoredData("BACKGROUND_PAYLOAD");
    console.log("BACKGROUND_PAYLOAD===", BACKGROUND_PAYLOAD);
    setUrl(BACKGROUND_PAYLOAD.invitation_url);
  };

  const setPaths = async () => {
    let data = await getStoredData("PATH");

    let BACKGROUND_PAYLOAD = await getStoredData("BACKGROUND_PAYLOAD");

    await storeData("BACKGROUND_PAYLOAD_EXTRACTED", {
      ...BACKGROUND_PAYLOAD,
      applicant_id: global.applicantId,
    });
    await storeData("PATH", { ...data, Background_check_report: true }).then(
      () => {
        navigate(assets.NavigationConstants.DIRECT_DEPOSIT.NAME);
      }
    );
  };

  const createAlert = () =>
    Alert.alert(
      "We can't onboard you right now",
      "we found some substantial problem with your identity",
      [{ text: "OK", onPress: () => BackHandler.exitApp() }]
    );

  const openUrl = async () => {
    if (Platform.OS === "ios") {
      SafariView.isAvailable()
        .then(
          SafariView.show({
            url: url,
          })
        )
        .catch((error) => {
          Alert.alert(`Don't know how to open this URL: ${url}`);
          // Fallback WebView code for iOS 8 and earlier
        });
    } else {
      const supported = await Linking.canOpenURL(url);

      if (supported) {
      } else {
        Alert.alert(`Don't know how to open this URL: ${url}`);
      }
    }
  };
  return (
    <SafeAreaView style={[pallete.mainContainor]}>
      <BackButton
        onBackPress={() =>
          navigate(assets.NavigationConstants.CHECK_BACKGROUND.NAME)
        }
      />
      <ScrollView style={styles.scrollContainer}>
        <Text style={styles.runner}>Background Verification</Text>

        <Image source={assets.Images.LICENSE_PNG} style={styles.logo} />
        <Text style={styles.smallTxt}>
          We have just sent you invitation on your email to fill out your
          information. So that we can process and verify background. Kindly fill
          out the information received on your email and then click next on
          application.
        </Text>
      </ScrollView>

      <Button
        imgBG={""}
        style={[styles.buttn, { marginBottom: 15 }]}
        txt={assets.Colors.BACKGROUND_THEME_COLOR}
        event={async () => {
          openUrl();
        }}
        bgcolor={assets.Colors.BUTTON_THEME_COLOR}
        image={false}
        img={""}
        title="Submit Background Information"
      />
      <Button
        imgBG={""}
        style={[styles.buttn, pallete.mb_30]}
        txt={assets.Colors.BACKGROUND_THEME_COLOR}
        event={async () => {
          setPaths();
        }}
        bgcolor={assets.Colors.BUTTON_THEME_COLOR}
        image={false}
        img={""}
        title="Next"
      />
      <Modal visible={isLoading} transparent={true}>
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
export default Background_Check_Report;
