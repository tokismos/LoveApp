import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
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

const Modal = ({ isVisible, setIsVisible }) => {
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

  useEffect(() => {
    if (isVisible) {
      //when we open it we show the modal
      top.value = Height - 150;
    } else {
      top.value = Height;
    }
  }, [isVisible]);
  return (
    <>
      {isVisible && (
        <TouchableOpacity
          style={styles.closeView}
          onPress={() => {
            setIsVisible(false);
          }}
        ></TouchableOpacity>
      )}
      <PanGestureHandler onGestureEvent={eventHandler}>
        <Animated.View style={[styles.modalView, modalStyle]}></Animated.View>
      </PanGestureHandler>
    </>
  );
};

export default Modal;

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
  closeView: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
});
