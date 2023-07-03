import { StyleSheet } from 'react-native';
import { dW } from '../../utils/dynamicHeightWidth';
import assets from '../../assets';

const useStyle = () => {
    return (
        StyleSheet.create({
            scrollContainer: {
                flex: 1,
                padding: dW(25),
            },
            itemContainer: {
                flexDirection: 'row',
                justifyContent: 'space-between',
            },
            image: {
                height: dW(90),
                width: dW(100),
                resizeMode: 'contain',
                alignSelf: 'center'
            },
            details: {
                flexDirection: 'row',
                alignItems: 'center',
                width: dW(180),
                justifyContent: 'space-between',
                marginLeft: dW(10)
            },
            qty: {
                fontSize: dW(15),
                fontFamily: assets.fonts.ROBOTO_BOLD,
                color: assets.Colors.ACCOUNT_TXT_COLOR,
            },
            brand: {
                fontSize: dW(15),
                fontFamily: assets.fonts.ROBOTO_BOLD,
                color: assets.Colors.INPUT_HOLDER_TXT_COLOR,
            },
            desc: {
                fontSize: dW(15),
                fontFamily: assets.fonts.ROBOTO_REGULAR,
                color: assets.Colors.INPUT_HOLDER_TXT_COLOR,

            },
            sku: {
                fontSize: dW(17),
                color: assets.Colors.ACCOUNT_TXT_COLOR,
                marginTop: dW(15)
            },
            column: {
                flexDirection: 'column',
                width: '50%',
                alignItems: 'center'
            },
            input: {
                borderBottomWidth: dW(0.8),
                borderColor: assets.Colors.INPUT_BORDER_COLOR,
                fontSize: dW(15),
                color: assets.Colors.ACCOUNT_TXT_COLOR,
                fontFamily: assets.fonts.ROBOTO_MEDIUM,
                paddingVertical: dW(5),
                width: '50%',
                alignSelf: 'flex-end',
            },


            remain: {
                fontSize: dW(17),
                color: assets.Colors.INPUT_HOLDER_TXT_COLOR,
                fontFamily: assets.fonts.ROBOTO_REGULAR,
                marginTop: dW(10),
                alignSelf: 'flex-end',
                textAlign: 'center'
            },
            buttn: {
                marginLeft: dW(30),
                marginRight: dW(30),
                bottom: dW(30)
            },



        })
    )
}
export default useStyle;