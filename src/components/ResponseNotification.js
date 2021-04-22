import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Context as moodContext } from "../context/moodContext";
import NotificationView from "./NotificationView";

const ResponseNotification = () => {
  const { state } = useContext(moodContext);
  const [isNotifOpen, setIsNotifOpen] = useState(true);

  useEffect(() => {
    setIsNotifOpen(true);
  }, [state.Response]);

  return (
    <NotificationView
      setIsNotifOpen={setIsNotifOpen}
      isNotifOpen={isNotifOpen}
      msg={state.Request}
    >
      <View>
        <Text>{state.Response?.res}</Text>
      </View>
    </NotificationView>
  );
};

export default ResponseNotification;

const styles = StyleSheet.create({});
