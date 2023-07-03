import React, { useState, useEffect, useRef } from "react";
import {
  SafeAreaView,
  View,
  Text,
  Image,
  Pressable,
  TextInput,
  Modal,
  Platform,
  Linking,
} from "react-native";
import assets from "../../assets";
import useStyle from "./style";
import { useSelector } from "react-redux";
import usePallete from "../../assets/Pallete";
import { useNavigation } from "@react-navigation/native";
import Button from "../../common_components/Button";
import Header from "../../common_components/Header";
import { dW } from "../../utils/dynamicHeightWidth";
import AntDesign from "react-native-vector-icons/AntDesign";
import MapView, { Marker } from "react-native-maps";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import {
  API_STATUS,
  RUNNER_ACCEPT_ORDER,
  RUNNER_ORDER_DETAILS,
  RUNNER_CREATE,
  RUNNER_UPDATE_ORDER_STATUS,
} from "../../Services/ApiUrls";
import { useRest, CALL_TYPES, LOADING_TYPES } from "../../Services/rest/api";
import Loader from "../../common_components/Loader";
import { Secrets } from "../../assets/secrets";
import { ToolTipMenu } from "../../common_components/ToolTip";
import { priceConvert } from "../../utils/utilities";
const shopping = (props) => {
  const pallete = usePallete();
  const styles = useStyle();

  const { navigate, addListener } = useNavigation();
  const googleMapRef = useRef();

  const liveLocationReducer = useSelector(
    (state) => state?.liveLocationReducerData?.LiveLocationReducer?.location
  );

  const [popup, setPopup] = useState(false);
  const [orderDetails, setOrderDetails] = useState();
  const [mapCordinates, setMapCordinates] = useState({
    latitude: 37.785834,
    longitude: -122.406417,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const item_payload = {
    order_id: props?.route?.params?.orderId,
  };
  const orderStatusPayload = {
    order_id: props?.route?.params?.orderId,
    status: Secrets.ORDER_STATUS.Shopping,
  };
  const orderStatusPayloadWithLocation = {
    order_id: props?.route?.params?.orderId,
    status: Secrets.ORDER_STATUS.Shopping,
    latitude: liveLocationReducer && liveLocationReducer?.latitude,
    longitude: liveLocationReducer && liveLocationReducer?.longitude,
  };

  const { data, loading, error, fetchData, responseCode } = useRest({
    URL: RUNNER_ORDER_DETAILS,
    PAYLOAD: item_payload,
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
  }, []);
  const {
    data: updateOrderStatusData,
    loading: updateOrderStatusLoading,
    error: updateOrderStatusError,
    fetchData: fetchDataOrderStatusUpdate,
    responseCode: responseCodeOrderStatusUpdate,
  } = useRest({
    URL: RUNNER_UPDATE_ORDER_STATUS,
    PAYLOAD:
      liveLocationReducer && liveLocationReducer?.latitude
        ? orderStatusPayloadWithLocation
        : orderStatusPayload,
    CALL_TYPE: CALL_TYPES.POST,
    lazy: true,
  });

  //handle order details call by @d9n6
  useEffect(() => {
    if (data) {
      if (responseCode == API_STATUS.SUCCESS) {
        setLocationInfo(
          parseFloat(data?.data?.store_latidude),
          parseFloat(data?.data?.store_longitude)
        );
        setData(data);
      }
    }
  }, [data, error, responseCode]);
  const setData = (resolve) => {
    const { data } = resolve;
    setOrderDetails(data);
    global.universalObject.logEvent("View-Order", {
      customData: {
        orderId: props?.route?.params?.orderId,
        amount: data.total_price,
        item: JSON.stringify(data.items.length),
        distance:
          "https://projects.invisionapp.com/d/main#/console/21827194/464056181/preview#project_console",
      },
    });
  };
  const setLocationInfo = async (lat, lng) => {
    await setMapCordinates({
      latitude: lat,
      longitude: lng,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    });
    googleMapRef.current.animateToRegion(
      {
        latitude: lat,
        longitude: lng,
        latitudeDelta: 0.09222122,
        longitudeDelta: 0.0421111,
      },
      100
    );
  };

  //handle order status update call by @d9n6
  useEffect(() => {
    if (updateOrderStatusData && responseCodeOrderStatusUpdate == 200) {
      global.universalObject.logEvent("Start-Shopping", {
        customData: {
          orderId: props?.route?.params?.orderId,
          deliveryFee: orderDetails?.delivery_tip,
          tip: orderDetails?.service_fee,
          distance:
            "https://projects.invisionapp.com/d/main#/console/21827194/462291587/preview#project_console",
        },
      });
      navigate(assets.NavigationConstants.ORDERS_ITEMS.NAME, {
        orderId: props?.route?.params?.orderId,
        tabIndex: 0,
      });
    } else {
    }
  }, [
    updateOrderStatusData,
    updateOrderStatusError,
    responseCodeOrderStatusUpdate,
  ]);
  const onGotItPress = () => {
    setTimeout(() => {
      fetchDataOrderStatusUpdate(0);
    }, 1000);
  };
  const navigateToMap = () => {
    global.universalObject.logEvent("Navigate-to-Store");
    const scheme = Platform.select({
      ios: "maps:0,0?q=",
      android: "geo:0,0?q=",
    });
    const latLng = `${parseFloat(orderDetails?.store_latidude)},${parseFloat(
      orderDetails?.store_longitude
    )}`;
    const label = orderDetails?.store_name;
    const url = Platform.select({
      ios: `${scheme}${label}@${latLng}`,
      android: `${scheme}${latLng}(${label})`,
    });
    Linking.openURL(url);
  };

  return (
    <View style={styles.mainContainer}>
      <Header
        bg={assets.Colors.BACKGROUND_THEME_COLOR}
        shadow={true}
        event={() => props.navigation.openDrawer()}
        icon={assets.Colors.ACCOUNT_TXT_COLOR}
        icon1="menu"
        txt={assets.Colors.ACCOUNT_TXT_COLOR}
        title="Head to this store"
        icon2="chat-processing-outline"
        orderId={orderDetails?.id}
        customerId={orderDetails?.uid}
        customerFCMTkn={orderDetails?.customer_firebase_token}
      />
      <Loader isLoading={loading === LOADING_TYPES.LOADING} />
      <View style={[pallete.mb_10]}>
        <View style={styles.mapView}>
          <MapView
            ref={googleMapRef}
            style={styles.map}
            mapType={Platform.OS == "android" ? "none" : "standard"}
            initialRegion={mapCordinates}
            showsUserLocation={true}
          >
            <Marker
              draggable={true}
              coordinate={{
                latitude: mapCordinates.latitude,
                longitude: mapCordinates.longitude,
              }}
            >
              <Image source={assets.Images.MapStore} style={styles.marker} />
            </Marker>
          </MapView>
        </View>

        <View style={styles.IconView}>
          <Image
            style={{ height: 30, width: 30, resizeMode: "contain" }}
            borderRadius={2}
            source={{ uri: orderDetails?.store_image }}
          />
          <Text style={styles.homeDepotText}>
            {orderDetails?.store_name && orderDetails?.store_name}
          </Text>
        </View>

        <Pressable onPress={navigateToMap} style={styles.btnView}>
          <Text style={styles.slideToText}>Directions</Text>
        </Pressable>
        <View style={styles.priceView}>
          <Text style={styles.order}>You have 1 order</Text>
          <View style={styles.paymentview}>
            <Text style={styles.deliveryfees}>
              {`You will earn $` +
                priceConvert(orderDetails?.delivery_fee) +
                ` tip`}
            </Text>

            <ToolTipMenu
              ToolTipContent={assets.strings.afterAcceptingOrder}
            ></ToolTipMenu>
          </View>
        </View>
        <View
          style={{
            height: dW(1),
            backgroundColor: assets.Colors.LIGHT_TEXT_COLOR,
            margin: dW(15),
          }}
        ></View>
        <View style={styles.nameview}>
          <Text style={styles.custmorName}>
            {orderDetails && orderDetails?.customer_name}
          </Text>
        </View>
        <View style={styles.shopping}>
          <AntDesign
            name="shoppingcart"
            color={assets.Colors.LIGHT_TEXT_COLOR}
            size={25}
          />
          <Text style={styles.item}>
            {orderDetails?.items_count &&
              orderDetails?.items_count &&
              orderDetails?.items_count + ` items`}
          </Text>
        </View>
        <Pressable
          onPress={() => setPopup(true)}
          style={styles.shoppingbtnView}
        >
          <Text style={styles.shoppingText}>Start Shopping</Text>
        </Pressable>

        <Modal
          animationType="none"
          transparent={true}
          visible={popup}
          onRequestClose={() => {
            setPopup(!popup);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.shop}>Are you ready to shop?</Text>
              <View style={[styles.rowContent, styles.space]}>
                <View style={styles.rowContent}>
                  <SimpleLineIcons
                    name="check"
                    color={assets.Colors.BUTTON_THEME_COLOR}
                    size={30}
                  />
                  <Text style={styles.rowTxt}>Do you have your face mask?</Text>
                </View>
                <View></View>
              </View>
              <View style={styles.rowContent}>
                <View style={styles.rowContent}>
                  <SimpleLineIcons
                    name="check"
                    color={assets.Colors.BUTTON_THEME_COLOR}
                    size={30}
                  />
                  <Text style={styles.rowTxt}>Do you have your run card?</Text>
                </View>
                <View></View>
              </View>
              <Button
                imgBG={""}
                style={styles.bttnSpace}
                txt={assets.Colors.BACKGROUND_THEME_COLOR}
                event={() => {
                  [setPopup(false), onGotItPress()];
                }}
                bgcolor={assets.Colors.THEME_COLOR_PRIMARY}
                image={false}
                img={""}
                title="Got it!"
              />
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
};
export default shopping;
