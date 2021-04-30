import React, { useContext } from "react";
import { StyleSheet, Text, View, FlatList, ToastAndroid } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Toast from "react-native-toast-message";
import Arrow from "../assets/icons/rightArrow.svg";
import { Context as moodContext } from "../context/moodContext";
import { setRequest } from "../helpers/db";
import TextStyled from "./TextStyled";
const DATA = [
  "Are you hungry ?",
  "Do you miss me ?",
  "Can we meet ?",
  "Do you want a Mcdo ?",
  "I am so sorry !",
  "Can we video call ?",
  "Can  i call you ?",
];

const ActionListItem = ({ item }) => {
  return (
    <View
      style={{
        padding: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        margin: 10,
      }}
    >
      <TextStyled> {item} </TextStyled>
      <Arrow height={15} width={15} fill="black" />
    </View>
  );
};

const ActionList = () => {
  const {
    state: { LoverId },
  } = useContext(moodContext);
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        ItemSeparatorComponent={({ unhighlight }) => (
          <View
            style={[
              {
                borderWidth: 0.2,
                backgroundColor: "red",
                marginHorizontal: 10,
              },
            ]}
          />
        )}
        data={DATA}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              setRequest(item, LoverId);
              ToastAndroid.show("Request sent !!", ToastAndroid.SHORT);
            }}
          >
            <ActionListItem item={item} />
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default ActionList;

const styles = StyleSheet.create({});
