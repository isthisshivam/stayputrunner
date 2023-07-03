import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  Text,
  Modal,
  ActivityIndicator,
} from "react-native";
import useStyle from "../screens/Order_Items/style";
import usePallete from "../assets/Pallete";
const Loader = (props) => {
  const pallete = usePallete();
  const styles = useStyle();
  const { isLoading } = props;

  return (
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
  );
};
export default Loader;
