import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import assets from "../assets";
import Background from "../screens/Background_Check";
import Background_check_report from "../screens/Background_check_report";
import Deposit from "../screens/Direct_Deposit";
import Splash from "../screens/Splash/index";
import Auth_Stack from "../root/authStack_navigator";
import CompleteProfileStack from "../root/completeProfile_navigator";
import dashboard_stack from "../root/dash-navigator";
import Home_Stack from "../root/homeStack_navigator";
import orderView from "../screens/OrderView/index";
import Demo_screen from "../screens/Demo_Screen/index";
import Shipping_info from "../screens/Shipping_Information";
import Otp_verify from "../screens/Verify_Code";
import Qualification from "../screens/Qualification";
import Profile_steps from "../screens/Profile_Steps";
import License_verification from "../screens/License_Verification";
import Take_Selfie from "../screens/Selfie_Screen";
import Verified_dl from "../screens/Verified_License";
import Vehicle_Info from "../screens/Vehicle_Information";
import Stayput_card from "../screens/StayPut_Card";
import Bg_Copy from "../screens/BG_Check_Copy";
const Stack = createStackNavigator();
import Paper_work from "../screens/Paperwork";
import Bg_Info from "../screens/BG_Check_Info";
import On_WayCard from "../screens/Card_ONWay";
import User_Type from "../screens/User_Type";
import Web_view from "../screens/Webview_Link";

const Root = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name={assets.NavigationConstants.SPLASH.NAME}
          component={Splash}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={assets.NavigationConstants.QUALIFICATION_SCREEN.NAME}
          component={Qualification}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name={assets.NavigationConstants.OTP_SCREEN.NAME}
          component={Otp_verify}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name={assets.NavigationConstants.PROFILE_STEPS.NAME}
          component={Profile_steps}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name={assets.NavigationConstants.LICENSE_VERIFICATION.NAME}
          component={License_verification}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name={assets.NavigationConstants.TAKE_SELFIE.NAME}
          component={Take_Selfie}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name={assets.NavigationConstants.LICENSE_VERIFIED.NAME}
          component={Verified_dl}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name={assets.NavigationConstants.VEHICLE_INFORMATION.NAME}
          component={Vehicle_Info}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name={assets.NavigationConstants.PAPER_WORK.NAME}
          component={Paper_work}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name={assets.NavigationConstants.BG_CHECK_COPY.NAME}
          component={Bg_Copy}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name={assets.NavigationConstants.BG_CHECK_INFO.NAME}
          component={Bg_Info}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name={assets.NavigationConstants.CHECK_BACKGROUND.NAME}
          component={Background}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name={assets.NavigationConstants.DIRECT_DEPOSIT.NAME}
          component={Deposit}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name={assets.NavigationConstants.STAYPUT_CARD.NAME}
          component={Stayput_card}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name={assets.NavigationConstants.SHIPPING_INFO.NAME}
          component={Shipping_info}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name={assets.NavigationConstants.ON_WAY_CARD.NAME}
          component={On_WayCard}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name={assets.NavigationConstants.USER_TYPE.NAME}
          component={User_Type}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name={assets.NavigationConstants.WEBVIEW_LINK.NAME}
          component={Web_view}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name={assets.NavigationConstants.BACKCHECK_REPORT.NAME}
          component={Background_check_report}
        />
        <Stack.Screen
          name={assets.NavigationConstants.AUTH_STACK.NAME}
          component={Auth_Stack}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={assets.NavigationConstants.STACKS.COMPLETE_PROFILE_STACK}
          component={CompleteProfileStack}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={assets.NavigationConstants.DASHBOARD.NAME}
          component={dashboard_stack}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={assets.NavigationConstants.STACKS.HOME_STACK}
          component={Home_Stack}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={assets.NavigationConstants.ORDERVIEW.NAME}
          component={orderView}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={assets.NavigationConstants.DEMO_SCREEN.NAME}
          component={Demo_screen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default Root;
