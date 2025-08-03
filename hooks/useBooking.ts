import { bookingData } from "@/context/bookingContext";
import {
  cancelBooking,
  createBooking,
  getBookingById,
  getClientBookings,
  getOwnerBookings,
} from "@/utils";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useCreateBooking = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (booking: bookingData) => createBooking(booking),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
    },
  });
};

// Mutation: Cancel a booking by ID
export const useCancelBooking = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (bookingId: string) => cancelBooking(bookingId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
      queryClient.invalidateQueries({ queryKey: ["getOwnerBookings"] });
    },
  });
};

// Query: Get a single booking by ID
export const useBookingById = (bookingId: string) => {
  return useQuery({
    queryKey: ["booking", bookingId],
    queryFn: () => getBookingById(bookingId),
    enabled: !!bookingId,
    staleTime: 3600000, // Cache data for 1 hour
    refetchOnWindowFocus: false,
  });
};

// Query: Get all bookings for the client
export const useClientBookings = () => {
  return useQuery({
    queryKey: ["bookings"],
    queryFn: getClientBookings,
    staleTime: 3600000,
    refetchOnWindowFocus: false,
  });
};

export const useGetOwnerBookings = () => {
  return useQuery({
    queryKey: ["getOwnerBookings"],
    queryFn: getOwnerBookings,
    staleTime: 3600000,
    refetchOnWindowFocus: false,
  });
};
