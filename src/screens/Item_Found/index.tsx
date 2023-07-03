import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  Text,
  Image,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import assets from "../../assets";
import useStyle from "./style";
import usePallete from "../../assets/Pallete";
import { useNavigation } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";
import Button from "../../common_components/Button";
import Header from "../../common_components/Header";
import { showToastMessage } from "../../utils/utilities";
import { API_STATUS, RUNNER_ORDER_MARK_DONE } from "../../Services/ApiUrls";
import { useRest, CALL_TYPES, LOADING_TYPES } from "../../Services/rest/api";

var tempRemain = null;
const Item_found = (props) => {
  const pallete = usePallete();
  const styles = useStyle();

  const { navigate, goBack } = useNavigation();
  const [qty, setQty] = useState("");
  const [remain, setRemain] = useState(
    parseInt(props.route.params.orderDetails.qty)
  );
  const [orderDetails, setOrderDetails] = useState(
    props.route.params.orderDetails || null
  );
  const [sku, setSku] = useState(props.route.params.sku);

  console.log("orderDetails", JSON.stringify(orderDetails));
  const item_payload = {
    item_id: orderDetails.id,
    product_id: orderDetails.product_id,
  };

  const { data, loading, error, fetchData, responseCode } = useRest({
    URL: RUNNER_ORDER_MARK_DONE,
    PAYLOAD: item_payload,
    CALL_TYPE: CALL_TYPES.POST,
    lazy: true,
  });

  useEffect(() => {
    tempRemain = props.route.params.orderDetails.qty;
    if (data) {
      console.log("Quantity-confirmed==", JSON.stringify(data));

      global.universalObject.logEvent("Quantity-Confirmed", {
        customData: {
          orderId: orderDetails.id,
          product_Name: sku,
          SKU: sku,
          quantity: tempRemain,
        },
      });
      if (responseCode == API_STATUS.SUCCESS) onSuccess(data);
    }
  }, [data, error, responseCode]);

  const onSuccess = (resolve) => {
    const { data } = resolve;

    navigate(assets.NavigationConstants.ORDERS_ITEMS.NAME, {
      orderId: orderDetails.order_id,
      tabIndex: 1,
    });
  };

  const onConfirmPress = () => {
    fetchData(0);
  };
  const onQtyChange = (value) => {
    if (value) {
      setQty(parseInt(value));
      if (parseInt(value) <= remain) {
        setRemain(remain - parseInt(value));
      } else {
        showToastMessage(
          "Please enter qty which equals to remaining qty or less then."
        );
      }
    } else {
      setRemain(tempRemain);
    }
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={[pallete.mainContainor]}
    >
      <Header
        bg={assets.Colors.BACKGROUND_THEME_COLOR}
        icon={assets.Colors.ACCOUNT_TXT_COLOR}
        txt={assets.Colors.ACCOUNT_TXT_COLOR}
        shadow={false}
        event={goBack}
        icon1="arrow-left"
        title="Item found"
        icon2="chat-processing-outline"
        orderId={orderDetails?.order_id}
        customerId={orderDetails?.uid}
      />
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.itemContainer}>
          <Image
            source={{ uri: orderDetails && orderDetails.images[0] }}
            style={styles.image}
          />
          <View style={styles.details}>
            <View>
              <Text style={styles.qty}>
                {orderDetails.qty + "x "}
                {<Text style={styles.brand}>{orderDetails.product_name}</Text>}
              </Text>
              <Text
                style={[styles.sku, { fontFamily: assets.fonts.ROBOTO_MEDIUM }]}
              >
                SKU:
                {
                  <Text
                    style={[
                      styles.sku,
                      { fontFamily: assets.fonts.ROBOTO_REGULAR },
                    ]}
                  >
                    {sku}
                  </Text>
                }
              </Text>
            </View>
          </View>
          <View></View>
        </View>
        <View style={styles.itemContainer}>
          <Text
            style={[styles.sku, { fontFamily: assets.fonts.ROBOTO_MEDIUM }]}
          >
            Quantity found
          </Text>
          <View></View>
          <View style={styles.column}>
            <TextInput
              placeholder="0"
              placeholderTextColor={assets.Colors.INPUT_HOLDER_TXT_COLOR}
              textAlign="right"
              selectionColor={assets.Colors.TERMS_CONDITION_COLOR}
              onChangeText={(e) => {
                onQtyChange(e);
              }}
              keyboardType="number-pad"
              style={styles.input}
            />
            <Text style={styles.remain}>{remain} remaining</Text>
          </View>
        </View>
      </ScrollView>
      <Button
        imgBG={""}
        style={[styles.buttn, pallete.mb_10]}
        txt={assets.Colors.BACKGROUND_THEME_COLOR}
        event={() => onConfirmPress()}
        bgcolor={
          !qty
            ? assets.Colors.SAVE_EDIT_BG_CLR
            : assets.Colors.BUTTON_THEME_COLOR
        }
        image={false}
        img={""}
        title="Confirm"
      />
    </KeyboardAvoidingView>
  );
};
export default Item_found;
