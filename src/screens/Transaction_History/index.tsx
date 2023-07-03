import React, { useState, useEffect } from "react";
import { SafeAreaView, View } from "react-native";
import useStyle from "./style";
import usePallete from "../../assets/Pallete";
import { useNavigation } from "@react-navigation/native";
import { Transaction_pannel } from "./component/transaction_pannel";
import Back_Header from "../../common_components/Back_Header";
import { RUNNER_WITHDRAW_EARNING } from "../../Services/ApiUrls";
import { useRest, CALL_TYPES, LOADING_TYPES } from "../../Services/rest/api";
import Loader from "../../common_components/Loader";
import assets from "../../assets";
import { getCurrentMonth } from "../../utils/utilities";
const Transaction_history = () => {
  const pallete = usePallete();
  const styles = useStyle();
  const { navigate } = useNavigation();
  const [isRefreshing, setRefreshing] = useState(false);

  const transaction_history_payload = {};
  const { data, loading, error, fetchData, responseCode } = useRest({
    URL: RUNNER_WITHDRAW_EARNING,
    PAYLOAD: transaction_history_payload,
    CALL_TYPE: CALL_TYPES.POST,
    lazy: false,
  });

  useEffect(() => {
    if (data) {
      if (responseCode == 200) {
        if (isRefreshing) setRefreshing(false);
      } else {
      }
    }
  }, [data, responseCode, error]);

  const onRefreshClick = () => {
    setRefreshing(true);
    fetchData(0);
  };

  return (
    <View style={[pallete.mainContainor]}>
      <Back_Header
        sub={true}
        icon1="arrow-left"
        title="Transaction History"
        subtitle={getCurrentMonth()}
        icon2="help-circle-outline"
        tooltipContent={assets.strings.transactionHistory}
      />
      <Loader isLoading={loading === LOADING_TYPES.LOADING}></Loader>

      <View style={styles.scrollContainer}>
        <Transaction_pannel
          refreshing={isRefreshing}
          onRefresh={onRefreshClick}
          data={data?.data}
        />
      </View>
    </View>
  );
};
export default Transaction_history;
