import CustomText from "@/components/ui/customText";
import { StyleSheet, View } from "react-native";

interface ReviewRowProps {
  label: string;
  value: string | undefined;
}

export const ReviewRow = ({ label, value }: ReviewRowProps) => {
  return (
    <View style={styles.reviewRow}>
      <CustomText style={styles.reviewLabel}>{label}:</CustomText>
      <CustomText style={styles.reviewValue}>{value || "—"}</CustomText>
    </View>
  );
};

const styles = StyleSheet.create({
  reviewRow: {
    flexDirection: "column",
    gap: 5,
    marginBottom: 15,
  },
  reviewLabel: {
    fontFamily: "CarosSoftBold",
    fontSize: 16,
  },
  reviewValue: {
    flex: 1,
    fontFamily: "CarosSoftLight",
    fontSize: 14,
    maxWidth: 350,
  },
});
