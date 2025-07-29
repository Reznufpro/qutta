import CustomText from "@/components/ui/customText";
import { Colors } from "@/constants/Colors";
import { StyleSheet, View } from "react-native";

interface StatsProps<T = string | number | React.ReactNode> {
  label: string;
  value: T;
}

export const Stats = <T extends string | number | React.ReactNode = string>({
  label,
  value,
}: StatsProps<T>) => {
  return (
    <View style={{ alignItems: "center" }}>
      <CustomText style={styles.statValue}>{value}</CustomText>
      <CustomText style={styles.statLabel}>{label}</CustomText>
    </View>
  );
};

const styles = StyleSheet.create({
  statValue: {
    fontSize: 16,
    fontFamily: "CarosSoftBold",
  },
  statLabel: {
    fontSize: 12,
    color: Colors.light.black,
    fontFamily: "CarosSoftLight",
  },
});
