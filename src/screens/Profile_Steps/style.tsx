import { Platform, StyleSheet } from 'react-native';
import { dW } from '../../utils/dynamicHeightWidth';
import assets from '../../assets';

const useStyle = () => {
    return (
        StyleSheet.create({
            scrollContainer: {
                flex: 1,
                paddingVertical: dW(25),
                paddingHorizontal:dW(20),
            },
            title: {
                color: assets.Colors.ACCOUNT_TXT_COLOR,
                fontSize: dW(24),
                fontFamily: assets.fonts.ROBOTO_MEDIUM,
                textAlign: 'center',
                marginTop: dW(30),
            },
            topMargin: {
                marginTop: dW(40)
            },
            cardView: {
                flexDirection: 'row',
                paddingVertical: dW(35),
                paddingHorizontal: dW(15),
                marginHorizontal:dW(5),
                alignItems: 'center',
                backgroundColor: assets.Colors.BACKGROUND_THEME_COLOR,
                // marginTop: dW(20),
                marginVertical: dW(10),
                borderRadius: dW(6),
                justifyContent: 'space-between',
                width: "97%",
                ...Platform.select({
                    ios: {
                        shadowColor: assets.Colors.SHADOW_COLOR,
                        shadowOffset: { width: 1, height: 5 },
                        shadowOpacity: 4,
                        shadowRadius: 10,
                    },
                    android: {
                        elevation: 5,
                       // shadowColor: assets.Colors.S,
                    },
                    default: {
                      // other platforms, web for example
                    }
                  })
            },
            rightView: {
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center'
            },
            sr_num: {
                fontSize: dW(17),
                fontFamily: assets.fonts.ROBOTO_MEDIUM,
            },
            stepsText: {
                marginLeft: dW(20),
                fontSize: dW(17),
                fontFamily: assets.fonts.ROBOTO_MEDIUM,
            },


        })
    )
}
export default useStyle;