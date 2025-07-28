import { StyleProp, ViewStyle } from "react-native";

export interface businessType {
  id: string;
  name: string;
  distance: string;
  rating: number;
  location?: string;
  tag?: "Recommended" | "New" | "Popular" | "Open Now";
  image: any;
}

export const featuredBusinesses: businessType[] = [
  {
    id: "1",
    name: "Fade & Blade Barbers",
    distance: "1.2 km",
    rating: 4.6,
    tag: "Recommended",
    location: "San Pedro, Monterrey",
    image: require("../assets/onBoarding/barber.jpg"),
  },
  {
    id: "2",
    name: "Core & Flow Pilates",
    distance: "2.9 km",
    rating: 4.8,
    tag: "Popular",
    location: "San Jeronimo, Monterrey",
    image: require("../assets/onBoarding/wellness.jpg"),
  },
  {
    id: "3",
    name: "Lush Retreat Spa",
    distance: "0.8 km",
    rating: 4.3,
    tag: "New",
    location: "San Nicolas, Monterrey",
    image: require("../assets/onBoarding/spa1.jpg"),
  },
  {
    id: "4",
    name: "Alans Therapy",
    distance: "3.5 km",
    rating: 4.0,
    tag: "Open Now",
    location: "Apodaca, Monterrey",
    image: require("../assets/onBoarding/therapy.jpg"),
  },
];

export interface marketingCards {
  img: any;
  title: string;
  subtitle: string | number | React.ReactNode;
  extra?: string;
  heading?: string;
  style?: StyleProp<ViewStyle>;
}

export const marketingHome: marketingCards[] = [
  {
    title: "Appointments Made Easy",
    subtitle: "Wait in comfort",
    extra: "Browse and book at anytime.",
    img: require("../assets/onBoarding/book.png"),
  },
  {
    title: "Discover Trusted Businesses",
    subtitle: "Local and verified",
    extra: "Find top-rated services near you from barbers to pilates.",
    img: require("../assets/onBoarding/book.png"),
  },
];

export interface favoriteCardsT {
  img: any;
  title: string;
  subtitle: string;
  extra?: string;
  heading?: string;
}

export interface bookingClientCardT {
  id: string;
  businessName: string;
  img: string | any; // or ImageSourcePropType if using local assets
  date: string; // e.g., "July 22"
  time: string; // e.g., "4:30 PM"
  location?: string; // For "Get Directions"
  calendarUrl?: string; // Deep link or ICS generator
}

export const mockClientBookings: bookingClientCardT[] = [
  {
    id: "1",
    businessName: "Glow Hair Studio",
    img: require("../assets/onBoarding/barber.jpg"),
    date: "July 25",
    time: "4:30 PM",
    location: "Av. Reforma 123, CDMX",
    calendarUrl: "https://calendar.google.com/event?eid=abc123",
  },
  {
    id: "2",
    businessName: "Zen Pilates",
    img: require("../assets/onBoarding/wellness.jpg"),
    date: "August 2",
    time: "10:00 AM",
    location: "Insurgentes Sur 456, CDMX",
    calendarUrl: "https://calendar.google.com/event?eid=def456",
  },
];
