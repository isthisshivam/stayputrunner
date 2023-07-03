import React from "react";
import { View, Text, Image, FlatList, Pressable } from "react-native";
import useStyle from "./componentStyles";
import { useNavigation } from "@react-navigation/native";
import assets from "../../../assets";

import moment from "moment";
const styles = useStyle();
export const Items_pannel = ({ data, customer_name, touchable }) => {
  const navigation = useNavigation();
  const Items = (item) => (
    <Pressable
      onPressIn={() =>
        touchable &&
        navigation.navigate(assets.NavigationConstants.STACKS.HOME_STACK, {
          screen: assets.NavigationConstants.ITEMS_DETAILS.NAME,
          params: { item, customer_name },
        })
      }
    >
      <Text style={styles.title}>{item?.category_name}</Text>
      <View style={styles.itemContainer}>
        <Image
          source={
            item?.images.length > 0
              ? { uri: item?.images.length > 0 && item?.images[0] }
              : null
          }
          style={styles.image}
        />
        <View style={styles.details}>
          <Text style={styles.qty}>
            {item && item?.qty + `x `}
            {
              <Text style={styles.brand}>
                {item?.brand}
                {<Text style={styles.desc}>{item && item?.product_name}</Text>}
              </Text>
            }
          </Text>
        </View>
        <View></View>
      </View>
    </Pressable>
  );
  const Empty = () => {
    return (
      <View style={styles.empty_c}>
        <Text style={styles.item_done}>No Item Found</Text>
      </View>
    );
  };
  return (
    <View style={styles.category_list}>
      <FlatList
        data={data}
        ListEmptyComponent={() => Empty()}
        scrollEnabled={true}
        //  listKey={(item) => item.orders}
        listKey={moment().valueOf().toString()}
        renderItem={({ item, index }) => Items(item)}
        keyExtractor={(item, index) => `_key${index.toString()}`}
      />
    </View>
  );
};
