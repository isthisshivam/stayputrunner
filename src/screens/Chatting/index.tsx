import React, { useState, useEffect, useRef } from "react";
import {
  SafeAreaView,
  View,
  Text,
  Image,
  Pressable,
  TextInput,
  FlatList,
  Platform,
  KeyboardAvoidingView,
  TouchableOpacity,
  ActivityIndicator,
  ImageBackground,
  Alert,
} from "react-native";
import Back_Header from "../../common_components/Back_Header";
import moment from "moment";
import axios from "axios";
import assets from "../../assets";
import {
  RUNNER_UPDATE_ORDER_STATUS,
  SEND_MESSAGE_NOTIFICATION,
} from "../../Services/ApiUrls";
import { useSelector } from "react-redux";
import useStyle from "./style";
import usePallete from "../../assets/Pallete";

import { SafeAreaProvider } from "react-native-safe-area-context";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

import {
  dW,
  dH,
  windowHeight,
  windowWidth,
} from "../../utils/dynamicHeightWidth";
import { Secrets } from "../../assets/secrets";
import { AutoScrollFlatList } from "react-native-autoscroll-flatlist";
import firebase from "@react-native-firebase/app";
import Loader from "../../common_components/Loader";
import firestore from "@react-native-firebase/firestore";
import ImagePicker from "react-native-image-crop-picker";
import storage from "@react-native-firebase/storage";
import Message from "../../common_components/Message";
import { GetData } from "../../utils/utilities";
import { LOGIN_KEY } from "../../Storage/ApplicationStorage";

