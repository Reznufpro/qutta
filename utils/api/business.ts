import { BASE_URL } from "@/constants";
import { BusinessData } from "@/types";
import { getAuthHeaders } from "./auth";

export const createBusiness = async (formData: FormData): Promise<any> => {
  const headers = await getAuthHeaders();

  const res = await fetch(`${BASE_URL}business/create`, {
    method: "POST",
    headers,
    body: formData,
  });

  if (!res.ok) {
    const error = await res.text();
    throw new Error(error || "Failed to create business");
  }

  return res.json();
};

export const getBusinessesByUserId = async (
  id: string
): Promise<BusinessData[]> => {
  const headers = await getAuthHeaders();

  const res = await fetch(`${BASE_URL}business/${id}`, {
    method: "GET",
    headers,
  });

  if (!res.ok) {
    const error = await res.text();
    throw new Error(error || "Failed to fetch business");
  }

  const response: BusinessData[] = await res.json();

  return response;
};

export const getBusinessById = async (id: string): Promise<BusinessData> => {
  const headers = await getAuthHeaders();

  const res = await fetch(`${BASE_URL}business/item/${id}`, {
    method: "GET",
    headers,
  });

  if (!res.ok) {
    const error = await res.text();
    throw new Error(error || "Failed to fetch business");
  }

  return res.json();
};

export const getAllBusinesses = async (): Promise<BusinessData[]> => {
  const headers = await getAuthHeaders();

  const res = await fetch(`${BASE_URL}business/businesses`, {
    method: "GET",
    headers,
  });

  if (!res.ok) {
    const error = await res.text();
    throw new Error(error || "Failed to fetch business");
  }

  const response: BusinessData[] = await res.json();

  return response;
};
