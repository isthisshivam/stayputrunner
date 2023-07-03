import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  Text,
  Pressable,
  FlatList,
  Alert,
  Platform,
} from "react-native";
import useStyle from "./style";
import assets from "../../assets";
import usePallete from "../../assets/Pallete";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import Header from "../../common_components/Header";
import SVG_View from "../../common_components/SVG_View";
import Feather from "react-native-vector-icons/Feather";
import {
  RUNNER_APPLY_PHYSICAL_CARD_AGAIN,
  RUNNER_PHYSICAL_CARD_LIST,
} from "../../Services/ApiUrls";
import { useRest, CALL_TYPES, LOADING_TYPES } from "../../Services/rest/api";
import Loader from "../../common_components/Loader";
import { dW } from "../../utils/dynamicHeightWidth";
import { showToastMessage } from "../../utils/utilities";
import {
  METHOD_DATA,
  DETAILS,
  OPTIONS,
} from "../../assets/Constants/Constants";
//import { PaymentRequest } from "react-native-payments";

const Payment_card_Android = ({ navigation }) => {
  const pallete = usePallete();
  const styles = useStyle();
  const { navigate } = useNavigation();
  const [physicalCards, setPhysicalCards] = useState([]);

  const { data, loading, error, fetchData, responseCode } = useRest({
    URL: RUNNER_PHYSICAL_CARD_LIST,
    PAYLOAD: {},
    CALL_TYPE: CALL_TYPES.POST,
    lazy: true,
  });
  useFocusEffect(
    React.useCallback(() => {
      const focus = fetchData(0);
      return () => focus;
    }, [])
  );
  useEffect(() => {
    console.log("data", JSON.stringify(data));
    if (responseCode == 200) {
      if (data) {
        setPhysicalCards(data?.data?.cards);
      }
    }
  }, [data, error, responseCode]);
  const {
    data: orderNewCardData,
    loading: orderNewCardLoading,
    error: orderNewCardError,
    fetchData: orderNewCardFetchData,
    responseCode: orderNewCardResponseCode,
  } = useRest({
    URL: RUNNER_APPLY_PHYSICAL_CARD_AGAIN,
    PAYLOAD: {},
    CALL_TYPE: CALL_TYPES.POST,
    lazy: true,
  });
  useEffect(() => {
    console.log("orderNewCardData==", orderNewCardData);
    if (orderNewCardData)
      if (orderNewCardResponseCode == 200) {
        setTimeout(() => {
          showToastMessage("You may receive your new card within 5 to 7 days.");
        }, 200);
        fetchData(0);
      }
  }, [orderNewCardData, orderNewCardError, orderNewCardResponseCode]);

  const orderNewCards = () => {
    orderNewCardFetchData(0);
  };
  // lets confrim for new card @d9n6
  const substantiate = () => {
    Alert.alert(
      "Order New Card",
      "Please confirm you want to order a new card?",
      [
        {
          text: "NO",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "YES", onPress: () => orderNewCards() },
      ],

      { cancelable: false }
    );
  };

  const onPhysicalCardClick = (card_id) => {
    global.universalObject.logEvent("Card Activation-Physical", {
      customData: {
        cardId: card_id,
        device: Platform.OS,
        URL: "https://projects.invisionapp.com/d/main#/console/21827194/462672145/preview#project_console",
      },
    });
    navigate(assets.NavigationConstants.STACKS.HOME_STACK, {
      screen: assets.NavigationConstants.PHYSICAL_CARD.NAME,
      params: { card_id: card_id },
    });
  };

  const onApplePayCardClick = () => {
    check();
  };
  const physicalCardsList = () => {
    return (
      <FlatList
        data={physicalCards}
        renderItem={renderPhysicalCard}
        style={{ paddingHorizontal: dW(20) }}
        contentInsetAdjustmentBehavior="always"
      ></FlatList>
    );
  };
  const renderPhysicalCard = ({ item }) => {
    const { card_name, card_number, cvv, card_id, active } = item;
    return (
      <Pressable
        onPress={() => [
          active && active == 0 ? onPhysicalCardClick(card_id) : null,
        ]}
        style={[styles.cardContainer, styles.top]}
      >
        <View style={styles.right}>
          <SVG_View
            width="50"
            height="50"
            path={assets.Images.CHECK_ROUTING_ICON}
          />
          <View style={styles.column}>
            <Text style={styles.cardName}>{"Physical Card"}</Text>
            {card_number && (
              <Text style={styles.subtitle}>
                {active == 0 ? card_number + ` (Activate)` : card_number}
              </Text>
            )}
          </View>
        </View>

        <Feather
          name={"chevron-right"}
          color={assets.Colors.SAVE_EDIT_BG_CLR}
          size={35}
          style={{ left: 5 }}
        />
      </Pressable>
    );
  };

  // const applePayButton = () => {
  //   return (
  //     <>
  //       <Pressable
  //         onPress={() => [onApplePayCardClick()]}
  //         style={[styles.cardContainer, styles.top, { paddingHorizontal: 20 }]}
  //       >
  //         <View style={styles.right}>
  //           <SVG_View
  //             width="50"
  //             height="50"
  //             path={assets.Images.CHECK_ROUTING_ICON}
  //           />
  //           <View style={styles.column}>
  //             <Text style={styles.cardName}>Apple Pay</Text>
  //             <Text style={styles.subtitle}>
  //               Activate StayPut's digital card now
  //             </Text>
  //           </View>
  //         </View>
  //         <Feather
  //           name={"chevron-right"}
  //           color={assets.Colors.SAVE_EDIT_BG_CLR}
  //           size={35}
  //           style={{ left: 5 }}
  //         />
  //       </Pressable>
  //     </>
  //   );
  // };
  return (
    <View
      style={{
        backgroundColor: assets.Colors.BACKGROUND_THEME_COLOR,
        flexDirection: "column",
        flex: 1,
      }}
    >
      <Header
        bg={assets.Colors.BACKGROUND_THEME_COLOR}
        icon={assets.Colors.ACCOUNT_TXT_COLOR}
        txt={assets.Colors.ACCOUNT_TXT_COLOR}
        shadow={true}
        event={() => navigation.openDrawer()}
        icon1="menu"
        title="Payment Card"
        icon2="help-circle-outline"
        ToolTipContent={assets.strings.paymentCard}
      />
      <View
        style={{
          backgroundColor: assets.Colors.WHITE,
        }}
      >
        <Loader
          isLoading={
            loading === LOADING_TYPES.LOADING ||
            orderNewCardLoading === LOADING_TYPES.LOADING
          }
        ></Loader>
        <Text style={styles.info}>
          Use your StayPut physical card or Apple Pay to pay for your customer's
          groceries.
        </Text>
        {physicalCardsList()}

        {/* {applePayButton()} */}
        <View
          style={[styles.spacer, { marginHorizontal: 20, marginTop: 30 }]}
        />
        <View style={{ paddingHorizontal: 30, marginTop: -10 }}>
          <Text
            style={[styles.new_card, styles.top]}
            onPress={() => substantiate()}
          >
            Order new card
          </Text>
        </View>
      </View>
    </View>
  );
};
export default Payment_card_Android;
