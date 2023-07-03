import { StyleSheet } from 'react-native';
import { dW } from '../../utils/dynamicHeightWidth';
import assets from '../../assets';

const useStyle = () => {
    return (
        StyleSheet.create({
            scrollContainer: {
                flex: 1,
                paddingHorizontal: dW(30),
            },
            screenContainer: {
                marginTop: dW(30),
            },
            verify_id: {
                color: assets.Colors.ACCOUNT_TXT_COLOR,
                fontSize: dW(24),
                fontFamily: assets.fonts.ROBOTO_MEDIUM,
                textAlign: 'center'
            },
            smallTxt: {
                color: assets.Colors.INPUT_TITLE_COLOR,
                fontSize: dW(17),
                fontFamily: assets.fonts.ROBOTO_REGULAR,
                textAlign: 'center',
                marginTop: dW(20),
            },
            name_num: {
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: dW(20),
            },
            boltTxt: {
                color: assets.Colors.ACCOUNT_TXT_COLOR,
                fontSize: dW(17),
                fontFamily: assets.fonts.ROBOTO_MEDIUM,
                textAlign: 'center'
            },
            normal_txt: {
                color: assets.Colors.PRICE_DETAILS_CLR,
                fontSize: dW(17),
                fontFamily: assets.fonts.ROBOTO_REGULAR,
                textAlign: 'center'
            }


        })
    )
}
export default useStyle;