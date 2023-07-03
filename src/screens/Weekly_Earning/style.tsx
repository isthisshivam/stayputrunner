import { StyleSheet } from 'react-native';
import { dW } from '../../utils/dynamicHeightWidth';
import assets from '../../assets';

const useStyle = () => {
    return (
        StyleSheet.create({
            scrollContainer: {
                flex: 1,
                paddingHorizontal: dW(20),
            },
            boldPrice: {
                fontFamily: assets.fonts.ROBOTO_BOLD,
                fontSize: dW(32),
                color: assets.Colors.ACCOUNT_TXT_COLOR,
                textAlign: 'center',
                marginTop: dW(30)
            },
            active_tym: {
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: dW(20)
            },
            active: {
                fontFamily: assets.fonts.ROBOTO_REGULAR,
                fontSize: dW(16),
                color: assets.Colors.PRICE_DETAILS_CLR,
            },
            tym: {
                fontFamily: assets.fonts.ROBOTO_MEDIUM,
                fontSize: dW(16),
                color: assets.Colors.ACCOUNT_TXT_COLOR,
                marginLeft: dW(5)
            },
            margin: {
                marginTop: dW(20)
            }

        })
    )
}
export default useStyle;