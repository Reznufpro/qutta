import {
  addToFavorites,
  getFavorites,
  removeFromFavorites,
} from "@/utils/api/favorites";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// Get favorites
export const useFavorites = () =>
  useQuery({
    queryKey: ["favorites"],
    queryFn: getFavorites,
    staleTime: 3600000, // Cache data for 1 hour
    refetchOnWindowFocus: false,
  });

// Add favorite
export const useAddFavorite = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addToFavorites,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["favorites"] });
    },
  });
};

// Remove favorite
export const useRemoveFavorite = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: removeFromFavorites,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["favorites"] });
    },
  });
};
