import React, { useState } from "react";
import { SafeAreaView, View, Text, Platform, Modal, Image } from "react-native";
import assets from "../../assets";
import useStyle from "./style";
import usePallete from "../../assets/Pallete";
import { useNavigation } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";
import Button from "../../common_components/Button";
import Ionicons from "react-native-vector-icons/Ionicons";
import { getStoredData, storeData } from "../../Storage/ApplicationStorage";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
const Qualification = () => {
  const pallete = usePallete();
  const styles = useStyle();
  const { navigate, goBack } = useNavigation();
  const [transfer, setTransfer] = useState(false);
  const setPaths = async () => {
    let data = await getStoredData("PATH");
    console.log("setpaths==", data);
    await storeData("PATH", { ...data, Qualification: true }).then(() => {
      navigate(assets.NavigationConstants.PROFILE_STEPS.NAME);
    });
  };
  return (
    <SafeAreaView style={[pallete.mainContainor]}>
      <ScrollView style={styles.scrollContainer}>
        <Text style={styles.runner}>Runners must be. . </Text>
        <View style={[styles.qualification_contents, styles.top]}>
          <View style={styles.qualification_contents}>
            <MaterialCommunityIcons
              name="check-bold"
              color={assets.Colors.TERMS_CONDITION_COLOR}
              size={20}
            />
            <Text style={styles.smallTxt}>18+ years of age</Text>
          </View>
          <View></View>
        </View>
        <View style={[styles.qualification_contents]}>
          <View style={styles.qualification_contents}>
            <MaterialCommunityIcons
              name="check-bold"
              color={assets.Colors.TERMS_CONDITION_COLOR}
              size={20}
            />
            <Text style={styles.smallTxt}>Able to lift 50lbs.</Text>
          </View>
          <View></View>
        </View>
        <View style={[styles.qualification_contents]}>
          <View style={styles.qualification_contents}>
            <MaterialCommunityIcons
              name="check-bold"
              color={assets.Colors.TERMS_CONDITION_COLOR}
              size={20}
            />
            <Text style={styles.smallTxt}>Able to drive own vehicle</Text>
          </View>
          <View></View>
        </View>
        <View style={[styles.qualification_contents]}>
          <View style={styles.qualification_contents}>
            <MaterialCommunityIcons
              name="check-bold"
              color={assets.Colors.TERMS_CONDITION_COLOR}
              size={20}
            />
            <Text style={styles.smallTxt}>Eligible to work in the U.S</Text>
          </View>
          <View></View>
        </View>
      </ScrollView>
      <Button
        imgBG={""}
        style={styles.max_margin}
        txt={assets.Colors.ACCOUNT_TXT_COLOR}
        event={() => [
          global.universalObject.logEvent("Requirements-not-Met", {
            customData: {
              anonymousid: global.userId,
              device: Platform.OS,
              Screen: "Qualification",
              URL: "https://projects.invisionapp.com/d/main?origin=v7#/console/21738858/462741871/preview?scrollOffset=71#project_console",
            },
          }),
          setTransfer(true),
        ]}
        bgcolor={assets.Colors.INACTIVE_STORE_BG_COLOR}
        image={false}
        img={""}
        title="I didn’t meet the requirements"
      />
      <Button
        imgBG={""}
        style={[styles.max_margin, styles.buttn, pallete.mb_10]}
        txt={assets.Colors.BACKGROUND_THEME_COLOR}
        event={() => [
          global.universalObject.logEvent("Requirements-Met", {
            customData: {
              anonymousid: global.userId,
              device: Platform.OS,
              Screen: "Qualification",
              URL: "https://projects.invisionapp.com/d/main?origin=v7#/console/21738858/462741871/preview?scrollOffset=71#project_console",
            },
          }),
          setPaths(),
        ]}
        bgcolor={assets.Colors.BUTTON_THEME_COLOR}
        image={false}
        img={""}
        title="I meet the requirements"
      />
      <View>
        <Modal
          animationType="none"
          transparent={true}
          visible={transfer}
          onRequestClose={() => {
            setTransfer(!transfer);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Ionicons
                name={"ios-close"}
                color={assets.Colors.BLACK_COLOR}
                size={35}
                onPress={() => {
                  [setTransfer(false)];
                }}
              />
              <View style={styles.center}>
                <Image
                  style={{ height: 135, width: 135, resizeMode: "contain" }}
                  source={assets.Images.SAD}
                ></Image>
              </View>
              <Text style={[styles.instant_Cash, styles.top]}>Bummer!</Text>
              <Text
                style={[
                  styles.will_recieve,
                  { color: assets.Colors.INPUT_TITLE_COLOR },
                ]}
              >
                We are sorry to hear you don't {"\n"}meet the requirements at{" "}
                this {"\n"} time. We would love to have you {"\n"} back when you
                do!
              </Text>
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
};
export default Qualification;
