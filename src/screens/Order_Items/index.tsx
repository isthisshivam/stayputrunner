import React, { useState, useEffect, useRef } from "react";
import {
  SafeAreaView,
  View,
  Text,
  Modal,
  ActivityIndicator,
  RefreshControl,
  Pressable,
  TouchableHighlight,
  Platform,
} from "react-native";
import assets from "../../assets";
import useStyle from "./style";
import usePallete from "../../assets/Pallete";
import { useNavigation } from "@react-navigation/native";
import { ScrollView } from "react-native-virtualized-view";
import { Tab, TabView } from "react-native-elements";
import { dH, dW } from "../../utils/dynamicHeightWidth";
import Header from "../../common_components/Header";

import { Items_pannel } from "./component/items_pannel";
import { RUNNER_ORDER_DETAILS } from "../../Services/ApiUrls";
import { useRest, CALL_TYPES, LOADING_TYPES } from "../../Services/rest/api";
import Loader from "../../common_components/Loader";

import { Stopwatch, Timer } from "react-native-stopwatch-timer";

import moment from "moment";

var tempGoalTime = 0;

const Items_List = (props) => {
  const pallete = usePallete();
  const styles = useStyle();
  const ref = useRef();
  const navigation = useNavigation();
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(0);
  const [isRunning, setRunning] = useState(false);
  const [index, setIndex] = useState(0);
  const [item, setItem] = useState(true);
  const [done, setDone] = useState(true);
  const [loading, setLoading] = useState(false);
  const [todoItems, setTodoItems] = useState([]);
  const [doneItems, setDoneItems] = useState([]);
  const [isRefreshing, setRefreshing] = useState(false);
  const [orderId, setOrderId] = useState(props?.route?.params?.orderId);
  const [fName, setFName] = useState("");
  const [totalDuration, setTotalDuration] = useState(0);
  const [goal_time, setGoalTime] = useState(0);
  const [stopwatchReset, setStopwatchReset] = useState(true);
  const item_payload = {
    order_id: props?.route?.params?.orderId,
  };
  const { data, error, fetchData, responseCode } = useRest({
    URL: RUNNER_ORDER_DETAILS,
    PAYLOAD: item_payload,
    CALL_TYPE: CALL_TYPES.POST,
    lazy: true,
  });

  useEffect(() => {
    if (data) {
      setLoading(false);
      if (responseCode == 200) {
        if (isRefreshing) setRefreshing(false);
        setFName(data?.data?.customer_name);
        setTodoItems(data?.data?.items);
        setDoneItems(data?.data?.done_items);
        setStartTime(data?.data?.schedule_start_time);

        setEndTime(data?.data?.schedule_end_time);

        setGetDate(
          data?.data?.schedule_end_time,
          data?.data?.schedule_start_time,
          data?.data?.schedule_current_time
        );

        getGoalTime(
          data?.data?.schedule_start_time,
          data?.data?.schedule_end_time
        );
      }
    }
    return () => {
      isCalled = false;
    };
  }, [data, error, responseCode]);

  useEffect(() => {
    const focusListener = navigation.addListener("focus", () => {
      setLoading(true);
      fetchData(0);
    });
    return () => {
      console.log("setStopwatchResetcalled...................");
      setTotalDuration(0);
      setStopwatchReset(true);
      focusListener();
    };
  }, [props.route.params.orderId]);

  const setGetDate = async (endtime, starttime, currenttime) => {
    setRunning(true);
    var date = moment().format("YYYY-MM-DD HH:mm:ss");

    var diffr = moment.duration(moment(currenttime).diff(moment(starttime)));

    var hours = parseInt(diffr.asHours());
    var minutes = parseInt(diffr.minutes());
    var seconds = parseInt(diffr.seconds());
    var time = hours * 60 * 60 + minutes * 60 + seconds;

    await setTotalDuration(time * 1000);
  };

  const getGoalTime = (starttime, endtime) => {
    var diffr = moment.duration(moment(endtime).diff(moment(starttime)));

    var hours = parseInt(diffr.asHours());
    var minutes = parseInt(diffr.minutes());
    var seconds = parseInt(diffr.seconds());
    var ms1 = hours * 3600000;
    var ms2 = minutes * 60000;
    var ms3 = seconds * 1000;
    var ms4 = ms1 + ms2 + ms3;

    tempGoalTime = ms4;

    const time = convertMsToTime(ms4);
    setGoalTime(time);
  };

  const padTo2Digits = (num) => {
    return num.toString().padStart(2, "0");
  };

  const convertMsToTime = (milliseconds) => {
    console.log("tracksecond==", milliseconds);
    let seconds = Math.floor(milliseconds / 1000);
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(minutes / 60);
    seconds = seconds % 60;
    minutes = minutes % 60;

    return `${padTo2Digits(hours)}:${padTo2Digits(minutes)}:${padTo2Digits(
      seconds
    )}`;
  };

  const getFirstName = (str) => {
    let boiler = str.split(" ");
    return boiler && boiler[0] + `'s Order`;
  };

  const onRefreshClick = () => {
    setRefreshing(true);
    fetchData(0);
  };
  const getStopWatchTime = (time) => {
    // console.log("StopWatchTime....", time);
  };
  return (
    <View style={[pallete.mainContainor]}>
      <Header
        bg={assets.Colors.BACKGROUND_THEME_COLOR}
        icon={assets.Colors.ACCOUNT_TXT_COLOR}
        txt={assets.Colors.ACCOUNT_TXT_COLOR}
        shadow={false}
        event={() => props.navigation.openDrawer()}
        icon1="menu"
        title={getFirstName(fName)}
        icon2="chat-processing-outline"
        orderId={data?.data?.id}
        customerId={data?.data?.uid}
        customerFCMTkn={data?.data?.customer_firebase_token}
      />
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={() => onRefreshClick()}
          />
        }
        automaticallyAdjustContentInsets
        style={styles.scrollContainer}
      >
        <Loader isLoading={loading}></Loader>

        <View style={styles.tabContainer}>
          <Tab
            accessible
            onMagicTap={() => alert("ddd")}
            value={index}
            onChange={(e) => setIndex(e)}
            indicatorStyle={{
              backgroundColor: assets.Colors.TERMS_CONDITION_COLOR,
              height: dW(2),
            }}
            style={{ flex: 1 }}
            variant="primary"
          >
            <Tab.Item
              title={data && data?.data?.items?.length + " To-Do"}
              titleStyle={[
                styles.title,
                {
                  color:
                    item == true && index
                      ? assets.Colors.INPUT_HOLDER_TXT_COLOR
                      : assets.Colors.TERMS_CONDITION_COLOR,
                },
              ]}
              containerStyle={styles.tabContainer}
              onPressOut={() => {
                setItem(false);
                setDone(true);
              }}
            />
            <Tab.Item
              title={data && data?.data?.done_items?.length + " Done"}
              titleStyle={[
                styles.title,
                {
                  color:
                    done == true
                      ? assets.Colors.INPUT_HOLDER_TXT_COLOR
                      : assets.Colors.TERMS_CONDITION_COLOR,
                },
              ]}
              containerStyle={styles.tabContainer}
              onPressOut={() => {
                setDone(false);
                setItem(true);
              }}
            />
          </Tab>
        </View>

        <TabView
          value={index}
          onChange={(e) => setIndex(e)}
          animationType="timing"
        >
          <TabView.Item pointerEvents="box-none" style={styles.tabItems}>
            <Items_pannel
              touchable={true}
              customer_name={data && data?.data?.customer_name}
              data={todoItems && todoItems}
            />
          </TabView.Item>

          <TabView.Item style={styles.tabItems}>
            <Items_pannel
              touchable={false}
              customer_name={data && data?.data?.customer_name}
              data={doneItems && doneItems}
            />
          </TabView.Item>
        </TabView>
      </ScrollView>

      {data && data?.data?.items?.length == 0 && data?.data?.status != "7" && (
        <View style={styles.bottom}>
          <View style={styles.bottom}>
            <Pressable
              onPress={() =>
                navigation.navigate(
                  assets.NavigationConstants.STACKS.HOME_STACK,
                  {
                    screen: assets.NavigationConstants.QUICKNOTE.NAME,
                    params: {
                      orderId,
                      customerId: data?.data?.uid,
                    },
                  }
                )
              }
              style={{
                height: 50,
                width: 200,
                backgroundColor: assets.Colors.THEME_COLOR_PRIMARY,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 4,
              }}
            >
              <Text
                style={{
                  color: assets.Colors.WHITE,
                  fontFamily: assets.fonts.ROBOTO_MEDIUM,
                  fontSize: 17,
                  lineHeight: 20,
                  letterSpacing: 1,
                }}
              >
                Checkout
              </Text>
            </Pressable>
          </View>
        </View>
      )}

      <View
        style={{
          width: "100%",
          marginBottom: 10,
          padding: 30,
          marginRight: 20,
          justifyContent: "flex-end",
          flexDirection: "row",
        }}
      >
        <View style={styles.timmingView}>
          <Text style={styles.time_goal}>Time</Text>
          <Text
            style={[
              styles.time,
              { color: assets.Colors.TERMS_CONDITION_COLOR },
            ]}
          ></Text>
          {totalDuration != 0 ? (
            <Stopwatch
              //laps
              //msecs
              //reset={stopwatchReset}
              start={stopwatchReset}
              startTime={totalDuration}
              options={{
                container: {
                  backgroundColor: "white",
                  marginTop: Platform.OS === "android" ? dH(-22) : dH(-14),
                },
                text: [
                  styles.time,
                  { color: assets.Colors.TERMS_CONDITION_COLOR },
                ],
              }}
              getTime={getStopWatchTime}
            />
          ) : (
            <Text
              style={[
                styles.time,
                {
                  color: assets.Colors.TERMS_CONDITION_COLOR,
                  marginTop: dH(-10),
                },
              ]}
            >
              {goal_time}
            </Text>
          )}
        </View>
        <View style={styles.timmingView}>
          <Text style={styles.time_goal}>Goal</Text>
          <Text
            style={[
              styles.time,
              { color: assets.Colors.INPUT_HOLDER_TXT_COLOR },
            ]}
          >
            {goal_time}
          </Text>
        </View>
      </View>
    </View>
  );
};
export default Items_List;
