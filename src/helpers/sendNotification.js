import { StyleSheet } from "react-native";

const sendNotification = async (expoPushToken, text) => {
  const message = {
    to: expoPushToken,
    sound: "default",
    title: text,
    body: "What are you waiting for? Go check him !!",
    data: { someData: "goes here" },
  };

  await fetch("https://exp.host/--/api/v2/push/send", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Accept-encoding": "gzip, deflate",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(message),
  });
};

export default sendNotification;

const styles = StyleSheet.create({});
