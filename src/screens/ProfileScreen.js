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
import ImgView from "../components/ImgView";
import { auth, getImgFile } from "../helpers/db";

const Height = Dimensions.get("screen").height;
const Width = Dimensions.get("screen").width;

const imguri =
  "file:/data/user/0/host.exp.exponent/cache/ExperienceData/%2540anonymous%252FLoveApp-fd9bd671-2d63-4e5e-8ab0-dc5d0fa0605b/ImagePicker/5b019173-61c4-4918-8470-9e4f09e23922.jpg";
const Profile = () => {
  console.log("screen profile rerendered");
  const [img, setImg] = useState(imguri);
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
      quality: 0.5,
      aspect: [1, 1],
    });

    console.log(result);

    if (!result.cancelled) {
      setImg(result.uri);
      getImgFile(result.uri);
    }
  };

  const scale = useSharedValue(1);
  const translateX = useSharedValue(0);

  //show the big image when we click on the small one
  console.log("this is img", img);
  return (
    <>
      <View style={styles.container}>
        {/* Begin--> show the image in the screen when pressed on */}
        {isVisible && (
          <Image
            source={{ uri: img }}
            style={{
              position: "absolute",
              height: Height,
              width: Width,
              justifyContent: "center",
              alignItems: "center",
              zIndex: 1,
              resizeMode: "contain",
            }}
          />
        )}
        {/* end */}
        <View style={styles.topContainer}>
          <ImgView
            setIsVisible={setIsVisible}
            img={img}
            style={{ borderRadius: 75 }}
          />
          <Button title="select Img" onPress={() => pickImage()} />
          <Button title="Log out" onPress={async () => await auth.signOut()} />
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
