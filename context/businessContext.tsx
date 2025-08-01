import { createContext, ReactNode, useContext, useState } from "react";

export interface BusinessForm {
  name: string;
  coordinates?: {
    latitude?: number;
    longitude?: number;
    location: string;
  };
  tag?: "Recommended" | "New" | "Popular" | "Open Now";
  about?: string;
  images: string[];
  staff: {
    name: string;
    image?: string;
  }[];
  categories: {
    title: string;
    services: {
      title: string;
      time: string;
      price: number;
      description?: string;
    }[];
  }[];
  total_steps: number;
  current_step: number;
}

interface BusinessFormContextType {
  form: BusinessForm;
  updateForm: (key: keyof BusinessForm, value: any) => void;
  resetForm: () => void;
  setForm: React.Dispatch<React.SetStateAction<BusinessForm>>;
}

const defaultForm: BusinessForm = {
  name: "",
  coordinates: {
    location: "",
    latitude: 0,
    longitude: 0,
  },
  tag: "New",
  about: "",
  images: [],
  staff: [],
  categories: [],
  current_step: 1,
  total_steps: 6,
};

const BusinessFormContext = createContext<BusinessFormContextType | undefined>(
  undefined
);

export const BusinessFormProvider = ({ children }: { children: ReactNode }) => {
  const [form, setForm] = useState<BusinessForm>(defaultForm);

  const updateForm = <K extends keyof BusinessForm>(
    key: K,
    value: BusinessForm[K]
  ) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const resetForm = () => {
    setForm(defaultForm);
  };

  return (
    <BusinessFormContext.Provider
      value={{ form, updateForm, resetForm, setForm }}
    >
      {children}
    </BusinessFormContext.Provider>
  );
};

export const useBusinessForm = () => {
  const context = useContext(BusinessFormContext);
  if (!context) {
    throw new Error(
      "useBusinessForm must be used within a BusinessFormProvider"
    );
  }
  return context;
};
