import {
  createBusiness,
  getBusinessById,
  getBusinessesByUserId,
} from "@/utils";
import { useMutation, useQuery } from "@tanstack/react-query";

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
