import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

//screens
import LoginScreen from "../screens/LoginScreen";

const Stack = createStackNavigator();

function AppAuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
    </Stack.Navigator>
  );
}

export default AppAuthStack;
