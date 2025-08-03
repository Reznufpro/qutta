import CustomText from "@/components/ui/customText";
import { Colors } from "@/constants/Colors";
import { bookingData } from "@/context/bookingContext";
import { AvailabilityEntry } from "@/types"; // Adjust path
import { capitalize } from "@/utils";
import { addMinutes, format, isBefore, parse } from "date-fns";
import { useMemo, useState } from "react";
import { Pressable, ScrollView, StyleSheet, View } from "react-native";
import { DayBubble } from "./dayBubble";
import { TimeSlotButton } from "./timeSlotButton";

const TIME_INTERVAL = 30;

interface BookingTimeSelectorProps {
  handleSave: () => void;
  bookingData: bookingData;
  availability: AvailabilityEntry[];
  setBookingData: React.Dispatch<React.SetStateAction<bookingData>>;
}

export const BookingTimeSelector = ({
  handleSave,
  bookingData,
  availability,
  setBookingData,
}: BookingTimeSelectorProps) => {
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const selectedEntry = useMemo(
    () => availability.find((a) => a.day === selectedDay),
    [selectedDay]
  );

  const timeSlots = useMemo(() => {
    if (
      !selectedEntry ||
      selectedEntry.is_closed ||
      !selectedEntry.open_time ||
      !selectedEntry.close_time
    )
      return [];

    const open = parse(selectedEntry.open_time, "HH:mm:ss", new Date());
    const close = parse(selectedEntry.close_time, "HH:mm:ss", new Date());

    const slots: string[] = [];
    let current = open;

    while (isBefore(current, close)) {
      slots.push(format(current, "h:mm a"));
      current = addMinutes(current, TIME_INTERVAL);
    }

    return slots;
  }, [selectedEntry]);

  const disabled = useMemo(() => {
    return !bookingData.dateTime;
  }, [bookingData.dateTime]);

  return (
    <View style={styles.container}>
      {/* Days */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.dayScroll}
      >
        {availability.map((entry, index) => (
          <DayBubble
            key={index}
            label={entry.day.slice(0, 3)} // "Mon"
            isActive={selectedDay === entry.day}
            onPress={() => {
              setSelectedDay(entry.day);
              setSelectedTime(null);
            }}
          />
        ))}
      </ScrollView>

      {/* Time Slots */}
      <ScrollView
        scrollEnabled
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.timeSlotContainer}
      >
        {timeSlots.length > 0
          ? timeSlots.map((slot, index) => (
              <TimeSlotButton
                key={index}
                time={slot}
                isSelected={selectedTime === slot}
                onPress={() => {
                  setSelectedTime(slot);

                  if (selectedDay) {
                    const formattedDateTime = `${capitalize(
                      selectedDay
                    )} at ${slot}`;
                    setBookingData((prev) => ({
                      ...prev,
                      dateTime: formattedDateTime,
                    }));
                  }
                }}
              />
            ))
          : selectedDay !== null && (
              <CustomText style={styles.noTimeSlot}>
                No available time slots
              </CustomText>
            )}
      </ScrollView>

      {selectedTime !== null && (
        <Pressable
          onPress={handleSave}
          disabled={disabled}
          style={[[styles.button, disabled && styles.disabledButton]]}
        >
          <CustomText style={styles.buttonText}>Continue</CustomText>
        </Pressable>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 12,
  },
  dayScroll: {
    marginBottom: 24,
    paddingHorizontal: 4,
  },
  timeSlotContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingBottom: 20,
  },
  selectedText: {
    marginTop: 16,
    fontSize: 16,
    fontWeight: "500",
    textAlign: "center",
    color: "#333",
  },
  noTimeSlot: {
    fontFamily: "CarosSoftBold",
    fontSize: 18,
    color: Colors.light.black,
    marginTop: 20,
  },
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
