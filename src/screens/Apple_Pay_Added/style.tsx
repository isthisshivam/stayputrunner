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
            screenContainer: {
                marginTop: dW(30),
                alignItems: 'center'
            },
            title: {
                color: assets.Colors.ACCOUNT_TXT_COLOR,
                fontSize: dW(24),
                fontFamily: assets.fonts.ROBOTO_MEDIUM,
                textAlign: 'center',
                marginTop: dW(30)
            },
            smallTxt: {
                color: assets.Colors.INPUT_TITLE_COLOR,
                fontSize: dW(17),
                fontFamily: assets.fonts.ROBOTO_REGULAR,
                textAlign: 'center',
                marginTop: dW(20),
            },
            bottom: {
                padding: dW(30),
            },
            not_now: {
                color: assets.Colors.BUTTON_THEME_COLOR,
                fontSize: dW(17),
                fontFamily: assets.fonts.ROBOTO_MEDIUM,
                textAlign: 'center',
                marginTop: dW(20)
            },


            centeredView: {
                flex: 1,
                backgroundColor: assets.Colors.MODAL_BACKGROUND_COLOR,
            },
            modalView: {
                flex: 1,
                marginTop: dW(50),
                padding: dW(20),
                backgroundColor: assets.Colors.BACKGROUND_THEME_COLOR,
                borderTopLeftRadius: dW(15),
                borderTopRightRadius: dW(15),
            },
            header: {
                color: assets.Colors.ACCOUNT_TXT_COLOR,
                fontSize: dW(21),
                fontFamily: assets.fonts.ROBOTO_MEDIUM,
                textAlign: 'center',
                marginTop: dW(10)
            },

            diagree: {
                color: assets.Colors.BUTTON_THEME_COLOR,
                fontSize: dW(17),
                fontFamily: assets.fonts.ROBOTO_MEDIUM,
                textAlign: 'center',
                position: 'absolute',
                zIndex: 1,
                bottom: 0,
                alignSelf: 'flex-start',
                padding: dW(40)
            },
            agree: {
                color: assets.Colors.BUTTON_THEME_COLOR,
                fontSize: dW(17),
                fontFamily: assets.fonts.ROBOTO_MEDIUM,
                textAlign: 'center',
                position: 'absolute',
                zIndex: 1,
                bottom: 0,
                alignSelf: 'flex-end',
                padding: dW(40)
            },



        })
    )
}
export default useStyle;