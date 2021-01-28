import React from "react";
import { View, TextInput, StyleSheet } from "react-native";
import AppText from "./AppText";

import colors from "../configs/colors";
import fonts from "../configs/fonts";

import { MaterialCommunityIcons } from "@expo/vector-icons";

export default (props) => {
  const {
    error,
    label,
    labelStyle,
    inputWrapperStyle,
    inputWrapperErrorStyle,
    inputStyle,
    errorStyle,
    containerStyle,
    iconName,
  } = props;

  let wrapperErrorStyle = error
    ? {
        borderWidth: 2,
        borderColor: colors.errorText,
        ...inputWrapperErrorStyle,
      }
    : {
        borderWidth: 2,
        borderColor: props.value ? colors.primaryOrange : "transparent",
        ...inputWrapperErrorStyle,
      };

  let iconColor = props.value ? colors.primaryOrange : colors.grayText;
  if (error) iconColor = colors.errorText;
  return (
    <View style={[styles.containerStyle, containerStyle]}>
      <AppText style={[styles.label, labelStyle]}>{label}</AppText>
      <View style={[styles.inputWrapper, inputWrapperStyle, wrapperErrorStyle]}>
        {iconName && (
          <MaterialCommunityIcons
            name={iconName}
            size={25}
            style={styles.iconStyles}
            color={iconColor}
          />
        )}
        <TextInput
          {...props}
          placeholderTextColor={colors.grayText}
          style={[styles.input, inputStyle]}
        />
      </View>
      {error ? (
        <AppText style={[styles.error, errorStyle]}>{error}</AppText>
      ) : null}
    </View>
  );
};
const styles = StyleSheet.create({
  containerStyle: {
    marginTop: 10,
    marginBottom: 0,
  },
  label: {
    fontSize: 14,
  },
  inputWrapper: {
    flexDirection: "row",
    marginTop: 10,
    borderRadius: 28,
    backgroundColor: colors.lightGray,
  },
  iconStyles: {
    marginTop: 15,
    marginLeft: 18,
  },
  input: {
    marginLeft: 10,
    flex: 1,
    minHeight: 55,
    maxHeight: 180,
    fontSize: 18,
    paddingHorizontal: 8,
    color: colors.darkText,
    fontFamily: fonts.NunitoSans,
  },
  error: {
    color: colors.errorText,
    marginTop: 5,
    fontSize: 16,
  },
});
