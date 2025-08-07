import { Ionicons } from "@expo/vector-icons";

export type profileT = {
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  iconRight?: keyof typeof Ionicons.glyphMap;
  func?: true;
  link?: any;
  href?: string;
};

export const getAccountSettings = (): profileT[] => [
  {
    label: "Personal information",
    icon: "person-outline",
    link: "/accountSettings/personalInfo",
    iconRight: "chevron-forward-outline",
  },
  {
    label: "Login & Security",
    icon: "shield-outline",
    link: "/accountSettings/loginSecurity",
    iconRight: "chevron-forward-outline",
  },
];

export const getLegal = (): profileT[] => [
  {
    label: "Terms of Service",
    icon: "book-outline",
    href: "https://www.apple.com/legal/internet-services/itunes/dev/stdeula/",
    iconRight: "chevron-forward-outline",
  },
  {
    label: "Privacy policy",
    icon: "book-outline",
    href: "https://docs.google.com/document/d/1tYMO05iIo9z0gSp7_teda2V22ME3EsjMlp3r1Gb10Nk/edit?usp=sharing",
    iconRight: "chevron-forward-outline",
  },
];

export const allProfileItems = (): profileT[] => [
  {
    label: "Create a new business",
    icon: "business-outline",
    iconRight: "chevron-forward-outline",
    link: "/onboarding/business/intro",
  },
  {
    label: "Personal information",
    icon: "person-outline",
    link: "/accountSettings/personalInfo",
    iconRight: "chevron-forward-outline",
  },
  {
    label: "Login & Security",
    icon: "shield-outline",
    link: "/accountSettings/loginSecurity",
    iconRight: "chevron-forward-outline",
  },
  {
    label: "Get help",
    icon: "help-circle-outline",
    href: "https://www.okekedev.com",
    iconRight: "chevron-forward-outline",
  },
  {
    label: "Legal",
    icon: "book-outline",
    link: "/legal/",
    iconRight: "chevron-forward-outline",
  },
];

export const allSettings = (): profileT[] => [
  {
    label: "Personal information",
    icon: "person-outline",
    link: "/accountSettings/personalInfo",
    iconRight: "chevron-forward-outline",
  },
  {
    label: "Login & Security",
    icon: "shield-outline",
    link: "/accountSettings/loginSecurity",
    iconRight: "chevron-forward-outline",
  },
  {
    label: "Get help",
    icon: "help-circle-outline",
    href: "https://www.okekedev.com",
    iconRight: "chevron-forward-outline",
  },
  {
    label: "Legal",
    icon: "book-outline",
    link: "/legal/",
    iconRight: "chevron-forward-outline",
  },
];
