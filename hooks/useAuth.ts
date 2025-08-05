import { useSelectedBusiness } from "@/context/selectedBusinessContext";
import { useUserData } from "@/context/userContext";
import {
  appleLogin,
  checkEmailExists,
  deleteUser,
  loginUser,
  registerUser,
  setRole,
} from "@/utils";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { Alert } from "react-native";

export const useRegisterUser = () => {
  return useMutation({
    mutationFn: registerUser,
  });
};

export const useLoginUser = () => {
  return useMutation({
    mutationFn: loginUser,
  });
};

export const useAppleAuth = () => {
  return useMutation({
    mutationFn: appleLogin,
  });
};

export const useSetUserRole = () => {
  return useMutation({
    mutationFn: setRole,
  });
};

export const useDeleteAccount = () => {
  return useMutation({
    mutationFn: deleteUser,
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

export const useLogout = () => {
  const router = useRouter();
  const { resetUserData } = useUserData();
  const { setSelectedBusinessId } = useSelectedBusiness();

  const logout = async () => {
    Alert.alert("Log out", "Are you sure you want to continue?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Sign out",
        style: "destructive",
        onPress: async () => {
          try {
            // Remove the token from secure storage
            await SecureStore.deleteItemAsync("token");

            // delete user context data
            resetUserData();
            setSelectedBusinessId(null);

            // Redirect to the login screen
            router.replace("/onboarding");
          } catch (error) {
            console.error("Logout failed:", error);
          }
        },
      },
    ]);
  };

  return { logout };
};

export const useDelete = () => {
  const router = useRouter();
  const { resetUserData } = useUserData();
  const { mutateAsync: deleteAcc } = useDeleteAccount();
  const { setSelectedBusinessId } = useSelectedBusiness();

  const deleteAccount = async () => {
    Alert.alert("Deactivate Account", "Are you sure you want to continue?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          try {
            await deleteAcc();
            // Remove the token from secure storage
            await SecureStore.deleteItemAsync("token");

            // delete user context data
            resetUserData();
            setSelectedBusinessId(null);

            // Redirect to the login screen
            router.replace("/onboarding");
          } catch (error) {
            console.error("Account deletion failed:", error);
          }
        },
      },
    ]);
  };

  return { deleteAccount };
};
