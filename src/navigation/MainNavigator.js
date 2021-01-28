import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";

import UserContext from "../context/UserContext";

import AppAuthStack from "./AppAuthStack";
import AppStack from "./AppStack";

function MainNavigator() {
  const { appUser } = useContext(UserContext);
  return (
    <NavigationContainer>
      {appUser ? <AppStack /> : <AppAuthStack />}
    </NavigationContainer>
  );
}

export default MainNavigator;
