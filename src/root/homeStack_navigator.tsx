import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Items_details from "../screens/Item_Details";
import Scan_barcode from "../screens/Scan_Barcode";
import Item_found from "../screens/Item_Found";
import Transaction_history from "../screens/Transaction_History";
import Weekly_earn from "../screens/Weekly_Earning";
import Daily_earn from "../screens/Daily_Earning";
import Card_Scan from "../screens/Card_Scan";
import Pay_through from "../screens/Payment_Through";
import Receipt from "../screens/Receipt_Photo";
import Start_delivery from "../screens/Start_Delivery";
import Receipt_copy from "../screens/Receipt_Photocopy";
import Physical_card from "../screens/Physical_Card";
import Cvv from "../screens/Physical_Card_CVV";
import Apple_Otp from "../screens/Apple_Pay_Verification";
import Apple_process from "../screens/Apple_Pay_Processing";
import Pay_Added from "../screens/Apple_Pay_Added";
import Payment_Method from "../screens/Payment_Method";
import assets from "../assets";
import QuickNote from "../screens/QuickNote";
import LocationPermission from "../screens/Location_permission/Location_permission";
const Stack = createStackNavigator();

const Home_Stack = () => {
  return (
    <Stack.Navigator
      initialRouteName={assets.NavigationConstants.STACKS.HOME_STACK}
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen
        name={assets.NavigationConstants.ITEMS_DETAILS.NAME}
        component={Items_details}
      />

      <Stack.Screen
        name={assets.NavigationConstants.BARCODE_SCAN.NAME}
        component={Scan_barcode}
      />

      <Stack.Screen
        name={assets.NavigationConstants.ITEM_FOUND.NAME}
        component={Item_found}
      />

      <Stack.Screen
        name={assets.NavigationConstants.TRANSACTION_HISTORY.NAME}
        component={Transaction_history}
      />

      <Stack.Screen
        name={assets.NavigationConstants.WEEKLY_EARNING.NAME}
        component={Weekly_earn}
      />

      <Stack.Screen
        name={assets.NavigationConstants.DAILY_EARNING.NAME}
        component={Daily_earn}
      />

      <Stack.Screen
        name={assets.NavigationConstants.STAYPUT_CARD_SCAN.NAME}
        component={Card_Scan}
      />

      <Stack.Screen
        name={assets.NavigationConstants.PAYEMENT_GOING_THROUGH.NAME}
        component={Pay_through}
      />

      <Stack.Screen
        name={assets.NavigationConstants.RECEIPT_CHECK.NAME}
        component={Receipt}
      />

      <Stack.Screen
        name={assets.NavigationConstants.DELIVERY_START.NAME}
        component={Start_delivery}
      />

      <Stack.Screen
        name={assets.NavigationConstants.RECEIPT_PHOTOCOPY.NAME}
        component={Receipt_copy}
      />

      <Stack.Screen
        name={assets.NavigationConstants.PHYSICAL_CARD.NAME}
        component={Physical_card}
      />

      <Stack.Screen
        name={assets.NavigationConstants.CARD_CVV.NAME}
        component={Cvv}
      />

      <Stack.Screen
        name={assets.NavigationConstants.APPLE_PAY_OTP.NAME}
        component={Apple_Otp}
      />

      <Stack.Screen
        name={assets.NavigationConstants.APPLE_PAY_PROCESSING.NAME}
        component={Apple_process}
      />

      <Stack.Screen
        name={assets.NavigationConstants.APPLE_PAY_ADDED.NAME}
        component={Pay_Added}
      />
      <Stack.Screen
        name={assets.NavigationConstants.PAYMENT_METHOD.NAME}
        component={Payment_Method}
      />
      <Stack.Screen
        name={assets.NavigationConstants.LOCATION_PERMISSION.NAME}
        component={LocationPermission}
      />
      <Stack.Screen name="QuickNote" component={QuickNote}></Stack.Screen>
    </Stack.Navigator>
  );
};
export default Home_Stack;
