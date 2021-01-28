import React, { useState, useEffect } from "react";

import firebase from "firebase";
import firebaseConfigs from "./src/configs/firebase";

import fonts from "./src/configs/fonts";

import AppAuthStack from "./src/navigation/MainNavigator";
import AppLoading from "expo-app-loading";
import { useFonts } from "expo-font";

import UserContext from "./src/context/UserContext";

//initializing firebse
firebase.initializeApp(firebaseConfigs);

export default () => {
  const [appLoaded, setAppLoaded] = useState(false);
  const [appUser, setAppUser] = useState(null);

  let [fontsLoaded] = useFonts({
    [fonts.NunitoSans]: require("./src/assets/fonts/Nunito_Sans/NunitoSans-Regular.ttf"),
    [fonts.NunitoSansSemiBold]: require("./src/assets/fonts/Nunito_Sans/NunitoSans-SemiBold.ttf"),
    [fonts.NunitoSansBold]: require("./src/assets/fonts/Nunito_Sans/NunitoSans-Bold.ttf"), //NunitoSans-Bold
  });

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      setAppUser(user || null);
      setAppLoaded(true);
    });
  }, []);
  return (
    <UserContext.Provider value={{ appUser }}>
      {appLoaded && fontsLoaded ? <AppAuthStack /> : <AppLoading />}
    </UserContext.Provider>
  );
};
