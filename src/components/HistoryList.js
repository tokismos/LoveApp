import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";

const DATA = [
  { detail: "khadijas is happy", date: "15/04/2021" },
  { detail: "khadijac is happy", date: "15/04/2021" },
  { detail: "khadijaz is happy", date: "15/04/2021" },
  { detail: "khadijca is happy", date: "15/04/2021" },
  { detail: "khadizja is happy", date: "15/04/2021" },
  { detail: "khadijcah is happy", date: "15/04/2021" },
  { detail: "khadaija is happy", date: "15/04/2021" },
];

const HistoryList = () => {
  const HistoryListItem = ({ item }) => {
    return (
      <View
        style={{
          backgroundColor: "white",
          height: 40,
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <Text>{item.detail}</Text>
        <Text> {item.date}</Text>
      </View>
    );
  };

  return (
    <View>
      <FlatList
        ItemSeparatorComponent={({ unhighlight }) => (
          <View
            style={[
              {
                height: 0.5,
              },
            ]}
          />
        )}
        data={DATA}
        keyExtractor={(item) => item.detail}
        renderItem={({ item }) => <HistoryListItem item={item} />}
      />
    </View>
  );
};

export default HistoryList;

const styles = StyleSheet.create({});
