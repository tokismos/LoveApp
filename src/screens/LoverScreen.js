import React from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";

const Width = Dimensions.get("window").width;
const Height = Dimensions.get("window").height;

const Lover = () => {
  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <View style={styles.image}></View>
        <Text>hiii</Text>
      </View>
      <View style={styles.botBackContainer}>
        <View style={styles.botContainer}></View>
      </View>
    </View>
  );
};

export default Lover;

const styles = StyleSheet.create({
  container: { flex: 1 },
  topContainer: {
    backgroundColor: "red",
    height: Height / 2,
    alignItems: "center",
    justifyContent: "center",
    borderBottomRightRadius: 70,
  },
  image: {
    height: 150,
    width: 150,
    borderRadius: 75,
    backgroundColor: "white",
  },
  botBackContainer: {
    backgroundColor: "red",
    flex: 1,
  },
  botContainer: { borderTopLeftRadius: 75, flex: 1, backgroundColor: "white" },
});
