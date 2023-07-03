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
  Pressable,
} from "react-native";
import assets from "../../assets";

import useStyle from "./style";
import usePallete from "../../assets/Pallete";
import { useNavigation } from "@react-navigation/native";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import Button from "../../common_components/Button";
import Header from "../../common_components/Header";
import { RUNNER_PAYMENT_METHODS } from "../../Services/ApiUrls";

import { useRest, CALL_TYPES, LOADING_TYPES } from "../../Services/rest/api";

const Payment_Method = ({ route, navigation }) => {
  const background = route?.params?.payload;
  console.log(background);
  const pallete = usePallete();

  const styles = useStyle();
  const { navigate, goBack, addListener } = useNavigation();
  const [paymentMethodList, setPaymentMethodList] = useState([]);

  const { data, loading, error, fetchData, responseCode } = useRest({
    URL: RUNNER_PAYMENT_METHODS,
    PAYLOAD: {},
    CALL_TYPE: CALL_TYPES.POST,
    lazy: true,
  });

  useEffect(() => {
    const focusListener = addListener("focus", () => {
      fetchData(0);
    });
    return () => {
      focusListener;
    };
  });

  useEffect(() => {
    if (data) {
      const status = data.status;
      if (status == 200) {
        setPaymentMethodList(data?.data);
      }
    }
  }, [data, error, responseCode]);

  const Valid_Deposit = () => {
    navigate(assets.NavigationConstants.ADD_PAYMENT_METHOD.NAME);
  };

  const onEditPress = (_id) => {
    navigate(assets.NavigationConstants.BANK_INFORMATION.NAME, { _id });
  };

  const listItem = (item) => {
    const { account_holder_name, account_holder_type, bank_name, last4, id } =
      item;
    return (
      <View style={styles.list_item}>
        <View style={styles.list_item_content}>
          <Image style={styles.list_img} source={assets.Images.BANK}></Image>
          <View style={styles.list_item_row}>
            <Text style={styles.heading}>{bank_name}</Text>
            <Text style={styles.bank_no}>{`....` + last4}</Text>
          </View>
        </View>

        <Pressable onPress={() => onEditPress(id)} style={styles.edit}>
          <Image
            style={styles.list_img_small}
            source={assets.Images.EDIT}
          ></Image>
        </Pressable>
      </View>
    );
  };
  return (
    <View style={[pallete.mainContainor]}>
      <Header
        bg={assets.Colors.BACKGROUND_THEME_COLOR}
        icon={assets.Colors.ACCOUNT_TXT_COLOR}
        txt={assets.Colors.ACCOUNT_TXT_COLOR}
        shadow={true}
        event={() => navigation.openDrawer()}
        icon1="menu"
        title="Payment Methods"
        icon2="help-circle-outline"
        ToolTipContent={assets.strings.paymentMethod}
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
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

          <FlatList
            contentContainerStyle={{ padding: 5 }}
            ListHeaderComponent={() => (
              <Text style={styles.txt}>
                You are connected with your bank for a direct deposit
              </Text>
            )}
            data={paymentMethodList}
            renderItem={({ item }) => listItem(item)}
            ListEmptyComponent={() => (
              <View
                style={{
                  flex: 1,

                  width: "100%",
                  height: 450,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text style={styles.txt}>No Payment Method Yet.</Text>
                <Text
                  style={[
                    styles.txt,
                    { textAlign: "center", lineHeight: 20, fontSize: 13 },
                  ]}
                >
                  Click on Add Payment Methods button below to add a New Payment
                  Method.
                </Text>
              </View>
            )}
          ></FlatList>
        </View>
        <Button
          imgBG={""}
          style={[styles.buttn, pallete.mb_30]}
          txt={assets.Colors.BACKGROUND_THEME_COLOR}
          event={Valid_Deposit}
          bgcolor={assets.Colors.BUTTON_THEME_COLOR}
          image={false}
          img={""}
          title="Add Payment Methods"
        />
      </KeyboardAvoidingView>
    </View>
  );
};
export default Payment_Method;
