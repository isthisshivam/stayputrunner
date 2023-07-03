import React from "react";
import { View, Text, FlatList, Pressable } from "react-native";
import useStyle from "./componentStyles";
import { useNavigation } from "@react-navigation/native";
import assets from "../../../assets";
import Feather from "react-native-vector-icons/Feather";

const styles = useStyle();
export const DailyEarnings_pannel = ({ data }) => {
  const { navigate } = useNavigation();
  const Items = (item) => (
    <Pressable
      onPress={() =>
        navigate(assets.NavigationConstants.DAILY_EARNING.NAME, {
          formated_date: item.formated_date,
          date: item.start_date,
        })
      }
      style={[styles.itemContainer, styles.border]}
    >
      <Text style={styles.day}>{item.start_date}</Text>
      <View style={styles.row}>
        <Text style={styles.price}>{item.earning}</Text>
        <Feather
          name={"chevron-right"}
          color={assets.Colors.SAVE_EDIT_BG_CLR}
          size={25}
          style={{ left: 5 }}
        />
      </View>
    </Pressable>
  );
  return (
    <Pressable style={styles.category_list}>
      <FlatList
        data={data}
        scrollEnabled={true}
        listKey={(item) => item.done}
        renderItem={({ item, index }) => Items(item)}
      />
    </Pressable>
  );
};
