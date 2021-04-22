import React, { useContext } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { Context as moodContext } from "../context/moodContext";

const ListView = ({ item }) => {
  return (
    <View style={styles.listContainer}>
      <Text>{item}</Text>
    </View>
  );
};

const ListMood = () => {
  const { selectActivity } = useContext(moodContext);

  const moods = [
    "i am happy",
    "I am with Dad",
    "I am with family",
    "I am eating",
    "I am with hanae",
    "i am watching a movie",
    "yeaayas",
    "in Lovecx",
    "happyvc",
    "sadvcx",
    "yeaayz",
    "in Loveb",
    "happnnby",
    "snbvd",
    "yenbvwaay",
    "iwn Love",
  ];
  return (
    <View>
      <FlatList
        data={moods}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              selectActivity(item);
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
