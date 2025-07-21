import { Colors } from "@/constants/Colors";
import React, { FC } from "react";
import {
  StyleProp,
  StyleSheet,
  Text,
  TextProps,
  TextStyle,
} from "react-native";

interface CustomHeadingProps extends TextProps {
  style?: StyleProp<TextStyle>;
}

const CustomHeading: FC<CustomHeadingProps> = ({ style, ...props }) => {
  return <Text style={[styles.defaultFont, style]} {...props} />;
};

const styles = StyleSheet.create({
  defaultFont: {
    fontFamily: "Migra-Extrabold",
    fontSize: 40,
    letterSpacing: 0.5,
    color: Colors.light.darkBrown,
    textTransform: "uppercase",
  },
});

export default CustomHeading;
