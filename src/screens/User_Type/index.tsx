import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  Image,
  Pressable,
  TextInput,
  Animated,
  FlatList,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import useStyle from "./style";
import usePallete from "../../assets/Pallete";
import { dW, windowWidth } from "../../utils/dynamicHeightWidth";
import { ExpandingDot } from "react-native-animated-pagination-dots";
import FirstStep from "./components/first_step";
import SecondStep from "./components/second_step";
import ThirdStep from "./components/third_step";
import FourthStep from "./components/fourth_step";
import assets from "../../assets";

const UserType = () => {
  var scrollX = React.useRef(new Animated.Value(0)).current;

  const pallete = usePallete();
  const styles = useStyle();
  const { navigate } = useNavigation();

  const SLIDER_DATA = [
    <FirstStep onSelect={() => navigateToHome()} />,
    <SecondStep onSelect={() => navigateToHome()} />,
    <ThirdStep onSelect={() => navigateToHome()} />,
    <FourthStep onSelect={() => navigateToHome()} />,
  ];

  const navigateToHome = () => {
    navigate(assets.NavigationConstants.STACKS.HOME_STACK, {
      screen: assets.NavigationConstants.HOME_SCREEN.NAME,
    });
  };
  return (
    <SafeAreaView style={[pallete.mainContainor]}>
      <View style={styles.parentView}>
        <FlatList
          style={{ height: "85%", width: windowWidth() }}
          data={SLIDER_DATA}
          keyExtractor={(item, index) => item.key}
          showsHorizontalScrollIndicator={false}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            {
              useNativeDriver: false,
            }
          )}
          pagingEnabled
          horizontal
          decelerationRate={"normal"}
          scrollEventThrottle={16}
          renderItem={(item, index) => {
            return item.item;
          }}
        />
        <View style={{ height: "15%" }}>
          <ExpandingDot
            data={SLIDER_DATA}
            expandingDotWidth={10}
            scrollX={scrollX}
            inActiveDotOpacity={0.6}
            dotStyle={{
              width: 10,
              height: 10,
              backgroundColor: "#347af0",
              borderRadius: 5,
              marginHorizontal: 5,
            }}
            containerStyle={{
              // bottom: 30,
              top: 30,
            }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};
export default UserType;
