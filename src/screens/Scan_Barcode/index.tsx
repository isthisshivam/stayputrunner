import React, { useState, useRef } from "react";
import {
  SafeAreaView,
  View,
  Text,
  Image,
  Linking,
  Pressable,
  Modal,
  TextInput,
  ScrollView,
  Platform,
} from "react-native";
import assets from "../../assets";
import useStyle from "./style";
import usePallete from "../../assets/Pallete";
import { useNavigation } from "@react-navigation/native";
import { showToastMessage } from "../../utils/utilities";
import QRCodeScanner from "react-native-qrcode-scanner";
import { RNCamera } from "react-native-camera";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Button from "../../common_components/Button";
import Header from "../../common_components/Header";
import { dW, dH } from "../../utils/dynamicHeightWidth";

const Scan_barcode = (props) => {
  const pallete = usePallete();
  const styles = useStyle();
  const cameraRef = useRef();
  const { navigate, goBack } = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);

  const [orderDetails, setOrderDetails] = useState(
    props.route.params.orderDetails
  );
  const [scannedResult, setScannedResult] = useState(null);
  const onSuccess = (e) => {
    if (e) setScannedResult(e.data);

    global.universalObject.logEvent("Found-Item", {
      customData: {
        orderId: orderDetails.order_id,
        Product_Name: orderDetails.product_name,
        Price: orderDetails.price,
        device: Platform.OS,
        referrer: "",
        screen_URL:
          "https://projects.invisionapp.com/d/main#/console/21827194/462291590/preview#project_console",
      },
    }),
      setTimeout(() => {
        setModalVisible(true);
      }, 2000);
  };

  const onConfirmPress = () => {
    if (scannedResult) {
      global.universalObject.logEvent("Barcode-Scanned", {
        customData: {
          orderId: orderDetails.order_id,
          Product_Name: orderDetails.product_name,
        },
      }),
        setModalVisible(false);
      cameraRef.current.reactivate();
      navigate(assets.NavigationConstants.ITEM_FOUND.NAME, {
        orderDetails: orderDetails,
        sku: scannedResult,
      });
    } else {
      showToastMessage("Please provide Sku Number.");
    }
  };

  const backHandler = () => {
    goBack();
    cameraRef.current.reactivate();
  };
  return (
    <View style={[pallete.mainContainor]}>
      <Header
        bg={assets.Colors.BACKGROUND_THEME_COLOR}
        icon={assets.Colors.ACCOUNT_TXT_COLOR}
        txt={assets.Colors.ACCOUNT_TXT_COLOR}
        shadow={false}
        event={() => backHandler()}
        icon1="arrow-left"
        title="Scan barcode"
        icon2="chat-processing-outline"
        orderId={orderDetails?.order_id}
        customerId={orderDetails?.uid}
      />
      <ScrollView style={styles.scrollContainer}>
        <Pressable style={styles.itemContainer}>
          <Image
            source={{ uri: orderDetails.images[0] }}
            style={styles.image}
          />
          <View style={styles.details}>
            <Text style={styles.qty}>
              {orderDetails.qty + "x "}
              {<Text style={styles.desc}>{orderDetails.product_name}</Text>}
            </Text>
          </View>
          <View></View>
        </Pressable>
        <View style={styles.scanner}>
          <View style={styles.row}>
            <FontAwesome5
              name="spinner"
              color={assets.Colors.BACKGROUND_THEME_COLOR}
              size={20}
            />
            <Text style={styles.txt}>Looking up an item... </Text>
          </View>
          <Pressable>
            <QRCodeScanner
              onRead={onSuccess}
              ref={cameraRef}
              showMarker={true}
              markerStyle={styles.code_container}
              cameraStyle={{ height: dH(400) }}
              flashMode={RNCamera.Constants.FlashMode.auto}
            />
          </Pressable>
        </View>
      </ScrollView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.sku}>Enter SKU number</Text>
            <TextInput
              value={scannedResult}
              onChangeText={(value) => setScannedResult(value)}
              style={styles.code_bg}
            ></TextInput>
            <Button
              imgBG={""}
              style={styles.spacer}
              txt={assets.Colors.BACKGROUND_THEME_COLOR}
              event={() => {
                onConfirmPress();
              }}
              bgcolor={assets.Colors.BUTTON_THEME_COLOR}
              image={false}
              img={""}
              title="Confirm"
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};
export default Scan_barcode;
