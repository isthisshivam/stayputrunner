import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  Text,
  Pressable,
  Image,
  Modal,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  PermissionsAndroid,
} from "react-native";
import useStyle from "./style";
import usePallete from "../../assets/Pallete";
import Back_Header from "../../common_components/Back_Header";
import assets from "../../assets";
import Button from "../../common_components/Button";
import Text_Input from "../../common_components/Text_Input";
import { useRest, CALL_TYPES, LOADING_TYPES } from "../../Services/rest/api";
import useFileUploadingRestApi from "../../Services/rest/apiUploadImage";
import ImagePicker from "react-native-image-crop-picker";
import {
  GetData,
  SaveData,
  showToastMessage,
  validateEmail,
  validateNumber,
  requestAndroidCameraPermission,
} from "../../utils/utilities";
import { RUNNER_CREATE, RUNNER_PROFILE_PIC } from "../../Services/ApiUrls";
import { LOGIN_KEY, ACCESS_TOKEN } from "../../Storage/ApplicationStorage";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import Imagepicker_View from "../../common_components/Imagepicker_View";
import { launchCamera } from "react-native-image-picker";

const Account_Edit = ({ navigation }) => {
  const pallete = usePallete();
  const styles = useStyle();
  const [passwordChange, setPasswordChange] = useState(false);
  const [bttnBG, setBttnBG] = useState(false);
  const [profile, setProfile] = useState("");
  const [profileUpdate, setProfileUpdate] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailid, setEmailid] = useState("");
  const [number, setNumber] = useState("");
  const [password, setPassword] = useState("");
  const [cur_pass, setCur_Pass] = useState("");
  const [new_pass, setNew_Pass] = useState("");
  const [confirm_pass, setConfirm_Pass] = useState("");
  const [popup, setPopup] = useState(false);

  const update_accountPayload = passwordChange
    ? {
        firstname: firstName.trim(),
        lastname: lastName.trim(),
        email: emailid.trim(),
        password: cur_pass.trim(),
        new_password: new_pass.trim(),
        phone: number.trim(),
        latitude: global?.location?.latitude,
        longitude: global?.location?.longitude,
      }
    : {
        firstname: firstName.trim(),
        lastname: lastName.trim(),
        email: emailid.trim(),
        phone: number.trim(),
        latitude: global?.location?.latitude,
        longitude: global?.location?.longitude,
      };

  const { data, loading, error, fetchData, responseCode } = useRest({
    URL: RUNNER_CREATE,
    PAYLOAD: update_accountPayload,
    CALL_TYPE: CALL_TYPES.POST,
    lazy: true,
  });

  const {
    data: p_data,
    loading: p_loading,
    error: p_error,
    fetchData: p_fetchData,
    responseCode: p_responseCode,
  } = useFileUploadingRestApi({
    URL: RUNNER_PROFILE_PIC,
    PAYLOAD: null,
    CALL_TYPE: CALL_TYPES.POST,
    fileList: [],
    lazy: true,
  });

  useEffect(() => {
    console.log("ERROR===", error);
    if (data) {
      if (data.status == 200) {
        saveLoginData(data);
        setTimeout(() => {
          showToastMessage(data.message);
        }, 100);
      } else {
        showToastMessage(data.message);
      }
    }
  }, [data, error, responseCode]);

  useEffect(() => {
    var response = JSON.parse(p_data);
    if (response?.status === 200) {
      showToastMessage(response.message);
      saveData(response.data);
    }
  }, [p_data, p_error, p_responseCode]);

  useEffect(() => {
    getData();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      const focus = getData();
      return () => focus;
    }, [])
  );

  useEffect(() => {
    if (profileUpdate) profile_pic();
  }, [profileUpdate]);

  const saveData = async (data) => {
    await SaveData(LOGIN_KEY, JSON.stringify(data));
    await SaveData(ACCESS_TOKEN, data.access_token);
  };

  const chooseFile = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
    }).then((image) => {
      console.log("File Path===", image);
      setProfile(image.path);
      setProfileUpdate(image.path);
    });
  };

  const getData = async () => {
    const value = await GetData(LOGIN_KEY);
    console.log("GET===", value);
    if (value) {
      const user_info = JSON.parse(value);
      setFirstName(user_info.firstname);
      setLastName(user_info.lastname);
      setEmailid(user_info.email);
      setNumber(user_info.phone);
      setProfile(user_info.profile_pic);
    }
  };

  const saveLoginData = async (data) => {
    const saveData = data.data;
    console.log("SAVE===", saveData);
    await SaveData(LOGIN_KEY, JSON.stringify(saveData));
    await SaveData(ACCESS_TOKEN, data.data.access_token);
  };

  const isValid_userUpdate = () => {
    if (!firstName.trim()) {
      showToastMessage("enter first name");
      return false;
    } else if (!lastName.trim()) {
      showToastMessage("enter last name");
      return false;
    } else if (!emailid.trim()) {
      showToastMessage("enter email id");
      return false;
    } else if (!validateEmail(emailid.trim())) {
      showToastMessage("Please enter valid email");
      return false;
    } else if (!number.trim()) {
      showToastMessage("Please enter mobile number");
      return false;
    } else if (!validateNumber(number.trim())) {
      showToastMessage("Please enter valid mobile number");
      return false;
    } else if (number.trim().length != 10) {
      showToastMessage("Please enter 10 digits number");
      return false;
    }

    return true;
  };
  const profile_pic = () => {
    const arr = [];
    arr.push(profileUpdate);
    p_fetchData(0, arr);
  };
  const valid_update = () => {
    if (isValid_userUpdate()) {
      fetchData(0);
    }
  };
  const requestCameraPermission = async () => {
    if (Platform.OS === "android") {
      const permission = await requestAndroidCameraPermission();
      if (permission) waitCameraInflation();
    } else {
      waitCameraInflation();
    }
  };
  const waitCameraInflation = () => {
    setTimeout(() => {
      openCamera();
    }, 500);
  };
  const openCamera = async () => {
    await launchCamera({
      mediaType: "photo",
      cameraType: "front" || "back",
    })
      .then((result) => {
        console.log("Camera-Result====", result);
        setProfile(result.assets[0].uri);
        setProfileUpdate(result.assets[0].uri);
      })
      .catch((e) => {
        console.log("Camera-error====", JSON.stringify(e));
      });
  };

  return (
    <View style={[pallete.mainContainor]}>
      <Back_Header
        title="Edit your account"
        subtitle=""
        icon1="arrow-left"
        icon2={null}
        sub={""}
        event={""}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView style={[pallete.screen_container]}>
          <Modal
            visible={
              loading === LOADING_TYPES.LOADING ||
              loading === LOADING_TYPES.FETCHING_MORE ||
              p_loading === LOADING_TYPES.LOADING ||
              p_loading === LOADING_TYPES.FETCHING_MORE
            }
            transparent={true}
          >
            <View style={[pallete.Loader_View]}>
              <ActivityIndicator
                size={"large"}
                color={assets.Colors.WHITE}
                justifyContent={"center"}
                marginTop="100%"
              />
            </View>
          </Modal>
          <Pressable
            onPress={() => {
              setBttnBG(true), setPopup(true);
            }}
            style={styles.profile_container}
          >
            <Image source={{ uri: profile }} style={styles.profile} />
            <Text style={styles.add_photo}>Add photo</Text>
          </Pressable>
          <View style={styles.topmargin}>
            <View style={styles.row_inputs_view}>
              <Text_Input
                placeholdertxt={assets.Colors.INPUT_HOLDER_TXT_COLOR}
                event={(text) => setFirstName(text)}
                edit={firstName}
                style={[styles.space_vertical, styles.input_row]}
                subtitle={""}
                title="First Name"
              />
              <View style={styles.horizontal_spacer} />
              <Text_Input
                placeholdertxt={assets.Colors.INPUT_HOLDER_TXT_COLOR}
                event={(text) => setLastName(text)}
                edit={lastName}
                style={[styles.space_vertical, styles.input_row]}
                subtitle={""}
                title="Last Name"
              />
            </View>
            <Text_Input
              placeholdertxt={assets.Colors.INPUT_HOLDER_TXT_COLOR}
              event={(text) => setEmailid(text)}
              edit={emailid}
              style={styles.space_vertical}
              subtitle={""}
              title="Email Address"
            />
            <Text_Input
              keyboard_type="numeric"
              placeholdertxt={assets.Colors.INPUT_HOLDER_TXT_COLOR}
              event={(text) => setNumber(text)}
              edit={number}
              style={styles.space_vertical}
              subtitle={""}
              title="Mobile Number"
            />
            {!passwordChange ? (
              <View style={styles.row_center}>
                <Text_Input
                  placeholdertxt={assets.Colors.INPUT_HOLDER_TXT_COLOR}
                  event={(text) => setPassword(text)}
                  edit={password}
                  style={styles.space_vertical}
                  subtitle={""}
                  title="Password"
                />
                <Pressable onPress={() => setPasswordChange(true)}>
                  <Text
                    style={[
                      styles.change,
                      { color: assets.Colors.TERMS_CONDITION_COLOR },
                    ]}
                  >
                    Change
                  </Text>
                </Pressable>
              </View>
            ) : (
              <View>
                <View style={styles.row_center}>
                  <Text_Input
                    placeholdertxt={assets.Colors.INPUT_HOLDER_TXT_COLOR}
                    event={(text) => setCur_Pass(text)}
                    edit={cur_pass}
                    style={styles.space_vertical}
                    subtitle={""}
                    title="Current Password"
                  />
                  <Pressable onPress={() => setPasswordChange(false)}>
                    <Text
                      style={[
                        styles.change,
                        { color: assets.Colors.INPUT_TITLE_COLOR },
                      ]}
                    >
                      Cancel
                    </Text>
                  </Pressable>
                </View>
                <Text_Input
                  placeholdertxt={assets.Colors.INPUT_HOLDER_TXT_COLOR}
                  event={(text) => setNew_Pass(text)}
                  edit={new_pass}
                  style={styles.space_vertical}
                  subtitle={""}
                  title="New Password"
                />
                <Text_Input
                  placeholdertxt={assets.Colors.INPUT_HOLDER_TXT_COLOR}
                  event={(text) => setConfirm_Pass(text)}
                  edit={confirm_pass}
                  style={styles.space_vertical}
                  subtitle={""}
                  title="Confirm Password"
                />
              </View>
            )}
          </View>
          <Button
            txt={assets.Colors.BACKGROUND_THEME_COLOR}
            imgBG={""}
            style={[styles.button, pallete.mb_10]}
            event={() => {
              valid_update();
            }}
            bgcolor={assets.Colors.THEME_COLOR_PRIMARY}
            image={false}
            img={""}
            title="Save"
          />
        </ScrollView>
        <Imagepicker_View
          visible={popup}
          setVisible={setPopup}
          camera={() => requestCameraPermission()}
          gallery={() => chooseFile()}
        />
      </KeyboardAvoidingView>
    </View>
  );
};

export default Account_Edit;
