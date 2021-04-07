import React, { useState } from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";

import LoverScreen from "../screens/LoverScreen";
import ProfileScreen from "../screens/ProfileScreen";
import IMGLOVER from "../assets/icons/lover.svg";
import IMGPROFILE from "../assets/icons/profile.svg";
import Modal from "../components/Modal";

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
      <NavigationContainer>
        <BottomNavigatorScreens />
      </NavigationContainer>
      <ModalButton />
      <Modal isVisible={isVisible} setIsVisible={setIsVisible} />
    </>
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
  },
});
