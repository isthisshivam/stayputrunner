import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import assets from "../assets";
import Sign_Up from "../screens/Sign_Up";
import Sign_in from "../screens/Login_Screen";
import Pass_forgot from "../screens/Forgot_Password";
import Otp_verify from "../screens/Verify_Code";
import Email_otp from "../screens/Forgot_Otp";
import Pass_reset from "../screens/Reset_Password";
import Web_view from "../screens/Webview_Link";
import Background from "../screens/Background_Check";

const Stack = createStackNavigator();

const Auth_Stack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {/* <Stack.Screen
        name={assets.NavigationConstants.BACKCHECK_REPORT.NAME}
        component={Background}
      /> */}
      <Stack.Screen
        name={assets.NavigationConstants.LOG_IN.NAME}
        component={Sign_in}
      />
      <Stack.Screen
        name={assets.NavigationConstants.FORGOT_PASSWORD.NAME}
        component={Pass_forgot}
      />
      <Stack.Screen
        name={assets.NavigationConstants.FORGOT_PASSWORD_OTP.NAME}
        component={Email_otp}
      />
      <Stack.Screen
        name={assets.NavigationConstants.RESET_PASSWORD.NAME}
        component={Pass_reset}
      />
      <Stack.Screen
        name={assets.NavigationConstants.OTP_SCREEN.NAME}
        component={Otp_verify}
      />
      <Stack.Screen
        name={assets.NavigationConstants.SIGN_UP.NAME}
        component={Sign_Up}
      />
      <Stack.Screen
        name={assets.NavigationConstants.WEBVIEW_LINK.NAME}
        component={Web_view}
      />
    </Stack.Navigator>
  );
};
export default Auth_Stack;
