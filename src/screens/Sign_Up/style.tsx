import { StyleSheet } from 'react-native';
import { dW } from '../../utils/dynamicHeightWidth';
import assets from '../../assets';

const useStyle = () => {
    return (
        StyleSheet.create({
            center_content: {
                marginTop: dW(20),
                justifyContent: 'center'
            },
            logoStyle: {
                height: dW(70),
                width: dW(70),
                alignSelf: 'center'
            },
            title: {
                fontSize: dW(28),
                fontFamily: assets.fonts.ROBOTO_MEDIUM,
                color: assets.Colors.TITLE_COLOR,
                textAlign: 'center',
                marginTop: dW(10),
            },
            subtitle: {
                fontSize: dW(17),
                fontFamily: assets.fonts.ROBOTO_REGULAR,
                color: assets.Colors.SUB_TITLE_COLOR,
                textAlign: 'center',
                marginTop: dW(15),
            },
            accountSignin_View: {
                flexDirection: 'row',
                justifyContent: 'center',
                marginTop: dW(20),
            },
            hveAccnt: {
                fontSize: dW(13),
                fontFamily: assets.fonts.ROBOTO_REGULAR,
                color: assets.Colors.ACCOUNT_TXT_COLOR,
                alignSelf: 'center',
            },
            sign_in: {
                fontSize: dW(13),
                fontFamily: assets.fonts.ROBOTO_REGULAR,
                color: assets.Colors.SIGN_IN_COLOR,
                alignSelf: 'center',
                textDecorationLine: 'underline'
            },
            bttn_width: {
                marginTop: dW(10),
            
            },
            bttn: {
                marginTop: dW(10),
            },
            row_inputs_view: {
                flexDirection: 'row',
                justifyContent: 'space-between'
            },
            input_row: {
                width: '50%',
            },
            horizontal_spacer: {
                width: dW(10)
            },
            space_vertical: {
                paddingVertical: dW(10)
            },
            show: {
                fontSize: dW(14),
                fontFamily: assets.fonts.ROBOTO_REGULAR,
                color: assets.Colors.PLACEHOLDER_TEXT_COLOR,
                position: 'absolute',
                textAlign: 'center',
                right: dW(0),
                bottom: dW(20)
            },
            bottom_view: {
                flexDirection: 'column',
                alignSelf: 'flex-start',
            },

            bottom_row: {
                flexDirection: 'row',
                alignItems: 'center'
            },
            checked: {
                fontSize: dW(14),
                fontFamily: assets.fonts.ROBOTO_REGULAR,
                color: assets.Colors.BLACK_COLOR,
            },
            bottomTxt: {
                fontSize: dW(14),
                fontFamily: assets.fonts.ROBOTO_REGULAR,
                color: assets.Colors.ACCOUNT_TXT_COLOR
            },
            terms_condition: {
                fontSize: dW(14),
                fontFamily: assets.fonts.ROBOTO_REGULAR,
                color: assets.Colors.TERMS_CONDITION_COLOR,
                textAlign: 'auto',
                textDecorationLine: 'underline'
            }


        })
    )
}
export default useStyle;
