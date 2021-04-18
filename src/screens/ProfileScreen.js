import { setStatusBarBackgroundColor } from "expo-status-bar";
import React, { useContext, useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Button,
  Image,
  Switch,
} from "react-native";

import * as ImagePicker from "expo-image-picker";
import ImgView from "../components/ImgView";
import { auth, getImgFile } from "../helpers/db";
import { Context as moodContext } from "../context/moodContext";
import SwitchStatus from "../components/SwitchStatus";

const Height = Dimensions.get("screen").height;
const Width = Dimensions.get("screen").width;

const Profile = () => {
  const [img, setImg] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const {
    state: { CurrentMood, ImgProfile },
  } = useContext(moodContext);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      return alert("Sorry, we need camera roll permissions to make this work!");
    }
    if (status == "granted") {
      console.log("granted");
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 0.5,
      aspect: [1, 1],
    });

    if (!result.cancelled) {
      setImg(result.uri);
      getImgFile(result.uri);
    }
  };

  //show the big image when we click on the small one

  return (
    <>
      <View style={styles.container}>
        {/* Begin--> show the image in the screen when pressed on */}
        {isVisible && (
          <Image
            source={{ uri: ImgProfile }}
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
            img={ImgProfile}
            style={{ borderRadius: 75 }}
          />
          <SwitchStatus />

          <Button title="select Img" onPress={() => pickImage()} />
          <Button title="Log out" onPress={async () => await auth.signOut()} />
          <Text>Your current mood is {CurrentMood}</Text>
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
