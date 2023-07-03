import React, { useState } from "react";
import { Image, View, Text, TouchableOpacity } from "react-native";
import assets from "../../assets";
import useStyle from "./style";
import usePallete from "../../assets/Pallete";
import { useNavigation } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";
import Button from "../../common_components/Button";

import Header from "../../common_components/Header";

const Card_Scan = (props) => {
  const pallete = usePallete();
  const styles = useStyle();
  const { navigate, goBack } = useNavigation();

  return (
    <View style={[pallete.mainContainor]}>
      <Header
        bg={assets.Colors.INPUT_HOLDER_TXT_COLOR}
        icon={assets.Colors.BACKGROUND_THEME_COLOR}
        txt={assets.Colors.BACKGROUND_THEME_COLOR}
        shadow={false}
        event={goBack}
        icon1="arrow-left"
        title="Checkout"
        icon2="chat-processing-outline"
        orderId={props?.route?.params?.orderId}
        customerId={props?.route?.params?.customerId}
      />
      <ScrollView style={styles.scrollContainer}>
        <Text style={styles.title}>1. Present this code to the cashier</Text>
        <Image source={assets.Images.STAYPUT_CARD} style={styles.Image} />
        <Button
          imgBG={""}
          style={styles.buttn}
          txt={assets.Colors.BACKGROUND_THEME_COLOR}
          event={() =>
            navigate(assets.NavigationConstants.PAYEMENT_GOING_THROUGH.NAME, {
              orderId: props?.route?.params?.orderId,
              customerId: props?.route?.params?.customerId,
            })
          }
          bgcolor={assets.Colors.BUTTON_THEME_COLOR}
          image={false}
          img={""}
          title="Next"
        />
        <Text style={styles.smallTxt}>2. Select CREDIT or DEBIT</Text>
      </ScrollView>
    </View>
  );
};
export default Card_Scan;
