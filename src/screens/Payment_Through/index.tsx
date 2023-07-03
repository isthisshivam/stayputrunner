import React, { useState } from "react";
import { SafeAreaView, View, Text, Pressable } from "react-native";
import assets from "../../assets";
import useStyle from "./style";
import usePallete from "../../assets/Pallete";
import { useNavigation } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";
import Header from "../../common_components/Header";

const Pay_through = (props) => {
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
        <Text style={styles.boldTxt}>
          2. Wait for your cashier to give you the receipt
        </Text>
        <Text style={styles.smallTxt}>
          If digital card doesn't go through, use your StayPut physical card
        </Text>
        <Pressable
          onPress={() =>
            navigate(assets.NavigationConstants.RECEIPT_CHECK.NAME, {
              orderId: props?.route?.params?.orderId,
              customerId: props?.route?.params?.customerId,
            })
          }
          style={styles.buttn}
        >
          <Text style={styles.bttnTxt}>Waiting for transaction...</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
};
export default Pay_through;
