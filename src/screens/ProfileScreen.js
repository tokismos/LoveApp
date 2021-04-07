import { setStatusBarBackgroundColor } from "expo-status-bar";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import Modal from "../components/Modal";

const Height = Dimensions.get("window").height;

const Profile = () => {
  return (
    <>
      <View style={styles.container}>
        <View style={styles.topContainer}>
          <View style={styles.image}></View>
          <Text>hiii</Text>
        </View>
        <View style={styles.botBackContainer}>
          <View style={styles.boteContainer}>
            <Text>hiii</Text>
          </View>
        </View>
      </View>
    </>
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
  boteContainer: {
    borderTopRightRadius: 75,
    height: 400,
    backgroundColor: "yellow",
  },
});
