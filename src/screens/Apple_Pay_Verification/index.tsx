import React, { useState } from 'react';
import {
    KeyboardAvoidingView,
    View,
    Text,
    Platform
} from 'react-native';
import assets from '../../assets';
import useStyle from './style'
import usePallete from '../../assets/Pallete';
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import Button from '../../common_components/Button';
import OTPTextInput from "react-native-otp-textinput";
import Header from '../../common_components/Header';

const Apple_Otp = () => {
    const pallete = usePallete();
    const styles = useStyle();
    const { navigate, goBack } = useNavigation();
    const [otp, setOtp] = useState()

    return (
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={[pallete.mainContainor]}>
            <Header bg={assets.Colors.INPUT_HOLDER_TXT_COLOR} icon={assets.Colors.BACKGROUND_THEME_COLOR} txt={assets.Colors.BACKGROUND_THEME_COLOR} shadow={false} event={goBack} icon1="arrow-left" title="Apple Pay" icon2={null} />
            <ScrollView style={styles.scrollContainer} >
                <View style={styles.screenContainer}>
                    <Text style={styles.verify_id}>Verify Your Identity</Text>
                    <Text style={styles.smallTxt}>Enter the 6-digit code we send to the phone number ending in 9581</Text>

                    <OTPTextInput defaultValue={""}
                        inputCount={6}
                        handleTextChange={e => setOtp(e)}
                        containerStyle={styles.otp_container}
                        textInputStyle={styles.otp_input}
                        tintColor={assets.Colors.INACTIVE_STORE_BG_COLOR}
                    />

                    <Text style={styles.resendCode}>Resend code</Text>
                </View>

            </ScrollView>
            <Button imgBG={''} style={styles.buttn} txt={assets.Colors.BACKGROUND_THEME_COLOR} event={() => navigate(assets.NavigationConstants.APPLE_PAY_PROCESSING.NAME)} bgcolor={assets.Colors.BUTTON_THEME_COLOR} image={false} img={''} title="Continue" />
        </KeyboardAvoidingView>
    )
}
export default Apple_Otp;