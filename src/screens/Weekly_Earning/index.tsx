import React, { useState, useEffect } from "react";
import { SafeAreaView, View, Text, RefreshControl } from "react-native";
import useStyle from "./style";
import usePallete from "../../assets/Pallete";
import { useNavigation } from "@react-navigation/native";
import { ScrollView } from "react-native-virtualized-view";
import { Summary_pannel } from "./component/summary_pannel";
import { DailyEarnings_pannel } from "./component/daily_earning_pannel";
import Back_Header from "../../common_components/Back_Header";
import { RUNNER_WEEK_EARNING } from "../../Services/ApiUrls";
import { useRest, CALL_TYPES, LOADING_TYPES } from "../../Services/rest/api";
import Loader from "../../common_components/Loader";
import moment from "moment";
import assets from "../../assets";
const Weekly_earn = (props) => {
  const pallete = usePallete();
  const styles = useStyle();
  const { navigate } = useNavigation();
  const [isRefreshing, setRefreshing] = useState(false);

  const weekely_earning_payload = {
    start_date: props.route.params.start_date,
    end_date: props.route.params.end_date,
  };
  const { data, loading, error, fetchData, responseCode } = useRest({
    URL: RUNNER_WEEK_EARNING,
    PAYLOAD: weekely_earning_payload,
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
        title="Weekly Earnings"
        subtitle={
          moment(weekely_earning_payload?.start_date).format("MMM D") +
          ` - ` +
          moment(weekely_earning_payload?.end_date).format("D")
        }
        icon2="help-circle-outline"
        tooltipContent={assets.strings.weekelyEarning}
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
        style={styles.scrollContainer}
      >
        <Text style={styles.boldPrice}>
          {data?.data?.week_summary?.weekly_total_earning}
        </Text>
        <View style={styles.active_tym}>
          <Text style={styles.active}>Active time</Text>
          <Text style={styles.tym}>
            {data?.data?.week_summary?.active_time}
          </Text>
        </View>
        {data?.data?.week_summary?.weekly_widhraw.legth > 0 && (
          <Text style={[styles.active, styles.margin]}>Summary</Text>
        )}
        <Summary_pannel
          title={data?.data?.week_summary?.run}
          data={data?.data?.week_summary?.weekly_widhraw}
        />
        <Text style={[styles.active, styles.margin]}>Daily Earnings</Text>
        <DailyEarnings_pannel data={data?.data?.weekly_earning} />
      </ScrollView>
    </View>
  );
};
export default Weekly_earn;
