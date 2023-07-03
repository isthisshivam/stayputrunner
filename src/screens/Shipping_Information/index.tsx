import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  Text,
  Modal,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import assets from "../../assets";
import useStyle from "./style";
import usePallete from "../../assets/Pallete";
import { useNavigation } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";
import Text_Input from "../../common_components/Text_Input";
import Button from "../../common_components/Button";

import { RUNNER_CREATE } from "../../Services/ApiUrls";
import {
  SaveData,
  showToastMessage,
  validateEmail,
} from "../../utils/utilities";
import { useRest, CALL_TYPES, LOADING_TYPES } from "../../Services/rest/api";
import { ACCESS_TOKEN, LOGIN_KEY } from "../../Storage/ApplicationStorage";
import BackButton from "../../common_components/BackButton";
import { getStoredData, storeData } from "../../Storage/ApplicationStorage";
const Shipping_info = ({ route }) => {
  console.log(route);
  const pallete = usePallete();
  const styles = useStyle();
  const { navigate, goBack } = useNavigation();
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [city, setCity] = useState("");
  const [zip_code, setZip_Code] = useState("");
  const [state, setState] = useState("");
  const [tshirst, setTshirt] = useState("");
  const [size, setSize] = useState("");
  const shipping_payload = {
    shipping_address1: address1.trim(),
    shipping_address2: address2,
    city: city.trim(),
    state: state.trim(),
    zipcode: zip_code.trim(),
    tshirst: tshirst,
    size: size,
    step: "3",
    is_completed: "1",
  };

  const { data, loading, error, fetchData, responseCode } = useRest({
    URL: RUNNER_CREATE,
    PAYLOAD: shipping_payload,
    CALL_TYPE: CALL_TYPES.POST,
    lazy: true,
  });

  const setPaths = async () => {
    let data = await getStoredData("PATH");
    console.log("setpaths==", data);
    await storeData("PATH", { ...data, Shipping_Information: true }).then(
      () => {
        navigate(assets.NavigationConstants.ON_WAY_CARD.NAME);
      }
    );
  };
  useEffect(() => {
    getShippingInfo();
    if (data) {
      const status = data.status;
      if (status == 200) {
        saveLoginData(data);
        showToastMessage(data.message);
        setPaths();
      } else {
        setTimeout(() => {
          showToastMessage(data.message);
        }, 300);
      }
      if (data.stripe_message) {
        showToastMessage(data.stripe_message);
      }
    }
  }, [data, error, responseCode]);
  const getShippingInfo = async () => {
    let data = await getStoredData("SHIPPING_INFO");
    console.log("SHIPPING_INFO==", data);
    setSize(data?.Size);
    setTshirt(data?.t_Shirt);
  };
  const saveLoginData = async (data) => {
    await SaveData(LOGIN_KEY, JSON.stringify(data.data));
    await SaveData(ACCESS_TOKEN, data.data.access_token);
  };

  const isValid_shippingInfo = () => {
    if (!address1.trim()) {
      showToastMessage("Please enter Shipping Address1");
      return false;
    }
    //  else if (!address2.trim()) {
    //   showToastMessage("Please enter Shipping Address2");
    //   return false;
    // }
    else if (!city.trim()) {
      showToastMessage("Please enter City");
      return false;
    } else if (!zip_code.trim()) {
      showToastMessage("Please enter zip code");
      return false;
    } else if (zip_code.trim().length != 5) {
      showToastMessage("Please enter valid 5 digit zip code");
      return false;
    } else if (!state.trim()) {
      showToastMessage("Please enter State");
      return false;
    }
    return true;
  };
  const valid_ShippingInfo = () => {
    if (isValid_shippingInfo()) {
      fetchData(0);
    }
  };
  return (
    <SafeAreaView style={[pallete.mainContainor]}>
      <BackButton
        onBackPress={() =>
          navigate(assets.NavigationConstants.STAYPUT_CARD.NAME)
        }
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView style={styles.scrollContainer}>
          <View style={[pallete.mb_50]}>
            <Modal
              visible={
                loading === LOADING_TYPES.LOADING ||
                loading === LOADING_TYPES.FETCHING_MORE
              }
              transparent={true}
            >
              <View style={[pallete.Loader_View]}>
                <ActivityIndicator
                  size="large"
                  color="white"
                  justifyContent={"center"}
                  marginTop="100%"
                />
              </View>
            </Modal>
            <Text style={styles.title}>Shipping information</Text>
            <Text style={[styles.smallTxt, styles.topSpacer]}>
              We're sending you a pre-loaded
            </Text>
            <Text style={styles.smallTxt}>StayPut Card to:</Text>

            <Text_Input
              placeholdertxt={assets.Colors.PLACEHOLDER_TEXT_COLOR}
              event={(text) => setAddress1(text)}
              edit={address1}
              style={[styles.space_vertical, styles.topSpacer]}
              subtitle={""}
              title="Address1"
            />
            <Text_Input
              placeholdertxt={assets.Colors.PLACEHOLDER_TEXT_COLOR}
              event={(text) => setAddress2(text)}
              edit={address2}
              style={styles.space_vertical}
              subtitle={""}
              title="Address2"
            />
            <Text_Input
              placeholdertxt={assets.Colors.PLACEHOLDER_TEXT_COLOR}
              event={(text) => setCity(text)}
              edit={city}
              style={styles.space_vertical}
              subtitle={""}
              title="City"
            />
            <View style={styles.row_inputs_view}>
              <Text_Input
                keyboard_type="numeric"
                placeholdertxt={assets.Colors.PLACEHOLDER_TEXT_COLOR}
                event={(text) => setZip_Code(text)}
                edit={zip_code}
                style={[styles.space_vertical, styles.input_row]}
                subtitle={""}
                title="Zip Code"
              />
              <View style={styles.horizontal_spacer} />
              <Text_Input
                placeholdertxt={assets.Colors.PLACEHOLDER_TEXT_COLOR}
                event={(text) => setState(text)}
                edit={state}
                style={[styles.space_vertical, styles.input_row]}
                subtitle={""}
                title="State"
              />
            </View>
          </View>
        </ScrollView>
        <Button
          imgBG={""}
          style={[styles.buttn, pallete.mb_10]}
          txt={assets.Colors.BACKGROUND_THEME_COLOR}
          event={valid_ShippingInfo}
          bgcolor={assets.Colors.BUTTON_THEME_COLOR}
          image={false}
          img={""}
          title="Save"
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
export default Shipping_info;
