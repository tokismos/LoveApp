import { setStatusBarBackgroundColor } from "expo-status-bar";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Button,
  Image,
} from "react-native";

import * as ImagePicker from "expo-image-picker";
import Animated, {
  Extrapolate,
  interpolate,
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import {
  LongPressGestureHandler,
  PanGestureHandler,
  TapGestureHandler,
} from "react-native-gesture-handler";
import { BlurView } from "expo-blur";

const Height = Dimensions.get("screen").height;
const Width = Dimensions.get("screen").width;

const imguri =
  "file:/data/user/0/host.exp.exponent/cache/ExperienceData/%2540anonymous%252FLoveApp-fd9bd671-2d63-4e5e-8ab0-dc5d0fa0605b/ImagePicker/2bfb696c-3230-4fff-8d97-c263b854fbcc.jpg";
const Profile = () => {
  const [img, setImg] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      return alert("Sorry, we need camera roll permissions to make this work!");
    }
    if (status == "granted") {
      console.log("granted");
    }
    console.log("hiiiiiiiiii");
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
      aspect: [1, 1],
    });

    console.log(result);

    if (!result.cancelled) {
      setImg(result.uri);
    }
  };

  const scale = useSharedValue(1);
  const translateX = useSharedValue(0);

  const eventHandler = useAnimatedGestureHandler({
    onStart: (event, ctx) => {
      runOnJS(setIsVisible)(true);
    },

    onFinish: (event, ctx) => {
      runOnJS(setIsVisible)(false);
    },
    onEnd: (event, ctx) => {
      runOnJS(setIsVisible)(false);
    },
  });

  //show the big image when we click on the small one
  const ImgView = () => {
    return (
      <BlurView
        intensity={100}
        style={[
          {
            position: "absolute",
            height: Height,
            width: Width,
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1,
            padding: 1,
          },
        ]}
      >
        <Image
          style={{
            height: Height,
            width: Width,
            resizeMode: "contain",
          }}
          source={{ uri: img }}
        />
      </BlurView>
    );
  };
  return (
    <>
      <View style={styles.container}>
        {isVisible && <ImgView />}
        <View style={styles.topContainer}>
          <View style={styles.image}>
            {img && (
              <LongPressGestureHandler
                maxDist={500}
                onGestureEvent={eventHandler}
              >
                <Animated.Image
                  style={{
                    height: 150,
                    width: 150,
                    resizeMode: "contain",
                  }}
                  source={{ uri: img }}
                />
              </LongPressGestureHandler>
            )}
          </View>
          <Button title="select Img" onPress={() => pickImage()} />
        </View>
        <View style={styles.botBackContainer}>
          <View style={styles.botContainer}></View>
        </View>
      </View>
    </>
  );
};

export default Profile;

const styles = StyleSheet.create({
  blurredImage: {
    width: 192,
    height: 192,
  },
  nonBlurredContent: {
    alignItems: "center",
    justifyContent: "center",
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
    justifyContent: "center",
    borderRadius: 20,
    alignItems: "center",
    overflow: "hidden",
    height: 150,
    width: 150,
    backgroundColor: "white",
  },
  botBackContainer: {
    backgroundColor: "blue",
    flex: 1,
  },
  botContainer: {
    borderTopRightRadius: 75,
    borderRadius: 1,

    backgroundColor: "yellow",
  },
});
