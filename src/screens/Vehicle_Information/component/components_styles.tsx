import { StyleSheet, Platform } from 'react-native';
import { dW } from '../../../utils/dynamicHeightWidth';
import assets from '../../../assets';

const useStyle = () => {
    return StyleSheet.create({
        category_list: {
            flex: 1,
            marginTop: dW(20),
            alignItems: 'center',
        },
        cardView: {
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: assets.Colors.BACKGROUND_THEME_COLOR,
            borderRadius: dW(6),
            paddingVertical: dW(15),
            height: dW(80),
            width: dW(105),
            margin: dW(4),
            borderWidth: dW(0.8),
            ...Platform.select({
                ios: {
                    shadowColor: assets.Colors.SHADOW_COLOR,
                    shadowOffset: { width: 1, height: 5 },
                    shadowOpacity: 4,
                    shadowRadius: 10,
                },
                android: {
                    elevation: 2,
                },
                default: {
                    // other platforms, web for example

                }
            })
        },
        icons: {
            height: dW(30),
            width: dW(30),
            resizeMode: 'contain',
            alignSelf: 'center'
        },
        type: {
            fontFamily: assets.fonts.ROBOTO_REGULAR,
            fontSize: dW(14),
            textAlign: 'center',
            marginTop: dW(10),
        },
        clrList: {
            margin: 10,
            alignItems: 'center',
        },
        colorsContainer: {
            height: dW(31),
            width: dW(31),
            borderRadius: dW(15),
            borderWidth: dW(1),
            alignItems: 'center',
            justifyContent: 'center',
        },
        clr: {
            height: dW(25),
            width: dW(25),
            borderRadius: dW(15),
            alignSelf: 'center',
        },
        clrTxt: {
            fontFamily: assets.fonts.ROBOTO_REGULAR,
            color: assets.Colors.ACCOUNT_TXT_COLOR,
            fontSize: dW(12),
            textAlign: 'center',
            marginTop: dW(10),
        }

    })
}
export default useStyle;