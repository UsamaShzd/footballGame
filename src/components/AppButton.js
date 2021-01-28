import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";

import colors from "../configs/colors";
import fonts from "../configs/fonts";

import AppText from "./AppText";

export default ({
  onPress,
  label,
  containerStyles = {},
  labelStyles = {},
  disabled = false,
}) => {
  return (
    <TouchableOpacity onPress={onPress} disabled={disabled}>
      <View style={[styles.container, containerStyles]}>
        <AppText style={{ ...styles.textLabel, ...labelStyles }}>
          {label}
        </AppText>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primaryOrange,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
  },

  textLabel: {
    color: colors.white,
    fontFamily: fonts.NunitoSansBold,
    fontSize: 22,
  },
});
