import React from "react";
import { View, Text, Image, FlatList, Pressable } from "react-native";
import useStyle from "./componentStyles";
import { useNavigation } from "@react-navigation/native";
import assets from "../../../assets";

const styles = useStyle();
export const History_trans_pannel = ({ data }) => {
  const { navigate } = useNavigation();
  const Items = (item) => (
    <View style={styles.itemContainer}>
      <Text style={styles.day}>{item.date}</Text>
      <Text style={styles.price}>{`$` + item.transfer_amount}</Text>
    </View>
  );
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
        <Text style={styles.ti}>{"No Transactions Yet."}</Text>
      </View>
    );
  };
  return (
    <Pressable
      // onPress={() =>
      //   navigate(assets.NavigationConstants.STACKS.HOME_STACK, {
      //     screen: assets.NavigationConstants.TRANSACTION_HISTORY.NAME,
      //   })
      // }
      style={styles.category_list}
    >
      <FlatList
        ListEmptyComponent={() => Empty()}
        data={data}
        scrollEnabled={true}
        listKey={(item) => item.transfer_amount}
        renderItem={({ item, index }) => Items(item)}
      />
      {data?.length > 0 && (
        <Text
          onPress={() =>
            navigate(assets.NavigationConstants.STACKS.HOME_STACK, {
              screen: assets.NavigationConstants.TRANSACTION_HISTORY.NAME,
            })
          }
          style={styles.view_all}
        >
          View all
        </Text>
      )}
    </Pressable>
  );
};
