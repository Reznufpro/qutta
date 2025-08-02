import CustomText from "@/components/ui/customText";
import { AvailabilityEntry } from "@/types";
import { useState } from "react";
import { StyleSheet, Switch, View } from "react-native";
import { TimePickerModal } from "react-native-paper-dates";

interface Props {
  data: AvailabilityEntry;
  disabled?: boolean;
  onChange: (updated: AvailabilityEntry) => void;
}

export const DayAvailabilityRow = ({ data, disabled, onChange }: Props) => {
  const [showOpenPicker, setShowOpenPicker] = useState(false);
  const [showClosePicker, setShowClosePicker] = useState(false);

  const handleTimeChange = (key: "open_time" | "close_time", time: Date) => {
    const formatted = time.toTimeString().slice(0, 8); // "HH:mm:ss"
    onChange({ ...data, [key]: formatted });
  };

  return (
    <View style={styles.container}>
      <View style={styles.switch}>
        <CustomText style={styles.title}>{data.day}</CustomText>
        <Switch
          value={!data.is_closed}
          disabled={disabled}
          onValueChange={(val) => onChange({ ...data, is_closed: !val })}
        />
      </View>

      {!data.is_closed && (
        <View style={{ flexDirection: "row", gap: 8 }}>
          <CustomText
            style={styles.timeText}
            onPress={() => setShowOpenPicker(true)}
          >
            {data.open_time || "Open Time"}
          </CustomText>
          <CustomText
            style={styles.timeText}
            onPress={() => setShowClosePicker(true)}
          >
            {data.close_time || "Close Time"}
          </CustomText>

          {/* Time Pickers */}
          <TimePickerModal
            visible={showOpenPicker}
            onDismiss={() => setShowOpenPicker(false)}
            onConfirm={({ hours, minutes }) => {
              const date = new Date();
              date.setHours(hours, minutes, 0);
              handleTimeChange("open_time", date);
              setShowOpenPicker(false);
            }}
            hours={9}
            minutes={0}
          />
          <TimePickerModal
            visible={showClosePicker}
            onDismiss={() => setShowClosePicker(false)}
            onConfirm={({ hours, minutes }) => {
              const date = new Date();
              date.setHours(hours, minutes, 0);
              handleTimeChange("close_time", date);
              setShowClosePicker(false);
            }}
            hours={17}
            minutes={0}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 10,
    gap: 6,
  },
  switch: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    fontFamily: "Satoshi-Bold",
    textTransform: "capitalize",
  },
  timeText: {
    padding: 6,
    borderWidth: 1,
    borderRadius: 6,
  },
});
