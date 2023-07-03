import React, { useState } from "react";
import { SafeAreaView, View, Text, Pressable } from "react-native";
import assets from "../../assets";
import useStyle from "./style";
import usePallete from "../../assets/Pallete";
import { useNavigation } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";
import Button from "../../common_components/Button";
import Header from "../../common_components/Header";

import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import { uploadImage, randomImageName } from "../../utils/utilities";
import Loader from "../../common_components/Loader";
const Receipt = (props) => {
  const pallete = usePallete();
  const styles = useStyle();
  const { navigate, goBack } = useNavigation();
  const [recipt, setRecipt] = useState("");
  const [loading, setLoading] = useState(false);
  const [orderId, setOrderId] = useState(props?.route?.params?.orderId);
  const [customerId, setcustomerId] = useState(
    props?.route?.params?.customerId
  );
  const openCamera = async () => {
    await launchCamera({
      mediaType: "photo",
      cameraType: "back",
      quality: 0.2,
    })
      .then((result) => {
        console.log("Camera-Result====", JSON.stringify(result));
        uploadImageToS3(result?.assets[0]);
      })
      .catch((e) => {
        console.log("Camera-error====", JSON.stringify(e));
      });
  };
  const uploadImageToS3 = async (file) => {
    setLoading(true);
    let newFile = {
      uri: file.uri,
      type: "jpg",
      name: file.fileName,
    };

    let data = await uploadImage(newFile, "Catalog", randomImageName());
    console.log("uploadImageToS3-response====", JSON.stringify(data));
    if (data) {
      setRecipt(data?.location);
      setLoading(false);
      navigate(assets.NavigationConstants.DELIVERY_START.NAME, {
        orderId: orderId,
        customerId: customerId,
      });
    }
  };
  const waitCameraInflation = () => {
    setTimeout(() => {
      openCamera();
    }, 500);
  };
  return (
    <View style={[pallete.mainContainor]}>
      <Header
        bg={assets.Colors.BUTTON_THEME_COLOR}
        icon={assets.Colors.BACKGROUND_THEME_COLOR}
        txt={assets.Colors.BACKGROUND_THEME_COLOR}
        shadow={false}
        event={goBack}
        icon1="arrow-left"
        title="Receipt check"
        icon2="chat-processing-outline"
        orderId={orderId}
        customerId={customerId}
      />
      <Loader isLoading={loading} />
      <ScrollView style={styles.scrollContainer}>
        <Text style={styles.boldTxt}>Photograph the store receipt</Text>

        <Text style={styles.smallTxt}>
          Please photograph your entire receipt on a flat surface. Up to 10
          photos may be submitted.
        </Text>
        <Button
          imgBG={""}
          style={styles.buttn}
          txt={assets.Colors.BACKGROUND_THEME_COLOR}
          event={() => waitCameraInflation()}
          bgcolor={assets.Colors.THEME_COLOR_PRIMARY}
          image={false}
          img={""}
          title="Take Photo"
        />

        <Text style={styles.title}>2. Keep the receipt with you</Text>
      </ScrollView>
    </View>
  );
};
export default Receipt;
