import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, View, Switch } from "react-native";
import { Context as moodContext } from "../context/moodContext";
import { setStatus } from "../helpers/db";
import Text from "./TextStyled";

const SwitchStatus = ({ styles }) => {
  const {
    state: { IsAvailable },
  } = useContext(moodContext);
  console.log("is avaiilab", IsAvailable);
  const [isEnabled, setIsEnabled] = useState(IsAvailable);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  useEffect(() => {
    setStatus(isEnabled);
  }, [isEnabled, IsAvailable]);

  return (
    <View style={{ flexDirection: "row", ...styles }}>
      <Text style={{ fontSize: 17 }} bold>
        {!isEnabled ? "Not Available" : "Available"}
      </Text>
      <Switch
        trackColor={{ true: "#008000", false: "#FFA07A" }}
        thumbColor={isEnabled ? "#556B2F" : "#B22222"}
        onValueChange={toggleSwitch}
        value={isEnabled}
        style={{ transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }] }}
      />
    </View>
  );
};

export default SwitchStatus;

const styles = StyleSheet.create({});
