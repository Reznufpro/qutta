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

export const getFirstName = (name: string): string => {
  return name.trim().split(" ")[0];
};