const GALLERY = "GALLERY";
const CAMERA = "CAMERA";
var localUri = null;
var fcmToken = null;
var userData = null;
const Chatting = (props) => {
  const pallete = usePallete();
  const styles = useStyle();
  const messageRef = useRef();
  const [currentUserId] = useState(global.currentUserId);

  const [userId, setUserId] = useState("1");

  const [message, setMessage] = useState("");
  const [chatArray, setChatArray] = useState([]);

  const [profile, setProfile] = useState("");
  const [isImageLoading, setImageLoading] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [isSent, setSent] = useState(false);
  useEffect(() => {
    getFcToken();
    getUserData();
    pullMessages();
  }, [props.route.params.orderId]);

  const getFcToken = async () => {
    fcmToken = await GetData("F_TOKEN");
  };
  const getUserData = async () => {
    const value = await GetData(LOGIN_KEY);

    if (value) {
      const user_profile = JSON.parse(value);
      userData = user_profile;
    }
  };

  const pullMessages = async () => {
    await firebase
      .firestore()
      .collection(assets.Secrets.MESSAGES)
      .doc(
        props?.route?.params?.runnerId +
          `_` +
          props?.route?.params?.customerId +
          `_` +
          props?.route?.params?.orderId
      )
      .collection(assets.Secrets.MESSAGE_COLLECTION)
      .orderBy(assets.Secrets.CREATED_AT)
      .onSnapshot((querySnapshot) => {
        setLoading(false);
        const refArray = [];
        if (querySnapshot) {
          querySnapshot.forEach((documentSnapshot) => {
            refArray.push(documentSnapshot.data());
          });
          //modify data as per need
          let modifiedArrayData = refArray.map((item, index) => {
            item.isSelected = false;
            return { ...item };
          });

          setChatArray(modifiedArrayData);
        }
      });
  };
  const pushMessageToFireStore = async (message, id, type) => {
    if (type == "image") {
      //FIXME:
      setImageLoading(true);
    }

    //FIXME:
    setSent(true);
    var messageToAdd = {
      message,
      runner_id: props?.route?.params?.runnerId,
      customer_id: props?.route?.params?.customerId,
      type: type,
      image: localUri,
      sender_id: currentUserId,
      customer_fcm_tkn: props?.route?.params?.fcmTkn,
      runner_fcm_tkn: fcmToken,
      created_at: moment().format(), ///set current date to firestore
    };

    await firestore()
      .collection(assets.Secrets.MESSAGES)
      .doc(
        props?.route?.params?.runnerId +
          `_` +
          props?.route?.params?.customerId +
          `_` +
          props?.route?.params?.orderId
      )
      // .doc("2" + `_` + userId)
      //.doc(setOneToOneChat(userId == 59 ? 48 : 59, userId))
      .collection(assets.Secrets.MESSAGE_COLLECTION)
      .add(messageToAdd)
      .then((d) => {
        console.log("sendmessag___success", JSON.stringify(d));
      })
      .catch((e) => {
        console.log("sendmessag___eerror", JSON.stringify(e));
      });
    ///here pushing latest messageToAdd to doc as field
    // return;
    await firebase
      .firestore()
      .collection(assets.Secrets.MESSAGES)
      .doc(
        props?.route?.params?.runnerId +
          `_` +
          props?.route?.params?.customerId +
          `_` +
          props?.route?.params?.orderId
      )
      ///.doc("2" + `_` + userId)
      .set({ LatestMessage: messageToAdd })
      .then(() => {
        chatArray.push(messageToAdd);

        setMessage("");
        setProfile("");
        setSent(false);
        setImageLoading(false);
        localUri = null;
      });
    sendMessageNotification();
  };

  const sendMessageNotification = async () => {
    let payload = {
      registration_ids: [props?.route?.params?.fcmTkn],

      notification: {
        body: message,
        title: userData && userData?.firstname + ` Sent a message.`,
        action: assets.strings._chatting,
      },
      data: {
        body: message,
        title: userData && userData?.firstname + ` Text you.`,
        action: assets.strings._chatting,
        runnerId: props?.route?.params?.runnerId,
        customerId: props?.route?.params?.customerId,
        orderId: props?.route?.params?.orderId,
        userName: userData?.firstname,
      },
    };
    console.log(
      "sendMsgNotificationRequest.payload>>>>",
      JSON.stringify(payload)
    );
    const instance = axios({
      method: "POST",
      url: SEND_MESSAGE_NOTIFICATION,
      timeout: 50000,
      headers: {
        Authorization: Secrets.CONVERT_TOKEN_AUTH_KEY,
        "Content-Type": "application/json",
      },
      data: payload,
    });

    return new Promise(function (resolve, reject) {
      instance
        .then(function (response) {
          console.log(
            "sendMsgNotificationRequest.success>>>>",
            JSON.stringify(response?.data)
          );
        })
        .catch(function (error) {
          console.log("sendMsgNotificationRequest.failure>>>>", error);
        });
    });
  };
  const chooseMode = () => {
    Alert.alert(
      "Selection",
      "Choose From where you want to send Pictures",
      [
        {
          text: "CANCEL",
          style: "destructive",
          onPress: () => console.log("cancel"),
        },
        {
          text: "GALLERY",
          onPress: () => onPressChooseImageToCapture(GALLERY),
          style: "default",
        },
        {
          text: "CAMERA",
          style: "default",
          onPress: () => onPressChooseImageToCapture(CAMERA),
        },
      ],
      { cancelable: true }
    );
  };
  const onPressChooseImageToCapture = (TYPE) => {
    if (TYPE == CAMERA) {
      ImagePicker.openCamera({
        width: 300,
        height: 400,
        mediaType: "photo",
        cropping: true,
        compressImageQuality: 0.8,
      }).then((image) => {
        generateValidImage(image);
      });
    } else if (TYPE == GALLERY) {
      ImagePicker.openPicker({
        width: 300,
        height: 400,
        mediaType: "photo",
        cropping: true,
        compressImageQuality: 0.8,
      }).then((image) => {
        generateValidImage(image);
      });
    }
  };
  const generateValidImage = (data) => {
    const localUri = data.path;
    const filename = localUri.split("/").pop();
    let fileType = data.mime;

    setProfile(data.path);
    var obj = {
      sender_id: currentUserId,
      type: "image",
      mode: "local",
      image: data.path,
      created_at: moment().format(), ///set current date to firestore
    };
    chatArray.push(obj);
    setChatArray(chatArray);
    uploadFileToFirebaseStorage(localUri, filename, "image");
  };
  const uploadFileToFirebaseStorage = (path, imageName, type) => {
    console.log("uploadFileToFirebaseStorage", path, imageName, type);
    setImageLoading(true);
    let reference = storage().ref(imageName);
    let task = reference.putFile(path);
    task
      .then(() => {
        console.log(`${imageName} has been successfully uploaded.`);
        let imageRef = firebase.storage().ref("/" + imageName);
        imageRef
          .getDownloadURL()
          .then((url) => {
            console.log(`${imageName} has been downloaded uploaded.`, url);
            localUri = url;
            setImageLoading(false);
            pushMessageToFireStore(message, userId, type);
          })
          .catch((e) => {
            setImageLoading(false);
            console.log("getting downloadURL of image error => ", e);
          });
      })
      .catch((e) => console.log("uploading image error => ", e));
  };

  const Messages = () => {
    return (
      <AutoScrollFlatList
        ListEmptyComponent={() => emptyView()}
        extraData={isSent}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingVertical: 20, paddingHorizontal: 20 }}
        enabledAutoScrollToEnd
        threshold={20}
        data={chatArray}
        renderItem={(item) => (
          <Message
            receiver_image={"item.item.receiver_image"}
            index={item.index}
            userId={props?.route?.params?.runnerId}
            time={item.item.created_at}
            type={item.item.type}
            sender_profile={"item.item.sender_profile"}
            sender_id={"item.item.sender_id"}
            image={item.item.image}
            message={item.item.message}
            side={
              global.currentUserId == item.item.sender_id ? "left" : "right"
            }
          />
        )}
        keyExtractor={(item) => item.created_at}
      />
    );
  };

  const emptyView = () => {
    return (
      <View
        style={{
          flex: 1,
          height: windowHeight() / 1.4,
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text style={styles.forgot_pass_heading}>No messages yet.</Text>
      </View>
    );
  };
  return (
    <KeyboardAvoidingView
      style={[
        { flex: 1, backgroundColor: assets.Colors.BACKGROUND_PRIMARY_COLOR },
      ]}
      enabled
      behavior={Platform.OS === "ios" ? "padding" : ""}
    >
      <Back_Header
        // specificBack={()=>navigate.}
        title="Messages"
        subtitle=""
        icon1="arrow-left"
        icon2={null}
        sub={""}
        event={""}
      />
      <View style={[{ flex: 1 }]}>
        <SafeAreaProvider>
          {Messages()}
          <Loader isLoading={isImageLoading} />
          <KeyboardAvoidingView>
            <View
              style={{
                height: 60,
                justifyContent: "space-between",
                alignItems: "center",
                flexDirection: "row",
                paddingHorizontal: 15,
                marginBottom: 24,
              }}
            >
              <TextInput
                ref={messageRef}
                value={message}
                onChangeText={(value) => setMessage(value)}
                placeholder="Write a message..."
                style={{
                  paddingHorizontal: 20,
                  borderRadius: 20,
                  height: 45,
                  backgroundColor: "#fff",
                  width: "75%",
                }}
              ></TextInput>
              <TouchableOpacity
                onPress={() => !isImageLoading && chooseMode()}
                style={{
                  height: 40,
                  width: 40,
                  backgroundColor: assets.Colors.BACKGROUND_PRIMARY_COLOR,
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 20,
                }}
              >
                {/* {isImageLoading ? (
                  <ActivityIndicator></ActivityIndicator>
                ) : (
                  <FontAwesome5
                    name={"image"}
                    color={assets.Colors.BLACK_COLOR}
                    size={25}
                    style={{}}
                  />
                )} */}
                <FontAwesome5
                  name={"image"}
                  color={assets.Colors.BLACK_COLOR}
                  size={25}
                  style={{}}
                />
              </TouchableOpacity>
              {/* {!isImageLoading && (
                <TouchableOpacity
                  onPress={() =>
                    !isLoading && message
                      ? pushMessageToFireStore(message, userId, "text")
                      : alert("Please enter messsage!")
                  }
                  style={{
                    height: 40,
                    width: 40,
                    backgroundColor: assets.Colors.BACKGROUND_PRIMARY_COLOR,
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 20,
                  }}
                >
                  {isSent ? (
                    <ActivityIndicator></ActivityIndicator>
                  ) : (
                    <MaterialCommunityIcons
                      name={"send"}
                      color={assets.Colors.BLACK_COLOR}
                      size={25}
                      style={{ marginLeft: 4 }}
                    />
                  )}
                </TouchableOpacity>
              )} */}
              <TouchableOpacity
                onPress={() =>
                  !isLoading && message
                    ? [
                        pushMessageToFireStore(message, userId, "text"),
                        messageRef.current.clear(),
                      ]
                    : alert("Please enter messsage!")
                }
                style={{
                  height: 40,
                  width: 40,
                  backgroundColor: assets.Colors.BACKGROUND_PRIMARY_COLOR,
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 20,
                }}
              >
                {isSent ? (
                  <ActivityIndicator></ActivityIndicator>
                ) : (
                  <MaterialCommunityIcons
                    name={"send"}
                    color={assets.Colors.BLACK_COLOR}
                    size={25}
                    style={{ marginLeft: 4 }}
                  />
                )}
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </SafeAreaProvider>
      </View>
    </KeyboardAvoidingView>
  );
};
export default Chatting;
