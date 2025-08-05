import { AvailabilityEntry } from "@/types";
import { format, formatDistanceToNow } from "date-fns";

export const getTimeOfDay = (): string => {
  const currentHour = new Date().getHours();

  if (currentHour >= 5 && currentHour < 12) {
    return "Good morning!";
  } else if (currentHour >= 12 && currentHour < 17) {
    return "Good afternoon!";
  } else if (currentHour >= 17 && currentHour < 21) {
    return "Good evening!";
  } else {
    return "Good night!";
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

export const formatISODate = (date: string | null | undefined): string => {
  if (!date || date.trim() === "") {
    return "Recently joined";
  }

  try {
    const parsedDate = new Date(date);

    // Check if the date is valid
    if (isNaN(parsedDate.getTime())) {
      return "Recently joined";
    }

    const formatted = `Joined ${formatDistanceToNow(parsedDate, {
      addSuffix: true,
    })}`;

    return formatted;
  } catch (error) {
    console.warn("Error formatting date:", error);
    return "Recently joined";
  }
};
