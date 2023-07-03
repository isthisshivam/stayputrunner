import React, { useState } from 'react';
import {
    SafeAreaView,
    View,
    Text,
    Pressable,
    Modal,
    useWindowDimensions
} from 'react-native';
import assets from '../../assets';
import useStyle from './style'
import usePallete from '../../assets/Pallete';
import { useNavigation } from '@react-navigation/native';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import SVG_View from '../../common_components/SVG_View';
import Button from '../../common_components/Button';
import HTML from "react-native-render-html";
const Pay_Added = () => {
    const pallete = usePallete();
    const styles = useStyle();
    const { navigate } = useNavigation();
    const [modalVisible, setModalVisible] = useState(false);
    const html = `<h2>StayPut Runner</h2>
    <h3>Enjoy a webview-free and blazing fast application</h3>
    <img src="https://i.imgur.com/dHLmxfO.jpg?2" />
    <em style="textAlign: center;">Look at how happy this native cat is</em>`;
    const { width } = useWindowDimensions();

    return (
        <SafeAreaView style={[pallete.mainContainor]}>
            <ScrollView style={styles.scrollContainer} >
                <View style={styles.screenContainer}>
                    <SVG_View width="100" height="100" path={assets.Images.CHECK_ROUTING_ICON} />
                    <Text style={styles.title}>Set as Default Card in Wallet</Text>
                    <Text style={styles.smallTxt}>This card will be automatically selected when you use Apple Pay</Text>

                </View>
            </ScrollView>
            <View style={styles.bottom}>
                <Button imgBG={''} style={{}} txt={assets.Colors.BACKGROUND_THEME_COLOR} event={() => setModalVisible(true)} bgcolor={assets.Colors.BUTTON_THEME_COLOR} image={false} img={''} title="Use as Default Card" />
                <Text style={styles.not_now}>Not Now</Text>
            </View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.header}>Terms and Conditions</Text>
                        <HTML contentWidth={width} source={{ html }} />
                        <Text onPress={() => setModalVisible(false)} style={styles.diagree}>Disagree</Text>
                        <Text style={styles.agree}>Agree</Text>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    )
}
export default Pay_Added;