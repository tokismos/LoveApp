import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  Button,
} from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { setRequest } from "../helpers/db";
import HistoryList from "./HistoryList";

const Width = Dimensions.get("window").width;

const TabView = ({ loverId }) => {
  const [tabPressed, setTabPressed] = useState(0);
  const left = useSharedValue(20);

  const buttonStyle = useAnimatedStyle(() => {
    return {
      left: withTiming(left.value, {
        duration: 500,
        easing: Easing.bezier(0.1, 0.1, 0.25, 1),
      }),
    };
  });

  const TabViewS = () => {
    if (tabPressed == 0) {
      return (
        <Button
          title="send love"
          onPress={() => setRequest("hiiwii", loverId)}
        />
      );
    } else {
      return <HistoryList />;
    }
  };
  return (
    <>
      <View style={styles.headerTab}>
        <Animated.View
          style={[
            {
              height: 25,
              backgroundColor: "#ec96a4",
              position: "absolute",
              borderRadius: 50,

              marginLeft: Width / 23,
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
            style={[
              styles.titleTab,
              { color: tabPressed == 0 ? "#dfe166" : "black" },
            ]}
          >
            Actions
          </Text>
        </TouchableOpacity>
        <View
          style={{
            height: 20,
            width: 1,
            backgroundColor: "black",
            marginTop: 15,
            zIndex: -2,
            opacity: 0.1,
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
            style={[
              styles.titleTab,
              { color: tabPressed == 1 ? "#dfe166" : "black" },
            ]}
          >
            History
          </Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          backgroundColor: "#9a9eab",
          height: 200,
          marginHorizontal: 20,
        }}
      >
        <TabViewS />
      </View>
    </>
  );
};

export default TabView;

const styles = StyleSheet.create({
  headerTab: {
    height: 50,
    borderRadius: 20,
    marginHorizontal: 20,
    marginTop: 10,
    flexDirection: "row",
  },
  titleTab: {
    alignSelf: "center",
    fontWeight: "bold",
  },
});
