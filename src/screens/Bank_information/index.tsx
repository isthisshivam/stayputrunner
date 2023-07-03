import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  Text,
  Modal,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Image,
} from "react-native";
import assets from "../../assets";
import Back_Header from "../../common_components/Back_Header";
import useStyle from "./style";
import usePallete from "../../assets/Pallete";
import { useNavigation } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";
import Text_Input from "../../common_components/Text_Input";
import Button from "../../common_components/Button";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import {
  RUNNER_DELETE_PAYMENT_METHOD,
  CREATE_STRIPE_HOLDER,
  RUNNER_PAYMENT_METHOD_INFO,
} from "../../Services/ApiUrls";
import {
  SaveData,
  showToastMessage,
  validateEmail,
} from "../../utils/utilities";
import { useRest, CALL_TYPES, LOADING_TYPES } from "../../Services/rest/api";

const Bank_Information = ({ route }) => {
  const cardId = route?.params?._id;

  const pallete = usePallete();
  const styles = useStyle();
  const { navigate, goBack, addListener } = useNavigation();
  const [rout_numb, setRout_Numb] = useState("");
  const [acct_numb, setAcct_Numb] = useState("");

  const [cardDetails, setCardDetails] = useState(null);

  const DELETE_PAYMENT_METHOD_PAYLOAD = {
    payment_method_id: cardId,
  };
  const CARD_DETAILS_PAYLOAD = {
    payment_method_id: cardId,
  };
  const { data, loading, error, fetchData, responseCode } = useRest({
    URL: RUNNER_PAYMENT_METHOD_INFO,
    PAYLOAD: CARD_DETAILS_PAYLOAD,
    CALL_TYPE: CALL_TYPES.POST,
    lazy: true,
  });

  useEffect(() => {
    const uTurn = addListener("focus", () => {
      fetchData(0);
    });
    return () => {
      uTurn;
    };
  });
  useEffect(() => {
    if (data) {
      const status = data.status;
      if (status == 200) {
        setCardDetails(data?.data);
        setRout_Numb(data?.data?.routing_number);
        setAcct_Numb(`*** *** **** ` + data?.data?.last4);
      } else {
        setTimeout(() => {
          showToastMessage(data.message);
        }, 300);
      }
    }
  }, [data, error, responseCode]);

  const {
    data: delete_Payment_method_data,
    loading: delete_Payment_method_loading,
    error: delete_Payment_method_error,
    fetchData: delete_Payment_method_fetch,
    responseCode: delete_Payment_method_response_code,
  } = useRest({
    URL: RUNNER_DELETE_PAYMENT_METHOD,
    PAYLOAD: DELETE_PAYMENT_METHOD_PAYLOAD,
    CALL_TYPE: CALL_TYPES.POST,
    lazy: true,
  });

  useEffect(() => {
    if (delete_Payment_method_data) {
      const status = data.status;
      if (status == 200) {
        navigate(assets.NavigationConstants.PAYMENT_METHOD.NAME);
      } else {
        setTimeout(() => {
          showToastMessage(data.message);
        }, 300);
      }
    }
  }, [
    delete_Payment_method_data,
    delete_Payment_method_error,
    delete_Payment_method_response_code,
  ]);

  const removePaymentMethod = () => {
    delete_Payment_method_fetch(0);
  };
  const Header = () => {
    return (
      <View style={styles.header}>
        <MaterialCommunityIcons
          name="arrow-left"
          color={assets.Colors.BLACK_COLOR}
          size={35}
          onPress={() =>
            navigate(assets.NavigationConstants.PAYMENT_METHOD.NAME)
          }
        />
        <View style={styles.location}>
          <Text style={styles.titleH}>{"Bank Information"}</Text>
          <Text style={styles.subtitle}>{"Direct Deposit"}</Text>
        </View>
        <View></View>
      </View>
    );
  };
  return (
    <View style={[pallete.mainContainor]}>
      {Header()}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView style={styles.scrollContainer}>
          <View style={[pallete.mb_50]}>
            <Modal
              visible={
                loading === LOADING_TYPES.LOADING ||
                loading === LOADING_TYPES.FETCHING_MORE ||
                delete_Payment_method_loading === LOADING_TYPES.LOADING ||
                delete_Payment_method_data === LOADING_TYPES.FETCHING_MORE
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
            <View style={styles.list_item}>
              <Image
                style={styles.list_img}
                source={assets.Images.BANK}
              ></Image>
              <View style={styles.list_item_row}>
                <Text style={styles.heading}>{cardDetails?.bank_name}</Text>
                <Text style={styles.bank_no}>
                  {`....` + cardDetails?.last4}
                </Text>
              </View>
            </View>
            <Text_Input
              keyboard_type="numeric"
              placeholdertxt={assets.Colors.PLACEHOLDER_TEXT_COLOR}
              event={(text) => setRout_Numb(text)}
              edit={rout_numb}
              style={[styles.space_vertical, styles.topSpacer]}
              subtitle={""}
              title="Routing number"
              editable={false}
            />
            <Text_Input
              keyboard_type="numeric"
              placeholdertxt={assets.Colors.PLACEHOLDER_TEXT_COLOR}
              event={(text) => setAcct_Numb(text)}
              edit={acct_numb}
              style={styles.space_vertical}
              subtitle={""}
              title="Account number"
              editable={false}
            />
            <Image
              source={assets.Images.CHECK_ROUTING_ICON}
              style={styles.logo}
            />
            <View style={styles.row_content}>
              <Text style={styles.txt}>Routing number</Text>
              <Text style={styles.txt}>Account number</Text>
            </View>
            <View style={[styles.bottom_content, styles.topSpacer]}>
              <Text style={styles.bottomtxt}>
                By clicking save, you agree to{" "}
              </Text>
              <Text style={styles.colortxt}> Stripe's</Text>
            </View>
            <Text style={styles.colortxt}>Connected Account Agreement.</Text>
          </View>
        </ScrollView>
        <Button
          imgBG={""}
          style={[styles.buttn, pallete.mb_30]}
          txt={assets.Colors.BACKGROUND_THEME_COLOR}
          event={removePaymentMethod}
          bgcolor={assets.Colors.RED_CLR}
          image={false}
          img={""}
          title="Remove "
        />
      </KeyboardAvoidingView>
    </View>
  );
};
export default Bank_Information;
