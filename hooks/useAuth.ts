import { checkEmailExists, registerUser } from "@/utils";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useRegisterUser = () => {
  return useMutation({
    mutationFn: registerUser,
  });
};

export const useCheckEmailExists = (email: string, enabled = false) => {
  return useQuery({
    queryKey: ["checkEmail", email],
    queryFn: () => checkEmailExists(email),
    enabled: enabled && !!email,
    retry: false,
  });
};
