import { CommonActions } from "@react-navigation/native";
import { Platform, Linking, Alert } from "react-native";
import Toast from "react-native-simple-toast";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  getData,
  ACCESS_TOKEN,
  clearAsyncStorage,
} from "../Storage/ApplicationStorage";

import { PermissionsAndroid } from "react-native";
import S3 from "react-aws-s3";
window.Buffer = window.Buffer || require("buffer").Buffer;
const config = {
  bucketName: "produceweb",
  //bucketName: "productwebreact",
  //dirName: dirName /* optional */,
  region: "us-east-2",
  //accessKeyId: "AKIASQHZU7O5WGTAVH4F",
  //secretAccessKey: "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",
  accessKeyId: "AKIASQHZU7O5UCZXOKX4",
  secretAccessKey: "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",
};
export const priceConvert = (price) => {
  console.log("priceConvert==", price);
  //return price;
  if (price) {
    if (typeof price != "string") {
      let strPrice = price.toString();
      return parseFloat(strPrice.replace("$", "")).toFixed(2);
    } else if (typeof price === "string") {
      return parseFloat(price.replace("$", "")).toFixed(2);
    }
  } else return "";
};
export const callNumber = (phone) => {
  console.log("callNumber ----> ", phone);
  let phoneNumber = phone;
  if (Platform.OS !== "android") {
    phoneNumber = `telprompt:${phone}`;
  } else {
    phoneNumber = `tel:${phone}`;
  }
  Linking.canOpenURL(phoneNumber)
    .then((supported) => {
      if (!supported) {
        Alert.alert("Phone number is not available");
      } else {
        return Linking.openURL(phoneNumber);
      }
    })
    .catch((err) => console.log(err));
};

export const uploadImage = async (file, dirName, newFileName) => {
  console.log("uploadImage.payload===", JSON.stringify(file), newFileName);
  // const dd = {
  //   "bucket name": "stayput-runner",
  //   region: "us-east-1",
  //   "access key": "AKIAQ3ISOEW32TWSTKHF",
  //   "secret key": "U8mbOAORCWLb7P/IULsfiLIytAjjPluMbZSTJms",
  // };
  const S3_CONFIG = {
    bucketName: "stayput-apps",
    region: "US East (N. Virginia) us-east-1",
    dirName: dirName,
    accessKeyId: "AKIAQ3ISOEW34MDBJQMG",
    secretAccessKey: "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",
  };
  // const S3_CONFIG = {
  //   bucketName: "basepop",
  //   //dirName: "dirName" /* optional */,
  //   region: "us-west-2",
  //   accessKeyId: "AKIA4ZTBXMI4VNZ7JGVL",
  //   secretAccessKey: "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",
  // };
  const ReactS3Client = new S3(S3_CONFIG);

  return new Promise((resolve, reject) => {
    ReactS3Client.uploadFile(file, newFileName)
      .then((data) => {
        console.log("uploadImage.Success", data);
        resolve(data);
      })
      .catch((err) => {
        console.log("uploadImage.error", err);
        resolve(err);
      });
  });
};
export const randomImageName = () => {
  return new Date().getTime() + "_image.jpg";
};
export const requestAndroidCameraPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
      {
        title: "Camera Permission",
        message: "Stayput needs access to your camera ",
        buttonNeutral: "Ask Me Later",
        buttonNegative: "Cancel",
        buttonPositive: "OK",
      }
    );
    console.log("Camera granted==", granted);
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log("Camera permission granted");
      return true;
    } else {
      console.log("Camera permission denied");
      return false;
    }
  } catch (err) {
    console.warn(err);
    return false;
  }
};
export const navigateToClass = (screenName, params) => {
  const { navigate } = useNavigation();
  navigate(screenName, params);
};

export const navigateTo = (screenName, params, navigation) => {
  navigation.navigate(screenName, params);
};
export const resetStack = (route, param, navigation) => {
  navigation.dispatch(
    CommonActions.reset({
      index: 0,
      routes: [{ name: route, params: param }],
    })
  );
};

export const validateEmail = (text) => {
  const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return reg.test(text);
};
export const validateNumber = (num) => {
  const reg = /^[0-9\b]+$/;
  return reg.test(num);
};
export const validLicense_no = (num) => {
  const reg = /\A[A-Z]{1}\d{7}\z/;
  return reg.test(num);
};

export const showToastMessage = (message) => {
  setTimeout(() => {
    Toast.show(message, Toast.SHORT);
  }, 100);
};

export const SaveData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
    console.log("Saved", key);
  } catch (e) {
    console.log("ERROR======", e);
  }
};

export const getCurrentMonth = () => {
  const month = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const d = new Date();
  var MONTH = month[d.getMonth()];
  return MONTH;
};
export const GetData = async (key) => {
  try {
    return await AsyncStorage.getItem(key);
  } catch (e) {
    console.log("ERROR======", e);
  }
};

export const logout = async (dispatch, navigation) => {
  let aToken = await getData(ACCESS_TOKEN);
  if (aToken) {
    await clearAsyncStorage();
    const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    showToastMessage("Session expired. Please login again");
    dispatch({
      type: "WEB_API_LOGOUT_USER",
    });
    wait(200)
      .then(async () => {
        resetStack(assets.strings.login.ROUTE_NAME, null, navigation);
      })
      .catch(() => {});
    console.log("STACK AFter====== ", navigation.dangerouslyGetState().routes);
  }
};
