import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import assets from "../assets";
import User_Type from "../screens/User_Type";
import TimeSchedule from "../screens/User_Type/components/schedule";
import Qualification from "../screens/Qualification";
import Profile_steps from "../screens/Profile_Steps";
import License_verification from "../screens/License_Verification";
import Take_Selfie from "../screens/Selfie_Screen";
import Verified_dl from "../screens/Verified_License";
import Vehicle_Info from "../screens/Vehicle_Information";
import Paper_work from "../screens/Paperwork";
import Bg_Copy from "../screens/BG_Check_Copy";
import Bg_Info from "../screens/BG_Check_Info";
import Background from "../screens/Background_Check";
import Deposit from "../screens/Direct_Deposit";
import Stayput_card from "../screens/StayPut_Card";
import Shipping_info from "../screens/Shipping_Information";
import On_WayCard from "../screens/Card_ONWay";
import Web_view from "../screens/Webview_Link";
import Background_check_report from "../screens/Background_check_report";
const Stack = createStackNavigator();

const Auth_Stack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name={assets.NavigationConstants.QUALIFICATION_SCREEN.NAME}
        component={Qualification}
      />

      <Stack.Screen
        name={assets.NavigationConstants.PROFILE_STEPS.NAME}
        component={Profile_steps}
      />

      <Stack.Screen
        name={assets.NavigationConstants.LICENSE_VERIFICATION.NAME}
        component={License_verification}
      />

      <Stack.Screen
        name={assets.NavigationConstants.TAKE_SELFIE.NAME}
        component={Take_Selfie}
      />

      <Stack.Screen
        name={assets.NavigationConstants.LICENSE_VERIFIED.NAME}
        component={Verified_dl}
      />

      <Stack.Screen
        name={assets.NavigationConstants.VEHICLE_INFORMATION.NAME}
        component={Vehicle_Info}
      />

      <Stack.Screen
        name={assets.NavigationConstants.PAPER_WORK.NAME}
        component={Paper_work}
      />

      <Stack.Screen
        name={assets.NavigationConstants.BG_CHECK_COPY.NAME}
        component={Bg_Copy}
      />

      <Stack.Screen
        name={assets.NavigationConstants.BG_CHECK_INFO.NAME}
        component={Bg_Info}
      />

      <Stack.Screen
        name={assets.NavigationConstants.CHECK_BACKGROUND.NAME}
        component={Background}
      />

      <Stack.Screen
        name={assets.NavigationConstants.DIRECT_DEPOSIT.NAME}
        component={Deposit}
      />
      <Stack.Screen
        name={assets.NavigationConstants.STAYPUT_CARD.NAME}
        component={Stayput_card}
      />

      <Stack.Screen
        name={assets.NavigationConstants.SHIPPING_INFO.NAME}
        component={Shipping_info}
      />

      <Stack.Screen
        name={assets.NavigationConstants.ON_WAY_CARD.NAME}
        component={On_WayCard}
      />

      <Stack.Screen
        name={assets.NavigationConstants.USER_TYPE.NAME}
        component={User_Type}
      />

      <Stack.Screen
        name={assets.NavigationConstants.USER_TYPE.TIME_SCHEDULE}
        component={TimeSchedule}
      />

      <Stack.Screen
        name={assets.NavigationConstants.WEBVIEW_LINK.NAME}
        component={Web_view}
      />
      <Stack.Screen
        name={assets.NavigationConstants.BACKCHECK_REPORT.NAME}
        component={Background_check_report}
      />
    </Stack.Navigator>
  );
};
export default Auth_Stack;
