import { StyleSheet } from 'react-native';
import { dW } from '../../utils/dynamicHeightWidth';
import assets from '../../assets';

const useStyle = () => {
    return (
        StyleSheet.create({
            scrollContainer: {
                flex: 1,
                padding: dW(35),
            },

            title: {
                color: assets.Colors.ACCOUNT_TXT_COLOR,
                fontSize: dW(24),
                fontFamily: assets.fonts.ROBOTO_MEDIUM,
                textAlign: 'center',
                marginTop: dW(50),
            },
            Image: {
                marginTop: dW(20),
                alignSelf: 'center',
                height: dW(140),
                width: '90%',
                resizeMode: 'contain'
            },

            smallTxt: {
                color: assets.Colors.INPUT_TITLE_COLOR,
                fontSize: dW(17),
                fontFamily: assets.fonts.ROBOTO_REGULAR,
                textAlign: 'center',
                marginTop: dW(30),
            },
            buttn: {
                marginLeft: dW(35),
                marginRight: dW(35)
            },
            space:{
                marginTop:dW(15)
            }

        })
    )
}
export default useStyle;