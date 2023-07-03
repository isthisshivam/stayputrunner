import React from "react";
import { View, Text, Pressable, FlatList, Image } from "react-native";
import useStyle from "./components_styles";
import assets from "../../../assets";
import { dW } from "../../../utils/dynamicHeightWidth";
import { dH } from "../../../utils/dynamicHeightWidth";

const styles = useStyle();
const orientation = dW > dH ? "LANDSCAPE" : "PORTRAIT";
export const Vehicles_pannel = ({ data, clr, event }) => {
  const Items = ({ item, index }) => (
    <Pressable
      onPress={() => event(item.id)}
      style={[
        styles.cardView,
        {
          borderColor:
            clr == item.id
              ? assets.Colors.BUTTON_THEME_COLOR
              : assets.Colors.BACKGROUND_THEME_COLOR,
        },
      ]}
    >
      <Image
        source={item.icon}
        style={[
          styles.icons,
          {
            tintColor:
              clr == item.id
                ? assets.Colors.BUTTON_THEME_COLOR
                : assets.Colors.INPUT_TITLE_COLOR,
          },
        ]}
      />
      <Text
        style={[
          styles.type,
          {
            color:
              clr == item.id
                ? assets.Colors.BUTTON_THEME_COLOR
                : assets.Colors.INPUT_TITLE_COLOR,
          },
        ]}
      >
        {item.type}
      </Text>
    </Pressable>
  );
  return (
    <View style={styles.category_list}>
      <FlatList
        data={data}
        numColumns={orientation == "LANDSCAPE" ? 3 : 2}
        listKey={(item) => item.cars}
        scrollEnabled={false}
        renderItem={({ item, index }) => Items({ item, index })}
      />
    </View>
  );
};
