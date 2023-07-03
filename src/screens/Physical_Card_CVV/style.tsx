import { StyleSheet } from 'react-native';
import { dW } from '../../utils/dynamicHeightWidth';
import assets from '../../assets';

const useStyle = () => {
    return (
        StyleSheet.create({
            scrollContainer: {
                flex: 1,
                paddingHorizontal: dW(25),
            },
            row: {
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
                marginTop: dW(30),
            },
            top_Txt: {
                fontFamily: assets.fonts.ROBOTO_REGULAR,
                fontSize: dW(17),
                color: assets.Colors.PRICE_DETAILS_CLR,
                marginLeft: dW(15)
            },
            card_num: {
                fontFamily: assets.fonts.ROBOTO_MEDIUM,
                fontSize: dW(17),
                marginTop: dW(30),
                color: assets.Colors.ACCOUNT_TXT_COLOR
            },
            top: {
                marginTop: dW(15)
            },
            input_view: {
                borderWidth: dW(0.8),
                borderRadius: dW(5),
                borderColor: assets.Colors.INPUT_BORDER_COLOR
            },
            input: {
                fontFamily: assets.fonts.ROBOTO_REGULAR,
                fontSize: dW(16),
                color: assets.Colors.ACCOUNT_TXT_COLOR,
                width: '90%',
                padding: dW(15)
            },

            centeredView: {
                flex: 1,
                backgroundColor: "rgba(52, 52, 52, 0.4)",
                justifyContent: 'center',

            },
            modalView: {
                padding: dW(30),
                backgroundColor: assets.Colors.BACKGROUND_THEME_COLOR,
                height: '40%',
                width: '90%',
                alignSelf: 'center',
                borderRadius: dW(10)
            },
            activate: {
                fontSize: dW(21),
                color: assets.Colors.ACCOUNT_TXT_COLOR,
                fontFamily: assets.fonts.ROBOTO_BOLD,
                textAlign: 'center'
            },
            circle: {
                alignSelf: 'center',
                borderRadius: dW(50),
                borderColor: assets.Colors.BUTTON_THEME_COLOR,
                borderWidth: dW(3),
                justifyContent: 'center',
                height: dW(100),
                width: dW(100),
                marginTop:dW(40)
            }

        })
    )
}
export default useStyle;