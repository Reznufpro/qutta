import { AvailabilityEntry } from "@/types";
import { format } from "date-fns";

export const getTimeOfDay = (): string => {
  const currentHour = new Date().getHours();

  if (currentHour >= 0 && currentHour < 12) {
    return "Good morning!";
  } else if (currentHour >= 12 && currentHour < 23) {
    return "Good afternoon!";
  } else {
    return "Good day!";
  }
};

export const capitalize = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const getFirstName = (name: string): string => {
  return name.trim().split(" ")[0];
};

export const getInitials = (name: string) => {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase();
};

export const trimTextToOneLine = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;

  const trimmed = text.slice(0, maxLength);
  const lastSpace = trimmed.lastIndexOf(" ");

  return trimmed.slice(0, lastSpace) + "…";
};

export const getShortLocation = (address: string): string => {
  const parts = address.split(",").map((part) => part.trim());

  if (parts.length < 2) return address;

  const withoutState = parts.slice(0, -1);
  const result = withoutState.slice(-2);

  return result.join(", ");
};

export const formatTime = (time?: string) => {
  if (!time) return "";
  const [hourStr, minuteStr] = time.split(":");
  let hour = parseInt(hourStr);
  const minute = parseInt(minuteStr);
  const ampm = hour >= 12 ? "PM" : "AM";
  hour = hour % 12 || 12;
  return `${hour}:${minute.toString().padStart(2, "0")} ${ampm}`;
};

export const formatTimeLinear = (timeStr?: string) => {
  if (!timeStr) return "";
  const [hours, minutes] = timeStr.split(":");
  const date = new Date();
  date.setHours(Number(hours), Number(minutes));
  return format(date, "h:mm a"); // e.g., "9:00 AM"
};

export const getTodaySchedule = (availability: AvailabilityEntry[]) => {
  const today = format(new Date(), "EEEE").toLowerCase(); // "monday", "tuesday", etc.

  const entry = availability.find((d) => d.day === today);

  if (!entry || entry.is_closed) return "Closed";

  return `${formatTime(entry.open_time)} - ${formatTime(entry.close_time)}`;
};
