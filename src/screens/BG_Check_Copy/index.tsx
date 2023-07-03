import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import assets from "../../assets";
import useStyle from "./style";
import usePallete from "../../assets/Pallete";
import { useNavigation } from "@react-navigation/native";
import Button from "../../common_components/Button";
import BackButton from "../../common_components/BackButton";
import { dW, dH } from "../../utils/dynamicHeightWidth";
import { getStoredData, storeData } from "../../Storage/ApplicationStorage";
const Bg_Copy = () => {
  const pallete = usePallete();
  const styles = useStyle();
  const { navigate, goBack } = useNavigation();

  const setPaths = async () => {
    let data = await getStoredData("PATH");

    await storeData("PATH", { ...data, BG_Ckeck_Copy: true }).then(() => {
      navigate(assets.NavigationConstants.CHECK_BACKGROUND.NAME);
    });
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,

        backgroundColor: assets.Colors.BACKGROUND_THEME_COLOR,
      }}
    >
      <BackButton
        onBackPress={() => navigate(assets.NavigationConstants.PAPER_WORK.NAME)}
      />
      <ScrollView style={[{ paddingHorizontal: 40, marginBottom: 70 }]}>
        <Text
          style={{
            color: assets.Colors.ACCOUNT_TXT_COLOR,
            fontSize: dW(24),
            fontFamily: assets.fonts.ROBOTO_MEDIUM,
            //textAlign: "center",
            marginTop: dW(10),
          }}
        >
          Background Check
        </Text>
        <Text
          style={{
            color: "gray",
            fontSize: dW(14),
            fontFamily: assets.fonts.ROBOTO_REGULAR,
            //textAlign: "center",
            marginTop: dW(20),
            lineHeight: 23,
          }}
        >
          Please take some minutes to review the following documents
        </Text>
        <Text
          style={{
            color: "black",
            fontSize: dW(16),
            fontFamily: assets.fonts.ROBOTO_MEDIUM,
            //textAlign: "center",
            marginTop: dW(20),
            lineHeight: 23,
          }}
        >
          Disclosure Regarding Background Investigation
        </Text>
        <Text
          style={{
            color: "gray",
            fontSize: dW(14),
            fontFamily: assets.fonts.ROBOTO_REGULAR,
            //textAlign: "center",
            marginTop: dW(20),
            lineHeight: 23,
          }}
        >
          Instacart (the "Company') will request a background check about you
          from a consumer reporting agency in connection with your application,
          and if your application is accepted, may order additional background
          reports on you for that purpose. The background check may contain
          information concerning your character, general reputation, personal
          characteristics, mode of living and criminal history. Information may
          be derived from private and public record sources.
        </Text>
        <Text
          style={{
            color: "black",
            fontSize: dW(16),
            fontFamily: assets.fonts.ROBOTO_MEDIUM,
            //textAlign: "center",
            marginTop: dW(20),
            lineHeight: 23,
          }}
        >
          Authorization
        </Text>
        <Text
          style={{
            color: "gray",
            fontSize: dW(14),
            fontFamily: assets.fonts.ROBOTO_REGULAR,
            //textAlign: "center",
            marginTop: dW(20),
            lineHeight: 23,
          }}
        >
          By selecting the "I Consent" button, I authorize the Company to order
          my background report. I understand that, as allowed by law, if the
          Company engages me, my consent will apply, and the Company may obtain
          reports, throughout my employment or contract term without asking me
          for my authorization again. I understand the background investigation
          may include obtaining information regarding, as allowed by law,
          character
        </Text>
      </ScrollView>
      <Button
        imgBG={""}
        style={[styles.buttn, pallete.mb_30]}
        txt={assets.Colors.BACKGROUND_THEME_COLOR}
        event={() => setPaths()}
        bgcolor={assets.Colors.BUTTON_THEME_COLOR}
        image={false}
        img={""}
        title="Get started"
      />
    </SafeAreaView>
  );
};
export default Bg_Copy;
