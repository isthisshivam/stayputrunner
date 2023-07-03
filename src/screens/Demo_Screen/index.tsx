import React, { useState, useEffect, useRef } from "react";
import {
  SafeAreaView,
  View,
  Image,
  Platform,
  PermissionsAndroid,
  ActivityIndicator,
  Pressable,
} from "react-native";
import useStyle from "./style";
import usePallete from "../../assets/Pallete";
import { useNavigation } from "@react-navigation/native";
import Video from "react-native-video";
import runnerDemoVideo from "../../assets/videos/runnerdemo.mp4";
import BackButton from "../../common_components/BackButton";
import assets from "../../assets";
const Demo_screen = (props) => {
  const pallete = usePallete();
  const videoRef = useRef();
  const navigation = useNavigation();

  return (
    <SafeAreaView style={[pallete.mainContainor]}>
      <Pressable
        onPress={() => navigation.goBack()}
        style={{
          height: 40,
          width: 40,
          margin: 20,
          justifyContent: "center",
        }}
      >
        <Image
          style={{ height: 35, width: 35, resizeMode: "contain" }}
          source={assets.Images.BACK}
        ></Image>
      </Pressable>
      <Video
        controls={true}
        source={runnerDemoVideo} // Can be a URL or a local file.
        ref={videoRef} // Store reference
        style={{
          position: "absolute",
          top: 120,
          left: 10,
          bottom: 30,
          right: 10,
        }}
      />
    </SafeAreaView>
  );
};
export default Demo_screen;
