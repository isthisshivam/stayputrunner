import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  Text,
  Image,
  Pressable,
  FlatList,
  Switch,
} from "react-native";
import assets from "../../assets";
import useStyle from "./style";
import usePallete from "../../assets/Pallete";
import { useNavigation } from "@react-navigation/native";
import Button from "../../common_components/Button";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { ScrollView } from "react-native-virtualized-view";
import { sizes } from "../../assets/Constants/Constants";
import { showToastMessage } from "../../utils/utilities";
import BackButton from "../../common_components/BackButton";
import { getStoredData, storeData } from "../../Storage/ApplicationStorage";
const Stayput_card = () => {
  const pallete = usePallete();
  const styles = useStyle();
  const { navigate, goBack } = useNavigation();
  const [isEnabled, setIsEnabled] = useState(false);
  const [size, setSize] = useState(false);
  const [dropDown, setDropDown] = useState(false);

  const [selectSize, setSelectSize] = useState("");

  const setPaths = async (size) => {
    let data = await getStoredData("PATH");
    console.log("setpaths==", data);
    await storeData("SHIPPING_INFO", {
      t_Shirt: isEnabled + "",
      Size: size,
    });
    await storeData("PATH", { ...data, StayPut_Card: true }).then(() => {
      navigate(assets.NavigationConstants.SHIPPING_INFO.NAME);
    });
  };

  const optionsItems = (item) => {
    return (
      <Pressable
        onPress={() => {
          setSelectSize(item.option);
          setSize(!size);
        }}
        style={styles.dropDown_txt}
      >
        <Text style={[styles.options_text]}>{item.option}</Text>
      </Pressable>
    );
  };

  const valid_Oncontinue = () => {
    if (isEnabled === false) {
      setPaths("");
      return false;
    } else if (isEnabled === true && selectSize === "Select your size") {
      showToastMessage("Please Select your size");
      return false;
    } else {
      setPaths(selectSize);
    }
  };

  return (
    <SafeAreaView style={[pallete.mainContainor]}>
      <BackButton
        onBackPress={() =>
          navigate(assets.NavigationConstants.DIRECT_DEPOSIT.NAME)
        }
      />
      <ScrollView style={styles.scrollContainer}>
        <Text style={styles.runner}>We're mailing you a StayPut card</Text>
        <Image source={assets.Images.STAYPUT_CARD} style={styles.Image} />
        <View
          style={{
            flexDirection: "row",
            paddingHorizontal: 30,
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: 30,
          }}
        >
          <Text style={styles.smallTxt}>
            {`Buy items with this pre-loaded
StayPut card`}
          </Text>
          <Switch
            value={isEnabled}
            trackColor={{
              false: assets.Colors.INACTIVE_STORE_BG_COLOR,
              true: assets.Colors.BUTTON_THEME_COLOR,
            }}
            onChange={(value) => {
              setIsEnabled(!isEnabled);
              setDropDown(true);
              setSelectSize("Select your size");
            }}
          ></Switch>
        </View>

        <View style={styles.toggle_switch}>
          {/* <ToggleSwitch
            isOn={isEnabled}
            onColor={assets.Colors.BUTTON_THEME_COLOR}
            offColor={assets.Colors.INACTIVE_STORE_BG_COLOR}
            label="Would you like to get our awesome t-shirt?"
            labelStyle={styles.label}
            size="small"
            onToggle={() => {
              setIsEnabled(!isEnabled);
              setDropDown(true);
              setSelectSize("Select your size");
            }}
          /> */}
        </View>
        {dropDown && isEnabled == true && (
          <View style={styles.cardViewContainer}>
            <Pressable onPress={() => setSize(!size)} style={styles.cardView}>
              <Text style={styles.select_size}>{selectSize}</Text>
              <FontAwesome
                name={size == false ? "angle-down" : "angle-up"}
                color={assets.Colors.ACCOUNT_TXT_COLOR}
                size={30}
              />
            </Pressable>
          </View>
        )}
        {size && isEnabled == true && (
          <View style={styles.dropdown}>
            <FlatList
              style={styles.optionsList}
              showsHorizontalScrollIndicator={false}
              data={sizes}
              listKey={(item) => item.options}
              renderItem={({ item }) => optionsItems(item)}
            />
          </View>
        )}
      </ScrollView>
      <Button
        imgBG={""}
        style={[styles.buttn, pallete.mb_10]}
        txt={assets.Colors.BACKGROUND_THEME_COLOR}
        event={valid_Oncontinue}
        bgcolor={assets.Colors.BUTTON_THEME_COLOR}
        image={false}
        img={""}
        title="Continue"
      />
    </SafeAreaView>
  );
};
export default Stayput_card;
