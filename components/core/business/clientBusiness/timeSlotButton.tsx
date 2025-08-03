import CustomText from "@/components/ui/customText";
import { StyleSheet, TouchableOpacity } from "react-native";

export const TimeSlotButton = ({
  time,
  isSelected,
  onPress,
}: {
  time: string;
  isSelected: boolean;
  onPress: () => void;
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.slot, isSelected && styles.selected]}
    >
      <CustomText style={[styles.text, isSelected && styles.selectedText]}>
        {time}
      </CustomText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  slot: {
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    margin: 6,
  },
  selected: {
    backgroundColor: "#333",
    borderColor: "#333",
  },
  text: {
    fontFamily: "CarosSoftMedium",
    textTransform: "none",
    color: "#333",
  },
  selectedText: {
    color: "#fff",
  },
});
