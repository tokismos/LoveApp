import React, { useEffect } from "react";
import { StyleSheet, TouchableWithoutFeedback, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
const NotificationView = ({ isNotifOpen, setIsNotifOpen, msg, children }) => {
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
      top.value = -200;
    }
  }, [isNotifOpen]);
  return (
    <>
      <Animated.View
        style={[
          {
            left: 0,
            right: 0,
            position: "absolute",
            zIndex: 2,
            backgroundColor: "white",
            justifyContent: "center",
            margin: 10,
            borderRadius: 10,
            borderWidth: 1,
            elevation: 20,
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
