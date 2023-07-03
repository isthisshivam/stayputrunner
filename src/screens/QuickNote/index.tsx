import React, { useState, useEffect, useRef } from "react";
import { SafeAreaView, View, Image, Text } from "react-native";
import assets from "../../assets";
import useStyle from "./style";
import usePallete from "../../assets/Pallete";
import Button from "../../common_components/Button";
import { useNavigation } from "@react-navigation/native";

const QuickNote = (props) => {
  const pallete = usePallete();
  const styles = useStyle();
  const navigation = useNavigation();
  const [orderId, setOrderId] = useState(props?.route?.params?.orderId);
  const [customerId, setcustomerId] = useState(
    props?.route?.params?.customerId
  );
  const navigateTo = () => {
    navigation.navigate(assets.NavigationConstants.STAYPUT_CARD_SCAN.NAME, {
      orderId,
      customerId: customerId,
    });
  };
  return (
    <SafeAreaView style={[pallete.mainContainor]}>
      <View
        style={{
          height: "100%",
          width: "100%",
          backgroundColor: "transparent",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View style={{ marginTop: 200 }}>
          <Text style={{ fontSize: 120, textAlign: "center" }}>☝</Text>
          <Text style={styles.smallTxt}>Quick note!</Text>
          <Text style={styles.smallTxt_}>
            {`If you see "Enter Job Name or PO
Number" on Checkout screen,
Please input the number 0 (Zero)!`}
          </Text>
        </View>
        <View style={{ width: 400, marginTop: 110 }}>
          <Button
            imgBG={""}
            style={[styles.buttn, pallete.mt_30]}
            txt={assets.Colors.BACKGROUND_THEME_COLOR}
            event={() => navigateTo()}
            bgcolor={assets.Colors.BUTTON_THEME_COLOR}
            image={false}
            img={""}
            title="Got it!"
          />
        </View>
      </View>
    </SafeAreaView>
  );
};
export default QuickNote;
