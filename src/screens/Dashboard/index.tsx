import React, { useState, useEffect, useCallback } from "react";
import {
  SafeAreaView,
  View,
  Text,
  Image,
  Pressable,
  TextInput,
  FlatList,
  Platform,
  Alert,
  Linking,
  AppState,
} from "react-native";
import { shallowEqual, useSelector, useDispatch } from "react-redux";
import assets from "../../assets";
import axios from "axios";

import { RETRIEVE_APPLICANT_CERTN_PRODUCTION } from "../../Services/ApiUrls";
import useStyle from "./style";
import usePallete from "../../assets/Pallete";
import { useNavigation } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";
import Button from "../../common_components/Button";
import { Secrets } from "../../assets/secrets";
import Header from "../../common_components/Dash_Borad_Header";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Fontisto from "react-native-vector-icons/Fontisto";
import AntDesign from "react-native-vector-icons/AntDesign";

import SafariView from "react-native-safari-view";
import BackgroundGeolocation from "@mauron85/react-native-background-geolocation";
import {
  RUNNER_ORDERS,
  RUNNER_LIVE_ORDERS,
  API_STATUS,
  RUNNER_CREATE,
} from "../../Services/ApiUrls";
import {
  dW,
  dH,
  windowHeight,
  windowWidth,
} from "../../utils/dynamicHeightWidth";
import Geolocation from "react-native-geolocation-service";
import { useRest, CALL_TYPES, LOADING_TYPES } from "../../Services/rest/api";
import Loader from "../../common_components/Loader";
import { resetStack, GetData, SaveData } from "../../utils/utilities";
import {
  ACCESS_TOKEN,
  getData,
  LOGIN_KEY,
  setData,
} from "../../Storage/ApplicationStorage";
import RNPermissions, {
  NotificationsResponse,
  Permission,
  PERMISSIONS,
  PermissionStatus,
} from "react-native-permissions";
import {
  setLiveLocation,
  clearLiveLocation,
} from "../../redux/action/LiveLocationActions";
import {
  IosLocationPermission,
  AndroidLocationPermission,
} from "../../assets/Constants/Constants";

var isBlocked = false;
var pageNumber = 1;
var totalPageCount = 1;

