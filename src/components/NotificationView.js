import React, { useContext } from "react";
import {
  Button,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useEffect } from "react/cjs/react.development";
import { Context as moodContext } from "../context/moodContext";
import { setResponse } from "../helpers/db";
const NotificationView = ({ isNotifOpen, setIsNotifOpen, msg, children }) => {
  const {
    state: { Requests, LoverId },
  } = useContext(moodContext);

  const top = useSharedValue(-100);
  const animatedStyle = useAnimatedStyle(() => {
    return {
      top: withTiming(top.value),
    };
  });
  const closeNotif = () => {
    setIsNotifOpen(false);
  };

  useEffect(() => {
    if (isNotifOpen) {
      top.value = 40;
    } else {
      top.value = -100;
    }
  }, [isNotifOpen]);
  return (
    <>
      <Animated.View
        style={[
          {
            height: 50,
            left: 0,
            right: 0,
            position: "absolute",
            zIndex: 2,
            backgroundColor: "white",
            justifyContent: "center",
            margin: 10,
            borderRadius: 10,
          },
          animatedStyle,
        ]}
      >
        {children}
      </Animated.View>

      {isNotifOpen && (
        <TouchableWithoutFeedback
          onPress={() => {
            closeNotif();
          }}
        >
          <View style={[styles.container]}></View>
        </TouchableWithoutFeedback>
      )}
    </>
  );
};

export default NotificationView;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    left: 0,
    right: 0,
    height: "100%",
    zIndex: 1,
    justifyContent: "center",
  },
});
