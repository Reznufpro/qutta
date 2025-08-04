import React, { createContext, FC, useContext, useState } from "react";

interface userProfile {
  id: string;
  name: string;
  lastName: string;
  email: string;
  role: string;
  token: string;
  created_at: string;
}

const initialState: userProfile = {
  id: "",
  name: "",
  lastName: "",
  email: "",
  role: "",
  token: "",
  created_at: "",
};

interface userContextType {
  user: {
    userData: userProfile;
    updateUserForm: (key: keyof userProfile, value: any) => void;
    resetUserData: () => void;
    setUser: (user: userProfile) => void;
  };
}

const UserContext = createContext<userContextType["user"] | null>(null);

interface userProviderProps {
  children: React.ReactNode;
}

export const UserProvider: FC<userProviderProps> = ({ children }) => {
  const [userData, setUserData] = useState(initialState);

  const resetUserData = () => setUserData(initialState);

  const updateUserForm = <K extends keyof userProfile>(
    key: K,
    value: userProfile[K]
  ) => {
    setUserData((prev) => ({ ...prev, [key]: value }));
  };

  const setUser = (user: userProfile) => {
    setUserData(user);
  };

  return (
    <UserContext.Provider
      value={{ userData, resetUserData, updateUserForm, setUser }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserData = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("useListing must be used within a UserProvider");
  }
  return context;
};
