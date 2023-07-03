import React, { useState } from "react";
import { SafeAreaView, Image, Text } from "react-native";
import assets from "../../assets";
import useStyle from "./style";
import usePallete from "../../assets/Pallete";
import { useNavigation } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";
import Button from "../../common_components/Button";
import BackButton from "../../common_components/BackButton";
import { getStoredData, storeData } from "../../Storage/ApplicationStorage";
const Paper_work = () => {
  const pallete = usePallete();
  const styles = useStyle();
  const { navigate, goBack } = useNavigation();

  const setPaths = async () => {
    let data = await getStoredData("PATH");
    console.log("setpaths==", data);
    await storeData("PATH", { ...data, Paperwork: true }).then(() => {
      navigate(assets.NavigationConstants.BG_CHECK_COPY.NAME);
    });
  };
  return (
    <SafeAreaView style={[pallete.mainContainor]}>
      <BackButton
        onBackPress={() =>
          navigate(assets.NavigationConstants.VEHICLE_INFORMATION.NAME)
        }
      />
      <ScrollView style={styles.scrollContainer}>
        <Text style={styles.title}>Finish your paperwork</Text>
        <Image source={assets.Images.PAPERWORK_ICON} style={styles.logo} />
        <Text style={styles.smallTxt}>
          As an independent contractor, you need to sign paperwork and agree to
          a background check with our partner, Certn. All personal information
          is secured and never shared
        </Text>
      </ScrollView>
      <Button
        imgBG={""}
        style={[styles.buttn, pallete.mb_10]}
        txt={assets.Colors.BACKGROUND_THEME_COLOR}
        event={() => setPaths()}
        bgcolor={assets.Colors.BUTTON_THEME_COLOR}
        image={false}
        img={""}
        title="Review and sign"
      />
    </SafeAreaView>
  );
};
export default Paper_work;
