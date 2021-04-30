import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { Context as moodContext } from "../context/moodContext";
import ObjToArray from "../helpers/objToArray";

const HistoryList = () => {
  const {
    state: { HistoryLover },
  } = useContext(moodContext);

  const [data, setData] = useState([]);

  useEffect(() => {
    const data = ObjToArray(HistoryLover);
    setData(data.reverse());
  }, [HistoryLover]);

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
        <Text>{item}</Text>
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
        data={data}
        keyExtractor={(item) => item.key}
        renderItem={({ item }) => <HistoryListItem item={item.data} />}
      />
    </View>
  );
};

export default HistoryList;

const styles = StyleSheet.create({});
