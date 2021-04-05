import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";

const ListView = ({ item }) => {
  return (
    <View style={styles.listContainer}>
      <Text>{item}</Text>
    </View>
  );
};

const ListMood = () => {
  const moods = [
    "happy",
    "sad",
    "yeaay",
    "in Love",
    "happy",
    "sad",
    "yeaay",
    "in Love",
    "happy",
    "sad",
    "yeaay",
    "in Love",
    "happy",
    "sad",
    "yeaay",
    "in Love",
  ];
  return (
    <View>
      <FlatList
        data={moods}
        key={(item) => item}
        renderItem={({ item }) => <ListView item={item} />}
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
