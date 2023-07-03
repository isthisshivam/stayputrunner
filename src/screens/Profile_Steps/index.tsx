import React from "react";
import { SafeAreaView, View, Text, Pressable, Platform } from "react-native";
import assets from "../../assets";
import useStyle from "./style";
import usePallete from "../../assets/Pallete";
import { useNavigation } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import { getStoredData, storeData } from "../../Storage/ApplicationStorage";
import BackButton from "../../common_components/BackButton";
const Profile_steps = () => {
  const pallete = usePallete();
  const styles = useStyle();
  const { navigate, goBack } = useNavigation();

  const setPaths = async () => {
    let data = await getStoredData("PATH");
    console.log("setpaths==", data);
    await storeData("PATH", { ...data, Profile_Steps: true }).then(() => {
      navigate(assets.NavigationConstants.LICENSE_VERIFICATION.NAME);
    });
  };

  return (
    <SafeAreaView style={[pallete.mainContainor]}>
      <BackButton
        onBackPress={() =>
          navigate(assets.NavigationConstants.QUALIFICATION_SCREEN.NAME)
        }
      />

      <ScrollView style={styles.scrollContainer}>
        <Text style={styles.title}>Create your Profile</Text>

        <Pressable
          style={[styles.cardView, styles.topMargin]}
          onPress={() => [
            global.universalObject.logEvent("Onboarding-Step 1", {
              customData: {
                anonymousid: global.userId,
                device: Platform.OS,
                Screen: "Qualification",
                URL: "https://projects.invisionapp.com/d/main?origin=v7#/console/21738858/462741871/preview?scrollOffset=71#project_console",
              },
            }),
            setPaths(),
          ]}
        >
          <View style={styles.rightView}>
            <Text
              style={[
                styles.sr_num,
                { color: assets.Colors.ACCOUNT_TXT_COLOR },
              ]}
            >
              1.
            </Text>
            <Text
              style={[
                styles.stepsText,
                { color: assets.Colors.ACCOUNT_TXT_COLOR },
              ]}
            >
              Verify your identity
            </Text>
          </View>
          <View>
            <EvilIcons
              name="chevron-right"
              color={assets.Colors.ACCOUNT_TXT_COLOR}
              size={40}
            />
          </View>
        </Pressable>

        <Pressable
          style={styles.cardView}
          onPress={() => [
            global.universalObject.logEvent("Onboarding-Step 2", {
              customData: {
                anonymousid: global.userId,
                device: Platform.OS,
                Screen: "Profile_steps",
                URL: "https://projects.invisionapp.com/d/main?origin=v7#/console/21738858/462741871/preview?scrollOffset=71#project_console",
              },
            }),
          ]}
        >
          <View style={styles.rightView}>
            <Text
              style={[styles.sr_num, { color: assets.Colors.SAVE_EDIT_BG_CLR }]}
            >
              2.
            </Text>
            <Text
              style={[
                styles.stepsText,
                { color: assets.Colors.SAVE_EDIT_BG_CLR },
              ]}
            >
              Sign your paperwork
            </Text>
          </View>
          <View>
            <EvilIcons
              name="chevron-right"
              color={assets.Colors.SAVE_EDIT_BG_CLR}
              size={40}
            />
          </View>
        </Pressable>

        <Pressable
          style={styles.cardView}
          onPress={() => [
            global.universalObject.logEvent("Onboarding-Step 3", {
              customData: {
                anonymousid: global.userId,
                device: Platform.OS,
                Screen: "Profile_steps",
                URL: "https://projects.invisionapp.com/d/main?origin=v7#/console/21738858/462741871/preview?scrollOffset=71#project_console",
              },
            }),
          ]}
        >
          <View style={styles.rightView}>
            <Text
              style={[styles.sr_num, { color: assets.Colors.SAVE_EDIT_BG_CLR }]}
            >
              3.
            </Text>
            <Text
              style={[
                styles.stepsText,
                { color: assets.Colors.SAVE_EDIT_BG_CLR },
              ]}
            >
              Set up direct deposit
            </Text>
          </View>
          <View>
            <EvilIcons
              name="chevron-right"
              color={assets.Colors.SAVE_EDIT_BG_CLR}
              size={40}
            />
          </View>
        </Pressable>

        <Pressable
          style={styles.cardView}
          onPress={() => [
            global.universalObject.logEvent("Onboarding-Step 4", {
              customData: {
                anonymousid: global.userId,
                device: Platform.OS,
                Screen: "Profile_steps",
                URL: "https://projects.invisionapp.com/d/main?origin=v7#/console/21738858/462741871/preview?scrollOffset=71#project_console",
              },
            }),
          ]}
        >
          <View style={styles.rightView}>
            <Text
              style={[styles.sr_num, { color: assets.Colors.SAVE_EDIT_BG_CLR }]}
            >
              4.
            </Text>
            <Text
              style={[
                styles.stepsText,
                { color: assets.Colors.SAVE_EDIT_BG_CLR },
              ]}
            >
              Set up StayPut card
            </Text>
          </View>
          <View>
            <EvilIcons
              name="chevron-right"
              color={assets.Colors.SAVE_EDIT_BG_CLR}
              size={40}
            />
          </View>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
};
export default Profile_steps;
