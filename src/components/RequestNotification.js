import React, { useContext, useEffect, useState } from "react";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Context as moodContext } from "../context/moodContext";
import NotificationView from "./NotificationView";
import LottieView from "lottie-react-native";
import { resetRequest, setResponse } from "../helpers/db";

const RequestNotification = () => {
  const { state } = useContext(moodContext);
  const [isNotifOpen, setIsNotifOpen] = useState(true);

  useEffect(() => {
    setIsNotifOpen(true);
  }, [state.Request]);

  const pressButtonNotif = (res) => {
    setResponse({ msg: state.Request, res }, state.LoverId);
    resetRequest(state.LoverId);
  };
  return (
    <>
      {/* Notification Container */}
      <NotificationView
        setIsNotifOpen={setIsNotifOpen}
        isNotifOpen={isNotifOpen}
        msg={state.Request}
      >
        {/* Begin----> The view we that we will render in the notification container */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginHorizontal: 20,
          }}
        >
          <Text>{state.Request} </Text>
          <View style={{ flexDirection: "row" }}>
            <View style={{ marginHorizontal: 15 }}>
              <Button
                title="yes"
                onPress={() => {
                  pressButtonNotif("YES");
                }}
              />
            </View>
            <Button
              title="no"
              onPress={() => {
                pressButtonNotif("NO");
              }}
            />
          </View>
        </View>

        {/* END */}
      </NotificationView>
      {/* Begin ---> Show the notif icon  */}
      {!isNotifOpen && state.Request != "" && (
        <TouchableOpacity
          style={{
            position: "absolute",
            top: 15,
            right: -20,
            zIndex: 1,
          }}
          onPress={() => {
            setIsNotifOpen(true);
          }}
        >
          <LottieView
            style={{
              width: 100,
              height: 100,
            }}
            source={require("../assets/icons/notificationAnimation.json")}
            autoPlay
            loop
          />
        </TouchableOpacity>
      )}
      {/* END */}
    </>
  );
};

export default RequestNotification;

const styles = StyleSheet.create({});
