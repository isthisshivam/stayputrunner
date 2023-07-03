import React, { useState, useEffect, useRef } from "react";
import {
  SafeAreaView,
  View,
  Text,
  Pressable,
  Modal,
  FlatList,
} from "react-native";
import assets from "../../assets";
import useStyle from "./style";
import { Secrets } from "../../assets/secrets";
import usePallete from "../../assets/Pallete";
import { useNavigation } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";

import FontAwesome from "react-native-vector-icons/FontAwesome";
import Header from "../../common_components/Header";
var arrow = require("../../assets/image/rArrow.png");
import { useSelector } from "react-redux";
import moment from "moment";
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from "react-native-simple-radio-button";
import SwipeButton from "rn-swipe-button";
import {
  API_STATUS,
  RUNNER_ACCEPT_ORDER,
  RUNNER_ORDER_DETAILS,
  RUNNER_CREATE,
  RUNNER_UPDATE_ORDER_STATUS,
} from "../../Services/ApiUrls";
import { useRest, CALL_TYPES, LOADING_TYPES } from "../../Services/rest/api";
import Loader from "../../common_components/Loader";

const Start_delivery = (props) => {
  const pallete = usePallete();
  const styles = useStyle();
  const liveLocationReducer = useSelector(
    (state) => state?.liveLocationReducerData?.LiveLocationReducer?.location
  );
  const { navigate, goBack } = useNavigation();
  const [popup, setPopup] = useState(false);
  const [daySelected, setDaySelected] = useState(0);
  const [timeSelected, setTimeSelected] = useState(0);
  const [orderDetails, setOrderDetails] = useState(null);
  const [slideText, setSlideText] = useState("Swipe to start delivery");

  const item_payload = {
    order_id: props?.route?.params?.orderId,
  };

  const { data, loading, error, fetchData, responseCode } = useRest({
    URL: RUNNER_ORDER_DETAILS,
    PAYLOAD: item_payload,
    CALL_TYPE: CALL_TYPES.POST,
    lazy: false,
  });

  const orderStatusPayloadWithRecipt = {
    order_id: props?.route?.params?.orderId,
    status: Secrets.ORDER_STATUS["In transit"],
    order_receipt: global.reciptImage,
    latitude: liveLocationReducer && liveLocationReducer?.latitude,
    longitude: liveLocationReducer && liveLocationReducer?.longitude,
  };
  const orderStatusPayloadWithOutRecipt = {
    order_id: props?.route?.params?.orderId,
    status: Secrets.ORDER_STATUS["In transit"],
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
      global.reciptImage && global.reciptImage
        ? orderStatusPayloadWithRecipt
        : orderStatusPayloadWithOutRecipt,
    CALL_TYPE: CALL_TYPES.POST,
    lazy: true,
  });

  useEffect(() => {
    if (data) {
      if (responseCode == API_STATUS.SUCCESS) {
        setData(data);
      }
    }
  }, [data, error, responseCode]);

  const setData = (resolve) => {
    const { data } = resolve;

    if (data) setOrderDetails(data);
  };

  //handle order status update call by @d9n6
  useEffect(() => {
    if (updateOrderStatusData && responseCodeOrderStatusUpdate == 200) {
      startDelivery();
      navigate(assets.NavigationConstants.RECEIPT_PHOTOCOPY.NAME, {
        orderId: props?.route?.params?.orderId,
        customerId: orderDetails?.uid,
      });
    } else {
    }
  }, [
    updateOrderStatusData,
    updateOrderStatusError,
    responseCodeOrderStatusUpdate,
  ]);

  const startDelivery = () => {
    global.runnerStartedDelivery = true;
  };
  const onSwipeLeft = () => {
    fetchDataOrderStatusUpdate(0);
  };

  const dataa = [
    {
      id: 1,
      day: "Today",
      date: "sep 2",
    },
    {
      id: 2,
      day: "Fri",
      date: "sep 3",
    },
    {
      id: 3,
      day: "Sat",
      date: "sep 4",
    },
    {
      id: 4,
      day: "Sun",
      date: "sep 5",
    },
    {
      id: 5,
      day: "Mon",
      date: "sep 6",
    },
    {
      id: 6,
      day: "Tue",
      date: "sep 7",
    },
  ];

  const columnData = [
    {
      id: 1,
      time: "8am - 10am",
      price: "$20",
    },
    {
      id: 2,
      time: "8am - 10am",
      price: "$25",
    },
    {
      id: 3,
      time: "10am - noon",
      price: "$29",
    },
    {
      id: 4,
      time: "noon - 2pm",
      price: "$40",
    },
    {
      id: 5,
      time: "2pm - 4pm",
      price: "$40",
    },
    {
      id: 6,
      time: "4pm - 6pm",
      price: "$40",
    },
  ];

  const dayItem = (item) => (
    <Pressable
      style={[
        styles.listCardView,
        item.id === daySelected && {
          backgroundColor: assets.Colors.THEME_COLOR_PRIMARY,
        },
      ]}
      onPress={() => setDaySelected(item?.id)}
    >
      <Text
        style={[
          styles.daysname,
          item?.id === daySelected && {
            color: assets.Colors.BACKGROUND_THEME_COLOR,
          },
        ]}
      >
        {item.day}
      </Text>
      <Text
        style={[
          styles.numberText,
          item.id === daySelected && {
            color: assets.Colors.BACKGROUND_THEME_COLOR,
          },
        ]}
      >
        {item.date}
      </Text>
    </Pressable>
  );

  const timeItem = (item) => (
    <Pressable
      style={[styles.listColumnView]}
      onPress={() => setTimeSelected(item.id)}
    >
      <View style={styles.timeschedule}>
        <RadioButton labelHorizontal={true}>
          <RadioButtonInput
            obj={{ label: "param1", value: 0 }}
            isSelected={item.id === timeSelected}
            onPress={() => setTimeSelected(item.id)}
            borderWidth={1}
            buttonInnerColor={assets.Colors.BUTTON_THEME_COLOR}
            buttonOuterColor={"black"}
            buttonSize={17}
            buttonOuterSize={22}
            buttonStyle={{}}
            buttonWrapStyle={{ marginLeft: 10 }}
          />
        </RadioButton>
        <Text style={styles.time}>{item.time}</Text>
      </View>
      <Text style={styles.price}>{item.price}</Text>
    </Pressable>
  );
  return (
    <View style={[pallete.mainContainor]}>
      <Header
        bg={assets.Colors.INPUT_HOLDER_TXT_COLOR}
        icon={assets.Colors.BACKGROUND_THEME_COLOR}
        txt={assets.Colors.BACKGROUND_THEME_COLOR}
        shadow={false}
        event={goBack}
        icon1="arrow-left"
        title="Delivery"
        icon2="chat-processing-outline"
        orderId={props?.route?.params?.orderId}
        customerId={orderDetails?.uid}
      />
      <Loader isLoading={updateOrderStatusLoading === LOADING_TYPES.LOADING} />
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.left}>
          <Text style={styles.title}>
            Deliver order to{" "}
            {orderDetails?.customer_name && orderDetails?.customer_name}
          </Text>
          <Text style={styles.smallTxt}>Due at or before</Text>
          {orderDetails?.schedule_end_time && (
            <Text style={styles.time}>
              {`~` + moment(orderDetails?.schedule_end_time).format("h:mm A")}
            </Text>
          )}
        </View>

        <View style={{ padding: 0 }}>
          <SwipeButton
            height={50}
            enableRightToLeftSwipe={false}
            titleStyles={styles.slideToText}
            title={slideText}
            containerStyles={styles.btnView}
            //railStyles={{ backgroundColor: assets.Colors.BUTTON_COLOR }}
            railFillBackgroundColor={"transparent"}
            railBackgroundColor={assets.Colors.BUTTON_COLOR}
            thumbIconStyles={styles.arrow}
            railFillBorderColor={assets.Colors.BUTTON_COLOR}
            railBorderColor={assets.Colors.BUTTON_COLOR}
            disabledRailBackgroundColor={assets.Colors.BUTTON_COLOR}
            disabledThumbIconBorderColor={assets.Colors.BUTTON_COLOR}
            thumbIconImageSource={arrow}
            //thumbIconWidth={50}
            thumbIconBackgroundColor={assets.Colors.NEW_C}
            thumbIconBorderColor={assets.Colors.BUTTON_COLOR}
            onSwipeStart={() => setSlideText("Processing...")}
            onSwipeFail={() => setSlideText("Swipe to start delivery")}
            onSwipeSuccess={() => [
              setSlideText("Starting Delivery..."),
              onSwipeLeft(),
            ]}
            swipeSuccessThreshold={30}
          ></SwipeButton>
        </View>
      </ScrollView>
      <Modal
        animationType="slide"
        transparent={true}
        visible={popup}
        onRequestClose={() => {
          setPopup(!popup);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.container}>
              <View style={styles.headerView}>
                <FontAwesome
                  name="angle-left"
                  color={assets.Colors.ACCOUNT_TXT_COLOR}
                  size={45}
                  onPress={() => setPopup(false)}
                />
                <Text style={styles.headerText}>Schedule</Text>
                <View></View>
              </View>

              <View style={styles.flatlistRowView}>
                <FlatList
                  data={dataa}
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                  renderItem={({ item }) => dayItem(item)}
                />
              </View>
              <View style={styles.flatlistColumnView}>
                <FlatList
                  data={columnData}
                  showsverticalScrollIndicator={false}
                  renderItem={({ item }) => timeItem(item)}
                />
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};
export default Start_delivery;
