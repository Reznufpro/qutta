import { BASE_URL } from "@/constants";
import { Favorites } from "@/types";
import { getAuthHeaders } from "./auth";

// Add to Favorites
export const addToFavorites = async (businessId: string): Promise<any> => {
  const headers = await getAuthHeaders();

  const res = await fetch(`${BASE_URL}favorite`, {
    method: "POST",
    headers,
    body: JSON.stringify({ businessId }),
  });

  if (!res.ok) {
    const error = await res.text();
    throw new Error(error || "Failed to add favorite");
  }

  return res.json();
};

// Remove from Favorites
export const removeFromFavorites = async (businessId: string): Promise<any> => {
  const headers = await getAuthHeaders();

  const res = await fetch(`${BASE_URL}favorite/${businessId}`, {
    method: "DELETE",
    headers,
  });

  if (!res.ok) {
    const error = await res.text();
    throw new Error(error || "Failed to remove favorite");
  }

  return res.json();
};

// Get All Favorites
export const getFavorites = async (): Promise<Favorites[]> => {
  const headers = await getAuthHeaders();

  const res = await fetch(`${BASE_URL}favorite`, {
    method: "GET",
    headers,
  });

  if (!res.ok) {
    const error = await res.text();
    throw new Error(error || "Failed to fetch favorites");
  }

  const response: Favorites[] = await res.json();

  return response;
};
