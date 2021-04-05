import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { PanGestureHandler } from "react-native-gesture-handler";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedGestureHandler,
  withSpring,
  runOnJS,
} from "react-native-reanimated";

const SPRING_CONFIG = {
  damping: 80,
  overshootClamping: true,
  restDisplacementThreshold: 0.1,
  restSpeedThreshold: 0.1,
  stiffness: 500,
};
const Height = Dimensions.get("window").height;

const Profile = () => {
  const top = useSharedValue(Height);
  const [isBig, setIsBig] = useState(false);
  const modalStyle = useAnimatedStyle(() => {
    return {
      top: withSpring(top.value, SPRING_CONFIG),
    };
  });
  const eventHandler = useAnimatedGestureHandler({
    onStart: (event, ctx) => {
      ctx.value = top.value;
    },
    onActive: (event, ctx) => {
      if (top.value == 200 && event.translationY < 0) {
        //stoper le defilement vers le haut quand le modal est ouvert
        return;
      }
      top.value = ctx.value + event.translationY;
      console.log(event.translationY);
    },
    onEnd: (event, ctx) => {
      if (event.translationY < -Height / 5) {
        top.value = 200;
        runOnJS(setIsBig)(true);
      } else if (event.translationY > Height / 5) {
        top.value = Height - 150;
        runOnJS(setIsBig)(false);
      } else {
        if (isBig) {
          //pour retourner au state precedent du modal si on swipe une petite distance
          top.value = 200;
        } else {
          top.value = Height - 150;
        }
      }
    },
  });
  return (
    <>
      <View style={styles.container}>
        <View style={styles.topContainer}>
          <View style={styles.image}></View>
          <Text>hiii</Text>
        </View>
        <View style={styles.botBackContainer}>
          <View style={styles.botContainer}></View>
        </View>
        <TouchableOpacity
          style={styles.moodButton}
          onPress={() => (top.value = Height - 150)}
        ></TouchableOpacity>
        <PanGestureHandler onGestureEvent={eventHandler}>
          <Animated.View style={[styles.modalView, modalStyle]}></Animated.View>
        </PanGestureHandler>
      </View>
    </>
  );
};

export default Profile;

const styles = StyleSheet.create({
  modalView: {
    position: "absolute",
    backgroundColor: "black",
    bottom: 0,
    right: 0,
    left: 0,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  container: { flex: 1 },
  topContainer: {
    backgroundColor: "blue",
    height: Height / 2,
    alignItems: "center",
    justifyContent: "center",
    borderBottomLeftRadius: 70,
  },
  image: {
    height: 150,
    width: 150,
    borderRadius: 75,
    backgroundColor: "white",
  },
  botBackContainer: {
    backgroundColor: "blue",
    flex: 1,
  },
  botContainer: { borderTopRightRadius: 75, flex: 1, backgroundColor: "white" },
  moodButton: {
    position: "absolute",
    borderRadius: 25,
    height: 50,
    width: 50,
    right: 10,
    bottom: 10,
    backgroundColor: "green",
  },
  modal: {
    backgroundColor: "red",
    width: "100%",
  },
});
