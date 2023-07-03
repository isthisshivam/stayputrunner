import React, { useEffect, useState } from "react";
import { SafeAreaView, Image, Text } from "react-native";
import assets from "../../assets";
import useStyle from "./style";
import usePallete from "../../assets/Pallete";
import { useNavigation } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";
import Button from "../../common_components/Button";
import { resetStack, GetData } from "../../utils/utilities";
import { ACCESS_TOKEN, LOGIN_KEY } from "../../Storage/ApplicationStorage";
import { getStoredData, storeData } from "../../Storage/ApplicationStorage";
var userDetails = null;
const On_WayCard = () => {
  const pallete = usePallete();
  const styles = useStyle();
  const navigation = useNavigation();

  useEffect(() => {
    getUserInfo();
  }, []);
  const getUserInfo = async () => {
    userDetails = await GetData(LOGIN_KEY);
    if (userDetails) {
    }
  };
  const setPaths = async () => {
    let data = await getStoredData("PATH");
    console.log("setpaths==", data);
    await storeData("PATH", {
      ...data,
      Card_OnWay: true,
      dashboard: true,
    }).then(() => {
      navigateToDashboard();
    });
  };
  const navigateToDashboard = () => {
    global.universalObject.logEvent("Account Created", {
      customData: {
        anonymousid: userDetails?.id,
        phone_number: userDetails?.phone,
        email_address: userDetails?.email,
        first_name: userDetails?.firstname,
        last_name: userDetails?.lastname,
        URL: "https://projects.invisionapp.com/d/main?origin=v7#/console/21738858/460217943/preview?scrollOffset=71#project_console",
      },
    });
    resetStack(assets.NavigationConstants.DASHBOARD.NAME, null, navigation);
  };
  return (
    <SafeAreaView style={[pallete.mainContainor]}>
      <ScrollView style={styles.scrollContainer}>
        <Text style={styles.title}>Your card is on the way!</Text>
        <Image source={assets.Images.STAYPUT_CARD} style={styles.Image} />
        <Text style={styles.smallTxt}>
          Get notified with updates on your card, which should arrives in 5 ~ 7
          days.
        </Text>
      </ScrollView>
      <Button
        imgBG={""}
        style={styles.buttn}
        txt={assets.Colors.ACCOUNT_TXT_COLOR}
        event={() => setPaths()}
        bgcolor={assets.Colors.INACTIVE_STORE_BG_COLOR}
        image={false}
        img={""}
        title="No thanks"
      />
      <Button
        imgBG={""}
        style={[styles.buttn, styles.space, pallete.mb_10]}
        txt={assets.Colors.BACKGROUND_THEME_COLOR}
        event={() => setPaths()}
        bgcolor={assets.Colors.BUTTON_THEME_COLOR}
        image={false}
        img={""}
        title="Notify me"
      />
    </SafeAreaView>
  );
};
export default On_WayCard;
