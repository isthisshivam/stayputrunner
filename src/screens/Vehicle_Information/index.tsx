import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  Text,
  Pressable,
  TextInput,
  Modal,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import assets from "../../assets";
import useStyle from "./style";
import usePallete from "../../assets/Pallete";
import { useNavigation } from "@react-navigation/native";
import { ScrollView } from "react-native-virtualized-view";
import Button from "../../common_components/Button";
import { cars, truckSubArray } from "../../assets/Constants/Constants";
import { Vehicles_pannel } from "./component/vehicles_pannel";
import { Colors_pannel } from "./component/colors_pannel";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import {
  VEHICLE_INFO,
  RUNNER_CREATE,
  TERM_CONDITION_LINK,
  PRIVACY_LINK,
} from "../../Services/ApiUrls";
import {
  SaveData,
  showToastMessage,
  validateEmail,
} from "../../utils/utilities";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useRest, CALL_TYPES, LOADING_TYPES } from "../../Services/rest/api";
import { ACCESS_TOKEN, LOGIN_KEY } from "../../Storage/ApplicationStorage";
import BackButton from "../../common_components/BackButton";
import { getStoredData, storeData } from "../../Storage/ApplicationStorage";
const Vehicle_Info = () => {
  const pallete = usePallete();
  const styles = useStyle();
  const { navigate, goBack } = useNavigation();
  const [car_type, setCar_type] = useState("9");
  const [color, setColor] = useState("");
  const [check, setCheck] = useState(false);
  const [car_info, setCar_Info] = useState([]);
  const [selectCar, setSelectCar] = useState("Select Car");
  const [selectModel, setSelectModel] = useState("Select Model");
  const [selectTruckType, setSelectTruck] = useState("Select Truck Type");
  const [truck_type_id, setTruck_type_id] = useState("");
  const [car_Name, setCar_Name] = useState(false);
  const [model_name, setModel_Name] = useState(false);
  const [truck_name, setTruck_Name] = useState(false);
  const [model_shown, setModel_shown] = useState();
  const [vin_numb, setVin_Numb] = useState("");

  const setPaths = async () => {
    let data = await getStoredData("PATH");
    console.log("setpaths==", data);
    await storeData("PATH", { ...data, Vehicle_Info: true }).then(() => {
      navigate(assets.NavigationConstants.PAPER_WORK.NAME);
    });
  };

  const car_payload = {
    type: car_type,
  };
  const vehicle_payload = {
    vehicle_type: car_type.trim(),
    vehicle_model: car_type == "9" ? "" : selectModel.trim(),
    vehicle_color: color.trim(),
    vin: vin_numb.trim(),
    truck_type: truck_type_id,
  };
  const { data, loading, error, fetchData, responseCode } = useRest({
    URL: VEHICLE_INFO,
    PAYLOAD: car_payload,
    CALL_TYPE: CALL_TYPES.POST,
  });
  const {
    data: v_data,
    loading: v_loading,
    error: v_error,
    fetchData: v_fetchdata,
    responseCode: v_responseCode,
  } = useRest({
    URL: RUNNER_CREATE,
    PAYLOAD: vehicle_payload,
    CALL_TYPE: CALL_TYPES.POST,
    lazy: true,
  });

  useEffect(() => {
    console.log("CAR==", data?.data);
    if (data) {
      setColor("");
      setSelectCar("Select Car");
      setSelectModel("Select Model");
      setSelectTruck("Select Truck Type");
      setCar_Info(data.data);
    }
  }, [data, error, responseCode]);

  useEffect(() => {
    console.log("VEHICLE_PAYLOAD==", v_data, v_error, v_responseCode);
    if (v_data) {
      const status = v_data.status;
      if (status == 200) {
        global.universalObject.logEvent("Vehicle-Verified", {
          customData: {
            anonymousid: global.userId,
            device: Platform.OS,
            Screen: "Qualification",
            URL: "https://projects.invisionapp.com/d/main?origin=v7#/console/21738858/463585979/preview?scrollOffset=71#project_console",
            Type_of_Car: selectCar,
            Brand_of_Car: selectModel,
            Model_of_Car: model_name,
            Color_of_Car: color,
            VIN: vin_numb,
          },
        });
        saveLoginData(v_data);
        showToastMessage(v_data.message);
        setPaths();
      } else {
        setTimeout(() => {
          showToastMessage(v_data.message);
        }, 300);
      }
    }
  }, [v_data, v_error, v_responseCode]);

  useEffect(() => {
    fetchData(0);
  }, [car_type]);

  const saveLoginData = async (data) => {
    await SaveData(LOGIN_KEY, JSON.stringify(data.data));
    await SaveData(ACCESS_TOKEN, data.data.access_token);
  };
  const isValid_Vehicleinfo = () => {
    if (car_type == "9") {
      if (!check) {
        showToastMessage("Please agree to terms & conditions");
        return false;
      }
    } else {
      if (selectCar == "Select Car") {
        showToastMessage("Please select Car");
        return false;
      } else if (selectModel == "Select Model") {
        showToastMessage("Please select car model");
        return false;
      } else if (car_type == "6" && selectTruckType == "Select Truck Type") {
        showToastMessage("Please select truck type");
        return false;
      } else if (!color) {
        showToastMessage("Please select car color");
        return false;
      } else if (!vin_numb) {
        showToastMessage("Please enter your VIN");
        return false;
      }
      if (!check) {
        showToastMessage("Please agree to terms & conditions");
        return false;
      }
    }

    return true;
  };
  const valid_vehicleInfo = () => {
    if (isValid_Vehicleinfo()) {
      console.log("vehickele=====", JSON.stringify(vehicle_payload));
      v_fetchdata(0);
    }
  };

  return (
    <SafeAreaView style={[pallete.mainContainor]}>
      <BackButton
        onBackPress={() =>
          navigate(assets.NavigationConstants.LICENSE_VERIFICATION.NAME)
        }
      />
      <Modal
        visible={
          loading === LOADING_TYPES.LOADING ||
          loading === LOADING_TYPES.FETCHING_MORE ||
          v_loading === LOADING_TYPES.LOADING ||
          v_loading === LOADING_TYPES.FETCHING_MORE
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

      <KeyboardAwareScrollView
        enableOnAndroid
        extraHeight={130}
        contentContainerStyle={styles.scrollContainer}
      >
        <Text style={styles.title}>My vehicle is...</Text>
        <Vehicles_pannel clr={car_type} event={setCar_type} data={cars} />

        {/* {car_type == "9" &&
          car_info.map((_item, index) => {
            return (
              <View style={{ alignSelf: "flex-start", flex: 1 }} key={index}>
                <Colors_pannel
                  clr={color}
                  border={setColor}
                  data={_item.color}
                />
              </View>
            );
          })} */}

        {/* select car */}
        {car_type != "9" && (
          <View style={styles.cardViewContainer}>
            <Pressable
              onPress={() => setCar_Name(!car_Name)}
              style={styles.cardView}
            >
              <Text style={styles.tesla}>{selectCar}</Text>
              <FontAwesome
                name={car_Name == false ? "angle-down" : "angle-up"}
                color={assets.Colors.ACCOUNT_TXT_COLOR}
                size={30}
              />
            </Pressable>
          </View>
        )}

        {/* cars list  */}
        {car_Name == true && car_type != "9" && (
          <View style={styles.dropdown}>
            {car_info.map((_item, index) => {
              return (
                <Pressable
                  onPress={() => {
                    setSelectCar(_item.car_name);
                    setCar_Name(!car_Name);
                    setSelectModel("Select Model");
                    setModel_shown(_item.id);
                  }}
                  key={index}
                  style={styles.dropDown_txt}
                >
                  <Text style={[styles.options_text]}>{_item.car_name}</Text>
                </Pressable>
              );
            })}
          </View>
        )}
        {/* select model */}
        {car_type != "9" && (
          <View style={styles.cardViewContainer}>
            <Pressable
              onPress={() => setModel_Name(!model_name)}
              style={styles.cardView}
            >
              <Text style={styles.tesla}>{selectModel}</Text>
              <FontAwesome
                name={model_name == false ? "angle-down" : "angle-up"}
                color={assets.Colors.ACCOUNT_TXT_COLOR}
                size={30}
              />
            </Pressable>
          </View>
        )}

        {/* model list */}
        {model_name == false ? null : (
          <View style={styles.dropdown}>
            {car_info.map((_item, index) => {
              return (
                <View style={{ width: "100%" }}>
                  {model_shown == _item.id
                    ? _item.models.map((item, _index) => {
                        return (
                          <Pressable
                            onPress={() => {
                              setSelectModel(item.model);
                              setModel_Name(!model_name);
                            }}
                            key={index}
                            style={styles.dropDown_txt}
                          >
                            <Text style={styles.options_text}>
                              {item.model}
                            </Text>
                          </Pressable>
                        );
                      })
                    : null}
                </View>
              );
            })}
          </View>
        )}

        {/* select truck type */}
        {car_type == "6" && (
          <View style={styles.cardViewContainer}>
            <Pressable
              onPress={() => setTruck_Name(!truck_name)}
              style={styles.cardView}
            >
              <Text style={styles.tesla}>{selectTruckType}</Text>
              <FontAwesome
                name={truck_name == false ? "angle-down" : "angle-up"}
                color={assets.Colors.ACCOUNT_TXT_COLOR}
                size={30}
              />
            </Pressable>
          </View>
        )}
        {/* truck type listing */}
        {truck_name ? (
          <View style={styles.dropdown}>
            {truckSubArray.map((_item, index) => {
              return (
                <Pressable
                  onPress={() => {
                    setSelectTruck(_item.name);
                    setTruck_Name(!truck_name);
                    setTruck_type_id(_item.id);
                    //setSelectModel("Select Truck");
                    // setModel_shown(_item.id);
                  }}
                  key={index}
                  style={styles.dropDown_txt}
                >
                  <Text style={[styles.options_text]}>{_item.name}</Text>
                </Pressable>
              );
            })}
          </View>
        ) : null}

        {/* select color */}
        {car_info.map((_item, index) => {
          return (
            <View style={{ alignSelf: "flex-start", flex: 1 }} key={index}>
              {model_shown == _item.id ? (
                <Colors_pannel
                  clr={color}
                  border={setColor}
                  data={_item.color}
                />
              ) : null}
            </View>
          );
        })}

        <View style={styles.input_View}>
          <TextInput
            placeholderTextColor={assets.Colors.INPUT_HOLDER_TXT_COLOR}
            placeholder="VIN (Vehicle Identification Number)"
            value={vin_numb}
            keyboardType="default"
            onChangeText={(text) => setVin_Numb(text)}
            style={styles.placeholder}
          ></TextInput>
        </View>
        <View style={[styles.bottom_row, styles.topSpacer]}>
          <FontAwesome
            name={check == false ? "square-o" : "check-square-o"}
            color={assets.Colors.ACCOUNT_TXT_COLOR}
            size={25}
            onPress={() => setCheck(!check)}
          />
          <Text style={styles.checked}>
            Yes, I agree to insurance requirements
          </Text>
        </View>
        <View style={[styles.bottom_row, styles.topSpacer]}>
          <Text style={styles.bottomtxt}>
            By Signing up, you agree to StayPut's{" "}
          </Text>
          <Pressable
            onPress={() =>
              navigate(assets.NavigationConstants.WEBVIEW_LINK.NAME, {
                Link: TERM_CONDITION_LINK,
                title: "Terms and Conditions",
              })
            }
          >
            <Text style={styles.terms_condition}>Terms</Text>
          </Pressable>
        </View>
        <View style={styles.bottom_row}>
          <Pressable
            onPress={() =>
              navigate(assets.NavigationConstants.WEBVIEW_LINK.NAME, {
                Link: TERM_CONDITION_LINK,
                title: "Terms and Conditions",
              })
            }
          >
            <Text style={styles.terms_condition}> and Conditions </Text>
          </Pressable>
          <Text style={styles.bottomtxt}>And acknowledge you have</Text>
        </View>
        <View style={styles.bottom_row}>
          <Text style={styles.bottomtxt}>read the </Text>
          <Pressable
            onPress={() =>
              navigate(assets.NavigationConstants.WEBVIEW_LINK.NAME, {
                Link: PRIVACY_LINK,
                title: "Privacy Policy",
              })
            }
          >
            <Text style={styles.terms_condition}>Privacy Policy</Text>
          </Pressable>
        </View>
        <Button
          imgBG={""}
          style={[styles.buttn, pallete.mb_50]}
          txt={assets.Colors.BACKGROUND_THEME_COLOR}
          event={valid_vehicleInfo}
          bgcolor={assets.Colors.BUTTON_THEME_COLOR}
          image={false}
          img={""}
          title="Next"
        />
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};
export default Vehicle_Info;
