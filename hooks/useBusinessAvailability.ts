import { AvailabilityEntry } from "@/types";
import {
  deleteAvailabilityDay,
  getAvailability,
  updateAvailabilityDay,
  upsertAvailability,
} from "@/utils/api/businessAvailability";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useAvailability = (businessId: string | null) => {
  return useQuery({
    queryKey: ["availability", businessId],
    queryFn: () => getAvailability(businessId!),
    staleTime: 1000 * 60 * 60, // 1 hour
    refetchOnWindowFocus: false,
    enabled: !!businessId,
  });
};

export const useUpsertAvailability = (businessId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (availabilities: AvailabilityEntry[]) =>
      upsertAvailability(businessId, availabilities),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["availability", businessId],
      });
    },
  });
};

export const useUpdateAvailabilityDay = (businessId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: { day: string; availability: AvailabilityEntry }) =>
      updateAvailabilityDay(businessId, data.day, data.availability),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["availability", businessId],
      });
    },
  });
};

export const useDeleteAvailabilityDay = (businessId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (day: string) => deleteAvailabilityDay(businessId, day),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["availability", businessId],
      });
    },
  });
};
