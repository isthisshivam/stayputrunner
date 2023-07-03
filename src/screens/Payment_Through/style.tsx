import { StyleSheet } from 'react-native';
import { dW } from '../../utils/dynamicHeightWidth';
import assets from '../../assets';

const useStyle = () => {
    return (
        StyleSheet.create({
            scrollContainer: {
                flex: 1,
                padding: dW(30),
            },

            title: {
                color: assets.Colors.INPUT_HOLDER_TXT_COLOR,
                fontSize: dW(17),
                fontFamily: assets.fonts.ROBOTO_REGULAR,
            },
            Image: {
                marginTop: dW(30),
                alignItems: 'center',
            },
            boldTxt: {
                color: assets.Colors.ACCOUNT_TXT_COLOR,
                fontSize: dW(17),
                fontFamily: assets.fonts.ROBOTO_MEDIUM,
                marginTop: dW(30),
            },
            smallTxt: {
                color: assets.Colors.INPUT_HOLDER_TXT_COLOR,
                fontSize: dW(14),
                fontFamily: assets.fonts.ROBOTO_REGULAR,
                marginTop: dW(10),
            },
            buttn: {
                marginTop: dW(20),
                backgroundColor: assets.Colors.INACTIVE_STORE_BG_COLOR,
                alignItems: 'center',
                borderRadius: dW(6)
            },
            bttnTxt: {
                color: assets.Colors.INPUT_HOLDER_TXT_COLOR,
                fontSize: dW(16),
                fontFamily: assets.fonts.ROBOTO_REGULAR,
                paddingVertical: dW(15)
            },

        })
    )
}
export default useStyle;