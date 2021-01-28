import React, { useContext } from "react";
import { View, StyleSheet } from "react-native";

import firebase from "firebase";

import AppText from "../components/AppText";
import AppButton from "../components/AppButton";

import UserContext from "../context/UserContext";

const HomeScreen = (props) => {
  const { appUser } = useContext(UserContext);

  const logoutUser = async () => {
    try {
      await firebase.auth().signOut();
    } catch (err) {
      alert("Failed to logout");
    }
  };
  return (
    <View>
      <AppText style={styles.welcomeText}>Welcome {appUser.email}</AppText>
      <AppButton
        label="Logout"
        containerStyles={styles.logoutButton}
        onPress={logoutUser}
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  welcomeText: {
    marginTop: 25,
    fontSize: 22,
    textAlign: "center",
  },
  logoutButton: {
    height: 55,
    margin: 25,
  },
});
