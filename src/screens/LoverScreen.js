import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, Text, View, Dimensions, Image } from "react-native";

import Triste from "../assets/moodIcons/triste.svg";
import Neutre from "../assets/moodIcons/neutre.svg";
import Sick from "../assets/moodIcons/sick.svg";
import Love from "../assets/moodIcons/love.svg";
import Heureux from "../assets/moodIcons/heureux.svg";
import Bouquet from "../assets/bouquet.svg";
import ImgView from "../components/ImgView";
import TabView from "../components/TabView";
import { Context as MoodContext } from "../context/moodContext";
import { getData } from "../helpers/db";

const Width = Dimensions.get("window").width;
const Height = Dimensions.get("window").height;
const imguri =
  "https://firebasestorage.googleapis.com/v0/b/loveapp-69783.appspot.com/o/images%2FEJa8ybCCvdepFogqHILHayDqM8H2?alt=media&token=ecf3688a-7252-40b0-96c5-b22e87f36e0e";
const Lover = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [moodIcon, setMoodIcon] = useState(null);
  const [img, setImg] = useState(imguri);
  //const [moodText, setMoodText] = useState();
  const [color, setColor] = useState("red");
  const {
    state: { CurrentMoodLover, ImgProfileLover, LoverId, IsAvailableLover },
    getLoverDataFromDb,
  } = useContext(MoodContext);

  // Begin--> Show the icon mood in the screen according to the context currentMood
  const showSmiley = () => {
    switch (CurrentMoodLover) {
      case "Triste":
        return setMoodIcon(<Triste height={50} width={50} />);
      case "Neutre":
        return setMoodIcon(<Neutre height={50} width={50} />);
      case "Sick":
        return setMoodIcon(<Sick height={50} width={50} />);
      case "Triste":
        return setMoodIcon(<Triste height={50} width={50} />);
      case "Heureux":
        return setMoodIcon(<Heureux height={50} width={50} />);
      case "Love":
        return setMoodIcon(<Love height={50} width={50} />);
      default:
        return null;
    }
  };
  // end

  useEffect(() => {
    // getData(loadMood); // get data from the database and set its value in the context loadMood
    // setMoodText(state.currentMood); // the text mood

    showSmiley();
  }, [CurrentMoodLover, LoverId, ImgProfileLover]);

  return (
    <View style={styles.container}>
      {/* Show the image when pressed */}
      {isVisible && (
        <Image source={{ uri: ImgProfileLover }} style={styles.imgView} />
      )}
      <View style={styles.topContainer}>
        {/* Begin--->the circle showing the status in the top left */}
        <View style={styles.statusContainer}>
          <View
            style={[
              styles.statusCircle,
              { backgroundColor: IsAvailableLover ? "green" : "red" },
            ]}
          />
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
          {ImgProfileLover && (
            <ImgView
              setIsVisible={setIsVisible}
              img={ImgProfileLover}
              style={styles.image}
            />
          )}
          {/* Show the smiley mood */}
          <View style={styles.smiley}>{moodIcon}</View>
        </View>

        {/* end */}

        {/* Begin --> mood text view */}
        {CurrentMoodLover ? (
          <View style={styles.moodContainer}>
            <Text
              style={{
                fontWeight: "bold",
                color: "red",
              }}
            >
              {/* Show the text mood */}
              {CurrentMoodLover}
            </Text>
          </View>
        ) : null}
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
  imgView: {
    position: "absolute",
    height: Height,
    width: Width,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
    resizeMode: "contain",
  },
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
