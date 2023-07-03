import React, { useState, useEffect } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  View,
  Text,
  ScrollView,
  TextInput,
  Modal,
} from "react-native";
import useStyle from "./style";
import assets from "../../assets";
import usePallete from "../../assets/Pallete";
import { useNavigation } from "@react-navigation/native";
import Button from "../../common_components/Button";
import Ionicons from "react-native-vector-icons/Ionicons";
import Header from "../../common_components/Header";
import { dW } from "../../utils/dynamicHeightWidth";
import { showToastMessage } from "../../utils/utilities";
import {
  API_STATUS,
  RUNNER_ACTIVATE_PHYSICAL_CARD,
} from "../../Services/ApiUrls";

import { useRest, CALL_TYPES, LOADING_TYPES } from "../../Services/rest/api";
const Cvv = (props) => {
  const pallete = usePallete();
  const styles = useStyle();

  const { navigate, goBack } = useNavigation();
  const [cvv, setCvv] = useState("");
  const [activate, setActivate] = useState(false);
  const payload = {
    card_number: props.route.params.cardNumber,
    cvv: cvv,
    card_id: props.route.params.cardId,
  };

  const { data, loading, error, fetchData, responseCode } = useRest({
    URL: RUNNER_ACTIVATE_PHYSICAL_CARD,
    PAYLOAD: payload,
    CALL_TYPE: CALL_TYPES.POST,
    lazy: true,
  });
  useEffect(() => {
    if (data) {
      console.log("RUNNER_ACTIVATE_PHYSICAL_CARD==", data);
      console.log("RUNNER_ACTIVATE_PHYSICAL_CARD.payload==", payload);
      if (responseCode == API_STATUS.SUCCESS) onSuccess(data);
      else showToastMessage(data.message);
    }
  }, [data, error, responseCode]);

  const onSuccess = (resolve) => {
    const { data } = resolve;
    global.universalObject.logEvent("Physical-Card-Activate", {
      customData: {
        anonymousid: props.route.params.cardId,
        device: Platform.OS,
        Screen: "Physical_card",
        URL: "https://projects.invisionapp.com/d/main#/console/21827194/462672833/preview#project_console",
        TypeofCard: "Physical",
      },
    });

    setActivate(true);
    setTimeout(() => {
      setActivate(false);
      navigate(assets.NavigationConstants.DASHBOARD.NAME, {
        screen: assets.NavigationConstants.PAYMENT_CARD.NAME,
      });
    }, 2000);
  };

  const next = () => {
    if (cvv.length <= 2) {
      return null;
    } else {
      global.universalObject.logEvent("Activate Card-Step 2", {
        customData: {
          anonymousid: props.route.params.cardId,
          device: Platform.OS,
          Screen: "Physical_card",
          URL: "https://projects.invisionapp.com/d/main#/console/21827194/462672833/preview#project_console",
          TypeofCard: "Physical",
        },
      });

      fetchData(0);
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
          <View style={styles.row}>
            <Ionicons
              name="ios-checkmark-sharp"
              color={assets.Colors.TERMS_CONDITION_COLOR}
              size={25}
            />
            <Text style={styles.top_Txt}>Payment card number</Text>
          </View>
          <Text style={styles.card_num}>2. Enter security on back of card</Text>
          <View style={[styles.input_view, styles.top]}>
            <TextInput
              keyboardType="numeric"
              placeholder="3-digit CVV"
              placeholderTextColor={assets.Colors.INPUT_HOLDER_TXT_COLOR}
              onChangeText={(t) => setCvv(t)}
              style={styles.input}
            />
          </View>
          <Button
            txt={assets.Colors.BACKGROUND_THEME_COLOR}
            imgBG={""}
            style={styles.top}
            event={next}
            bgcolor={
              cvv.length <= 2
                ? assets.Colors.SAVE_EDIT_BG_CLR
                : assets.Colors.BUTTON_THEME_COLOR
            }
            image={false}
            img={""}
            title="Next"
          />
        </View>
        <Modal
          animationType="none"
          transparent={true}
          visible={activate === true}
          onRequestClose={() => setActivate(!activate)}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.activate}>Your card is now activated!</Text>
              <View style={styles.circle}>
                <Ionicons
                  name="ios-checkmark-sharp"
                  color={assets.Colors.BUTTON_THEME_COLOR}
                  size={dW(40)}
                  style={{ alignSelf: "center" }}
                />
              </View>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
export default Cvv;
