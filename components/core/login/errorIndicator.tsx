import CustomText from "@/components/ui/customText";
import Ionicons from "@expo/vector-icons/Ionicons";
import { MotiView } from "moti";
import { StyleSheet } from "react-native";

interface ErrorIndicatorProps {
  errors: React.ReactNode;
}

export const ErrorIndicator = ({ errors }: ErrorIndicatorProps) => {
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
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 6,
          marginTop: 5,
        }}
      >
        <Ionicons name="alert-circle" color="red" />
        <CustomText style={styles.error}>{errors}</CustomText>
      </MotiView>
    </>
  );
};

const styles = StyleSheet.create({
  error: {
    fontSize: 12,
    color: "red",
  },
});
