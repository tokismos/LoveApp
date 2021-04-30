import { StatusBar } from "expo-status-bar";
import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Navigator from "./src/navigation/Navigator";
import { db, auth } from "./src/helpers/db";
import Lover from "./src/screens/LoverScreen";
import Profile from "./src/screens/ProfileScreen";
import { Provider as MoodProvider } from "./src/context/moodContext";
import { useFonts } from "expo-font";

import { LogBox } from "react-native";
import Toast from "react-native-toast-message";

LogBox.ignoreLogs(["Setting a timer"]);

export default function App() {
  let [fontsLoaded] = useFonts({
    Raleway: require("./src/assets/fonts/Raleway-Regular.ttf"),
    RalewayBold: require("./src/assets/fonts/Raleway-Bold.ttf"),
    RalewayItalic: require("./src/assets/fonts/Raleway-Italic.ttf"),
  });

  if (!fontsLoaded) {
    return <View />;
  }
  return (
    <MoodProvider>
      <View style={styles.container}>
        <Navigator />
        <StatusBar style="auto" />
      </View>
    </MoodProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
