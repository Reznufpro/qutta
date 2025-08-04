import CustomText from "@/components/ui/customText";
import { Colors } from "@/constants/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import { MotiView } from "moti";
import { StyleProp, StyleSheet, TextStyle, ViewStyle } from "react-native";

interface ErrorIndicatorProps {
  errors: React.ReactNode;
  close?: () => void;
  styleCard?: StyleProp<ViewStyle>;
  styleText?: StyleProp<TextStyle>;
  styleIconColor?: string;
  styleIconSize?: number;
  styleIconName?: keyof typeof Ionicons.glyphMap;
}

export const ErrorIndicator = ({
  errors,
  close,
  styleCard,
  styleText,
  styleIconColor,
  styleIconSize,
  styleIconName,
}: ErrorIndicatorProps) => {
  return (
    <>
      <MotiView
        from={{
          opacity: 0,
          translateY: -6,
        }}
        animate={{
          opacity: 1,
          translateY: 0,
        }}
        transition={{
          type: "timing",
          duration: 300,
        }}
        style={[styles.card, styleCard]}
      >
        <Ionicons
          name={styleIconName || "alert-circle"}
          size={styleIconSize}
          color={styleIconColor || "red"}
        />
        <CustomText style={[styles.error, styleText]}>{errors}</CustomText>
        {close && <Ionicons name="close-outline" color={Colors.light.white} />}
      </MotiView>
    </>
  );
};

const styles = StyleSheet.create({
  error: {
    fontSize: 12,
    color: "red",
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 5,
  },
});
