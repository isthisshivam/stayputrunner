import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TextInput,
} from "react-native";
import useStyle from "./style";
import assets from "../../assets";
import usePallete from "../../assets/Pallete";
import { useNavigation } from "@react-navigation/native";
import Button from "../../common_components/Button";
import Header from "../../common_components/Header";

const Physical_card = (props) => {
  const pallete = usePallete();
  const styles = useStyle();
  const { navigate, goBack } = useNavigation();

  const [cardNum, setCardNum] = useState("");
  const next = () => {
    if (cardNum.length <= 15) {
      return null;
    } else {
      global.universalObject.logEvent("Activate Card-Step 1", {
        customData: {
          anonymousid: props.route.params.card_id,
          device: Platform.OS,
          Screen: "Physical_card",
          URL: "https://projects.invisionapp.com/d/main#/console/21827194/462672833/preview#project_console",
          TypeofCard: "Physical",
        },
      });
      let params = {
        cardNumber: cardNum,
        cardId: props.route.params.card_id,
      };
      navigate(assets.NavigationConstants.CARD_CVV.NAME, params);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={[pallete.mainContainor]}
    >
      <Header
        bg={assets.Colors.INPUT_HOLDER_TXT_COLOR}
        icon={assets.Colors.BACKGROUND_THEME_COLOR}
        txt={assets.Colors.BACKGROUND_THEME_COLOR}
        shadow={false}
        event={goBack}
        icon1="arrow-left"
        title="Physical Card"
        icon2={null}
      />
      <ScrollView>
        <View style={styles.scrollContainer}>
          <Text
            style={[
              styles.card_num,
              { color: assets.Colors.ACCOUNT_TXT_COLOR },
            ]}
          >
            1. Enter payment card number
          </Text>
          <View style={[styles.input_view, styles.top]}>
            <TextInput
              placeholder="(16-digit)"
              placeholderTextColor={assets.Colors.INPUT_HOLDER_TXT_COLOR}
              onChangeText={(t) => setCardNum(t)}
              style={styles.input}
            />
          </View>
          <Button
            txt={assets.Colors.BACKGROUND_THEME_COLOR}
            imgBG={""}
            style={styles.top}
            event={next}
            bgcolor={
              cardNum.length <= 15
                ? assets.Colors.SAVE_EDIT_BG_CLR
                : assets.Colors.BUTTON_THEME_COLOR
            }
            image={false}
            img={""}
            title="Next"
          />
          <Text
            style={[
              styles.card_num,
              { color: assets.Colors.PRICE_DETAILS_CLR },
            ]}
          >
            2. Enter security on back of card
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
export default Physical_card;
