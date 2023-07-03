import React, { useEffect, useContext } from "react";
import User_Type from "../screens/User_Type";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Drawer_Content } from "../common_components/Drawer_Content";
import assets from "../assets";
import Dashboard from "../screens/Dashboard";
import shopping from "../screens/Shopping";
import Items_List from "../screens/Order_Items";
import Earning from "../screens/Earning_Cashout";
import Payment_card from "../screens/Payment_Card";
import Payment_card_Android from "../screens/PaymentCard_Android";
import Account_Edit from "../screens/Edit_Profile";
import Chatting from "../screens/Chatting";
import Order from "../screens/Orders";
import Payment_Method from "../screens/Payment_Method";
import Add_Payment_Method from "../screens/Add_payment_method";
import Bank_Information from "../screens/Bank_information";
import HowEarningWorks from "../screens/How_earning_works";
import LocationPermission from "../screens/Location_permission/Location_permission";
import { triggerPushNotification } from "../utils/PushNotification";
import { useNavigation } from "@react-navigation/native";
const Drawer = createDrawerNavigator();
export default () => {
  const navigation = useNavigation();
  useEffect(() => {
    triggerPushNotification(handleNotification);
  });
  const handleNotification = (notification, way) => {
    const { data } = notification;
    //handle  notifications
    if (way == 1) {
      navigateToSpecificRoute(data.action, data);
    }
  };

  const navigateToSpecificRoute = (whereToGo, notificationData) => {
    const { runnerId, customerId, userName, orderId } = notificationData;
    // navigation.navigate(assets.NavigationConstants.HOME_SCREEN.NAME);
    //#urgent Props
    if (whereToGo == assets.strings._chatting) {
      navigation.navigate(whereToGo, {
        runnerId: runnerId,
        customerId: customerId,
        orderId: orderId,
        userName: userName,
      });
    } else if (whereToGo == "new_order") {
      navigation.navigate(assets.NavigationConstants.HOME_SCREEN.NAME);
    } else if (whereToGo == "New") {
    }
  };

  return (
    <Drawer.Navigator
      initialRouteName={assets.NavigationConstants.DASHBOARD.NAME}
      drawerContent={(props) => <Drawer_Content {...props} />}
      screenOptions={{
        headerShown: false,
        drawerStyle: { width: "100%" },
      }}
    >
      <Drawer.Screen name="Dashboard" component={Dashboard} />
      <Drawer.Screen name="Chatting" component={Chatting} />
      <Drawer.Screen name="Order" component={Order} />

      <Drawer.Screen
        name="Payment_card_Android"
        component={Payment_card_Android}
      />
      <Drawer.Screen
        name={assets.NavigationConstants.SHOPPING.NAME}
        component={shopping}
      />

      <Drawer.Screen
        name={assets.NavigationConstants.ORDERS_ITEMS.NAME}
        component={Items_List}
      />

      <Drawer.Screen
        name={assets.NavigationConstants.EARNING_CASH_OUT.NAME}
        component={Earning}
      />

      <Drawer.Screen
        name={assets.NavigationConstants.PAYMENT_CARD.NAME}
        component={Payment_card}
      />

      <Drawer.Screen
        name={assets.NavigationConstants.EDIT_PROFILE.NAME}
        component={Account_Edit}
      />

      <Drawer.Screen
        name={assets.NavigationConstants.PAYMENT_METHOD.NAME}
        component={Payment_Method}
      />
      <Drawer.Screen
        name={assets.NavigationConstants.BANK_INFORMATION.NAME}
        component={Bank_Information}
      />
      <Drawer.Screen
        name={assets.NavigationConstants.ADD_PAYMENT_METHOD.NAME}
        component={Add_Payment_Method}
      />
      <Drawer.Screen
        name={assets.NavigationConstants.HOW_EARNING_WORKS.NAME}
        component={HowEarningWorks}
      />
      <Drawer.Screen
        name={assets.NavigationConstants.LOCATION_PERMISSION.NAME}
        component={LocationPermission}
      />
    </Drawer.Navigator>
  );
};
