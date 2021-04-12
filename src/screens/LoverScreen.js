import React, { useState } from "react";
import { StyleSheet, Text, View, Dimensions, Image } from "react-native";

import Triste from "../assets/moodIcons/triste.svg";
import Bouquet from "../assets/bouquet.svg";
import ImgView from "../components/ImgView";
import TabView from "../components/TabView";

const Width = Dimensions.get("window").width;
const Height = Dimensions.get("window").height;
const imguri =
  "file:/data/user/0/host.exp.exponent/cache/ExperienceData/%2540anonymous%252FLoveApp-fd9bd671-2d63-4e5e-8ab0-dc5d0fa0605b/ImagePicker/4cff5c73-1da6-4fe4-a3c4-67665c896811.jpg";
const Lover = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [img, setImg] = useState(imguri);

  return (
    <View style={styles.container}>
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
      <View style={styles.topContainer}>
        {/* Begin--->the circle showing the status in the top left */}
        <View style={styles.statusContainer}>
          <View style={styles.statusCircle} />
        </View>
        {/* end */}

        {/* Begin-->the background images  */}
        <View
          style={[
            styles.backGroundFlower,
            {
              right: -5,
            },
          ]}
        >
          <Bouquet height={Height / 2} width="100%" fill="black" />
        </View>
        <View
          style={[
            styles.backGroundFlower,
            {
              left: -5,
              transform: [{ rotateY: "180deg" }],
            },
          ]}
        >
          <Bouquet height={Height / 2} width="100%" fill="black" />
        </View>

        {/* end */}

        {/* begin --> image profile view and the smiley face */}
        <View style={styles.imageContainer}>
          {img && (
            <ImgView
              setIsVisible={setIsVisible}
              img={img}
              style={styles.image}
            />
          )}
          <View style={styles.smiley}>
            <Triste height={50} width={50} />
          </View>
        </View>

        {/* end */}

        {/* Begin --> mood text view */}
        <View style={styles.moodContainer}>
          <Text
            style={{
              fontWeight: "bold",
              color: "red",
            }}
          >
            ANGRY
          </Text>
        </View>
        {/* end */}

        {/* Begin--> Activity view  */}
        <View style={styles.activityContainer}>
          <Text style={styles.textActivity}>Khadija is with her dad</Text>
        </View>
        {/* end */}
      </View>

      {/* Begin -->the bottom half */}
      <View style={styles.botBackContainer}>
        <View style={styles.botContainer}>
          <TabView />
        </View>
      </View>
      {/* end */}
    </View>
  );
};

export default Lover;

const styles = StyleSheet.create({
  textActivity: {
    fontSize: 15,
    color: "#5d535e",
    fontStyle: "italic",
  },
  activityContainer: {
    flexDirection: "row",
    alignItems: "center",
    position: "absolute",
    bottom: 20,
  },
  smiley: {
    position: "absolute",
    borderRadius: 20,
    right: -10,
    bottom: 0,
    elevation: 5,
  },
  backGroundFlower: {
    position: "absolute",
    width: 120,
    opacity: 0.2,
  },
  image: {
    borderRadius: 75,
    borderWidth: 2,
    borderColor: "#BD7883",
  },
  moodContainer: {
    backgroundColor: "#dfe166",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    marginTop: 30,
    borderWidth: 1,
    borderColor: "red",
  },
  statusContainer: {
    position: "absolute",
    height: 30,
    width: 30,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    backgroundColor: "white",
    left: 0,
    top: 50,
    zIndex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  statusCircle: {
    height: 20,
    width: 20,
    borderRadius: 10,

    backgroundColor: "green",
  },

  container: { flex: 1, backgroundColor: "white" },
  topContainer: {
    backgroundColor: "#ec96a4",
    height: Height / 2,
    alignItems: "center",
    justifyContent: "center",
  },
  imageContainer: {
    height: 150,
    width: 150,
    borderRadius: 75,
    backgroundColor: "white",
  },
  botBackContainer: {
    flex: 1,
    backgroundColor: "#ec96a4",
  },
  botContainer: {
    flex: 1,
    backgroundColor: "white",
    borderTopLeftRadius: 70,
    borderTopRightRadius: 70,
  },
});
