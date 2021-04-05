import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Modal,
  Button,
  TouchableOpacity,
} from "react-native";
import ListMood from "../components/ListMood";
import { useSharedValue } from "react-native-reanimated";

const Width = Dimensions.get("window").width;
const Height = Dimensions.get("window").height;

const Profile = () => {
  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <View style={styles.image}></View>
        <Text>hiii</Text>
      </View>
      <View style={styles.botBackContainer}>
        <View style={styles.botContainer}></View>
      </View>
      <TouchableOpacity
        style={styles.moodButton}
        onPress={() => setIsVisible(true)}
      ></TouchableOpacity>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: { flex: 1 },
  topContainer: {
    backgroundColor: "blue",
    height: Height / 2,
    alignItems: "center",
    justifyContent: "center",
    borderBottomLeftRadius: 70,
  },
  image: {
    height: 150,
    width: 150,
    borderRadius: 75,
    backgroundColor: "white",
  },
  botBackContainer: {
    backgroundColor: "blue",
    flex: 1,
  },
  botContainer: { borderTopRightRadius: 75, flex: 1, backgroundColor: "white" },
  moodButton: {
    position: "absolute",
    borderRadius: 25,
    height: 50,
    width: 50,
    right: 10,
    bottom: 10,
    backgroundColor: "green",
  },
  modal: {
    backgroundColor: "red",
    width: "100%",
  },
});
