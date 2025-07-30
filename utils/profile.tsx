import { Ionicons } from "@expo/vector-icons";

export type profileT = {
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  iconRight?: keyof typeof Ionicons.glyphMap;
  func?: true;
  link?: any;
};

export const getProfileTop = (): profileT[] => [
  {
    label: "Account settings",
    icon: "settings-outline",
    link: "/accountSettings/",
    iconRight: "chevron-forward-outline",
  },
  {
    label: "View profile",
    icon: "person-outline",
    link: "/profile/",
    iconRight: "chevron-forward-outline",
  },
  {
    label: "History",
    icon: "time-outline",
    link: "/history/",
    iconRight: "chevron-forward-outline",
  },
];

export const getAccountSettings = (): profileT[] => [
  {
    label: "Personal information",
    icon: "person-outline",
    link: "/",
    iconRight: "chevron-forward-outline",
  },
  {
    label: "Login & Security",
    icon: "shield-outline",
    link: "/",
    iconRight: "chevron-forward-outline",
  },
  {
    label: "Translation",
    icon: "language-outline",
    link: "/",
    iconRight: "chevron-forward-outline",
  },
];

export const getLegal = (): profileT[] => [
  {
    label: "Terms of Service",
    icon: "book-outline",
    link: "/",
    iconRight: "chevron-forward-outline",
  },
  {
    label: "Privacy policy",
    icon: "book-outline",
    link: "/",
    iconRight: "chevron-forward-outline",
  },
];

export const getProfileBottom = (): profileT[] => [
  {
    label: "Get help",
    icon: "help-circle-outline",
    link: "/",
    iconRight: "chevron-forward-outline",
  },
  {
    label: "Legal",
    icon: "book-outline",
    link: "/legal/",
    iconRight: "chevron-forward-outline",
  },
  { label: "Log out", icon: "log-out-outline", func: true },
];
