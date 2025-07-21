/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = "#0a7ea4";
const tintColorDark = "#fff";

export const Colors = {
  light: {
    // Base brand colors
    text: "#1A1A1A", // Soft black for high contrast text
    textSecondary: "#666",
    background: "#FDF6EC", // Cream background
    primary: "#CBB89D", // Light brown (elegant, warm)
    highlight: "#D8BBA2", // Slightly brighter accent for hover/active
    button: "#7A5C3E", // Rich dark brown for CTA
    icon: "#1A1A1A", // Dark icons for contrast
    border: "#E6DCCF", // Light border or divider color
    muted: "#C8C8C8",

    // Brand accents
    tint: "#7A5C3E", // Matches button (brand accent)
    tabIconDefault: "#C2B5A0", // Subtle beige for inactive tabs
    tabIconSelected: "#7A5C3E", // Active tab with brand brown

    // Optional extras
    white: "#FFFFFF",
    black: "#000000", // For overlays or strong elements
    softBlack: "#1A1A1A",
    cream: "#FDF6EC",
    lightBrown: "#CBB89D",
    darkBrown: "#7A5C3E",
  },
  dark: {
    text: "#ECEDEE",
    background: "#151718",
    tint: tintColorDark,
    icon: "#9BA1A6",
    tabIconDefault: "#9BA1A6",
    tabIconSelected: tintColorDark,
  },
};
