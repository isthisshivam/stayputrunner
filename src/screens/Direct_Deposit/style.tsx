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
            topSpacer: {
                marginTop: dW(40)
            },

            space_vertical: {
                paddingVertical: dW(10)
            },
            logo: {
                marginTop: dW(20),
                height: dW(130),
                width: dW(130),
                alignSelf: 'center',
                resizeMode: 'contain',
            },
            row_content: {
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingHorizontal: dW(26),
                marginTop: dW(5)
            },
            txt: {
                color: assets.Colors.INPUT_TITLE_COLOR,
                fontSize: dW(13),
                fontFamily: assets.fonts.ROBOTO_REGULAR,
                textAlign: 'center',
            },
            bottom_content: {
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: dW(3)
            },
            bottomtxt: {
                color: assets.Colors.ACCOUNT_TXT_COLOR,
                fontSize: dW(13),
                fontFamily: assets.fonts.ROBOTO_REGULAR,
                textAlign: 'center',
            },
            colortxt: {
                color: assets.Colors.TERMS_CONDITION_COLOR,
                fontSize: dW(13),
                fontFamily: assets.fonts.ROBOTO_REGULAR,

            },
            buttn: {
                marginLeft: dW(35),
                marginRight: dW(35)
            },

        })
    )
}
export default useStyle;