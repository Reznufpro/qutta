import CustomText from "@/components/ui/customText";
import { AvailabilityEntry } from "@/types";
import { formatTime } from "@/utils";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, View } from "react-native";

interface AvailabilityViewProps {
  schedule: AvailabilityEntry[];
}

export const AvailabilityView = ({ schedule }: AvailabilityViewProps) => {
  return (
    <View style={styles.container}>
      {schedule.map((entry) => (
        <View key={entry.day} style={styles.row}>
          <View style={styles.daySection}>
            <Ionicons
              name={entry.is_closed ? "close-circle" : "checkmark-circle"}
              size={18}
              color={entry.is_closed ? "#ccc" : "green"}
            />
            <CustomText style={styles.dayText}>{entry.day}</CustomText>
          </View>

          {entry.is_closed ? (
            <CustomText style={styles.closedText}>Closed</CustomText>
          ) : (
            <CustomText style={styles.timeText}>
              {formatTime(entry.open_time)} - {formatTime(entry.close_time)}
            </CustomText>
          )}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 24,
    marginTop: 24,
    paddingBottom: 16,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 1,
  },
  daySection: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  dayText: {
    textTransform: "capitalize",
    fontFamily: "Satoshi-Bold",
    fontSize: 14,
  },
  timeText: {
    fontSize: 14,
    fontFamily: "CarosSoftLight",
  },
  closedText: {
    color: "#aaa",
    fontSize: 14,
    fontFamily: "CarosSoftMedium",
  },
});
