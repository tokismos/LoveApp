import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Navigator from "./src/navigation/Navigator";
import { db, auth } from "./src/helpers/db";
import Lover from "./src/screens/LoverScreen";
import Profile from "./src/screens/ProfileScreen";
import { Provider as MoodProvider } from "./src/context/moodContext";

import { LogBox } from "react-native";

LogBox.ignoreLogs(["Setting a timer"]);
export default function App() {
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
