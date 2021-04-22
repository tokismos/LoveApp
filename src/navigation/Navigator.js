import React, { useCallback, useContext, useState } from "react";
import {
  TouchableOpacity,
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Text,
  Button,
  TouchableHighlight,
} from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import LoverScreen from "../screens/LoverScreen";
import ProfileScreen from "../screens/ProfileScreen";
import IMGLOVER from "../assets/icons/lover.svg";
import IMGPROFILE from "../assets/icons/profile.svg";
import Modal from "../components/Modal";
import SignInScreen from "../screens/SignInScreen";
import SignUpScreen from "../screens/SignUpScreen";

import { auth, setResponse } from "../helpers/db";
import { useEffect } from "react/cjs/react.development";
import { Context as moodContext } from "../context/moodContext";
import NotificationView from "../components/NotificationView";
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
      <AuthStack.Screen name="SignUp" component={SignUpScreen} />
      <AuthStack.Screen name="SignIn" component={SignInScreen} />
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
              <IMGLOVER width={45} height={45} fill="red" />
            ) : (
              <IMGLOVER width={45} height={45} fill="#000" />
            );
          } else if (route.name === "ProfileScreen") {
            iconName = focused ? (
              <IMGPROFILE width={43} height={43} fill="red" />
            ) : (
              <IMGPROFILE width={43} height={43} fill="#000" />
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
  const {
    state,
    syncDbWithContext,
    getLoverDataFromDb,
    getRequestsFromDb,
    getResponseFromDb,
  } = useContext(moodContext);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(true);
        syncDbWithContext(); //when the auth change(user connect) we fetch data from the db to the current user context
        getRequestsFromDb();
        getResponseFromDb();
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
  console.log("this is reeeeeeeeeeeesponse", state.Response);
  //we see the notification when the value of Request changes

  const ModalButton = () => {
    return (
      <TouchableOpacity
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
      {state.Response != "" && <ResponseNotification />}
      {state.Request != "" && <RequestNotification />}

      {/* END */}

      <NavigationContainer>
        {splash ? null : user ? (
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

    // <>
    //   <NavigationContainer>
    //     <BottomNavigatorScreens />
    //   </NavigationContainer>
    //   <ModalButton />
    //   <Modal isVisible={isVisible} setIsVisible={setIsVisible} />
    // </>
  );
};

const styles = StyleSheet.create({
  botTab: {
    marginBottom: 20,
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 20,
  },
  modalButton: {
    position: "absolute",
    height: 80,
    width: 80,
    borderRadius: 40,
    backgroundColor: "red",
    bottom: 30,
    alignSelf: "center",
    elevation: 6,
  },
});
