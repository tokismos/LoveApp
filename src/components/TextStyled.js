import React from "react";
import { StyleSheet, Text, View } from "react-native";

const TextStyled = (props) => {
  let font = "Raleway";
  if (props.bold) font = "RalewayBold";
  if (props.italic) font = "RalewayItalic";

  console.log("this is prooops", props);
  return (
    <View>
      <Text
        style={[
          {
            fontFamily: font,
            fontSize: 14,
          },
          props.style,
        ]}
      >
        {props.children}
      </Text>
    </View>
  );
};

export default TextStyled;

const styles = StyleSheet.create({});
