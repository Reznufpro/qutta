import CustomText from "@/components/ui/customText";
import { StyleSheet, TouchableOpacity } from "react-native";

export const DayBubble = ({
  label,
  isActive,
  onPress,
}: {
  label: string;
  isActive: boolean;
  onPress: () => void;
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.bubble, isActive && styles.active]}
    >
      <CustomText style={[styles.text, isActive && styles.activeText]}>
        {label}
      </CustomText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  bubble: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    alignItems: "center",
    width: 75,
    borderRadius: 12,
    backgroundColor: "#E0E0E0",
    marginRight: 8,
  },
  active: {
    backgroundColor: "#333",
  },
  text: {
    color: "#333",
    fontFamily: "Satoshi-Bold",
    textTransform: "capitalize",
    lineHeight: 20,
  },
  activeText: {
    color: "#fff",
  },
});
