import React from "react";
import { View, Text, Pressable, FlatList } from "react-native";
import useStyle from "./componentStyles";
import assets from "../../../assets";

const styles = useStyle();
export const Transaction_pannel = ({ data, refreshing, onRefresh }) => {
  const getTotalPrice = (a, b) => {
    let result = parseFloat(a) + parseFloat(b);
    return result.toFixed(2);
  };
  const getTransactionType = (value) => {
    if (value == "1") {
      return "WeekelyPayout";
    } else if (value == "2") {
      return "Instant Cashout";
    }
  };
  const Empty = () => {
    return (
      <View
        style={{
          height: 70,
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text style={styles.ti}>{"No Transaction Yet."}</Text>
      </View>
    );
  };
  const Items = (item) => (
    <View style={styles.cardView}>
      <View style={styles.titleSTyle}>
        <Text
          style={[styles.title, { fontFamily: assets.fonts.ROBOTO_REGULAR }]}
        >
          {item.date}
        </Text>
        <Text
          style={[styles.title, { fontFamily: assets.fonts.ROBOTO_MEDIUM }]}
        >
          {`$` + item.transfer_amount}
        </Text>
      </View>
      <View style={styles.details}>
        <Text style={styles.details_Txt}>{item.card_number}</Text>
        <Text style={styles.details_Txt}>
          {getTransactionType(item.transfer_type)}
        </Text>
      </View>
      <View style={styles.details}>
        <Text style={styles.details_Txt}>Cashout fee</Text>
        <Text style={styles.details_Txt}>{`$` + item.transfer_charges}</Text>
      </View>
      <View style={styles.details}>
        <Text style={styles.details_Txt}>StayPut payment</Text>
        <Text style={styles.details_Txt}>
          {`$` + getTotalPrice(item.transfer_amount, item.transfer_charges)}
        </Text>
      </View>
      <View style={styles.details}>
        <Text style={styles.details_Txt}>Tips</Text>
        <Text style={styles.details_Txt}>{item.tip}</Text>
      </View>
    </View>
  );
  return (
    <View style={styles.category_list}>
      <FlatList
        refreshing={refreshing}
        onRefresh={onRefresh}
        data={data}
        ListEmptyComponent={() => Empty()}
        showsVerticalScrollIndicator={false}
        scrollEnabled={true}
        contentInsetAdjustmentBehavior="automatic"
        renderItem={({ item, index }) => Items(item)}
      />
    </View>
  );
};
