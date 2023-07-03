import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  Pressable,
  Modal,
  FlatList,
  Image,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import assets from "../../assets";
import useStyle from "./style";
import usePallete from "../../assets/Pallete";
import Header from "../../common_components/Header";
import { useNavigation } from "@react-navigation/native";
import { ScrollView } from "react-native-virtualized-view";
import Button from "../../common_components/Button";
import { History_trans_pannel } from "./component/transaction_history_pannel";
import { Weekly_Earnings_pannel } from "./component/weekly_earning_pannel";
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import {
  RUNNER_EARNING,
  RUNNER_PAYMENT_METHODS,
  RUNNER_INSTANT_CASHOUT,
  RUNNER_INSTANT_CASHOUT_HELP,
} from "../../Services/ApiUrls";
import { useRest, CALL_TYPES, LOADING_TYPES } from "../../Services/rest/api";
import Loader from "../../common_components/Loader";
import { getCurrentMonth, showToastMessage } from "../../utils/utilities";
import Clipboard from "@react-native-clipboard/clipboard";
var bank_id = null;
const Earning = ({ navigation }) => {
  const pallete = usePallete();
  const styles = useStyle();
  const { navigate } = useNavigation();
  const [copyCode, setCopyCode] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [transfer, setTransfer] = useState(false);
  const [allBankAvailable, setAllBankAvailable] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const [paymentMethodList, setPaymentMethodList] = useState([]);
  const [instantCurrentBalance, setInstantCurrentBalance] = useState(0);
  const [transferUpto, setTransferUpto] = useState(0);
  const [isRefreshing, setRefreshing] = useState(false);
  const earning_pyload = {};

  const { data, loading, error, fetchData, responseCode } = useRest({
    URL: RUNNER_EARNING,
    PAYLOAD: earning_pyload,
    CALL_TYPE: CALL_TYPES.POST,
    lazy: false,
  });
  const copyToClipboard = (text) => {
    Clipboard.setString(text);
  };

  useEffect(() => {
    if (data) {
      if (responseCode == 200) {
        if (isRefreshing) setRefreshing(false);
      } else {
      }
    }
  }, [data, responseCode, error]);

  const {
    data: pm_data,
    loading: pm_loading,
    error: pm_error,
    fetchData: pm_fetchData,
    responseCode: pm_responseCode,
  } = useRest({
    URL: RUNNER_INSTANT_CASHOUT_HELP,
    PAYLOAD: {},
    CALL_TYPE: CALL_TYPES.POST,
    lazy: false,
  });
  useEffect(() => {
    if (pm_data) {
      const status = data.status;
      if (status == 200) {
        if (pm_data?.data.current_balance) {
          let split = pm_data?.data.current_balance.split("$");
          setInstantCurrentBalance(split[1]);
          getTransferUptoValue(split[1]);
        }
        setPaymentMethodList(pm_data?.data?.paymentmethods);
        console.log("payment==", pm_data?.data?.paymentmethods);
        if (pm_data?.data?.paymentmethods.length > 0) {
          if (!selectedPaymentMethod) {
            setSelectedPaymentMethod({
              bankName: pm_data?.data?.paymentmethods[0].bank_name,
              last4: pm_data?.data?.paymentmethods[0].last4,
              bank_id: pm_data?.data?.paymentmethods[0].id,
            });
            bank_id = pm_data?.data?.paymentmethods[0].id;
          }
        }
      }
    }
  }, [pm_error, pm_responseCode]);
  const cashout_payload = {
    transfer_amount: transferUpto,
    bank: bank_id,
  };
  const {
    data: cashout_data,
    loading: cashout_loading,
    error: cashout_error,
    fetchData: cashout_fetchData,
    responseCode: cashout_responseCode,
  } = useRest({
    URL: RUNNER_INSTANT_CASHOUT,
    PAYLOAD: cashout_payload,
    CALL_TYPE: CALL_TYPES.POST,
    lazy: true,
  });
  useEffect(() => {
    console.log(
      "RUNNER_INSTANT_CASHOUT Data==",
      cashout_responseCode,
      cashout_data,
      cashout_payload
    );
    if (cashout_data) {
      if (cashout_responseCode == 200) {
        setModalVisible(false);
        setTransfer(true);
        setTimeout(() => {
          setTransfer(false);
        }, 15000);
      }
    }
  }, [cashout_responseCode]);

  const onRefreshClick = () => {
    setRefreshing(true);
    fetchData(0);
  };
  const refferCode = (text) => {
    setCopyCode(true);
    setTimeout(() => {
      setCopyCode(false);
      copyToClipboard(text);
    }, 2000);
  };
  const makeCashout = () => {
    if (instantCurrentBalance != 0) {
      cashout_fetchData(0);
    } else {
      alert("Sorry Insufficient Balance!");
    }
  };
  const getTransferUptoValue = (value) => {
    if (value > 5000 || value == 50000) setTransferUpto(5000);
    else setTransferUpto(value);
  };

  const listItem = (item) => {
    const { account_holder_name, account_holder_type, bank_name, last4, id } =
      item;
    return (
      <TouchableOpacity
        onPress={() => [
          setSelectedPaymentMethod({
            bankName: bank_name,
            last4: last4,
            bank_id: id,
          }),
          (bank_id = id),
          setAllBankAvailable(false),
        ]}
        style={styles.list_item}
      >
        <View style={styles.list_item_content}>
          <Image style={styles.list_img} source={assets.Images.BANK}></Image>
          <View style={styles.list_item_row}>
            <Text style={styles.heading}>{bank_name}</Text>
            <Text style={styles.bank_no}>{`....` + last4}</Text>
          </View>
        </View>

        <FontAwesome5
          name={"chevron-right"}
          color={assets.Colors.SAVE_EDIT_BG_CLR}
          size={18}
          style={{ left: 5 }}
        />
      </TouchableOpacity>
    );
  };
  return (
    <View style={[pallete.mainContainor]}>
      <Header
        bg={assets.Colors.BACKGROUND_THEME_COLOR}
        icon={assets.Colors.ACCOUNT_TXT_COLOR}
        txt={assets.Colors.ACCOUNT_TXT_COLOR}
        shadow={true}
        event={() => navigation.openDrawer()}
        event2={() => navigation.navigate("HowEarningWorks")}
        icon1="menu"
        title="Earnings & Cashout"
        icon2="help-circle-outline"
        ToolTipContent={assets.strings.earningAndCashout}
      />
      <Loader isLoading={loading === LOADING_TYPES.LOADING}></Loader>

      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={() => onRefreshClick()}
          />
        }
        contentInsetAdjustmentBehavior="automatic"
        style={{
          flex: 1,
          backgroundColor: assets.Colors.INACTIVE_STORE_BG_COLOR,
        }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.scrollContainer}>
          <Text style={styles.current_blc}>Current balance</Text>
          <Text style={styles.bold_price}>{data?.data?.current_balance}</Text>
          <Text style={styles.will_recieve}>
            You will receive auto deposit every Friday
          </Text>
          <Button
            imgBG={""}
            style={styles.buttn}
            txt={assets.Colors.BACKGROUND_THEME_COLOR}
            event={() => setModalVisible(true)}
            bgcolor={assets.Colors.THEME_COLOR_PRIMARY}
            image={false}
            img={""}
            title="Instant cashout"
          />
          <Text style={styles.title}>{"Transaction History"}</Text>
          <History_trans_pannel data={data?.data?.transation_history} />
          <Text style={styles.title}>
            {getCurrentMonth() + ` | Weekly Earnings`}
          </Text>
          <Weekly_Earnings_pannel data={data?.data?.weekly_earnings} />
          <Pressable
            onPress={() =>
              refferCode(
                `Make up to $25 After referred runner compeletes first run. RX4P58XY`
              )
            }
            style={[
              styles.bottom_card,
              {
                backgroundColor:
                  copyCode == false
                    ? assets.Colors.INPUT_HOLDER_TXT_COLOR
                    : assets.Colors.BUTTON_THEME_COLOR,
              },
            ]}
          >
            <FontAwesome5
              name={"slideshare"}
              color={assets.Colors.BACKGROUND_THEME_COLOR}
              size={35}
              style={{}}
            />
            <View style={styles.column}>
              <Text style={styles.make_up}>Make up to $25</Text>
              <Text style={styles.complete}>
                After referred runner completes first run.
              </Text>
              <View style={styles.row}>
                <Text style={styles.code}>RX4P58XY</Text>
                <Text style={styles.make_up}>Copy</Text>
              </View>
            </View>
          </Pressable>
        </View>
      </ScrollView>
      <View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View style={styles.row}>
                <Ionicons
                  name={"ios-close"}
                  color={assets.Colors.BLACK_COLOR}
                  size={35}
                  onPress={() => setModalVisible(false)}
                />
                <Text style={styles.instant_Cash}>Instant Cashout</Text>
                <View></View>
              </View>
              <View style={[styles.row_center, styles.top]}>
                <Text style={styles.price}>{`$` + instantCurrentBalance}</Text>
                <FontAwesome5
                  name={"times-circle"}
                  color={assets.Colors.PRICE_DETAILS_CLR}
                  size={25}
                  style={{ alignSelf: "center", left: 10 }}
                />
              </View>
              <Text style={styles.will_recieve}>
                {`Transfer up to $` + transferUpto}
              </Text>
              {paymentMethodList.length > 0 && (
                <>
                  <View style={[styles.row_space, styles.top]}>
                    <Text
                      style={[
                        styles.rowTxt,
                        { fontFamily: assets.fonts.ROBOTO_REGULAR },
                      ]}
                    >
                      Instant cashout fee
                    </Text>
                    <Text
                      style={[
                        styles.rowTxt,
                        { fontFamily: assets.fonts.ROBOTO_MEDIUM },
                      ]}
                    >
                      {pm_data?.data?.transfer_fee}
                    </Text>
                  </View>
                  <Pressable
                    onPress={() => setAllBankAvailable(!allBankAvailable)}
                    style={styles.row_space}
                  >
                    <Text
                      style={[
                        styles.rowTxt,
                        { fontFamily: assets.fonts.ROBOTO_REGULAR },
                      ]}
                    >
                      Transfer to
                    </Text>
                    <Text
                      style={[
                        styles.rowTxt,
                        { fontFamily: assets.fonts.ROBOTO_REGULAR },
                      ]}
                    >
                      {selectedPaymentMethod?.bankName}
                    </Text>
                    <View style={styles.row_center}>
                      <Text
                        style={[
                          styles.rowTxt,
                          { fontFamily: assets.fonts.ROBOTO_MEDIUM },
                        ]}
                      >
                        {selectedPaymentMethod?.last4}
                      </Text>
                      <FontAwesome5
                        name={"chevron-right"}
                        color={assets.Colors.SAVE_EDIT_BG_CLR}
                        size={18}
                        style={{ left: 5 }}
                      />
                    </View>
                  </Pressable>
                </>
              )}

              {allBankAvailable && (
                <FlatList
                  ListHeaderComponent={() => (
                    <Text style={styles.txt}>
                      Choose another Bank to Cashout
                    </Text>
                  )}
                  contentContainerStyle={{ padding: 5 }}
                  data={paymentMethodList}
                  renderItem={({ item }) => listItem(item)}
                ></FlatList>
              )}
              {paymentMethodList.length > 0 ? (
                <Button
                  imgBG={""}
                  style={styles.transfer}
                  txt={assets.Colors.BACKGROUND_THEME_COLOR}
                  event={() => {
                    makeCashout();
                  }}
                  bgcolor={
                    instantCurrentBalance == 0
                      ? assets.Colors.INPUT_BORDER_COLOR
                      : assets.Colors.THEME_COLOR_PRIMARY
                  }
                  image={false}
                  img={""}
                  title={
                    instantCurrentBalance == 0
                      ? "Insufficient Balance"
                      : "Transfer"
                  }
                />
              ) : (
                <Text style={[styles.will_recieve, { marginTop: 200 }]}>
                  {"No Payment Method added Yet."}
                </Text>
              )}
            </View>
          </View>
        </Modal>
      </View>
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
                  setTransfer(false);
                }}
              />
              <View style={styles.center}>
                <FontAwesome5
                  name={"check"}
                  color={assets.Colors.SIGN_IN_COLOR}
                  size={35}
                  style={{ alignSelf: "center" }}
                />
              </View>
              <Text style={[styles.instant_Cash, styles.top]}>
                Transfer Initiated
              </Text>
              <Text
                style={[
                  styles.will_recieve,
                  { color: assets.Colors.INPUT_TITLE_COLOR },
                ]}
              >
                Transfer are reviewed which may result in delay or fund being
                frozen or removed from your StayPut account.
              </Text>
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
};
export default Earning;
