import React, { useEffect, useState, useRef } from "react";
import {
  SafeAreaView,
  View,
  Text,
  Image,
  Pressable,
  TextInput,
  FlatList,
  Modal,
  Alert,
  Platform,
} from "react-native";
import assets from "../../assets";
import useStyle from "./style";
import {
  GetData,
  priceConvert,
  resetStack,
  SaveData,
  showToastMessage,
  validateEmail,
} from "../../utils/utilities";
import { WebView } from "react-native-webview";
import Ionicons from "react-native-vector-icons/Ionicons";
import usePallete from "../../assets/Pallete";
import { useNavigation } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { dW } from "../../utils/dynamicHeightWidth";
import AntDesign from "react-native-vector-icons/AntDesign";
import MapView, { Marker } from "react-native-maps";
import Geolocation from "react-native-geolocation-service";

import SwipeButton from "rn-swipe-button";

var arrow = require("../../assets/image/rArrow.png");
import {
  API_STATUS,
  RUNNER_ACCEPT_ORDER,
  RUNNER_ORDER_DETAILS,
  RUNNER_CREATE,
  RUNNER_UPDATE_ORDER_STATUS,
} from "../../Services/ApiUrls";
import { useSelector } from "react-redux";
import { useRest, CALL_TYPES, LOADING_TYPES } from "../../Services/rest/api";
import Loader from "../../common_components/Loader";
import BackgroundGeolocation from "@mauron85/react-native-background-geolocation";
import { ToolTipMenu } from "../../common_components/ToolTip";
var liveLatitude = 0;
var liveLongitude = 0;
const orderView = (props) => {
  const pallete = usePallete();
  const styles = useStyle();
  const googleMapRef = useRef();
  const [status, setOrderStatus] = useState(null);
  const [mapCordinates, setMapCordinates] = useState({
    latitude: 37.785834,
    longitude: -122.406417,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [slideText, setSlideText] = useState("Slide to accept");
  const [orderDetails, setOrderDetails] = useState(null);
  const [items, setItems] = useState([]);
  const [isHelp, setHelpShow] = useState(false);
  const { navigate, goBack } = useNavigation();
  const liveLocationReducer = useSelector(
    (state) => state?.liveLocationReducerData?.LiveLocationReducer?.location
  );
  const item_payload = {
    order_id: props?.route?.params?.orderId,
  };

  const update_accountPayload = {
    latitude: liveLatitude,
    longitude: liveLongitude,
  };

  const { data, loading, error, fetchData, responseCode } = useRest({
    URL: RUNNER_ORDER_DETAILS,
    PAYLOAD: item_payload,
    CALL_TYPE: CALL_TYPES.POST,
    lazy: false,
  });
  const {
    data: acceptOrderData,
    loading: acceptOrderLoading,
    error: acceptOrderError,
    fetchData: acceptOrderFetchData,
    responseCode: acceptOrderResponsecode,
  } = useRest({
    URL: RUNNER_ACCEPT_ORDER,
    PAYLOAD: item_payload,
    CALL_TYPE: CALL_TYPES.POST,
    lazy: true,
  });

  const orderStatusPayload = {
    order_id: props?.route?.params?.orderId,
    status: "2",
  };
  const orderStatusWithLocationPayload = {
    order_id: props?.route?.params?.orderId,
    status: "2",
    latitude: liveLocationReducer && liveLocationReducer?.latitude,
    longitude: liveLocationReducer && liveLocationReducer?.longitude,
  };
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
        ? orderStatusWithLocationPayload
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

    if (data?.status != "1") {
      setItems(data?.done_items);
    } else {
      setItems(data?.items);
    }
    setOrderStatus(data?.status);
    setTimeout(() => {
      global.universalObject.logEvent("View-Order", {
        customData: {
          orderId: props?.route?.params?.orderId,
          amount: data?.total_price,
          item: JSON.stringify(data?.items.length),
          distance: data?.delivery_address_distance,
        },
      });
    }, 100);
  };

  const onSwipeRight = () => {
    acceptOrderFetchData(0);
  };

  //handle order accept call by @d9n6
  useEffect(() => {
    if (acceptOrderData) {
      if (responseCode == API_STATUS.SUCCESS) {
        global.universalObject.logEvent("Accepted-Order", {
          customData: {
            orderId: props?.route?.params?.orderId,
            amount: orderDetails?.total_price,
            item: JSON.stringify(orderDetails?.items?.length),
            deliveryFee: orderDetails?.delivery_tip,
            tip: orderDetails?.service_fee,
            distance: data?.delivery_address_distance,
          },
        });
        fetchDataOrderStatusUpdate(0);
      } else {
        setTimeout(() => {
          showToastMessage(acceptOrderData?.message);
        }, 100);
      }
    }
  }, [acceptOrderData, acceptOrderError, acceptOrderResponsecode]);
  //handle order status update call by @d9n6

  useEffect(() => {
    console.log(
      "updateOrderStatusData==>",
      JSON.stringify(updateOrderStatusData)
    );
    if (updateOrderStatusData && responseCodeOrderStatusUpdate == 200) {
      navigate(assets.NavigationConstants.SHOPPING.NAME, {
        orderId: props?.route?.params?.orderId,
      });
    } else if (updateOrderStatusData) {
      setSlideText("Failed to Accept Order");
    }
  }, [
    updateOrderStatusData,
    updateOrderStatusError,
    responseCodeOrderStatusUpdate,
  ]);
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
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
      100
    );
  };
  const changeLocationOnMap = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        const currentLongitude = JSON.stringify(position.coords.longitude);
        const currentLatitude = JSON.stringify(position.coords.latitude);
        let locationInfo = {
          latitude: currentLatitude,
          longitude: currentLongitude,
        };
        global.location = locationInfo;
        setLocationInfo(currentLatitude, currentLongitude);
      },
      (error) => {
        // See error code charts below.
        console.log(error.code, error.message);
      },
      { enableHighAccuracy: false, timeout: 15000 }
    );
    return;
  };
  const renderItems = (item) => {
    const { product_name, price, images, qty, id } = item;
    return (
      <View style={styles.ViewOrder}>
        <Image
          source={{ uri: images[0] }}
          style={{ height: 45, width: 45, resizeMode: "contain" }}
        ></Image>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            flex: 1,
            marginLeft: 20,
            justifyContent: "space-between",
          }}
        >
          <Text numberOfLines={1} style={styles.order}>
            {product_name}
          </Text>
          <Text style={styles.netPrice}>{`$` + priceConvert(price)}</Text>
        </View>
      </View>
    );
  };
  return (
    <View style={styles.mainContainer}>
      <View style={{ flex: 1 }}>
        <View style={{ flex: 0.5 }}>
          <View style={styles.mapView}>
            <MapView
              ref={googleMapRef}
              style={styles.map}
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
          <Loader
            isLoading={
              loading === LOADING_TYPES.LOADING ||
              acceptOrderLoading === LOADING_TYPES.LOADING ||
              updateOrderStatusLoading === LOADING_TYPES.LOADING
            }
          ></Loader>
          <Pressable
            onPress={() => goBack()}
            style={{
              padding: dW(9),
              left: dW(20),
              backgroundColor: assets.Colors.BACKGROUND_THEME_COLOR,
              borderRadius: dW(22),
              position: "absolute",
              zIndex: 1,
              top: Platform.OS === "ios" ? "10%" : "15%",
            }}
          >
            <MaterialCommunityIcons
              name={"close"}
              color={assets.Colors.ACCOUNT_TXT_COLOR}
              size={25}
            />
          </Pressable>
          <Pressable
            onPress={() => setHelpShow(true)}
            style={{
              padding: dW(9),
              right: dW(20),
              backgroundColor: assets.Colors.BACKGROUND_THEME_COLOR,
              borderRadius: dW(22),
              position: "absolute",
              zIndex: 1,
              top: Platform.OS === "ios" ? "10%" : "15%",
            }}
          >
            <Text style={styles.help}>Help</Text>
          </Pressable>
          {Platform.OS === "ios" && (
            <Pressable
              onPress={() => changeLocationOnMap()}
              style={{
                padding: dW(9),
                right: dW(20),
                backgroundColor: assets.Colors.BACKGROUND_THEME_COLOR,
                borderRadius: dW(22),
                position: "absolute",
                zIndex: 1,
                top: "25%",
              }}
            >
              <MaterialCommunityIcons
                name={"crosshairs-gps"}
                color={assets.Colors.ACCOUNT_TXT_COLOR}
                size={25}
              />
            </Pressable>
          )}
        </View>
        <View style={{ flex: 0.5 }}>
          <ScrollView>
            <View style={styles.priceView}>
              <Text style={styles.price}>
                {orderDetails && priceConvert(orderDetails?.total_price)}
              </Text>
              <View style={styles.paymentview}>
                <Text style={styles.deliveryfees}>
                  {`You will earn $` +
                    priceConvert(orderDetails?.delivery_fee) +
                    ` + tip`}
                </Text>

                <ToolTipMenu
                  ToolTipContent={assets.strings.viewOrderTip}
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

            <View style={styles.IconView}>
              <Image source={{ uri: "html://image.source.one/image.png" }} />
              <Text style={styles.homeDepotText}>
                {orderDetails?.store_name}
              </Text>
            </View>
            <View style={styles.ShoppingView}>
              <View style={styles.shopping}>
                <AntDesign
                  name="shoppingcart"
                  color={assets.Colors.BLACK_COLOR}
                  size={25}
                />
                <Text style={styles.item}>
                  {orderDetails?.items_count &&
                    orderDetails?.items_count + ` items`}
                </Text>
              </View>
              <ScrollView>
                {items.map((item) => {
                  return renderItems(item);
                })}
              </ScrollView>
            </View>
          </ScrollView>
        </View>

        {status == "1" ? (
          <View style={{ padding: 0 }}>
            <SwipeButton
              height={50}
              enableRightToLeftSwipe={false}
              titleStyles={styles.slideToText}
              title={slideText}
              containerStyles={styles.btnView}
              railFillBackgroundColor={"transparent"}
              railBackgroundColor={assets.Colors.BUTTON_COLOR}
              thumbIconStyles={styles.arrow}
              railFillBorderColor={assets.Colors.BUTTON_COLOR}
              railBorderColor={assets.Colors.BUTTON_COLOR}
              disabledRailBackgroundColor={assets.Colors.BUTTON_COLOR}
              disabledThumbIconBorderColor={assets.Colors.BUTTON_COLOR}
              thumbIconImageSource={arrow}
              thumbIconWidth={50}
              thumbIconBackgroundColor={assets.Colors.NEW_C}
              thumbIconBorderColor={assets.Colors.BUTTON_COLOR}
              onSwipeStart={() => setSlideText("Processing...")}
              onSwipeFail={() => setSlideText("Slide to accept")}
              onSwipeSuccess={() => [
                setSlideText("Accepting Order..."),
                onSwipeRight(),
              ]}
              swipeSuccessThreshold={30}
            ></SwipeButton>
          </View>
        ) : null}
      </View>
      {/* help modal */}
      <View>
        <Modal
          animationType="none"
          transparent={true}
          visible={isHelp}
          onRequestClose={() => {
            setHelpShow(isHelp);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View style={styles.row}>
                <Ionicons
                  name={"ios-close"}
                  color={assets.Colors.BLACK_COLOR}
                  size={35}
                  onPress={() => setHelpShow(false)}
                />
                <Text style={styles.instant_Cash}>Help</Text>
                <View></View>
              </View>
              <WebView
                automaticallyAdjustContentInsets={false}
                source={{
                  uri: "https://support.google.com/webmasters/answer/9012289?hl=en",
                }}
              />
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
};

export default orderView;
