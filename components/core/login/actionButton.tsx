import CustomText from "@/components/ui/customText";
import { Colors } from "@/constants/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import { StyleSheet, TouchableOpacity } from "react-native";

interface ActionButtonProps {
  disabledFlag: boolean;
  loading?: boolean;
  func: () => void;
}

export const ActionButton = ({
  disabledFlag,
  loading,
  func,
}: ActionButtonProps) => {
  return (
    <TouchableOpacity
      style={[
        styles.nextButton,
        disabledFlag && styles.disabledButton,
        { marginVertical: 30 },
      ]}
      disabled={disabledFlag}
      onPress={func}
    >
      {loading ? (
        <Ionicons
          name="ellipsis-horizontal"
          color={Colors.light.white}
          size={24}
        />
      ) : (
        <CustomText style={styles.buttonText}>Continue</CustomText>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  nextButton: {
    backgroundColor: Colors.light.black,
    paddingVertical: 14,
    alignItems: "center",
    borderRadius: 8,
  },
  buttonText: {
    color: Colors.light.white,
    fontFamily: "CarosSoftBold",
    fontSize: 18,
  },
  disabledButton: {
    backgroundColor: Colors.light.muted,
  },
});
