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
            card_num: {
                fontFamily: assets.fonts.ROBOTO_MEDIUM,
                fontSize: dW(17),
                marginTop: dW(30)
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
            }

        })
    )
}
export default useStyle;