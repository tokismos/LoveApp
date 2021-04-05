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
  const [isVisible, setIsVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
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
          onPress={() => {
            setIsOpen(true);
            setIsVisible(true);
          }}
        ></TouchableOpacity>
        <Modal
          isVisible={isVisible}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          setIsVisible={setIsVisible}
        />
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
