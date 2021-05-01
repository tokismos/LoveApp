import React, { useEffect, useContext, useState } from "react";
import {
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  View,
  Alert,
} from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Constants from "expo-constants";
import * as Notifications from "expo-notifications";
import LoverScreen from "../screens/LoverScreen";
import ProfileScreen from "../screens/ProfileScreen";
import IMGLOVER from "../assets/icons/lover.svg";
import IMGPROFILE from "../assets/icons/profile.svg";
import Modal from "../components/Modal";
import SignInScreen from "../screens/SignInScreen";
import SignUpScreen from "../screens/SignUpScreen";

import { auth, db } from "../helpers/db";
import { Context as moodContext } from "../context/moodContext";
import RequestNotification from "../components/RequestNotification";
import ResponseNotification from "../components/ResponseNotification";

const AuthStack = createStackNavigator();

const AuthStackScreen = () => {
  return (
    <AuthStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <AuthStack.Screen name="SignIn" component={SignInScreen} />
      <AuthStack.Screen name="SignUp" component={SignUpScreen} />
    </AuthStack.Navigator>
  );
};

const Tab = createBottomTabNavigator();

const BottomNavigatorScreens = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "LoverScreen") {
            iconName = focused ? (
              <IMGLOVER width={45} height={45} fill="#B22222" />
            ) : (
              <IMGLOVER width={45} height={45} fill="#555" />
            );
          } else if (route.name === "ProfileScreen") {
            iconName = focused ? (
              <IMGPROFILE width={43} height={43} fill="#B22222" />
            ) : (
              <IMGPROFILE width={43} height={43} fill="#555" />
            );
          }
          return iconName;
        },
      })}
      tabBarOptions={{
        showLabel: false,
        style: styles.botTab,
      }}
    >
      <Tab.Screen name="LoverScreen" component={LoverScreen} />
      <Tab.Screen name="ProfileScreen" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default () => {
  const [isVisible, setIsVisible] = useState(false);

  const [user, setUser] = useState(false);
  const [splash, setSplash] = useState(true);
  const { state, syncDbWithContext, getLoverDataFromDb } = useContext(
    moodContext
  );

  const registerForPushNotificationsAsync = async (uid) => {
    let token;
    if (Constants.isDevice) {
      const {
        status: existingStatus,
      } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        alert("Failed to get push token for push notification!");
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
      Alert.alert(`this is the token ${token}`);
      await db.ref(`users/${uid}/ExpoNotification`).set(token);

      console.log(token);
    } else {
      alert("Must use physical device for Push Notifications");
    }

    if (Platform.OS === "android") {
      Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }

    return token;
  };
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(true);
        syncDbWithContext(); //when the auth change(user connect) we fetch data from the db to the current user context
        registerForPushNotificationsAsync(user.uid);
      } else {
        setUser(false);
        setSplash(false);
      }
    });
  }, []);

  //if there's a user we get the data of the lover from the db and we add it the the context lover then we show the screen:to load everything before
  useEffect(() => {
    (async () => {
      if (auth.currentUser) {
        await getLoverDataFromDb(state.LoverId); // we did await to wait until it finishes to show the screen

        setSplash(false);
      }
    })();
  }, [state.LoverId]);
  //we see the notification when the value of Request changes

  const ModalButton = () => {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          setIsVisible(true);
        }}
        style={styles.modalButton}
      ></TouchableOpacity>
    );
  };

  return (
    <>
      {/* Begin---> If you have a notification it will show the notif or the button */}
      {state.Response != "" && (
        <ResponseNotification response={state.Response} />
      )}
      {state.Request != "" && <RequestNotification />}

      {/* END */}

      <NavigationContainer>
        {splash ? (
          <View style={{ flex: 1, justifyContent: "center" }}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        ) : user ? (
          <>
            <BottomNavigatorScreens />
            <ModalButton />
            <Modal isVisible={isVisible} setIsVisible={setIsVisible} />
          </>
        ) : (
          <AuthStackScreen />
        )}
      </NavigationContainer>
    </>
  );
};

const styles = StyleSheet.create({
  botTab: {
    marginBottom: 20,
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 20,
    position: "absolute",
  },
  modalButton: {
    position: "absolute",
    height: 80,
    width: 80,
    borderRadius: 40,
    backgroundColor: "#B22222",
    bottom: 30,
    alignSelf: "center",
    elevation: 6,
  },
});
