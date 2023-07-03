import React, { useState, useEffect, useCallback } from "react";
import {
  SafeAreaView,
  View,
  Text,
  Image,
  Pressable,
  TextInput,
  FlatList,
  Platform,
  Alert,
  Linking,
} from "react-native";
import { WebView } from "react-native-webview";
import assets from "../../assets";
import useStyle from "./style";
import usePallete from "../../assets/Pallete";
import { HOW_EARNING_WORKS } from "../../Services/ApiUrls";
import Header from "../../common_components/Header";

import { dW } from "../../utils/dynamicHeightWidth";

const HowEarningWorks = (props) => {
  const pallete = usePallete();
  const styles = useStyle();

  return (
    <View style={styles.mainContainer}>
      <Header
        bg={assets.Colors.BACKGROUND_THEME_COLOR}
        icon={assets.Colors.ACCOUNT_TXT_COLOR}
        txt={assets.Colors.ACCOUNT_TXT_COLOR}
        shadow={true}
        event={() => props.navigation.openDrawer()}
        icon1="menu"
        title="How Earnings Work"
      />

      <View
        style={{
          height: "85%",
          width: "100%",
          alignSelf: "center",
          marginTop: dW(10),
          justifyContent: "center",
        }}
      >
        <WebView
          source={{
            uri: HOW_EARNING_WORKS,
          }}
        />
      </View>
    </View>
  );
};
export default HowEarningWorks;
