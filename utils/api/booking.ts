import { BASE_URL } from "@/constants";
import { bookingData } from "@/context/bookingContext";
import { BookingReturnType, clientList, OwnerBookingReturnType } from "@/types";
import { getAuthHeaders } from "./auth";

export const createBooking = async (bookingData: bookingData) => {
  const headers = await getAuthHeaders();

  const payload = {
    business_id: bookingData.business.id,
    staff_id: bookingData.staff?.id || null,
    datetime: bookingData.dateTime,
    services: bookingData.service.map((s) => ({
      title: s.title,
      time: s.time,
      price: s.price,
    })),
    total_price: bookingData.total || 0,
  };

  const res = await fetch(`${BASE_URL}booking/create`, {
    method: "POST",
    headers,
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const error = await res.text();
    throw new Error(error || "Failed to create booking");
  }

  return res.json();
};

export const getBookingById = async (bookingId: string) => {
  const headers = await getAuthHeaders();

  const res = await fetch(`${BASE_URL}booking/${bookingId}`, {
    method: "GET",
    headers,
  });

  if (!res.ok) {
    const error = await res.text();
    throw new Error(error || "Failed to fetch booking");
  }

  return res.json();
};

export const getClientBookings = async () => {
  const headers = await getAuthHeaders();

  const res = await fetch(`${BASE_URL}booking`, {
    method: "GET",
    headers,
  });

  if (!res.ok) {
    const error = await res.text();
    throw new Error(error || "Failed to fetch client bookings");
  }

  const response: BookingReturnType[] = await res.json();

  return response;
};

export const getOwnerBookings = async () => {
  const headers = await getAuthHeaders();

  const res = await fetch(`${BASE_URL}booking/getBookings`, {
    method: "GET",
    headers,
  });

  if (!res.ok) {
    const error = await res.text();
    throw new Error(error || "Failed to fetch client bookings");
  }

  const response: OwnerBookingReturnType[] = await res.json();

  return response;
};

export const cancelBooking = async (bookingId: string) => {
  const headers = await getAuthHeaders();

  const res = await fetch(`${BASE_URL}booking/${bookingId}/cancel`, {
    method: "PUT",
    headers,
  });

  if (!res.ok) {
    throw new Error("Failed to cancel booking");
  }

  return res.json();
};

export const getClientList = async (businessId: string) => {
  const headers = await getAuthHeaders();

  const res = await fetch(`${BASE_URL}booking/clients/${businessId}`, {
    method: "GET",
    headers,
  });

  if (!res.ok) {
    throw new Error("Failed to fetch client list");
  }

  const response: clientList = await res.json();

  return response;
};
