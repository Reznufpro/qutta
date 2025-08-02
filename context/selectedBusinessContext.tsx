import React, { createContext, useContext, useState } from "react";

type SelectedBusinessContextType = {
  selectedBusinessId: string | null;
  setSelectedBusinessId: (id: string | null) => void;
};

const SelectedBusinessContext = createContext<
  SelectedBusinessContextType | undefined
>(undefined);

export const SelectedBusinessProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [selectedBusinessId, setSelectedBusinessId] = useState<string | null>(
    null
  );

  return (
    <SelectedBusinessContext.Provider
      value={{ selectedBusinessId, setSelectedBusinessId }}
    >
      {children}
    </SelectedBusinessContext.Provider>
  );
};

export const useSelectedBusiness = (): SelectedBusinessContextType => {
  const context = useContext(SelectedBusinessContext);
  if (!context) {
    throw new Error(
      "useSelectedBusiness must be used within a SelectedBusinessProvider"
    );
  }
  return context;
};
