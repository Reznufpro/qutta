import { BASE_URL } from "@/constants";
import { AvailabilityEntry } from "@/types";
import { getAuthHeaders } from "./auth";

// Get all availability entries for a business
export const getAvailability = async (
  businessId: string
): Promise<AvailabilityEntry[]> => {
  const headers = await getAuthHeaders();

  const res = await fetch(`${BASE_URL}businesses/${businessId}/availability`, {
    method: "GET",
    headers,
  });

  if (!res.ok) {
    const error = await res.text();
    throw new Error(error || "Failed to fetch availability");
  }

  return res.json();
};

// Bulk upsert availability (send array of AvailabilityEntry)
export const upsertAvailability = async (
  businessId: string,
  availabilities: AvailabilityEntry[]
): Promise<{ message: string }> => {
  const headers = await getAuthHeaders();
  headers["Content-Type"] = "application/json";

  const res = await fetch(`${BASE_URL}businesses/${businessId}/availability`, {
    method: "POST",
    headers,
    body: JSON.stringify(availabilities),
  });

  if (!res.ok) {
    const error = await res.text();
    throw new Error(error || "Failed to update availability");
  }

  return res.json();
};

// Update a single day's availability
export const updateAvailabilityDay = async (
  businessId: string,
  day: string,
  availability: AvailabilityEntry
): Promise<AvailabilityEntry> => {
  const headers = await getAuthHeaders();
  headers["Content-Type"] = "application/json";

  const res = await fetch(
    `${BASE_URL}businesses/${businessId}/availability/${day}`,
    {
      method: "PUT",
      headers,
      body: JSON.stringify(availability),
    }
  );

  if (!res.ok) {
    const error = await res.text();
    throw new Error(error || "Failed to update availability day");
  }

  return res.json();
};

// Delete availability for a single day
export const deleteAvailabilityDay = async (
  businessId: string,
  day: string
): Promise<{ message: string }> => {
  const headers = await getAuthHeaders();

  const res = await fetch(
    `${BASE_URL}businesses/${businessId}/availability/${day}`,
    {
      method: "DELETE",
      headers,
    }
  );

  if (!res.ok) {
    const error = await res.text();
    throw new Error(error || "Failed to delete availability day");
  }

  return res.json();
};
