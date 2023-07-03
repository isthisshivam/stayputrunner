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

            runner: {
                color: assets.Colors.ACCOUNT_TXT_COLOR,
                fontSize: dW(24),
                fontFamily: assets.fonts.ROBOTO_MEDIUM,
                textAlign: 'center',
                marginTop: dW(50),
            },

            logo: {
                marginTop: dW(20),
                height: dW(130),
                width: dW(130),
                alignSelf: 'center',
                resizeMode: 'contain',
            },

            smallTxt: {
                color: assets.Colors.INPUT_TITLE_COLOR,
                fontSize: dW(17),
                fontFamily: assets.fonts.ROBOTO_REGULAR,
                textAlign: 'center',
                marginTop: dW(30),
            },

            buttn: {
                marginRight: dW(35),
                marginLeft: dW(35)
            }

        })
    )
}
export default useStyle;