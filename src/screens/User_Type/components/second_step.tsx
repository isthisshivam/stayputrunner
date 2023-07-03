import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, Pressable, Platform, Dimensions } from 'react-native';
import assets from '../../../assets'
import { dW, windowWidth } from '../../../utils/dynamicHeightWidth';
import { useNavigation } from '@react-navigation/native'
import MapView from 'react-native-maps';
import { TextInput } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';




export default () => {
    const navigation = useNavigation();

    const { navigate, goBack } = useNavigation();

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{"My delivery \naddress is..."}</Text>
            <Text style={styles.subtitle}>(Don't worry, you can change this later.)</Text>
            <View style={styles.mapview}>
                <MapView
                    style={styles.map}
                    mapType={Platform.OS == 'android' ? 'none' : 'standard'}
                    initialRegion={{

                        latitude: 37.785834,
                        longitude: -122.406417,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                    showsUserLocation={true}

                />

            </View>
            <View style={styles.addressView}>
                <Text style={styles.address}>Delivery Address</Text>
                <Pressable style={styles.textinput} onPress={() => navigation.navigate(assets.NavigationConstants.EDIT_DELIVERY_ADDRESS.NAME)}>
                    <Ionicons name="search-outline" color={assets.Colors.THEME_COLOR_PRIMARY} size={22} />
                    <TextInput style={styles.input} />
                </Pressable>
                <View style={styles.btnView}>
                    <Text style={styles.btn}>Continue</Text>
                </View>

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        width: windowWidth(),
        padding: dW(15),
        marginTop: dW(20)
    },
    title: {
        fontSize: dW(27),
        textAlign: 'center',
        marginTop: dW(40),
        fontFamily: assets.fonts.ROBOTO_MEDIUM,
        color: assets.Colors.ACCOUNT_TXT_COLOR
    },
    subtitle: {
        marginTop: dW(15),
        fontSize: dW(18),
        color: assets.Colors.PLACEHOLDER_TEXT_COLOR,
        textAlign: 'center',
        fontFamily: assets.fonts.ROBOTO_REGULAR
    },
    mapview: {
        width: "100%",
        backgroundColor: 'red',
        height: "30%",
        marginTop: dW(30),
        borderRadius: dW(10)
    },
    addressView: {
        width: "100%",
        marginTop: dW(10),
        padding: dW(15)
    },
    address: {
        fontSize: dW(15)
    },
    logoStyle: {
        height: dW(20),
        width: dW(20),
        //alignSelf: 'center'
        //marginLeft: dW(15)
    },
    textinput: {
        flexDirection: 'row',
        alignItems:'center',
        marginTop: dW(15),
        borderBottomWidth: 2,
        borderBottomColor: assets.Colors.BUTTON_THEME_COLOR,
        paddingBottom: dW(8)
    },
    input: {
        marginLeft: dW(12),
    },
    btnView: {
        marginTop: dW(30),
        padding: dW(20),
        backgroundColor: assets.Colors.BUTTON_THEME_COLOR
    },
    btn: {
        fontSize: dW(20),
        color: 'white',
        textAlign: 'center',
        fontFamily: assets.fonts.ROBOTO_BOLD
    },
    map: {
        // width: Dimensions.get('window').width,
        // height: Dimensions.get('window').height,
        width: "100%",
        height: "100%"
    },


})