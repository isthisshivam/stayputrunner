import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  Text,
  Image,
  Modal,
  ActivityIndicator,
} from "react-native";
import useStyle from "./style";
import usePallete from "../../assets/Pallete";

import { ScrollView } from "react-native-virtualized-view";
import Back_Header from "../../common_components/Back_Header";
import assets from "../../assets";
import { Price_pannel } from "./component/price_details_pannel";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { dW } from "../../utils/dynamicHeightWidth";
import Barcode from "react-native-barcode-builder";
import { ORDER_RECEIPT } from "../../Services/ApiUrls";
import { useRest, CALL_TYPES, LOADING_TYPES } from "../../Services/rest/api";
import NoInternetView from "../../common_components/NoInternetView";
import moment from "moment";
import { priceConvert } from "../../utils/utilities";
const View_order = ({ route }) => {
  const pallete = usePallete();
  const styles = useStyle();

  const [items, setItems] = useState([]);

  const reciept_payload = {
    store: route?.params.store,
    order_id: route?.params.id,
  };

  const { data, loading, error, fetchData, responseCode } = useRest({
    URL: ORDER_RECEIPT,
    PAYLOAD: reciept_payload,
    CALL_TYPE: CALL_TYPES.POST,
    lazy: true,
  });

  useEffect(() => {
    console.log(items);
    setItems(data?.data?.items);
  }, [data, error, responseCode]);

  useEffect(() => {
    fetchData(0);
  }, []);

  return (
    <SafeAreaView style={[pallete.mainContainor]}>
      {error ? (
        <NoInternetView onRefresh={fetchData(0)} />
      ) : (
        <View style={[pallete.mainContainor]}>
          <Back_Header
            icon={"angle-left"}
            location={true}
            title="View Order"
            subtitle={`Order No. ${route?.params.id}`}
          />
          <ScrollView style={[pallete.screen_container]}>
            <View style={styles.store_content}>
              <View style={styles.rightContent}>
                <Image
                  source={{ uri: data?.data?.store?.store_image }}
                  style={styles.store_icon}
                />
                <Text
                  style={styles.store}
                >{`${data?.data?.store?.store_name}`}</Text>
              </View>
              <Text style={styles.items}>{`${data?.data?.items.length} ${
                data?.data?.items.length === 1 ? "item" : "items"
              }`}</Text>
            </View>
            {items?.map((_item) => {
              return (
                <View style={styles.cart_content}>
                  <View style={styles.rightContent}>
                    <Image
                      source={{ uri: _item.images[0] }}
                      style={styles.image}
                    />
                    <View style={styles.center_content}>
                      <Text numberOfLines={1} style={styles.titleTxt}>
                        {_item.product_name}
                      </Text>
                      <Text style={styles.priceTxt}>{_item.price}</Text>
                    </View>
                  </View>
                  <Text style={styles.qty}>Qty. {_item.qty}</Text>
                </View>
              );
            })}
            <View style={{ marginTop: dW(30) }}>
              <Price_pannel title="Subtotal" price={`$94.98`} total={false} />
              <Price_pannel title="Delivery Fee" price={`$25`} total={false} />
              <Price_pannel
                title="Service Fee"
                price={
                  data?.data?.service_fee &&
                  `$` + parseFloat(data?.data?.service_fee).toFixed(2)
                }
                total={false}
              />
              <FontAwesome5
                name="question-circle"
                color={assets.Colors.PRICE_DETAILS_CLR}
                size={dW(14)}
                style={{
                  position: "absolute",
                  zIndex: 1,
                  top: "31%",
                  left: "26%",
                  alignSelf: "center",
                }}
              />
              <Price_pannel
                title="Est. Tax"
                price={
                  data?.data?.tax &&
                  `$` + parseFloat(data?.data?.tax).toFixed(2)
                }
                total={false}
              />
              <Price_pannel
                title="Tip"
                price={
                  data?.data?.delivery_tip &&
                  `$` + priceConvert(data?.data?.delivery_tip)
                }
                total={false}
              />
              <Price_pannel
                title="Total"
                price={
                  data?.data?.total_price &&
                  `$` + priceConvert(data?.data?.total_price)
                }
                total={true}
              />
            </View>

            <View style={{ alignSelf: "center", marginTop: dW(10) }}>
              <View style={styles.center_contents}>
                <MaterialCommunityIcons
                  name={"credit-card-outline"}
                  color={assets.Colors.ACCOUNT_TXT_COLOR}
                  size={dW(23)}
                />
                <Text
                  numberOfLines={1}
                  style={styles.title}
                >{`**** - **** - **** - ${data?.data?.payment_details?.last4}`}</Text>
              </View>
              <View style={styles.center_contents}>
                <MaterialCommunityIcons
                  name={"cellphone-iphone"}
                  color={assets.Colors.ACCOUNT_TXT_COLOR}
                  size={dW(23)}
                />
                <Text
                  numberOfLines={1}
                  style={styles.title}
                >{`${data?.data?.phone_number}`}</Text>
              </View>
              <View style={styles.center_contents}>
                <MaterialCommunityIcons
                  name={"map-marker-outline"}
                  color={assets.Colors.ACCOUNT_TXT_COLOR}
                  size={dW(23)}
                />
                <View style={styles.column_content}>
                  <Text
                    numberOfLines={1}
                    style={styles.title}
                  >{`${data?.data?.delivery_address?.address}`}</Text>
                  <Text
                    style={styles.subtitle}
                  >{`${data?.data?.delivery_address?.city}, ${data?.data?.delivery_address?.state} ${data?.data?.delivery_address?.zip}`}</Text>
                </View>
              </View>
              <View style={styles.center_contents}>
                <MaterialCommunityIcons
                  name={"clock-time-four-outline"}
                  color={assets.Colors.ACCOUNT_TXT_COLOR}
                  size={dW(23)}
                />
                {data?.data.deleivery_time && (
                  <View style={styles.column_content}>
                    <Text numberOfLines={1} style={styles.title}>
                      {"Delivered"}
                    </Text>
                    {/* (data?.data?.orderTimestamp  */}
                    <Text style={styles.subtitle}>
                      {moment.unix(1653734041).format("MMMM D YYYY , h:mm a")}
                      {/* +`, ` + data?.data.deleivery_time} */}
                    </Text>
                  </View>
                )}
              </View>
            </View>

            <View
              style={{
                backgroundColor: assets.Colors.INACTIVE_STORE_BG_COLOR,
                padding: dW(15),
                marginTop: dW(30),
              }}
            >
              <Text
                style={styles.storeName}
              >{`${data?.data?.store?.store_name}`}</Text>
              <Text
                style={styles.num}
              >{`${data?.data?.store?.store_number}`}</Text>
              <Text
                style={styles.num}
              >{`${data?.data?.store?.store_person}`}</Text>
              <Text
                numberOfLines={2}
                style={[styles.num, { width: dW(150), alignSelf: "center" }]}
              >{`${data?.data?.store?.store_address}`}</Text>
              <View style={styles.cart_content}>
                <Text style={styles.small_txt}>DEWALT POLISHERS</Text>
                <Text style={styles.small_txt}>DWHWTR510</Text>
                <Text style={styles.small_txt}>25.55</Text>
                <Text style={styles.small_txt}>1</Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginTop: dW(10),
                  alignItems: "center",
                }}
              >
                <View></View>
                <View></View>
                <Text style={styles.sub_total}>SUBTOTAL</Text>
                <Text style={styles.sub_total}>$93.98</Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginTop: dW(10),
                  alignItems: "center",
                }}
              >
                <View></View>
                <Text style={styles.sub_total}>Tax #1</Text>
                <Text style={styles.sub_total}>7.89%</Text>
                <Text style={styles.sub_total}>7.42</Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginTop: dW(10),
                  alignItems: "center",
                }}
              >
                <View></View>
                <View></View>
                <Text style={styles.sub_total}>TOTAL</Text>
                <Text style={styles.sub_total}>$93.98</Text>
              </View>
              <Text style={styles.storeName}>
                # ITEMS SOLD {data?.data?.items.length}
              </Text>
              <Text style={styles.num}>TC# 0000 0000 0000 0000 0000</Text>
              <View style={{ marginTop: dW(10) }}>
                <Barcode
                  value={route?.params.id}
                  format="CODE128"
                  background={assets.Colors.INACTIVE_STORE_BG_COLOR}
                  height={dW(50)}
                />
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginTop: dW(10),
                  alignItems: "center",
                }}
              >
                <View></View>
                <Text style={styles.sub_total}>04/28/2023</Text>
                <Text style={styles.sub_total}>16:34</Text>
                <View></View>
              </View>
              <Text style={styles.num}>** CUSTOMER COPY **</Text>
            </View>
            <Modal
              visible={
                loading === LOADING_TYPES.LOADING ||
                loading === LOADING_TYPES.FETCHING_MORE
              }
              transparent={true}
            >
              <View style={[pallete.loader_View]}>
                <ActivityIndicator
                  size={"large"}
                  color={assets.Colors.WHITE}
                  style={[pallete.loader]}
                />
              </View>
            </Modal>
          </ScrollView>
        </View>
      )}
    </SafeAreaView>
  );
};
export default View_order;
