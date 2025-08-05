import {
  createBusiness,
  deleteBusiness,
  getAllBusinesses,
  getBusinessById,
  getBusinessesByUserId,
} from "@/utils";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { Alert } from "react-native";

export const useCreateBusiness = () => {
  return useMutation({
    mutationFn: (formData: FormData) => createBusiness(formData),
  });
};

export const usegetBusinessesByUserId = (id: string) => {
  return useQuery({
    queryKey: ["business", id],
    queryFn: () => getBusinessesByUserId(id),
    enabled: !!id,
  });
};

export const useGetBusinessById = (id: string) => {
  return useQuery({
    queryKey: ["businessById", id],
    queryFn: () => getBusinessById(id),
    enabled: !!id,
  });
};

export const useGetAllBusinessess = () => {
  return useQuery({
    queryKey: ["allBusinesses"],
    queryFn: getAllBusinesses,
    staleTime: 3600000, // Cache data for 1 hour
    refetchOnWindowFocus: false,
  });
};

export const useDeleteBusiness = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (businessId: string) => deleteBusiness(businessId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allBusinesses"] });
      queryClient.invalidateQueries({ queryKey: ["getOwnerBookings"] });
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
    },
  });
};

export const useDeleteBusinessPrompt = (businessId: string) => {
  const router = useRouter();
  const { mutateAsync: deleteBusiness } = useDeleteBusiness();

  const deleteBussiness = async () => {
    Alert.alert("Delete Business", "Are you sure you want to continue?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          try {
            await deleteBusiness(businessId);

            // Redirect to the login screen
            router.replace("/(business)/business");
          } catch (error) {
            console.error("Account deletion failed:", error);
          }
        },
      },
    ]);
  };

  return { deleteBussiness };
};
