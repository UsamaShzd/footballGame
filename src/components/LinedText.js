import React from "react";
import { View, StyleSheet } from "react-native";
import AppText from "./AppText";

import colors from "../configs/colors";

export default ({ children }) => {
  return (
    <View style={styles.wrapper}>
      <View style={styles.line} />
      <AppText style={styles.text}>{children}</AppText>
      <View style={styles.line} />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    marginVertical: 30,
    alignItems: "center",
  },
  line: {
    backgroundColor: colors.lineText,
    flex: 1,
    height: 1,
  },
  text: {
    color: colors.lineText,
    marginHorizontal: 10,
  },
});
