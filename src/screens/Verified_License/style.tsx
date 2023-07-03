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
                marginTop: dW(30),
                alignSelf: 'center',
                borderWidth: dW(3),
                borderRadius: dW(55),
                alignItems: 'center',
                padding: dW(30),
                borderColor: assets.Colors.BUTTON_THEME_COLOR
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
                marginRight: dW(35),

            }

        })
    )
}
export default useStyle;