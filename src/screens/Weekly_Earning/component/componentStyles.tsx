import { StyleSheet } from 'react-native';
import { dW } from '../../../utils/dynamicHeightWidth';
import assets from '../../../assets';

const useStyle = () => {
    return StyleSheet.create({
        category_list: {
            flex: 1,
            marginTop: dW(20),
        },
        cardView: {
            backgroundColor: assets.Colors.BACKGROUND_THEME_COLOR,
            shadowColor: assets.Colors.SHADOW_COLOR,
            shadowOffset: { width: 1, height: 5 },
            shadowOpacity: 1,
            shadowRadius: 5,
            borderRadius: dW(6),
            elevation: 5,
            paddingVertical: dW(15),
            margin: dW(5),
        },
        titleSTyle: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderBottomWidth: dW(0.8),
            borderColor: assets.Colors.INACTIVE_STORE_BG_COLOR,
            padding: dW(15),

        },
        title: {
            fontSize: dW(17),
            color: assets.Colors.ACCOUNT_TXT_COLOR,
            textAlign: 'center'
        },
        details: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: dW(15),
            paddingVertical: dW(8)
        },
        details_Txt: {
            fontSize: dW(17),
            color: assets.Colors.PRICE_DETAILS_CLR,
            textAlign: 'center',
            fontFamily: assets.fonts.ROBOTO_REGULAR
        },


        itemContainer: {
            padding: dW(14),
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'space-between',
            backgroundColor:assets.Colors.BACKGROUND_THEME_COLOR
        },
        day: {
            fontSize: dW(17),
            fontFamily: assets.fonts.ROBOTO_REGULAR,
            color: assets.Colors.ACCOUNT_TXT_COLOR,
        },
        price: {
            fontSize: dW(17),
            fontFamily: assets.fonts.ROBOTO_MEDIUM,
            color: assets.Colors.ACCOUNT_TXT_COLOR,
        },
        row: {
            flexDirection: 'row',
            alignItems: 'center'
        },
        border: {
            borderBottomWidth: dW(0.8),
            borderColor: assets.Colors.INACTIVE_STORE_BG_COLOR
        }

    })
}
export default useStyle;