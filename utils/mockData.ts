import { StyleProp, ViewStyle } from "react-native";

export interface businessType {
  id: string;
  name: string;
  distance: string;
  rating: number;
  coordinates?: {
    latitude?: number;
    longitude?: number;
    location: string;
  };
  tag?: "Recommended" | "New" | "Popular" | "Open Now";
  image: any[];
}

export const featuredBusinesses: businessType[] = [
  {
    id: "1",
    name: "Fade & Blade Barbers",
    distance: "1.2 km",
    rating: 4.6,
    tag: "Recommended",
    coordinates: {
      location: "San Pedro, Monterrey",
    },
    image: [require("../assets/onBoarding/barber.jpg")],
  },
  {
    id: "2",
    name: "Core & Flow Pilates",
    distance: "2.9 km",
    rating: 4.8,
    tag: "Popular",
    coordinates: {
      location: "San Jeronimo, Monterrey",
    },
    image: require("../assets/onBoarding/wellness.jpg"),
  },
  {
    id: "3",
    name: "Lush Retreat Spa",
    distance: "0.8 km",
    rating: 4.3,
    tag: "New",
    coordinates: {
      location: "San Nicolas, Monterrey",
    },
    image: [require("../assets/onBoarding/spa1.jpg")],
  },
  {
    id: "4",
    name: "Alans Therapy",
    distance: "3.5 km",
    rating: 4.0,
    tag: "Open Now",
    coordinates: {
      location: "Apodaca, Monterrey",
    },
    image: [require("../assets/onBoarding/therapy.jpg")],
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
    img: require("../assets/onBoarding/book1.png"),
  },
  {
    title: "Discover Trusted Businesses",
    subtitle: "Local and verified",
    extra: "Find top-rated services near you from barbers to pilates.",
    img: require("../assets/onBoarding/discover.png"),
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
  service?: {
    price?: string;
    serviceTitle?: string;
    staff?: string;
  }[];
}

export const mockClientBookings: bookingClientCardT[] = [
  {
    id: "1",
    businessName: "Glow Hair Studio",
    img: require("../assets/onBoarding/barber.jpg"),
    date: "July 25",
    time: "4:30 PM",
    location: "Av. Reforma 123, CDMX",
    service: [
      { serviceTitle: "Corte Clasico", price: "230", staff: "Santiago" },
      { serviceTitle: "Barba", price: "330" },
    ],
    calendarUrl: "https://calendar.google.com/event?eid=abc123",
  },
  {
    id: "2",
    businessName: "Zen Pilates",
    img: require("../assets/onBoarding/wellness.jpg"),
    date: "August 2",
    time: "10:00 AM",
    location: "Insurgentes Sur 456, CDMX",
    service: [
      { serviceTitle: "Corte Clasico", price: "230", staff: "Santiago" },
    ],
    calendarUrl: "https://calendar.google.com/event?eid=def456",
  },
];

export interface bookingT extends bookingClientCardT {}

export const mockBooking: bookingT = {
  id: "1",
  businessName: "Glow Hair Studio",
  img: require("../assets/onBoarding/barber.jpg"),
  date: "July 25",
  time: "4:30 PM",
  location:
    "Avenida Paseo de los Leones 157, Local 17, Cumbres Elite, Monterrey, Nuevo León",
  service: [
    { serviceTitle: "Corte Clasico", price: "230", staff: "Santiago" },
    { serviceTitle: "Barba", price: "330", staff: "Collins" },
  ],
  calendarUrl: "https://calendar.google.com/event?eid=abc123",
};

export interface fullBusinessT extends businessType {
  closeTime: string;
  about: string;
  staff: {
    id: string;
    name: string;
    rating?: number;
    image?: any;
  }[];
  services: {
    [key: number]: {
      title: string;
      service: {
        title: string;
        time: string;
        price: number;
        description?: string;
      }[];
    };
  };
}

export const mockBusiness: fullBusinessT = {
  id: "1",
  image: [
    require("../assets/onBoarding/barber.jpg"),
    require("../assets/onBoarding/wellness.jpg"),
    require("../assets/onBoarding/spa1.jpg"),
  ],
  name: "Fade & Blade Barbers",
  about:
    "At Leones, we believe every client deserves precision, care, and consistency. Our barbers are trained professionals committed to delivering high-quality grooming services in a welcoming environment.",
  distance: "1.2 km",
  rating: 4.6,
  tag: "New",
  closeTime: "1:30pm",
  coordinates: {
    latitude: 25.7167,
    longitude: -100.3625,
    location:
      "Avenida Paseo de los Leones 157, Local 17, Cumbres Elite, Monterrey, Nuevo León",
  },
  staff: [
    {
      id: "101",
      name: "Emmanuel Okeke",
      rating: 4.5,
      image: require("../assets/images/yo.jpeg"),
    },
    {
      id: "102",
      name: "Chidindu Okeks",
      rating: 5,
      image: require("../assets/images/yo.jpeg"),
    },
    {
      id: "103",
      name: "Chidera Okeke",
      rating: 5,
      image: require("../assets/images/yo.jpeg"),
    },
    {
      id: "104",
      name: "Okeks",
      rating: 5,
      image: require("../assets/images/yo.jpeg"),
    },
    {
      id: "105",
      name: "Test",
      rating: 5,
      image: require("../assets/images/yo.jpeg"),
    },
    {
      id: "106",
      name: "Random Staff",
      rating: 5,
    },
  ],
  services: {
    0: {
      title: "Barbering",
      service: [
        {
          title: "Delineado Express",
          time: "15 mins",
          price: 100,
          description: "Line up the hair, fresh and new.",
        },
        {
          title: "Express cut",
          time: "15 mins",
          price: 150,
          description: "Line up the hair",
        },
        {
          title: "Cut",
          time: "15 mins",
          price: 150,
          description: "fresh and new.",
        },
        {
          title: "Fresher",
          time: "15 mins",
          price: 150,
          description: "Line up the hair, fresh and new.",
        },
        {
          title: "Fresh cut",
          time: "15 mins",
          price: 150,
          description: "Line up the hair, fresh and new.",
        },
      ],
    },
    1: {
      title: "Facial",
      service: [
        {
          title: "Black Mask",
          time: "20 mins",
          price: 50,
          description: "Line up the hair, fresh and new.",
        },
        {
          title: "Facial Completo",
          time: "1 hour",
          price: 350,
          description: "Line up the hair, fresh and new.",
        },
      ],
    },
  },
};

export const user = {
  name: "Emmanuel Okeke",
  image: require("../assets/images/yo.jpeg"),
  type: "Client",
  joined: "3 months ago",
  reviews: 24,
  appointments: 12,
  completionRate: "100%",
};