const Dashboard = (props) => {
  const pallete = usePallete();
  const styles = useStyle();
  const dispatch = useDispatch();
  const permissionArray =
    Platform.OS === "android"
      ? AndroidLocationPermission
      : IosLocationPermission;
  const navigation = useNavigation();
  const [change, setChange] = useState(null);
  const [orders, setOrders] = useState([]);
  const [isPending, setPending] = useState(true);
  const [isProgress, setProgress] = useState(false);
  const [orderDate, setOrderDate] = useState("");
  const [safetyKit, setSafetyKit] = useState(0);
  const [applcanUrl, setApplicantUrl] = useState("");
  const [isLoading, setLoader] = useState(false);
  const [report, setReport] = useState(null);
  const [applicantId, setApplicantId] = useState("");
  const [isRefreshing, setRefreshing] = useState(false);
  const liveLocationReducer = useSelector(
    (state) => state?.liveLocationReducerData?.LiveLocationReducer?.location
  );

  const item_payload = {
    store: "1",
    current_page: pageNumber,
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  const getUserInfo = async () => {
    global.userInfromation = await GetData(LOGIN_KEY);
    if (global.userInfromation) {
      let parse = JSON.parse(global.userInfromation);

      setSafetyKit(parse.safety_kit);
      global.RUNNER_ID = parse?.id; //set userId globally
      global.currentUserId = parse?.id;
      setApplicantId(parse?.applicant_id);
      setApplicantUrl(parse?.invitation_url);
    }
  };
  useEffect(() => {
    if (applicantId) {
      getReport(applicantId);
    }
  }, [applicantId]);

  const { data, loading, error, fetchData, responseCode } = useRest({
    URL: RUNNER_LIVE_ORDERS,
    PAYLOAD: item_payload,
    CALL_TYPE: CALL_TYPES.POST,
    lazy: true,
  });

  useEffect(() => {
    const focusListener = navigation.addListener("focus", () => {
      // setRefreshing(true);
      fetchData(0);
    });
    return () => {
      focusListener;
    };
  }, []);

  useEffect(() => {
    if (data) {
      if (responseCode == API_STATUS.SUCCESS) {
        setData(data);
      }
    }
  }, [data, error, responseCode]);

  useEffect(() => {
    const subscribe = navigation.addListener("focus", () => {
      if (responseCode == API_STATUS.SUCCESS) setData(data);
    });
    return () => {
      subscribe;
    };
  }, []);
  const setData = (resolve) => {
    console.log("setDta===", resolve.data.show_activate_card_Block);
    const { data } = resolve;
    totalPageCount = data?.total_pages;
    let concatOrders =
      data?.current_page == 1 ? data?.orders : orders.concat(data?.orders);
    setOrders(concatOrders);
    setOrderDate(data?.date);
    setChange(data?.show_activate_card_Block);
    setRefreshing(false);
  };

  useEffect(() => {
    setTimeout(() => {
      if (global.locationInfo?.latitude && global.locationInfo?.longitude)
        updateUserInitialLocation(0);
    }, 1000);
  }, []);

  useEffect(() => {
    const listener = AppState.addEventListener("change", _handleAppStateChange);
    return () => listener.remove();
  }, []);

  const _handleAppStateChange = (nextAppState) => {
    if (nextAppState === "active") {
      authorizeAppLocationPermission();
    }
  };

  useEffect(() => {
    console.log("authorizeAppLocationPermission");
    authorizeAppLocationPermission();
  }, []);

  const authorizeAppLocationPermission = async () => {
    isBlocked = false;
    RNPermissions.checkMultiple(permissionArray)
      .then((data) => {
        for (let index = 0; index < permissionArray.length; index++) {
          if (
            data[permissionArray[index]] === "blocked" ||
            data[permissionArray[index]] === "denied" ||
            data[permissionArray[index]] === "unavailable"
          ) {
            isBlocked = true;
            break;
          }
          console.log(
            "data[permissionArray[index]]",
            data[permissionArray[index]]
          );
        }
        if (isBlocked) {
          setTimeout(
            () =>
              Alert.alert(
                "StayPut Runer requires location tracking permission",
                "You have to allow Always Location Permission to use live tracking in app.",
                [
                  {
                    text: "Ok",
                    onPress: () => acceptingLocationAgrement(),
                  },
                ]
              ),
            1000
          );
        } else {
          _backGroundLocation();
        }
      })
      .then(() => RNPermissions.checkNotifications())
      .then((data) => {})
      .catch((error) => console.warn(error));
  };

  const acceptingLocationAgrement = () => {
    navigation.navigate(assets.NavigationConstants.LOCATION_PERMISSION.NAME);
    isBlocked = false;
  };
  useEffect(() => {
    ////  _backGroundLocation();
    //  if (Platform.OS == "ios") {
    //     _backGroundLocation();
    //   }
    //    else {
    //     prominentDisclosure();
    //   }
  }, []);

  // const prominentDisclosure = () => {
  //   Alert.alert(
  //     "Permission to Access Location",
  //     "This app requires location access for providing notifications on health information for local clinics. When a user comes within range of a clinic they will receive a notification with that clinics latest health information though a push notification.",
  //     [{ text: "Ok", onPress: () => _backGroundLocation() }],
  //     { cancelable: false }
  //   );
  // };

  var update_accountPayload = {
    latitude: liveLocationReducer && liveLocationReducer?.latitude,
    longitude: liveLocationReducer && liveLocationReducer?.longitude,
  };

  const {
    data: updateUserLocationData,
    loading: updateUserLocationLoading,
    error: updateUserLocationError,
    fetchData: updateUserLocationFetchData,
    responseCode: updateUserLocationResponseCode,
  } = useRest({
    URL: RUNNER_CREATE,
    PAYLOAD: update_accountPayload,
    CALL_TYPE: CALL_TYPES.POST,
    lazy: true,
  });

  const _backGroundLocation = () => {
    BackgroundGeolocation.configure({
      //desiredAccuracy: BackgroundGeolocation.HIGH_ACCURACY,
      stationaryRadius: 50,
      distanceFilter: 50,
      notificationTitle: "Background tracking",
      notificationText: "enabled",
      debug: false, //disable norifictationin ios grarented
      notificationsEnabled: false, //disable norifictationin andrdoid
      startForeground: false,
      saveBatteryOnBackground: true,
      startOnBoot: true,
      stopOnStillActivity: false,
      stopOnTerminate: true,
      locationProvider: BackgroundGeolocation.RAW_PROVIDER,
      interval: 1000,
      fastestInterval: 1000,
      activitiesInterval: 1000,
    });

    BackgroundGeolocation.on("location", (locationInfo) => {
      console.log(
        "BackgroundGeolocation.locationInfo===",
        JSON.stringify(locationInfo)
      );
      if (locationInfo) {
        const { latitude, longitude } = locationInfo;
        let liveLocation = {
          latitude: latitude,
          longitude: longitude,
        };
        setLocationPayload(liveLocation);
      }
      BackgroundGeolocation.startTask((taskKey) => {
        // execute long running task
        // eg. ajax post location
        // IMPORTANT: task has to be ended by endTask
        console.log("task has  been ended=>", taskKey);
        BackgroundGeolocation.endTask(taskKey);
      });
    });

    BackgroundGeolocation.on("stationary", (stationaryLocation) => {
      // handle stationary locations here
      //Actions.sendLocation(stationaryLocation);
    });

    BackgroundGeolocation.on("error", (error) => {
      console.log("[ERROR] BackgroundGeolocation error:", error);
    });

    BackgroundGeolocation.on("start", () => {
      console.log("[INFO] BackgroundGeolocation service has been started");
    });

    BackgroundGeolocation.on("stop", () => {
      console.log("[INFO] BackgroundGeolocation service has been stopped");
    });

    BackgroundGeolocation.on("authorization", (status) => {
      console.log(
        "[INFO] BackgroundGeolocation authorization status: " + status
      );
      if (status !== BackgroundGeolocation.AUTHORIZED) {
        console.log(
          "[INFO] BackgroundGeolocation.AUTHORIZED is not authorised"
        );
        // setTimeout(
        //   () =>
        //     Alert.alert(
        //       "StayPut Runer requires location tracking permission",
        //       "You have to allow Always Location Permission to use live tracking in app.",
        //       [
        //         {
        //           text: "Ok",
        //           onPress: () => acceptingLocationAgrement(),
        //         },
        //       ]
        //     ),
        //   1000
        // );
      }
    });

    BackgroundGeolocation.on("background", () => {
      console.log("[INFO] App is in background");
    });

    BackgroundGeolocation.on("foreground", () => {
      console.log("[INFO] App is in foreground");
    });

    BackgroundGeolocation.on("abort_requested", () => {
      console.log("[INFO] Server responded with 285 Updates Not Required");
      // Here we can decide whether we want stop the updates or not.
      // If you've configured the server to return 285, then it means the server does not require further update.
      // So the normal thing to do here would be to `BackgroundGeolocation.stop()`.
      // But you might be counting on it to receive location updates in the UI, so you could just reconfigure and set `url` to null.
    });

    BackgroundGeolocation.on("http_authorization", () => {
      console.log("[INFO] App needs to authorize the http requests");
    });

    BackgroundGeolocation.checkStatus((status) => {
      console.log(
        "[INFO] BackgroundGeolocation service is running",
        status.isRunning
      );
      console.log(
        "[INFO] BackgroundGeolocation services enabled",
        status.locationServicesEnabled
      );
      console.log(
        "[INFO] BackgroundGeolocation auth status: " + status.authorization
      );
      // you don't need to check status before start (this is just the example)
      if (!status.isRunning) {
        BackgroundGeolocation.start();
      }
    });
  };

  useEffect(() => {
    if (liveLocationReducer) {
      if (liveLocationReducer?.latitude && liveLocationReducer?.longitude) {
        console.log("updateUserLocationFetchData.calleed===");
        updateUserLocationFetchData(0);
      }
    }
  }, [liveLocationReducer]);

  useEffect(() => {
    if (report) {
      if (report?.us_criminal_record_check_result?.criminal_cases.length > 0) {
      } else if (report?.application?.applicant.status == "Analyzing") {
        setProgress(true);
      } else if (report?.application?.applicant.status == "Complete") {
      } else if (report?.application?.applicant.status == "Unresponsive") {
      } else if (report?.application?.applicant.status == "Partial") {
      } else if (report?.application?.applicant.status == "Requires action") {
      } else if (
        report?.application?.applicant.status == "Waiting on candidate"
      ) {
      } else if (report?.application?.applicant.status == "Pending") {
        setPending(true);
      } else if (report?.application?.applicant.status == "Returned") {
      }
    }
  }, [report]);

  const setLocationPayload = (liveLocation) => {
    dispatch(setLiveLocation(liveLocation));
  };

  const updateCurrentLocation = {
    latitude: global.locationInfo && global.locationInfo?.latitude,
    longitude: global.locationInfo && global.locationInfo?.longitude,
  };
  const {
    data: updateData,
    loading: updateLoading,
    error: updateError,
    fetchData: updateUserInitialLocation,
    responseCode: responseCodeUpdate,
  } = useRest({
    URL: RUNNER_CREATE,
    PAYLOAD: updateCurrentLocation,
    CALL_TYPE: CALL_TYPES.POST,
    lazy: true,
  });

  const update_Safety_Kit_Payload = {
    safety_kit: "1",
  };
  const {
    data: updateSafetyKitData,
    loading: updateSafetyKitLoading,
    error: updateSafetyKitError,
    fetchData: fetchSafetyKitUpdate,
    responseCode: responseCodeSafetyKitUpdate,
  } = useRest({
    URL: RUNNER_CREATE,
    PAYLOAD: update_Safety_Kit_Payload,
    CALL_TYPE: CALL_TYPES.POST,
    lazy: true,
  });

  const orderSafetyKit = () => {
    fetchSafetyKitUpdate(0);
  };
  useEffect(() => {
    if (updateSafetyKitData) {
      saveUpdatedLoginData();
    }
  }, [responseCodeSafetyKitUpdate, updateSafetyKitData, updateSafetyKitError]);
  const saveUpdatedLoginData = async () => {
    let updatedUserInformation = {
      ...JSON.parse(global.userInfromation),
      safety_kit: "1",
    };
    setSafetyKit(1);

    await SaveData(LOGIN_KEY, JSON.stringify(updatedUserInformation));
  };

  const onRefreshClick = () => {
    setRefreshing(true);
    fetchData(0);
  };
  const onEndReached = () => {
    if (pageNumber != totalPageCount) {
      pageNumber++;
      fetchData(0);
    }
  };
  const getReport = async (applicantId) => {
    setLoader(true);

    axios
      .get(RETRIEVE_APPLICANT_CERTN_PRODUCTION + applicantId + "/", {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + Secrets.CERTN_TOKEN.PROUCTION_TOKEN,
        },
      })
      .then((res) => {
        console.log("GETTINGREPORT===", JSON.stringify(res?.data));
        setReport(res?.data);
        setLoader(false);
      })
      .catch((error) => {
        setLoader(false);

        console.log("GETTINGREPORT  ERROR====", JSON.stringify(error));
      });
  };
  const submitReport = async () => {
    if (applcanUrl)
      if (Platform.OS === "ios") {
        SafariView.isAvailable()
          .then(
            SafariView.show({
              url: applcanUrl,
            })
          )
          .catch((error) => {
            Alert.alert(`Don't know how to open this URL: ${applcanUrl}`);
            // Fallback WebView code for iOS 8 and earlier
          });
      } else {
        const supported = await Linking.canOpenURL(applcanUrl);
        console.log("supported==", supported, "applcatinurl==", applcanUrl);
        if (supported) {
          // Opening the link with some app, if the URL scheme is "http" the web link should be opened
          // by some browser in the mobile
          await Linking.openURL(applcanUrl);
        } else {
          Alert.alert(`Don't know how to open this URL: ${applcanUrl}`);
        }
      }
  };
  const listItem = (item) => (
    <Pressable
      style={[styles.cardView]}
      onPress={() => [
        navigation.navigate(assets.NavigationConstants.ORDERVIEW.NAME, {
          orderId: item.id,
          orderStatus: 1,
        }),
      ]}
    >
      <View style={styles.IconView}>
        <Image
          style={{ height: 30, width: 30, resizeMode: "contain" }}
          source={{ uri: item.store_image }}
        />
        <Text style={styles.homeDepotText}>{item.store_name}</Text>
      </View>
      <View style={styles.prizeView}>
        <Text style={styles.price}>{item.total_price}</Text>
        <MaterialCommunityIcons
          name="chevron-right"
          color={assets.Colors.BUTTON_THEME_COLOR}
          size={37}
        />
      </View>
      <View style={styles.ShoppingView}>
        <AntDesign
          name="shoppingcart"
          color={assets.Colors.TEXT_COLOR}
          size={25}
        />
        <Text style={styles.item}>{item.items.length} items</Text>
        <View
          style={{
            width: dW(1),
            height: "70%",
            backgroundColor: assets.Colors.TEXT_COLOR,
            marginHorizontal: dW(10),
          }}
        ></View>
        <MaterialCommunityIcons
          name="car-side"
          color={assets.Colors.TEXT_COLOR}
          size={30}
          style={{ marginLeft: dW(3) }}
        />
        <Text style={styles.item}>{item.miles} miles</Text>
      </View>
    </Pressable>
  );
  const listHeader = () => {
    return (
      <>
        <View style={styles.popupViewOrder}>
          <View style={styles.iconView}>
            <MaterialCommunityIcons
              name="account"
              color={assets.Colors.BLACK_COLOR}
              size={35}
              style={{ right: dW(5), alignSelf: "center" }}
            />
            <MaterialCommunityIcons
              name="account"
              color={assets.Colors.BLACK_COLOR}
              size={35}
              style={{ right: dW(5), alignSelf: "center" }}
            />
          </View>
          <Text style={styles.orderKit}>Order your health and safety kit</Text>
          <Text style={styles.help}>
            Help Protect yourself and the community by requesting a free health
            and safety kit.
          </Text>
          <Button
            imgBG={""}
            style={styles.space}
            txt={assets.Colors.BACKGROUND_THEME_COLOR}
            event={() => orderSafetyKit()}
            bgcolor={assets.Colors.THEME_COLOR_PRIMARY}
            image={false}
            img={""}
            title="Order now"
          />
        </View>
        {orders.length > 0 && (
          <View style={styles.dateView}>
            <Text style={styles.date}>{orderDate}</Text>
          </View>
        )}
      </>
    );
  };
  const emptyView = () => {
    return (
      <View
        style={{
          flex: 1,
          height: safetyKit == 0 ? windowHeight() / 2.3 : windowHeight() / 1.4,
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text style={styles.forgot_pass_heading}>No Live Orders found.</Text>
      </View>
    );
  };
  const pendingView = () => {
    return (
      <View style={styles.popupViewOrder}>
        <View style={{ paddingHorizontal: 0, padding: 4, marginTop: 0 }}>
          {isProgress && (
            <Text style={[styles.help, { textAlign: "center" }]}>
              {
                "You Background verification is in progress, Once your background verification is completed you will be able to access the app features. "
              }
            </Text>
          )}
          {isPending && (
            <Text style={[styles.help, { textAlign: "center" }]}>
              {"Please Submit your background verification here. "}
            </Text>
          )}
          {isPending && (
            <Button
              imgBG={""}
              style={[{ marginTop: 15 }]}
              txt={assets.Colors.BACKGROUND_THEME_COLOR}
              //event={() => chooseFile("please select front image", 1)}
              event={async () => {
                submitReport();
              }}
              bgcolor={assets.Colors.BUTTON_THEME_COLOR}
              image={false}
              img={""}
              title="Submit"
            />
          )}
        </View>
      </View>
    );
  };
  const renderListHeaderComponent = () => {
    console.log("renderListHeaderComponent", safetyKit, isPending);
    if (safetyKit == 0 && !isPending) {
      return listHeader();
    }
    if (safetyKit == 0 && isPending) {
      return [pendingView(), listHeader()];
    } else {
      return null;
    }
  };
  return (
    <View style={styles.mainContainer}>
      <Header
        bg={assets.Colors.BACKGROUND_THEME_COLOR}
        icon={assets.Colors.ACCOUNT_TXT_COLOR}
        txt={assets.Colors.ACCOUNT_TXT_COLOR}
        shadow={false}
        event={() => props.navigation.openDrawer()}
        icon1="menu"
        title="Dashboard"
        icon2="chat-processing-outline"
      />
      <Loader
        isLoading={
          updateLoading === LOADING_TYPES.LOADING ||
          loading === LOADING_TYPES.LOADING ||
          isLoading
        }
      ></Loader>

      {change === "1" ? (
        <View style={styles.space}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ flexGrow: 1 }}
            style={{ marginBottom: 40 }}
            automaticallyAdjustContentInsets
          >
            {isPending && pendingView()}
            <View>
              <View style={styles.popupView}>
                <View style={styles.iconView}>
                  <FontAwesome5
                    name="credit-card"
                    color={assets.Colors.BUTTON_THEME_COLOR}
                    size={dW(40)}
                    style={{ alignSelf: "center" }}
                  />
                </View>
                <Text style={[styles.orderKit, styles.space]}>
                  Activate your StayPut card
                </Text>
                <Text style={styles.help}>
                  Please activate the physical card you recieved!
                </Text>
                <Button
                  imgBG={""}
                  style={styles.activateSpace}
                  txt={assets.Colors.BACKGROUND_THEME_COLOR}
                  event={() =>
                    Platform.OS === "android"
                      ? navigation.navigate(
                          assets.NavigationConstants.PAYMENT_CARD_ANDROID.NAME
                        )
                      : navigation.navigate(
                          assets.NavigationConstants.PAYMENT_CARD.NAME
                        )
                  }
                  bgcolor={assets.Colors.THEME_COLOR_PRIMARY}
                  image={false}
                  img={""}
                  title="Activate physical card"
                />
              </View>
              {Platform.OS === "ios" && (
                <View style={[styles.popupView]}>
                  <View style={[styles.popupView]}>
                    <Fontisto
                      name="apple-pay"
                      color={assets.Colors.BUTTON_THEME_COLOR}
                      size={dW(40)}
                      style={{ alignSelf: "center" }}
                    />
                  </View>
                  <Text style={[styles.orderKit, styles.space]}>
                    Haven't recieved physical card yet?
                  </Text>
                  <Text style={styles.help}>
                    You can start now with Apple Pay
                  </Text>
                  <Button
                    imgBG={""}
                    style={styles.activateSpace}
                    txt={assets.Colors.BACKGROUND_THEME_COLOR}
                    event={() =>
                      navigation.navigate(
                        assets.NavigationConstants.PAYMENT_CARD.NAME
                      )
                    }
                    bgcolor={assets.Colors.THEME_COLOR_PRIMARY}
                    image={false}
                    img={""}
                    title="Activate digital card"
                  />
                </View>
              )}
              <View style={{ width: 100, height: 120 }} />
            </View>
          </ScrollView>
        </View>
      ) : (
        <>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={orders}
            automaticallyAdjustContentInsets={true}
            refreshing={isRefreshing}
            onRefresh={() => onRefreshClick()}
            ListEmptyComponent={() => emptyView()}
            ListHeaderComponent={renderListHeaderComponent}
            contentInsetAdjustmentBehavior="automatic"
            endFillColor={"white"}
            renderItem={({ item }) => listItem(item)}
            onEndReached={() => onEndReached()}
          />
        </>
      )}
    </View>
  );
};
export default Dashboard;
