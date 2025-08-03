import { Colors } from "@/constants/Colors";
import { JSX } from "react";
import { Image, ImageStyle, StyleProp } from "react-native";

export const getIconNameClient = (
  routeName: string,
  focused: boolean
): JSX.Element => {
  const iconStyle: StyleProp<ImageStyle> = {
    width: 24,
    height: 24,
    tintColor: focused ? Colors.light.black : "grey",
  };

  switch (routeName) {
    case "home":
      return (
        <Image
          source={require("../assets/icons/home.png")}
          style={iconStyle}
          resizeMode="contain"
        />
      );
    case "profile":
      return (
        <Image
          source={require("../assets/icons/profile.png")}
          style={iconStyle}
          resizeMode="contain"
        />
      );
    case "favorites":
      return (
        <Image
          source={require("../assets/icons/heart.png")}
          style={iconStyle}
          resizeMode="contain"
        />
      );
    case "bookings":
      return (
        <Image
          source={require("../assets/icons/calendar.png")}
          style={iconStyle}
          resizeMode="contain"
        />
      );
    default:
      return (
        <Image
          source={require("../assets/icons/home.png")}
          style={iconStyle}
          resizeMode="contain"
        />
      );
  }
};

export const getIconNameBusiness = (
  routeName: string,
  focused: boolean
): JSX.Element => {
  const iconStyle: StyleProp<ImageStyle> = {
    width: 24,
    height: 24,
    tintColor: focused ? Colors.light.black : "grey",
  };

  switch (routeName) {
    case "dashboard":
      return (
        <Image
          source={require("../assets/icons/homeB.png")}
          style={iconStyle}
          resizeMode="contain"
        />
      );
    case "waitlist":
      return (
        <Image
          source={require("../assets/icons/waitlist.png")}
          style={iconStyle}
          resizeMode="contain"
        />
      );
    case "schedule":
      return (
        <Image
          source={require("../assets/icons/calendar.png")}
          style={iconStyle}
          resizeMode="contain"
        />
      );
    case "business":
      return (
        <Image
          source={require("../assets/icons/profileB.png")}
          style={iconStyle}
          resizeMode="contain"
        />
      );
    case "menu":
      return (
        <Image
          source={require("../assets/icons/menu.png")}
          style={iconStyle}
          resizeMode="contain"
        />
      );
    default:
      return (
        <Image
          source={require("../assets/icons/homeB.png")}
          style={iconStyle}
          resizeMode="contain"
        />
      );
  }
};
