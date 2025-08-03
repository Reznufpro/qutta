import CustomText from "@/components/ui/customText";
import { Colors } from "@/constants/Colors";
import {
  useAvailability,
  useUpsertAvailability,
} from "@/hooks/useBusinessAvailability";
import { AvailabilityEntry } from "@/types";
import { useMemo, useState } from "react";
import { Alert, Pressable, StyleSheet, View } from "react-native";
import { DayAvailabilityRow } from "./dayAvailabilityRow";

const defaultSchedule: Record<string, AvailabilityEntry> = {
  monday: {
    day: "monday",
    is_closed: true,
    open_time: "09:00",
    close_time: "17:00",
  },
  tuesday: {
    day: "tuesday",
    is_closed: true,
    open_time: "09:00",
    close_time: "17:00",
  },
  wednesday: {
    day: "wednesday",
    is_closed: true,
    open_time: "09:00",
    close_time: "17:00",
  },
  thursday: {
    day: "thursday",
    is_closed: true,
    open_time: "09:00",
    close_time: "17:00",
  },
  friday: {
    day: "friday",
    is_closed: true,
    open_time: "09:00",
    close_time: "17:00",
  },
  saturday: {
    day: "saturday",
    is_closed: true,
    open_time: "09:00",
    close_time: "17:00",
  },
  sunday: {
    day: "sunday",
    is_closed: true,
    open_time: "09:00",
    close_time: "17:00",
  },
};

const DAYS = Object.keys(defaultSchedule);

interface ScheduleFormProps {
  selectedBusinessId: string | null;
}

export const ScheduleForm = ({ selectedBusinessId }: ScheduleFormProps) => {
  const { data, isLoading } = useAvailability(selectedBusinessId);
  const { mutateAsync: saveAvailability, isPending } = useUpsertAvailability(
    selectedBusinessId!
  );

  const [localEdits, setLocalEdits] = useState<
    Record<string, AvailabilityEntry>
  >({});

  const mergedSchedule = useMemo(() => {
    const initial = DAYS.map((day) => {
      const fromDB = data?.find((d) => d.day === day);
      return fromDB ?? defaultSchedule[day];
    });

    // Apply any local edits on top
    return initial.map((entry) =>
      localEdits[entry.day] ? localEdits[entry.day] : entry
    );
  }, [data, localEdits]);

  const handleChange = (day: string, updated: AvailabilityEntry) => {
    setLocalEdits((prev) => ({ ...prev, [day]: updated }));
  };

  const handleSave = async () => {
    try {
      await saveAvailability(mergedSchedule);
      Alert.alert("Success", "Availability updated");
      setLocalEdits({}); // clear local edits after successful save
    } catch (err: any) {
      Alert.alert("Error", err.message || "Something went wrong");
    }
  };

  const disabled = useMemo(() => {
    return isPending || !selectedBusinessId || isLoading;
  }, [isPending, !selectedBusinessId]);

  return (
    <View style={{ gap: 10 }}>
      {mergedSchedule.map((entry) => (
        <DayAvailabilityRow
          key={entry.day}
          data={entry}
          disabled={!selectedBusinessId}
          onChange={(updated) => handleChange(entry.day, updated)}
        />
      ))}

      <Pressable
        onPress={handleSave}
        disabled={disabled}
        style={[[styles.button, disabled && styles.disabledButton]]}
      >
        <CustomText style={styles.buttonText}>
          {isPending ? "Saving..." : "Save Schedule"}
        </CustomText>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.light.black,
    paddingVertical: 14,
    paddingHorizontal: 14,
    alignItems: "center",
    borderRadius: 8,
    marginTop: 30,
  },
  buttonText: {
    color: Colors.light.white,
    fontFamily: "CarosSoftBold",
    fontSize: 15,
  },
  disabledButton: {
    backgroundColor: Colors.light.muted,
  },
});
