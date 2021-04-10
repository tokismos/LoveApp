import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";

import Triste from "../assets/moodIcons/triste.svg";

const Width = Dimensions.get("window").width;
const Height = Dimensions.get("window").height;

const Lover = () => {
  const left = useSharedValue(20);
  const right = useSharedValue(20);
  const [tabPressed, setTabPressed] = useState(0);

  const buttonStyle = useAnimatedStyle(() => {
    return {
      left: withTiming(left.value, {
        duration: 500,
        easing: Easing.bezier(0.1, 0.1, 0.25, 1),
      }),
    };
  });

  const TabView = () => {
    if (tabPressed == 0) {
      return <Text> TAB 0 Pressed</Text>;
    } else {
      return <Text>Tab 2 Pressed</Text>;
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <View style={styles.image}>
          <View
            style={{
              position: "absolute",
              borderRadius: 20,
              right: -10,
              bottom: 0,
              elevation: 5,
            }}
          >
            <Triste height={50} width={50} />
          </View>
        </View>
        <View
          style={{
            backgroundColor: "#f0f1f6",
            width: Width / 1.5,
            alignItems: "center",
            padding: 10,
            borderRadius: 20,
            marginTop: 30,
          }}
        >
          <Text>Khadija is HAPPY</Text>
        </View>
      </View>
      <View style={styles.botBackContainer}>
        <View style={styles.botContainer}>
          <View
            style={{
              height: 50,
              borderRadius: 20,
              marginHorizontal: 20,
              marginTop: 10,
              flexDirection: "row",
              backgroundColor: "red",
            }}
          >
            <Animated.View
              style={[
                {
                  height: 25,
                  backgroundColor: "#d4d4dc",
                  position: "absolute",
                  borderRadius: 50,

                  marginLeft: Width / 25,
                  width: Width / 4,
                  top: "25%",
                  zIndex: -1,
                },
                buttonStyle,
              ]}
            />
            <TouchableOpacity
              onPress={() => {
                setTabPressed(0);
                left.value = 20;
              }}
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  alignItems: "center",
                }}
              >
                Actions
              </Text>
            </TouchableOpacity>
            <View
              style={{
                height: 20,
                width: 1,
                backgroundColor: "white",
                marginTop: 15,
                zIndex: -2,
              }}
            />
            <TouchableOpacity
              onPress={() => {
                setTabPressed(1);
                left.value = Width / 2;
              }}
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  alignSelf: "center",
                }}
              >
                History
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              backgroundColor: "#d4d4dc",
              height: 200,
              marginHorizontal: 20,
            }}
          >
            <TabView />
          </View>
        </View>
      </View>
    </View>
  );
};

export default Lover;

const styles = StyleSheet.create({
  container: { flex: 1 },
  topContainer: {
    backgroundColor: "red",
    height: Height / 2,
    alignItems: "center",
    justifyContent: "center",
    borderBottomRightRadius: 70,
  },
  image: {
    height: 150,
    width: 150,
    borderRadius: 75,
    backgroundColor: "white",
  },
  botBackContainer: {
    backgroundColor: "red",
    flex: 1,
  },
  botContainer: { flex: 1, backgroundColor: "green" },
});
