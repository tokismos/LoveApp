import React, { useContext, useState } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Dimensions,
  Image,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import * as ImagePicker from "expo-image-picker";
import ImgView from "../components/ImgView";
import { auth, getImgFile } from "../helpers/db";
import { Context as moodContext } from "../context/moodContext";
import SwitchStatus from "../components/SwitchStatus";
import Text from "../components/TextStyled";
import RightArrow from "../assets/icons/rightArrow.svg";
const Height = Dimensions.get("screen").height;
const Width = Dimensions.get("screen").width;

const Profile = () => {
  const [img, setImg] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const {
    state: { CurrentMood, ImgProfile, CurrentActivity },
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
      <LinearGradient colors={["#ec96a4", "#fff"]} style={styles.container}>
        {/* Begin--> show the image in the screen when pressed on */}
        {isVisible && (
          <Image
            source={{ uri: img || ImgProfile }}
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
          <View
            style={{
              marginHorizontal: 20,
              alignSelf: "stretch",
              paddingVertical: 20,
              borderRadius: 20,
            }}
          >
            <ImgView
              setIsVisible={setIsVisible}
              img={ImgProfile || null}
              style={{
                borderRadius: 75,
                alignSelf: "center",
                borderWidth: 1,
                borderColor: "white",
              }}
            />
          </View>
          <View
            style={{
              backgroundColor: "#EEEEEE",
              alignSelf: "stretch",
              flexDirection: "row",
              justifyContent: "space-between",
              borderRadius: 20,
              marginHorizontal: 20,
            }}
          >
            <SwitchStatus
              styles={{
                justifyContent: "space-between",
                flex: 1,
                margin: 20,
              }}
            />
          </View>
          <View
            style={{
              borderColor: "white",
              alignSelf: "stretch",
              padding: 10,
              backgroundColor: "#EEEEEE",
              paddingHorizontal: 20,
              marginVertical: 20,
            }}
          >
            <View style={{}}>
              <Text bold style={{ fontSize: 16 }}>
                My mood :
              </Text>
              <Text style={{ fontSize: 16, alignSelf: "center" }}>
                {CurrentMood}
              </Text>
            </View>
            <View
              style={{
                height: 1,
                backgroundColor: "white",
                marginHorizontal: -20,
                marginVertical: 10,
              }}
            />
            <Text
              bold
              style={{
                fontSize: 16,
                alignSelf: "flex-start",
              }}
            >
              My status :
            </Text>
            {CurrentActivity ? (
              <Text
                style={{ fontSize: 16, alignSelf: "center", marginBottom: 10 }}
              >
                {CurrentActivity}
              </Text>
            ) : (
              <Text>---</Text>
            )}
          </View>
          <View
            style={{
              borderRadius: 20,
              margin: 0,
              padding: 20,
              alignSelf: "stretch",
              marginHorizontal: 10,
            }}
          >
            <View>
              <TouchableOpacity
                onPress={() => pickImage()}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  borderWidth: 1,
                  borderColor: "#777",
                  padding: 30,
                  borderRadius: 10,
                  flex: 1,
                }}
              >
                <Text bold style={{ color: "black", fontSize: 16 }}>
                  Change my profile picture !
                </Text>
                <RightArrow height={10} width={10} fill="black" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={async () => await auth.signOut()}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  borderWidth: 1,
                  borderColor: "red",
                  justifyContent: "space-between",
                  margin: 10,
                  padding: 30,
                  borderRadius: 10,
                  flex: 1,
                }}
              >
                <Text bold style={{ color: "red", fontSize: 16 }}>
                  Log out !
                </Text>
                <RightArrow height={10} width={10} fill="red" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </LinearGradient>
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
    paddingTop: 40,
    alignItems: "center",
    justifyContent: "center",
  },

  botBackContainer: {
    flex: 1,
  },
  botContainer: {
    borderTopRightRadius: 75,
    borderRadius: 1,
  },
});
