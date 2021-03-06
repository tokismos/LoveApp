import React, { useContext, useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Dimensions,
  ToastAndroid,
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
import { Context as MoodContext } from "../context/moodContext";
import sendNotification from "../helpers/sendNotification";
const SPRING_CONFIG = {
  damping: 80,
  overshootClamping: true,
  restDisplacementThreshold: 0.1,
  restSpeedThreshold: 0.1,
  stiffness: 500,
};
const Height = Dimensions.get("window").height;
const heightMinModal = Height / 5;

const moodSMiley = [
  { name: "Sick", mood: <Sick height={50} width={50} /> },
  { name: "Sad", mood: <Triste height={50} width={50} /> },
  { name: "Neutre", mood: <Neutre height={50} width={50} /> },
  { name: "Happy", mood: <Heureux height={50} width={50} /> },
  { name: "Love", mood: <Love height={50} width={50} /> },
];

const Modal = ({ isVisible, setIsVisible }) => {
  const height = useSharedValue(0);
  const [isBig, setIsBig] = useState(false);
  const {
    selectMood,
    state: { ExpoLoverNotif },
  } = useContext(MoodContext);
  const modalStyle = useAnimatedStyle(() => {
    return {
      height: withSpring(height.value, SPRING_CONFIG),
    };
  });
  const ShowMoodSmiley = () => {
    return moodSMiley.map((item) => (
      <TouchableOpacity
        onPress={() => {
          selectMood(
            item.name,
            sendNotification(ExpoLoverNotif, "Your partner changed his mood !")
          );
          ToastAndroid.show("Mood changed !", ToastAndroid.SHORT);

          setIsVisible(false);
        }}
        key={item.name}
      >
        {item.mood}
      </TouchableOpacity>
    ));
  };

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
            height.value = 0;
          }}
        >
          <View style={styles.closeView} />
        </TouchableWithoutFeedback>
      )}
      <PanGestureHandler onGestureEvent={eventHandler}>
        <Animated.View style={[styles.modalView, modalStyle]}>
          <View
            style={{
              height: 3,
              backgroundColor: "#777",
              marginTop: 10,
              width: 40,

              borderRadius: 20,
              alignSelf: "center",
            }}
          />
          <View style={styles.moodView}>
            <ShowMoodSmiley />
          </View>
          <View
            style={{
              height: 1,
              backgroundColor: "#777",
              marginTop: 10,
              width: "100%",

              borderRadius: 20,
              alignSelf: "center",
            }}
          />
          <ListMood setIsVisible={setIsVisible} />
        </Animated.View>
      </PanGestureHandler>
    </>
  );
};

export default Modal;

const styles = StyleSheet.create({
  moodView: {
    alignItems: "center",
    height: 120,
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 20,
  },
  modalView: {
    position: "absolute",
    backgroundColor: "white",
    bottom: 0,
    right: 0,
    left: 0,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 7,
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
