import React, { createContext, FC, useContext, useState } from "react";

interface userProfile {
  id: string;
  name: string;
  last_name: string;
  email: string;
  role: string;
  token: string;
}

const initialState: userProfile = {
  id: "",
  name: "",
  last_name: "",
  email: "",
  role: "",
  token: "",
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
