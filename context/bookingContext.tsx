import { createContext, FC, useContext, useState } from "react";

export type bookingData = {
  business: {
    name: string;
    image: any[];
    date?: string;
    rating: number;
    coordinates?: {
      latitude?: number;
      longitude?: number;
      location: string;
    };
  };
  service: {
    title: string;
    time: string;
    price: number;
    description?: string;
  }[];
  staff?: {
    id: string;
    name: string;
    rating?: number;
    image?: any;
  };
  total: number | null;
};

export const initialBookingData: bookingData = {
  business: {
    name: "",
    image: [],
    date: "",
    rating: 0,
    coordinates: {
      location: "",
      latitude: 0,
      longitude: 0,
    },
  },
  service: [],
  staff: {
    id: "",
    name: "",
    rating: 0,
    image: "",
  },
  total: 0,
};

interface BookingContextType {
  booking: {
    bookingData: bookingData;
    resetBookingData: () => void;
    setBooking: (booking: bookingData) => void;
    setBookingData: React.Dispatch<React.SetStateAction<bookingData>>;
  };
}

const BookingContext = createContext<BookingContextType["booking"] | null>(
  null
);

interface bookingProviderProps {
  children: React.ReactNode;
}

export const BookingProvider: FC<bookingProviderProps> = ({ children }) => {
  const [bookingData, setBookingData] =
    useState<bookingData>(initialBookingData);

  const resetBookingData = () => setBookingData(initialBookingData);

  const setBooking = (booking: bookingData) => {
    setBookingData(booking);
  };

  return (
    <BookingContext.Provider
      value={{ bookingData, resetBookingData, setBooking, setBookingData }}
    >
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => {
  const context = useContext(BookingContext);

  if (!context) {
    throw new Error("useListing must be used within a BookingProvider");
  }
  return context;
};
