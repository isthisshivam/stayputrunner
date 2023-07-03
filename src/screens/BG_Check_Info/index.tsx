import React, { useState } from "react";
import { SafeAreaView, View, Text, ActivityIndicator } from "react-native";
import assets from "../../assets";
import useStyle from "./style";
import usePallete from "../../assets/Pallete";
import { useNavigation } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";
import Button from "../../common_components/Button";
import { WebView } from "react-native-webview";
import BackButton from "../../common_components/BackButton";
const Bg_Info = () => {
  const pallete = usePallete();
  const styles = useStyle();
  const { navigate, goBack } = useNavigation();

  return (
    <SafeAreaView style={[pallete.mainContainor]}>
      <BackButton onBackPress={() => goBack()} />
      <View style={styles.webView}>
        <ActivityIndicator
          color={assets.Colors.BLUE_CLR}
          animating={true}
        ></ActivityIndicator>
      </View>
      <Button
        imgBG={""}
        style={[styles.buttn, pallete.mb_30]}
        txt={assets.Colors.BACKGROUND_THEME_COLOR}
        event={() => navigate(assets.NavigationConstants.CHECK_BACKGROUND.NAME)}
        bgcolor={assets.Colors.BUTTON_THEME_COLOR}
        image={false}
        img={""}
        title="Next"
      />
    </SafeAreaView>
  );
};
export default Bg_Info;
