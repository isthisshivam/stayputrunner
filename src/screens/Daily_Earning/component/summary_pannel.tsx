import React from 'react';
import { View, Text, Pressable, FlatList } from 'react-native';
import useStyle from './componentStyles';
import assets from '../../../assets';

const styles = useStyle();
export const Summary_pannel = ({ data }) => {
    const Items = (item) => (
        <View style={styles.cardView}>
            <View style={styles.titleSTyle}>
                <Text style={[styles.title, { fontFamily: assets.fonts.ROBOTO_REGULAR }]}>{item.title}</Text>
                <Text style={[styles.title, { fontFamily: assets.fonts.ROBOTO_MEDIUM }]}>{item.qty}</Text>
            </View>
            <View style={styles.details}>
                <Text style={styles.details_Txt}>StayPut Payment</Text>
                <Text style={styles.details_Txt}>{item.pay}</Text>
            </View>
            <View style={styles.details}>
                <Text style={styles.details_Txt}>Customer tips</Text>
                <Text style={styles.details_Txt}>{item.tip}</Text>
            </View>
            <View style={styles.details}>
                <Text style={styles.details_Txt}>Cashout fee</Text>
                <Text style={styles.details_Txt}>{item.fee}</Text>
            </View>
        </View>
    )
    return (
        <View style={styles.category_list}>
            <FlatList
                data={data}
                showsVerticalScrollIndicator={false}
                listKey={(item) => item.summary}
                renderItem={({ item, index }) => Items(item)}
            />
        </View>

    )

}