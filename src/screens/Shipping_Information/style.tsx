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
            smallTxt: {
                color: assets.Colors.INPUT_TITLE_COLOR,
                fontSize: dW(17),
                fontFamily: assets.fonts.ROBOTO_REGULAR,
                textAlign: 'center',
                marginTop: dW(5),
            },
            topSpacer: {
                marginTop: dW(40)
            },
            row_inputs_view: {
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center'
            },
            input_row: {
                width: '45%',
            },
            horizontal_spacer: {
                width: dW(10)
            },
            space_vertical: {
                paddingVertical: dW(10)
            },
            buttn: {
                marginLeft: dW(35),
                marginRight: dW(35)
            },

        })
    )
}
export default useStyle;