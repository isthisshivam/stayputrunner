import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import assets from '../../../assets'
import { dW, windowWidth } from '../../../utils/dynamicHeightWidth';
import { useNavigation } from '@react-navigation/native';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import { WhichDelivery } from '../../../utils/enums';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

// import RadioGroup from 'react-native-radio-buttons-group';



export default () => {
    const navigation = useNavigation();

    const { navigate, goBack } = useNavigation();
    const [whicSelected, setWhichSelected] = useState(0)

    const selectedSchedule = () => {
        setWhichSelected(WhichDelivery.SCHEDULE)
        navigation.navigate(assets.NavigationConstants.USER_TYPE.TIME_SCHEDULE)
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{"When do you need \nyour delivery?"}</Text>
            <Text style={styles.subtitle}>(You can change this later)</Text>
            <Pressable style={styles.cardView}
                onPress={() => setWhichSelected(WhichDelivery.IMMEDIATE)}>

                <View style={styles.logoView}
                >

                    <RadioButton labelHorizontal={true}>
                        <RadioButtonInput
                            obj={{ label: 'param1', value: 0 }}
                            isSelected={whicSelected === WhichDelivery.IMMEDIATE}
                            onPress={() => setWhichSelected(WhichDelivery.IMMEDIATE)}
                            borderWidth={1}
                            buttonInnerColor={'#e74c3c'}
                            buttonOuterColor={'black'}
                            buttonSize={17}
                            buttonOuterSize={27}
                            buttonStyle={{}}
                            buttonWrapStyle={{ marginLeft: 10 }}
                        />

                    </RadioButton>

                    <FontAwesome name="bolt" color={assets.Colors.ACCOUNT_TXT_COLOR} size={20} style={{marginLeft:15,alignItem:'center',fontFamily:assets.fonts.ROBOTO_BOLD,tintColor:assets.Colors.BUTTON_THEME_COLOR}}/>
                    <Text style={styles.depotText}>1~2hrs</Text>

                </View>
                <View>
                    <Text style={styles.deliveryText}>Standard Delivery</Text>
                </View>

            </Pressable>
            <Pressable style={styles.cardView} onPress={selectedSchedule} >

                <View style={styles.logoView}>
                    <RadioButton labelHorizontal={true}  >
                        {/*  You can set RadioButtonLabel before RadioButtonInput */}
                        <RadioButtonInput
                            obj={{ label: 'param1', value: 0 }}
                            // index={i}
                            isSelected={whicSelected === WhichDelivery.SCHEDULE}
                            onPress={() => setWhichSelected(WhichDelivery.SCHEDULE)}

                            borderWidth={1}
                            buttonInnerColor={'#e74c3c'}
                            buttonOuterColor={'black'}
                            buttonSize={17}
                            buttonOuterSize={27}
                            buttonStyle={{}}
                            buttonWrapStyle={{ marginLeft: 10 }}
                        />

                    </RadioButton>
                    
                    <FontAwesome name="clock-o" color={assets.Colors.THEME_COLOR_PRIMARY} size={25} style={{marginLeft:15,alignItem:'center',fontFamily:assets.fonts.ROBOTO_BOLD, tintColor:assets.Colors.THEME_COLOR_PRIMARY}}/>
                    {/* <FontAwesome name="clock-o" color={assets.Colors.ACCOUNT_TXT_COLOR} size={25} style={{marginLeft:8,alignItem:'center',fontFamily:assets.fonts.ROBOTO_BOLD, tintColor:assets.Colors.BUTTON_THEME_COLOR}}/> */}
                </View>
                <View>
                    <Text style={styles.deliveryText}>Scheduled Delivery</Text>
                </View>

            </Pressable>

            <View style={styles.btnView}>
                <Text style={styles.btn}>Continue</Text>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        //justifyContent: 'center',
        width: windowWidth(),
        padding: dW(15),
        marginTop: dW(20)
    },
    cardView: {
        flexDirection: 'row',
        padding: dW(25),
        alignItem: 'center',
        backgroundColor: '#0000',
        marginTop: dW(20),
        shadowColor: assets.Colors.SHADOW_COLOR,
        shadowOffset: { width: 1, height: 0 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        borderRadius: dW(6),
        justifyContent: 'space-between',
        width: "100%",
        elevation:5
    },
    title: {
        fontSize: dW(30),
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
    logoStyle: {
        height: dW(50),
        width: dW(50),
        //alignSelf: 'center'
        //marginLeft: dW(15)
    },
    logoView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItem: 'center'
    },
    depotText: {
        marginLeft: dW(5),
        fontSize: dW(18),
        color: assets.Colors.BUTTON_THEME_COLOR,
        fontFamily:assets.fonts.ROBOTO_MEDIUM

    },
    deliveryText: {
        fontSize: dW(15),
        fontFamily: assets.fonts.ROBOTO_REGULAR,
        color:assets.Colors.INPUT_HOLDER_TXT_COLOR
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


})