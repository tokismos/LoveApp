import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";

import LoverScreen from "../screens/LoverScreen";
import ProfileScreen from "../screens/ProfileScreen";
const Tab = createBottomTabNavigator();

const BottomNavigatorScreens = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="LoverScreen" component={LoverScreen} />
      <Tab.Screen name="ProfileScreen" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default () => {
  return (
    <NavigationContainer>
      <BottomNavigatorScreens />
    </NavigationContainer>
  );
};
