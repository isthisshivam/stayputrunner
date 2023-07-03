import { StyleSheet } from 'react-native';
import { dW } from '../../utils/dynamicHeightWidth';
import assets from '../../assets';

const useStyle = () => {
    return (
        StyleSheet.create({
            scrollContainer: {
                flex: 1,
                padding: dW(30),
            },
            title: {
                color: assets.Colors.ACCOUNT_TXT_COLOR,
                fontSize: dW(17),
                fontFamily: assets.fonts.ROBOTO_MEDIUM,
            },
        
                Image: {
                    marginTop: dW(20),
                    alignSelf: 'center',
                    height: dW(150),
                    width: '100%',
                    resizeMode: 'contain'
                },
          
            smallTxt: {
                color: assets.Colors.INPUT_HOLDER_TXT_COLOR,
                fontSize: dW(17),
                fontFamily: assets.fonts.ROBOTO_REGULAR,
                marginTop: dW(30),
            },
            buttn: {
                marginTop: dW(30),
            }

        })
    )
}
export default useStyle;