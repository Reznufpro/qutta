import * as Calendar from "expo-calendar";
import { Alert, Linking } from "react-native";

interface handleDirectionsProps {
  location: string | undefined;
}

export const handleDirections = ({ location }: handleDirectionsProps) => {
  if (location) {
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      location
    )}`;
    Linking.openURL(url);
  }
};

export const addToCalendar = async (
  title: string,
  dueDate: string,
  location: string | undefined
) => {
  const { status } = await Calendar.requestCalendarPermissionsAsync();
  if (status !== "granted") {
    throw new Error("Calendar permission not granted");
  }

  const calendars = await Calendar.getCalendarsAsync(
    Calendar.EntityTypes.EVENT
  );

  const defaultCalendar =
    calendars.find(
      (cal) =>
        cal.allowsModifications &&
        cal.accessLevel === Calendar.CalendarAccessLevel.OWNER
    ) || (await Calendar.getDefaultCalendarAsync());

  const calendarId = defaultCalendar.id;

  await Calendar.createEventAsync(calendarId, {
    title: `Appointment at: ${title}`,
    startDate: dueDate,
    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    location: location,
    notes: `Your appointment is at: ${location}`,
  });
};

export const handleOpenEmail = async (email: string) => {
  const url = `mailto:${email}`;

  try {
    const canOpen = await Linking.canOpenURL(url);
    if (canOpen) {
      await Linking.openURL(url);
    } else {
      Alert.alert("Unable to open email app.");
    }
  } catch (error) {
    console.error("Error opening email link:", error);
    Alert.alert("Something went wrong when trying to open your email app.");
  }
};

export const handleCallNumber = async (phoneNumber: string) => {
  const url = `tel:${phoneNumber}`;

  try {
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    } else {
      Alert.alert(
        "Unable to initiate call",
        "Phone call not supported on this device."
      );
    }
  } catch (error) {
    console.error("Error trying to make a call:", error);
    Alert.alert("Something went wrong while trying to place the call.");
  }
};
