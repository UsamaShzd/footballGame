import React from "react";
import { LinearGradient } from "expo-linear-gradient";

import colors from "../configs/colors";

export default ({ children, style }) => {
  return (
    <LinearGradient
      // Button Linear Gradient
      colors={[colors.primaryOrange, colors.orangeGradientEnd]}
      style={style || null}
      start={{ x: 0, y: 0 }}
      end={{
        x: 1,
        y: 0,
      }}
    >
      {children}
    </LinearGradient>
  );
};
