import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, ToastAndroid, TouchableOpacity, View } from "react-native";
import { Context as moodContext } from "../context/moodContext";
import NotificationView from "./NotificationView";
import LottieView from "lottie-react-native";
import { resetRequest, setResponse } from "../helpers/db";
import Accept from "../assets/icons/accept.svg";
import Refuse from "../assets/icons/refuse.svg";
import TextStyled from "./TextStyled";
import sendNotification from "../helpers/sendNotification";
const RequestNotification = () => {
  const { state } = useContext(moodContext);
  const [isNotifOpen, setIsNotifOpen] = useState(true);

  useEffect(() => {
    setIsNotifOpen(true);
    setTimeout(() => setIsNotifOpen(false), 3000);
  }, [state.Request]);

  const pressButtonNotif = (res) => {
    setResponse(
      { msg: state.Request, res },
      state.LoverId,
      sendNotification(state.ExpoLoverNotif, "Hey you got a response !")
    );
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
            margin: 1,
            backgroundColor: "#DCDCDC",
            borderRadius: 10,
          }}
        >
          <View
            style={{
              marginLeft: 10,
              width: "60%",
              marginVertical: 5,
            }}
          >
            <TextStyled
              style={{
                fontSize: 18,
                alignSelf: "center",
              }}
              italic
            >
              {state.Request}
            </TextStyled>
          </View>
          <View
            style={{
              flexDirection: "row",
              paddingVertical: 10,
            }}
          >
            <TouchableOpacity
              onPress={() => {
                pressButtonNotif("YES");
                ToastAndroid.show("Request accepted !", ToastAndroid.SHORT);
              }}
              style={{ marginHorizontal: 5 }}
            >
              <Accept height={40} width={40} />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                pressButtonNotif("NO");
                ToastAndroid.show("Request refused !", ToastAndroid.SHORT);
              }}
              style={{ marginHorizontal: 5 }}
            >
              <Refuse height={40} width={40} />
            </TouchableOpacity>
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
