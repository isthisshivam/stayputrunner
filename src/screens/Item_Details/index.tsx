import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  Image,
  Pressable,
  Platform,
} from "react-native";
import moment from "moment";
import assets from "../../assets";
import useStyle from "./style";
import usePallete from "../../assets/Pallete";
import { useNavigation } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";
import Button from "../../common_components/Button";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Header from "../../common_components/Header";
import { GetData } from "../../utils/utilities";
import { LOGIN_KEY } from "../../Storage/ApplicationStorage";
import firebase from "@react-native-firebase/app";
import Loader from "../../common_components/Loader";
import firestore from "@react-native-firebase/firestore";
const Items_details = (props) => {
  const pallete = usePallete();
  const styles = useStyle();
  const { navigate, goBack } = useNavigation();
  const [runnerId, setRunnerId] = useState(null);
  const [orderDetails, setOrderDetails] = useState(
    props?.route?.params?.item || null
  );
  const [customerName, setCustomerName] = useState(
    props?.route?.params?.customer_name
  );
  const [msg, setMsg] = useState(false);
  useEffect(() => {
    getData();
  });

  const getData = async () => {
    const value = await GetData(LOGIN_KEY);
    console.log("GET===", value);
    if (value) {
      const user_info = JSON.parse(value);
      setRunnerId(user_info?.id);
    }
  };
  const trackSegment = () => {
    global.universalObject.logEvent("Found-Item", {
      customData: {
        orderId: orderDetails.order_id,
        Product_Name: orderDetails.customer_name,
        Price: orderDetails.total_price,
        device: Platform.OS,
        referrer: "",
        screen_URL:
          "https://projects.invisionapp.com/d/main#/console/21827194/462291590/preview#project_console",
      },
    });
    pushMessageToFireStore(
      `I didn’t find ` + orderDetails.product_name + ` in the store`,
      "text"
    );
  };
  const sendMessageTo = () => {
    navigate(assets.NavigationConstants.CHATTING.NAME, {
      orderId: orderDetails?.order_id,
      runnerId: runnerId,
      customerId: orderDetails?.uid,
    });
  };

  const pushMessageToFireStore = async (message, type) => {
    var messageToAdd = {
      message,
      runner_id: runnerId,
      customer_id: orderDetails.uid,
      type: type,
      image: "",
      created_at: moment().format(), ///set current date to firestore
    };
    await firestore()
      .collection(assets.Secrets.MESSAGES)
      .doc(runnerId + `_` + orderDetails.uid + `_` + orderDetails.order_id)
      .collection(assets.Secrets.MESSAGE_COLLECTION)
      .add(messageToAdd)
      .then(() => {});
    ///here pushing latest messageToAdd to doc as field
    await firebase
      .firestore()
      .collection(assets.Secrets.MESSAGES)
      .doc(runnerId + `_` + orderDetails?.uid + `_` + orderDetails?.order_id)
      .set({ LatestMessage: messageToAdd })
      .then(() => {
        setMsg(true);
        console.log("predefined message has been sent to ===");
      });
  };

  return (
    <View style={[pallete.mainContainor]}>
      <Header
        bg={assets.Colors.BACKGROUND_THEME_COLOR}
        icon={assets.Colors.ACCOUNT_TXT_COLOR}
        txt={assets.Colors.ACCOUNT_TXT_COLOR}
        shadow={true}
        event={goBack}
        icon1="close"
        title={customerName + "'s order"}
        icon2="chat-processing-outline"
        orderId={orderDetails?.order_id}
        customerId={orderDetails?.uid}
      />
      <ScrollView style={styles.scrollContainer}>
        <Image source={{ uri: orderDetails.images[0] }} style={styles.image} />
        <View style={styles.details}>
          <Text style={styles.qty}>
            {orderDetails.qty + "x "}
            {<Text style={styles.desc}>{orderDetails.product_name}</Text>}
          </Text>
        </View>
        <Button
          imgBG={""}
          style={styles.buttn}
          txt={assets.Colors.BACKGROUND_THEME_COLOR}
          event={() =>
            navigate(assets.NavigationConstants.BARCODE_SCAN.NAME, {
              orderDetails: orderDetails,
            })
          }
          bgcolor={assets.Colors.BUTTON_THEME_COLOR}
          image={false}
          img={""}
          title="Found item"
        />
        <View style={styles.payment_Container}>
          <View style={styles.rowContent}>
            <Text style={styles.boldTxt}>Location</Text>
            <View style={styles.rowContent}>
              <Text style={styles.boldTxt}>
                Alise:{<Text style={styles.regularTxt}>39 </Text>}
              </Text>
              <Text style={styles.boldTxt}>
                Bay:{<Text style={styles.regularTxt}>005</Text>}
              </Text>
            </View>
          </View>
          <View style={styles.rowContent}>
            <Text style={styles.boldTxt}>Price</Text>
            <Text style={styles.boldTxt}>{orderDetails.price}</Text>
          </View>
        </View>

        <Text onPress={() => [trackSegment()]} style={styles.bottom_Txt}>
          Cant find item
        </Text>
        <Text onPress={() => sendMessageTo()} style={styles.bottom_Txt}>
          Message {customerName}
        </Text>
        {msg == false ? null : (
          <View style={styles.row_msg}>
            <FontAwesome
              name={"commenting-o"}
              color={assets.Colors.SIGN_IN_COLOR}
              size={25}
            />
            <Text style={styles.message}>Message sent to {customerName}</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};
export default Items_details;
