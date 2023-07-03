import AsyncStorage from "@react-native-async-storage/async-storage";
export const ACCESS_TOKEN = "access_token";
export const LOGIN_KEY = "LOG_IN";
export const OTP_KEY = "otp";
export const NAME = "name";
export const LASTNAME = "lastname";
export const EMAIL = "email";
export const PHONE = "phone";
export const USERID = "id";
export const FCM_TOKEN = "fcm_token";
export const DEVICE_ID = "device_id";
export const OS_TYPE = "os_type";
export const LOGIN_TYPE_TOKEN_KEY = "LoginTypeTokenKey";
export const APPLICANT_ID = "Applicant_id";
export const APPLE_DATA = "APPLE_DATA";
export const ONFIDO_SDK_TOKEN = "ONFIDO_SDK_TOKEN";
export const setData = async (key, value) => {
  try {
    console.log("Storage-Changed" + key + " ", JSON.stringify(value));
    await AsyncStorage.setItem(key, value);
    return true;
  } catch (error) {
    return false;
  }
};

export const getData = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      return value;
    }
    return null;
  } catch (error) {}
  return "";
};

export const storeData = async (key, value) => {
  try {
    console.log("KEY==" + key + " ", "VALUE==", JSON.stringify(value));
    await AsyncStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    return false;
  }
};

export const getStoredData = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      return JSON.parse(value);
    }
    return null;
  } catch (error) {}
  return "";
};
export const saveToken = async (value) => {
  try {
    console.log("Storage-Changed", JSON.stringify(value));

    await AsyncStorage.setItem(ACCESS_TOKEN, value);
    return true;
  } catch (error) {
    return false;
  }
};

export const clearToken = async () => saveToken(null);

export const getToken = async () => {
  try {
    const value = await AsyncStorage.getItem(ACCESS_TOKEN);
    if (value !== null) {
      return value;
    }
    return null;
  } catch (error) {
    return null;
  }
};

export const clearAsyncStorage = async () => {
  console.log("Storage-Cleared");
  AsyncStorage.clear();
};
