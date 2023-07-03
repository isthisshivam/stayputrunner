import React, { useState, useEffect } from "react";
import { SafeAreaView, View, Text, RefreshControl } from "react-native";
import useStyle from "./style";
import usePallete from "../../assets/Pallete";
import { useNavigation } from "@react-navigation/native";
import { ScrollView } from "react-native-virtualized-view";
import { Summary_pannel } from "./component/summary_pannel";
import { RunsTiming_pannel } from "./component/runs_timing_pannel";
import Back_Header from "../../common_components/Back_Header";
import { RUNNER_DAILY_EARNING } from "../../Services/ApiUrls";
import { useRest, CALL_TYPES, LOADING_TYPES } from "../../Services/rest/api";
import Loader from "../../common_components/Loader";
import assets from "../../assets";
const Daily_earn = (props) => {
  const pallete = usePallete();
  const styles = useStyle();
  const [summaryData, setSummaryData] = useState([]);
  const { navigate } = useNavigation();
  const [isRefreshing, setRefreshing] = useState(false);

  const daily_earning_payload = {
    date: props?.route?.params?.formated_date,
  };
  const { data, loading, error, fetchData, responseCode } = useRest({
    URL: RUNNER_DAILY_EARNING,
    PAYLOAD: daily_earning_payload,
    CALL_TYPE: CALL_TYPES.POST,
    lazy: false,
  });

  useEffect(() => {
    console.log("data====", JSON.stringify(data));
    if (data) {
      if (responseCode == 200) {
        setRefreshing(false);
        let newData = [
          {
            title: "Runs",
            qty: data?.data?.total_run,
            pay: data?.data?.stayput_payment,
            fee: data?.data?.cashout_fee,
            tip: data?.data?.customer_tips,
          },
        ];
        summaryData.push(newData);
        setSummaryData(newData);
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
        title="Daily Earnings"
        subtitle={props?.route?.params?.date}
        icon2="help-circle-outline"
        tooltipContent={assets.strings.dailyEarning}
      />
      <Loader isLoading={loading === LOADING_TYPES.LOADING}></Loader>

      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={() => onRefreshClick()}
          />
        }
        style={styles.scrollContainer}
      >
        <Text style={styles.boldPrice}>
          {data ? `$` + data?.data?.total_earning : 0}
        </Text>
        <View style={styles.active_tym}>
          <Text style={styles.active}>Active time</Text>
          <Text style={styles.tym}>{data?.data?.active_time}</Text>
        </View>
        <Text style={[styles.active, styles.margin]}>Summary</Text>
        <Summary_pannel data={summaryData} />
        {data?.data?.daily_earning.length > 0 && (
          <Text style={[styles.active, styles.margin]}>Runs</Text>
        )}

        <RunsTiming_pannel data={data?.data?.daily_earning} />
      </ScrollView>
    </View>
  );
};
export default Daily_earn;
