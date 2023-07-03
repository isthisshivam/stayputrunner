import React from "react";
import {
  Dimensions,
  PixelRatio,
  AsyncStorage,
  Platform,
  StatusBar,
  ImageBackground,
  View,
  Text,
  Button,
  ActivityIndicator,
  TouchableOpacity,
  Image,
} from "react-native";
import useStyle from "../screens/Chatting/style";
const Message = (item) => {
  const styles = useStyle();
  const {
    receiver_image,
    type,
    message,
    sender_id,
    created_at,
    sender_profile,
    receiver_id,
    image,
    mode,
    userId,
    side,
  } = item;

  if (side == "right") {
    //side is right
    return (
      <View style={[styles.left_msg_c]}>
        <View>
          {type == "text" && (
            <View style={styles.left_msg}>
              <Text>{message}</Text>
            </View>
          )}
          {type == "image" && (
            <TouchableOpacity>
              <ImageBackground
                style={{ height: 200, width: 200, marginLeft: 4 }}
                imageStyle={{ borderRadius: 10 }}
                resizeMode="cover"
                source={{ uri: image }}
              ></ImageBackground>
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  } else {
    return (
      <View style={styles.right_msg_c}>
        <View style={styles.right_msg_c_c}>
          {type == "text" && (
            <View style={styles.right_msg}>
              <Text style={{ color: "gray" }}>{message}</Text>
            </View>
          )}

          {type == "image" && image != "" && (
            <TouchableOpacity>
              <ImageBackground
                style={{ height: 200, width: 200, marginRight: 4 }}
                imageStyle={{ borderRadius: 10 }}
                resizeMode="cover"
                source={{ uri: image }}
              ></ImageBackground>
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  }
};

export default Message;
