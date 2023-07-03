import React from "react";
import { View, Text, FlatList, Pressable } from "react-native";
import useStyle from "./componentStyles";
import { useNavigation } from "@react-navigation/native";
import assets from "../../../assets";
import Feather from "react-native-vector-icons/Feather";
import moment from "moment";
const styles = useStyle();
export const Weekly_Earnings_pannel = ({ data }) => {
  const { navigate } = useNavigation();
  const Items = (item) => (
    <Pressable
      onPress={() =>
        navigate(assets.NavigationConstants.STACKS.HOME_STACK, {
          screen: assets.NavigationConstants.WEEKLY_EARNING.NAME,
          params: {
            start_date: item.start_date,
            end_date: item.end_date,
            item,
          },
        })
      }
      style={[styles.itemContainer, styles.border]}
    >
      <Text style={styles.day}>
        {moment(item?.start_date).format("MMM D") +
          ` - ` +
          moment(item?.end_date).format("D")}
        {
          <Text
            style={[styles.day, { color: assets.Colors.PRICE_DETAILS_CLR }]}
          >
            {item.curr}
          </Text>
        }
      </Text>
      <View style={styles.row}>
        <Text style={styles.price}>{item.earning}</Text>
        <Feather
          name={"chevron-right"}
          color={assets.Colors.SAVE_EDIT_BG_CLR}
          size={25}
          style={{ left: 10 }}
        />
      </View>
    </Pressable>
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
        <Text style={styles.ti}>{"No Earning Yet."}</Text>
      </View>
    );
  };
  return (
    <Pressable style={styles.category_list}>
      <FlatList
        ListEmptyComponent={() => Empty()}
        data={data}
        scrollEnabled={true}
        listKey={(item) => item.done}
        renderItem={({ item, index }) => Items(item)}
      />
    </Pressable>
  );
};
