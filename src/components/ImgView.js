import { BlurView } from "expo-blur";
import React from "react";
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from "react-native";
import {
  LongPressGestureHandler,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import Animated, {
  runOnJS,
  useAnimatedGestureHandler,
} from "react-native-reanimated";

const Height = Dimensions.get("screen").height;
const Width = Dimensions.get("screen").width;

const ImgView = ({ img, style, setIsVisible }) => {
  return (
    <View style={[styles.image, { ...style }]}>
      {img && (
        <TouchableHighlight
          activeOpacity={0.9}
          delayLongPress={300}
          onLongPress={() => setIsVisible(true)}
          onPressOut={() => setIsVisible(false)}
        >
          <Image
            style={{
              height: 150,
              width: 150,
              resizeMode: "contain",
            }}
            source={{ uri: img }}
          />
        </TouchableHighlight>
      )}
    </View>
    // <BlurView intensity={100} style={{ ...style }}>
    //   <Image
    //     style={{
    //       height: Height,
    //       width: Width,
    //       resizeMode: "contain",
    //     }}
    //     source={{ uri: imgUri }}
    //   />
    // </BlurView>
  );
};
export default ImgView;

const styles = StyleSheet.create({
  image: {
    justifyContent: "center",
    borderRadius: 20,
    alignItems: "center",
    overflow: "hidden",
    height: 150,
    width: 150,
    backgroundColor: "white",
  },
});
