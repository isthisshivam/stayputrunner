import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  Modal,
  ActivityIndicator,
  Platform,
} from "react-native";
import assets from "../../assets";
import useStyle from "./style";
import usePallete from "../../assets/Pallete";
import { useNavigation } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";
import Button from "../../common_components/Button";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useRest, CALL_TYPES, LOADING_TYPES } from "../../Services/rest/api";
import { getStoredData, storeData } from "../../Storage/ApplicationStorage";
import { RUNNER_CREATE } from "../../Services/ApiUrls";

const Verified_dl = () => {
  const pallete = usePallete();
  const styles = useStyle();

  const { navigate, goBack } = useNavigation();

  const sign_upPayload = {
    step: "1",
  };

  const { data, loading, error, fetchData, responseCode } = useRest({
    URL: RUNNER_CREATE,
    PAYLOAD: sign_upPayload,
    CALL_TYPE: CALL_TYPES.POST,
    lazy: true,
  });

  const setPaths = async () => {
    let data = await getStoredData("PATH");
    console.log("setpaths==", data);
    await storeData("PATH", { ...data, Verified_License: true }).then(() => {
      navigate(assets.NavigationConstants.VEHICLE_INFORMATION.NAME);
    });
  };
  useEffect(() => {
    if (data) {
    }
  }, [data]);
  return (
    <SafeAreaView style={[pallete.mainContainor]}>
      <ScrollView style={styles.scrollContainer}>
        <Text style={styles.title}>License verified!</Text>
        <View style={styles.Image}>
          <MaterialCommunityIcons
            name="check"
            color={assets.Colors.SIGN_IN_COLOR}
            size={50}
          />
        </View>
        <Text style={styles.smallTxt}>Just few more steps!</Text>
      </ScrollView>
      <Button
        imgBG={""}
        style={[styles.buttn, pallete.mb_30]}
        txt={assets.Colors.BACKGROUND_THEME_COLOR}
        event={() => [
          global.universalObject.logEvent("License-Verified", {
            customData: {
              anonymousid: global.userId,
              device: Platform.OS,
              Screen: "Verified_License",
              URL: "https://projects.invisionapp.com/d/main?origin=v7#/console/21738858/462741871/preview?scrollOffset=71#project_console",
            },
          }),
          setPaths(),
        ]}
        bgcolor={assets.Colors.BUTTON_THEME_COLOR}
        image={false}
        img={""}
        title="Next"
      />
      <Modal visible={loading === LOADING_TYPES.LOADING} transparent={true}>
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
export default Verified_dl;
