import React from 'react';
import { View, Text, Pressable, FlatList } from 'react-native';
import useStyle from './components_styles';
import assets from '../../../assets';
const styles = useStyle();
export const Colors_pannel = ({ data, border, clr }) => {
    const Items = (item) => (
        <Pressable onPress={() => border(item.id)} style={styles.clrList} key={item.id} >
            <View style={[styles.colorsContainer, { borderColor: clr === item.id ? assets.Colors.BUTTON_THEME_COLOR : assets.Colors.COLORS_BORDER }]}>
                <View style={[styles.clr, { backgroundColor: item.color }]} />
            </View>
            <Text style={styles.clrTxt}>{item.name}</Text>
        </Pressable>
    )
    return (
        <View style={styles.category_list}>
            <FlatList
                data={data}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                scrollEnabled={true}
                renderItem={({ item, index }) => Items(item)}
            />
        </View>

    )

}