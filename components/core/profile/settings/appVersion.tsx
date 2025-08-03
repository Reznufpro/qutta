import CustomText from "@/components/ui/customText";
import * as Application from "expo-application";
import { FC } from "react";
import { StyleProp, StyleSheet, TextStyle } from "react-native";

interface AppVersionProps {
  style?: StyleProp<TextStyle>;
}

export const AppVersion: FC<AppVersionProps> = ({ style }) => {
  return (
    <CustomText style={[styles.ctaSubtitle, style]}>
      Version {Application.nativeApplicationVersion} (
      {Application.nativeBuildVersion})
    </CustomText>
  );
};

const styles = StyleSheet.create({
  ctaSubtitle: {
    fontFamily: "CarosSoftLight",
    fontSize: 13,
  },
});
