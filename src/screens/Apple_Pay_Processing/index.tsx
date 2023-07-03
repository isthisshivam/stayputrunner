import React, { useState } from 'react';
import {
    SafeAreaView,
    View,
    Text,
    Image,
    Pressable,
    useWindowDimensions
} from 'react-native';
import assets from '../../assets';
import useStyle from './style'
import usePallete from '../../assets/Pallete';
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { dW } from '../../utils/dynamicHeightWidth';
import Header from '../../common_components/Header';

const Apple_process = () => {
    const pallete = usePallete();
    const styles = useStyle();
    const { navigate, goBack } = useNavigation();

    return (
        <View style={[pallete.mainContainor]}>
            <Header bg={assets.Colors.INPUT_HOLDER_TXT_COLOR} icon={assets.Colors.BACKGROUND_THEME_COLOR} txt={assets.Colors.BACKGROUND_THEME_COLOR} shadow={false} event={goBack} icon1="arrow-left" title="Apple Pay" icon2={null} />
            <ScrollView style={styles.scrollContainer} >
                <View style={styles.screenContainer}>
                    <Text style={styles.verify_id}>Adding card</Text>
                    <Text style={styles.smallTxt}>Contacting the card Issuer...</Text>
                    <FontAwesome name="spinner" color={assets.Colors.INPUT_HOLDER_TXT_COLOR} size={30} style={{ alignSelf: 'center', marginTop: dW(20) }} />
                    <View style={styles.name_num}>
                        <Text style={styles.boltTxt}>Name</Text>
                        <Text style={styles.normal_txt}>StayPut 4950</Text>
                        <View></View>
                    </View>
                    <Pressable onPress={() => navigate(assets.NavigationConstants.APPLE_PAY_ADDED.NAME)} style={styles.name_num}>
                        <Text style={styles.boltTxt}>Card number</Text>
                        <Text style={styles.normal_txt}>.... 4950</Text>
                        <View></View>
                    </Pressable>
                </View>
            </ScrollView>

        </View>
    )
}
export default Apple_process;