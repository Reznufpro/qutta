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

export const getShortLocation = (address: string): string => {
  const parts = address.split(",").map((part) => part.trim());

  if (parts.length < 2) return address;

  const withoutState = parts.slice(0, -1);
  const result = withoutState.slice(-2);

  return result.join(", ");
};
