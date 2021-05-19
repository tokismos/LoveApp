import React, { useContext } from "react";
import { StyleSheet, ToastAndroid, TouchableOpacity, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { Context as moodContext } from "../context/moodContext";
import sendNotification from "../helpers/sendNotification";
import TextStyled from "./TextStyled";

const ListView = ({ item }) => {
  return (
    <View style={styles.listContainer}>
      <TextStyled>{item}</TextStyled>
    </View>
  );
};

const ListMood = ({ setIsVisible }) => {
  const {
    selectActivity,
    state: { ExpoLoverNotif },
  } = useContext(moodContext);

  const moods = [
    "I am with Dad",
    "I am with family",
    "I am with hanouua",
    "I am eating",
    "I am sleeping",
    "I am watching a movie",
    "I am with mom",
    "I am with la voisine ",
    "I can't talk to you now !",
    "I am mad at you !",
    "I am SOOOOO MAD AT YOUU !!!",
    "I am bored...",
    "I want to go out.",
    "I am missing you :'(",
  ];
  return (
    <View style={{ marginBottom: 30 }}>
      <FlatList
        data={moods}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              selectActivity(
                item,
                sendNotification(
                  ExpoLoverNotif,
                  "Your partner changed his status !"
                )
              );
              ToastAndroid.show("Activity changed !", ToastAndroid.SHORT);

              setIsVisible(false);
            }}
          >
            <ListView item={item} />
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default ListMood;

const styles = StyleSheet.create({
  listContainer: {
    borderWidth: 1,
    margin: 10,
    padding: 10,
    borderRadius: 20,
    alignItems: "center",
  },
});
