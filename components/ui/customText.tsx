import { Colors } from "@/constants/Colors";
import React, { FC } from "react";
import {
  StyleProp,
  StyleSheet,
  Text,
  TextProps,
  TextStyle,
} from "react-native";

interface CustomTextProps extends TextProps {
  style?: StyleProp<TextStyle>;
}

const CustomText: FC<CustomTextProps> = ({ style, ...props }) => {
  return <Text style={[styles.defaultFont, style]} {...props} />;
};

const styles = StyleSheet.create({
  defaultFont: {
    fontFamily: "Satoshi-Bold",
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 0.25,
    color: Colors.light.text,
  },
});

export default CustomText;
