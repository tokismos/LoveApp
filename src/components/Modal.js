import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
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
import ListMood from "./ListMood";

import Triste from "../assets/moodIcons/triste.svg";
import Neutre from "../assets/moodIcons/neutre.svg";
import Sick from "../assets/moodIcons/sick.svg";
import Love from "../assets/moodIcons/love.svg";
import Heureux from "../assets/moodIcons/heureux.svg";
const SPRING_CONFIG = {
  damping: 80,
  overshootClamping: true,
  restDisplacementThreshold: 0.1,
  restSpeedThreshold: 0.1,
  stiffness: 500,
};
const Height = Dimensions.get("window").height;
const heightMinModal = Height / 5;
const Modal = ({ isVisible, setIsVisible }) => {
  const height = useSharedValue(0);
  const [isBig, setIsBig] = useState(false);

  const modalStyle = useAnimatedStyle(() => {
    return {
      height: withSpring(height.value, SPRING_CONFIG),
    };
  });

  const eventHandler = useAnimatedGestureHandler({
    onStart: (event, ctx) => {
      ctx.value = height.value;
    },
    onActive: (event, ctx) => {
      if (height.value >= Height - 200 && event.translationY < 0) {
        //stoper le defilement vers le haut quand le modal est ouvert
        return;
      }

      if (height.value <= heightMinModal && event.translationY > 0) {
        //stoper le defilement vers le haut quand le modal est ouvert
        return;
      }
      height.value = ctx.value - event.translationY;
      console.log(event.translationY);
    },
    onEnd: (event, ctx) => {
      if (event.translationY < -Height / 5) {
        height.value = Height - 200;
        runOnJS(setIsBig)(true);
      } else if (event.translationY > Height / 5) {
        height.value = 0;
        runOnJS(setIsBig)(false);
        runOnJS(setIsVisible)(false);
      } else {
        if (isBig) {
          //pour retourner au state precedent du modal si on swipe une petite distance
          height.value = Height - 200;
        } else {
          height.value = heightMinModal;
        }
      }
    },
  });

  useEffect(() => {
    if (isVisible) {
      //when we open it we show the modal
      height.value = heightMinModal;
    } else {
      height.value = 0;
    }
  }, [isVisible]);
  return (
    <>
      {isVisible && (
        <TouchableWithoutFeedback
          onPress={() => {
            setIsVisible(false);
          }}
        >
          <View style={styles.closeView}></View>
        </TouchableWithoutFeedback>
      )}
      <PanGestureHandler onGestureEvent={eventHandler}>
        <Animated.View style={[styles.modalView, modalStyle]}>
          <View style={styles.moodView}>
            <Sick height={50} width={50} />
            <Triste height={50} width={50} />
            <Neutre height={50} width={50} />
            <Heureux height={50} width={50} />
            <Love height={50} width={50} />
          </View>
          <ListMood />
        </Animated.View>
      </PanGestureHandler>
    </>
  );
};

export default Modal;

const styles = StyleSheet.create({
  moodView: {
    alignItems: "center",
    height: 150,
    flexDirection: "row",
    justifyContent: "space-between",
  },
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
    right: 0,
    left: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.2)",
  },
});
