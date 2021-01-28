import React from "react";
import { Text, StyleSheet } from "react-native";

import fonts from "../configs/fonts";

export default ({ children, style, ...rest }) => {
  return (
    <Text {...rest} style={[styles.text, style]}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    fontFamily: fonts.NunitoSans,
  },
});
