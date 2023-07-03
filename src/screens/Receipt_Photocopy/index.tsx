import React, { useState, useEffect, useRef } from "react";
import {
  SafeAreaView,
  View,
  Text,
  Pressable,
  Platform,
  Image,
  ScrollView,
  Modal,
  ActivityIndicator,
} from "react-native";
import assets from "../../assets";
import useStyle from "./style";
import usePallete from "../../assets/Pallete";
import { useNavigation } from "@react-navigation/native";
import moment from "moment";
import MapView, { Marker } from "react-native-maps";
import { useSelector } from "react-redux";
import Button from "../../common_components/Button";
import Feather from "react-native-vector-icons/Feather";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Header from "../../common_components/Header";
import AntDesign from "react-native-vector-icons/AntDesign";
import {
  API_STATUS,
  RUNNER_ACCEPT_ORDER,
  RUNNER_ORDER_DETAILS,
  RUNNER_CREATE,
  RUNNER_UPDATE_ORDER_STATUS,
} from "../../Services/ApiUrls";
import { resetStack } from "../../utils/utilities";
import { useRest, CALL_TYPES, LOADING_TYPES } from "../../Services/rest/api";

import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import {
  uploadImage,
  randomImageName,
  showToastMessage,
  callNumber,
} from "../../utils/utilities";
import { Secrets } from "../../assets/secrets";
import { Linking } from "react-native";
import { GetData } from "../../utils/utilities";
import { LOGIN_KEY } from "../../Storage/ApplicationStorage";
import { dW } from "../../utils/dynamicHeightWidth";
const Receipt_copy = (props) => {
  const pallete = usePallete();
  const styles = useStyle();
  const googleMapRef = useRef();
  const [items, setItems] = useState([]);
  const navigation = useNavigation();
  const [productImage, setProductImage] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [showItems, setShowItems] = useState(false);
  const [runnerId, setRunnerId] = useState(null);
  const [dueDate, setDueDate] = useState("");
  const [mapCordinates, setMapCordinates] = useState({
    latitude: 37.785834,
    longitude: -122.406417,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [orderDetails, setOrderDetails] = useState(null);
  const [orderId, setOrderId] = useState(props?.route?.params?.orderId);

  const liveLocationReducer = useSelector(
    (state) => state?.liveLocationReducerData?.LiveLocationReducer?.location
  );

  useEffect(() => {
    getUserInformation();
  }, []);
  const getUserInformation = async () => {
    const value = await GetData(LOGIN_KEY);
    if (value) {
      const user_info = JSON.parse(value);
      setRunnerId(user_info?.id);
    }
  };
  const item_payload = {
    order_id: props?.route?.params?.orderId,
  };

  const updatePayload = {
    order_id: props?.route?.params?.orderId,
    door_leave_image: productImage,
    status: Secrets.ORDER_STATUS["In transit"],
  };
  const updatePayloadWithLocation = {
    order_id: props?.route?.params?.orderId,
    door_leave_image: productImage,
    status: Secrets.ORDER_STATUS["In transit"],
    latitude: liveLocationReducer && liveLocationReducer?.latitude,
    longitude: liveLocationReducer && liveLocationReducer?.longitude,
  };
  const completedOrderPayload = {
    order_id: props?.route?.params?.orderId,
    status: Secrets.ORDER_STATUS.Completed,
  };
  const completedOrderPayloadWithLocation = {
    order_id: props?.route?.params?.orderId,
    status: Secrets.ORDER_STATUS.Completed,
    latitude: liveLocationReducer && liveLocationReducer?.latitude,
    longitude: liveLocationReducer && liveLocationReducer?.longitude,
  };

  const { data, loading, error, fetchData, responseCode } = useRest({
    URL: RUNNER_ORDER_DETAILS,
    PAYLOAD: item_payload,
    CALL_TYPE: CALL_TYPES.POST,
    lazy: false,
  });

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
        ? updatePayloadWithLocation
        : updatePayload,
    CALL_TYPE: CALL_TYPES.POST,
    lazy: true,
  });
  const {
    data: completeOrderData,
    loading: completeOrderLoading,
    error: completeOrderError,
    fetchData: completeDataOrderFetchData,
    responseCode: responseCodecompleteOrderStatus,
  } = useRest({
    URL: RUNNER_UPDATE_ORDER_STATUS,
    PAYLOAD:
      liveLocationReducer && liveLocationReducer?.latitude
        ? completedOrderPayloadWithLocation
        : completedOrderPayload,
    CALL_TYPE: CALL_TYPES.POST,
    lazy: true,
  });

  useEffect(() => {
    if (productImage) fetchDataOrderStatusUpdate(0);
  }, [productImage]);

  //handle order details call by @d9n6
  useEffect(() => {
    if (data) {
      if (responseCode == API_STATUS.SUCCESS) {
        setData(data);
        getDueDate();
      }
    }
  }, [data, error, responseCode]);

  const getDueDate = () => {
    if (orderDetails && orderDetails?.schedule_end_time) {
      let today = moment(new Date()).format("YYYY-MM-DD");
      let endDate = moment(orderDetails?.schedule_end_time).format(
        "YYYY-MM-DD"
      );
      let formatForDays = moment(orderDetails?.schedule_end_time).format("LLL"); //give date
      let formatForTime = moment(orderDetails?.schedule_end_time).format("LT"); //give time

      if (moment(today).isSame(endDate)) setDueDate(formatForTime);
      else setDueDate(formatForDays);
    }
  };

  //handle order status update call by @d9n6
  useEffect(() => {
    console.log(
      "updateOrderStatusData==",
      JSON.stringify(updateOrderStatusData)
    );
    if (updateOrderStatusData && responseCodeOrderStatusUpdate == 200) {
    }
  }, [
    updateOrderStatusData,
    updateOrderStatusError,
    responseCodeOrderStatusUpdate,
  ]);
  //handle complete order update call by @d9n6
  useEffect(() => {
    if (completeOrderData && responseCodecompleteOrderStatus == 200) {
      setTimeout(() => {
        showToastMessage("Order Completed Successfully");
      }, 100);
      setTimeout(() => {
        resetStack(assets.NavigationConstants.DASHBOARD.NAME, null, navigation);
      }, 1500);
    } else {
    }
  }, [completeOrderData, completeOrderError, responseCodecompleteOrderStatus]);

  const markOrderasCompleted = () => {
    completeDataOrderFetchData(0);
  };
  const setData = (resolve) => {
    const { data, delivery_address } = resolve;
    if (data) {
      if (data?.status != "1") {
        setItems(data?.done_items);
      } else {
        setItems(data?.items);
      }
      setOrderDetails(data);
      if (
        data?.delivery_address?.latitude != "" &&
        data?.delivery_address?.latitude != "null" &&
        data?.delivery_address?.longitude != "" &&
        data?.delivery_address?.longitude != "null"
      )
        setLocationInfo(
          parseFloat(data?.delivery_address?.latitude),
          parseFloat(data?.delivery_address?.longitude)
        );
    }
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
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
      200
    );
  };
  const openCamera = async () => {
    await launchCamera({
      mediaType: "photo",
      cameraType: "back",
      quality: 0.2,
    })
      .then((result) => {
        console.log("Camera-Result====", JSON.stringify(result));
        uploadImageToS3(result?.assets[0]);
      })
      .catch((e) => {
        console.log("Camera-error====", JSON.stringify(e));
      });
  };
  const uploadImageToS3 = async (file) => {
    setTimeout(() => {
      setLoading(true);
    }, 100);
    await uploadImage(file, "Catalog", randomImageName())
      .then((data) => {
        if (data) {
          console.log("data?.location==", data?.location);
          setProductImage(data?.location);
        }
      })
      .finally(() => {
        setTimeout(() => {
          setLoading(false);
        }, 200);
      });
  };
  const waitCameraInflation = () => {
    setTimeout(() => {
      openCamera();
    }, 500);
  };
  const navigateToMap = () => {
    let bussiness_name = "";
    console.log(
      "delibery address==",
      orderDetails?.delivery_address?.latitude,
      orderDetails?.delivery_address?.longitude
    );
    if (orderDetails?.delivery_address) {
      if (
        orderDetails?.delivery_address?.latitude &&
        orderDetails?.delivery_address?.longitude
      ) {
        if (orderDetails?.delivery_address?.bussiness_name) {
          bussiness_name = orderDetails?.delivery_address?.bussiness_name;
        } else {
          let address = orderDetails?.delivery_address?.address;
          let split = address.split(",");
          bussiness_name = split[0];
        }

        if (
          orderDetails.delivery_address.latitude != "null" &&
          orderDetails.delivery_address.longitude != "null"
        ) {
          const scheme = Platform.select({
            ios: "maps:0,0?q=",
            android: "geo:0,0?q=",
          });

          const latLng = `${parseFloat(
            orderDetails?.delivery_address?.latitude
          )},${parseFloat(orderDetails?.delivery_address?.longitude)}`;

          const label = bussiness_name;
          const url = Platform.select({
            ios: `${scheme}${label}@${latLng}`,
            android: `${scheme}${latLng}(${label})`,
          });
          console.log("delibery address URL==", JSON.stringify(url));
          Linking.openURL(url);
        } else {
          showToastMessage("Oops Location not available.");
          return;
        }
      }
    }
  };
  const sendMessageTo = () => {
    navigation.navigate(assets.NavigationConstants.CHATTING.NAME, {
      orderId: orderDetails?.id,
      runnerId: runnerId,
      customerId: orderDetails?.uid,
      fcmTkn: orderDetails?.customer_firebase_token,
    });
  };
  const renderItems = (item) => {
    const { product_name, price, images, qty, id } = item;
    return (
      <View style={styles.ViewOrder}>
        <Image
          source={{ uri: images[0] }}
          style={{ height: 30, width: 30 }}
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
            {"qty" + ` ` + product_name}
          </Text>
          <Text style={styles.netPrice}>{price}</Text>
        </View>
      </View>
    );
  };
  return (
    <View style={[pallete.mainContainor]}>
      <Header
        bg={assets.Colors.INPUT_HOLDER_TXT_COLOR}
        icon={assets.Colors.BACKGROUND_THEME_COLOR}
        txt={assets.Colors.BACKGROUND_THEME_COLOR}
        shadow={false}
        event={() => navigation.goBack()}
        icon1="arrow-left"
        title="Delivery"
        icon2={null}
      />
      {loading === LOADING_TYPES.LOADING ||
      updateOrderStatusLoading === LOADING_TYPES.LOADING ||
      completeOrderLoading === LOADING_TYPES.LOADING ? (
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
            position: "absolute",
            zIndex: 11,
            width: "100%",
          }}
        >
          <ActivityIndicator
            animating={true}
            size="large"
            color="orange"
            justifyContent={"center"}
          />
        </View>
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentInsetAdjustmentBehavior="automatic"
        >
          <Modal visible={isLoading} transparent={true}>
            <View style={[pallete.Loader_View]}>
              <ActivityIndicator
                size="large"
                color="white"
                justifyContent={"center"}
                marginTop="100%"
              />
            </View>
          </Modal>

          <View style={[styles.space, styles.buttn]}>
            <Text style={styles.boldTxt}>
              Deliver order to{" "}
              {orderDetails?.customer_name && orderDetails?.customer_name}
            </Text>
            <View style={[styles.row_containor, styles.buttn]}>
              <Pressable onPress={() => navigateToMap()} style={styles.column}>
                <Feather
                  name={"navigation"}
                  color={assets.Colors.INPUT_HOLDER_TXT_COLOR}
                  size={25}
                />
                <Text style={styles.smallTxt}>Directions</Text>
              </Pressable>
              <Pressable
                onPress={() =>
                  navigation.navigate(
                    assets.NavigationConstants.ORDERS_ITEMS.NAME,
                    { orderId }
                  )
                }
                style={styles.column}
              >
                <FontAwesome5
                  name={"shopping-bag"}
                  color={assets.Colors.INPUT_HOLDER_TXT_COLOR}
                  size={25}
                />
                <Text style={styles.smallTxt}>View items</Text>
              </Pressable>
              <Pressable
                onPress={() =>
                  callNumber(
                    orderDetails?.phone_number && orderDetails?.phone_number
                  )
                }
                style={styles.column}
              >
                <FontAwesome5
                  name={"phone"}
                  color={assets.Colors.INPUT_HOLDER_TXT_COLOR}
                  size={25}
                />
                <Text style={styles.smallTxt}>Call</Text>
              </Pressable>
              <Pressable onPress={() => sendMessageTo()} style={styles.column}>
                <FontAwesome
                  name={"commenting-o"}
                  color={assets.Colors.INPUT_HOLDER_TXT_COLOR}
                  size={25}
                />
                <Text style={styles.smallTxt}>Message</Text>
              </Pressable>
            </View>
          </View>

          {showItems && (
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
          )}

          <View style={styles.mapview}>
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
                <Image source={assets.Images.MapHome} style={styles.marker} />
              </Marker>
            </MapView>
          </View>

          <View style={styles.space}>
            <View style={styles.row_containor}>
              <Text style={styles.due}>Due at or before</Text>
              {orderDetails?.schedule_end_time && (
                <Text style={styles.time}>{dueDate}</Text>
              )}
            </View>
            {orderDetails?.instruction != "" && (
              <>
                <Text style={styles.boldTxt}>
                  Delivery instructions from{" "}
                  {orderDetails?.customer_name && orderDetails?.customer_name}
                </Text>
                <Text style={styles.smallTxt}>
                  {orderDetails?.instruction && orderDetails?.instruction}
                </Text>
              </>
            )}

            <Text style={styles.boldTxt}>Leave at door</Text>
            <Text style={styles.smallTxt}>
              Leave the order at the customer's door and take a photo of it.
              Confirm the customer knows the order is there before you go.
            </Text>
            <Button
              imgBG={""}
              style={styles.buttn}
              txt={assets.Colors.BACKGROUND_THEME_COLOR}
              event={() => waitCameraInflation()}
              bgcolor={assets.Colors.THEME_COLOR_PRIMARY}
              image={false}
              img={""}
              title="Take photo of your delivery"
            />
            <Button
              imgBG={""}
              style={styles.buttn}
              txt={assets.Colors.BACKGROUND_THEME_COLOR}
              event={() => markOrderasCompleted()}
              bgcolor={assets.Colors.THEME_COLOR_PRIMARY}
              image={false}
              img={""}
              title="Mark as Completed"
            />
          </View>
          <View
            style={[
              {
                flexDirection: "row",
                alignItems: "center",
                paddingHorizontal: dW(35),
                marginTop: 15,
                marginBottom: 50,
              },
            ]}
          >
            <MaterialCommunityIcons
              name={"check-circle-outline"}
              color={assets.Colors.BUTTON_THEME_COLOR}
              size={30}
              style={{}}
            />
            <Text
              style={{
                color: assets.Colors.ACCOUNT_TXT_COLOR,
                fontSize: dW(15),
                width: dW(278),
                fontFamily: assets.fonts.ROBOTO_REGULAR,
                marginLeft: 5,
                marginRight: 5,
              }}
            >
              We notified{" "}
              {orderDetails?.customer_name && orderDetails?.customer_name} you
              are arriving soon
            </Text>
            <View></View>
          </View>
        </ScrollView>
      )}
    </View>
  );
};
export default Receipt_copy;
