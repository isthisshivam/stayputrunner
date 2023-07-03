import React from "react";
import { View, Text, Pressable, FlatList } from "react-native";
import useStyle from "./componentStyles";
import assets from "../../../assets";
import { useNavigation } from "@react-navigation/native";

const styles = useStyle();
export const RunsTiming_pannel = ({ data }) => {
  const { navigate } = useNavigation();
  const Items = (item) => (
    <View style={styles.cardView}>
      <View style={styles.titleSTyle}>
        <Text
          style={[styles.title, { fontFamily: assets.fonts.ROBOTO_REGULAR }]}
        >
          {item.time}
        </Text>
        <Text
          style={[styles.title, { fontFamily: assets.fonts.ROBOTO_MEDIUM }]}
        >
          {item.earning}
        </Text>
      </View>
      <View style={styles.details}>
        <Text style={styles.details_Txt}>Customer</Text>
        <Text style={styles.details_Txt}>{"Jiliana"}</Text>
      </View>
      <View style={styles.details}>
        <Text style={styles.details_Txt}>Store</Text>
        <Text style={styles.details_Txt}>{"Home Depot"}</Text>
      </View>
      <View style={styles.details}>
        <Text style={styles.details_Txt}>Distance</Text>
        <Text style={styles.details_Txt}>{"2.3 miles"}</Text>
      </View>
      <View style={styles.details}>
        <Text style={styles.details_Txt}>Tips</Text>
        <Text style={styles.details_Txt}>{`$` + item?.data?.tip}</Text>
      </View>
    </View>
  );
  return (
    <View style={styles.category_list}>
      <FlatList
        data={data}
        showsVerticalScrollIndicator={false}
        listKey={(item) => item.summary}
        renderItem={({ item, index }) => Items(item)}
      />
    </View>
  );
};
