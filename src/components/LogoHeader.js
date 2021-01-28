import React from "react";
import { Image, StyleSheet, View } from "react-native";
import Constants from "expo-constants";

export default (props) => {
  return (
    <View style={styles.headerContainer}>
      <Image source={require("../assets/logo.png")} style={styles.logoImage} />
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    height: 142 + Constants.statusBarHeight,
    alignItems: "center",
  },
  logoImage: {
    marginTop: 36 + Constants.statusBarHeight,
  },
});
