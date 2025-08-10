// context/CurrencyContext.tsx
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getLocales } from "expo-localization";
import * as Location from "expo-location";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

export interface CurrencyInfo {
  symbol: string;
  code: string;
  name: string;
}

// Currency mapping by country code
const CURRENCY_MAP: { [key: string]: CurrencyInfo } = {
  // North America
  US: { symbol: "US$", code: "USD", name: "US Dollar" },
  CA: { symbol: "CA$", code: "CAD", name: "Canadian Dollar" },
  MX: { symbol: "MX$", code: "MXN", name: "Mexican Peso" },

  // Europe
  GB: { symbol: "£", code: "GBP", name: "British Pound" },
  DE: { symbol: "€", code: "EUR", name: "Euro" },
  FR: { symbol: "€", code: "EUR", name: "Euro" },
  IT: { symbol: "€", code: "EUR", name: "Euro" },
  ES: { symbol: "€", code: "EUR", name: "Euro" },
  NL: { symbol: "€", code: "EUR", name: "Euro" },

  // Asia Pacific
  JP: { symbol: "¥", code: "JPY", name: "Japanese Yen" },
  CN: { symbol: "¥", code: "CNY", name: "Chinese Yuan" },
  KR: { symbol: "₩", code: "KRW", name: "South Korean Won" },
  IN: { symbol: "₹", code: "INR", name: "Indian Rupee" },
  AU: { symbol: "AU$", code: "AUD", name: "Australian Dollar" },
  SG: { symbol: "S$", code: "SGD", name: "Singapore Dollar" },

  // Latin America
  BR: { symbol: "R$", code: "BRL", name: "Brazilian Real" },
  AR: { symbol: "AR$", code: "ARS", name: "Argentine Peso" },
  CL: { symbol: "CL$", code: "CLP", name: "Chilean Peso" },
  CO: { symbol: "CO$", code: "COP", name: "Colombian Peso" },

  // Africa
  ZA: { symbol: "R", code: "ZAR", name: "South African Rand" },
  NG: { symbol: "₦", code: "NGN", name: "Nigerian Naira" },
  EG: { symbol: "E£", code: "EGP", name: "Egyptian Pound" },
  KE: { symbol: "KSh", code: "KES", name: "Kenyan Shilling" },
  GH: { symbol: "GH₵", code: "GHS", name: "Ghanaian Cedi" },
  ET: { symbol: "Br", code: "ETB", name: "Ethiopian Birr" },
  UG: { symbol: "USh", code: "UGX", name: "Ugandan Shilling" },
  TZ: { symbol: "TSh", code: "TZS", name: "Tanzanian Shilling" },
  ZW: { symbol: "ZW$", code: "ZWL", name: "Zimbabwean Dollar" },
  ZM: { symbol: "ZK", code: "ZMW", name: "Zambian Kwacha" },
  RW: { symbol: "RF", code: "RWF", name: "Rwandan Franc" },
  SN: { symbol: "CFA", code: "XOF", name: "West African CFA Franc" },
  CI: { symbol: "CFA", code: "XOF", name: "West African CFA Franc" },
  BF: { symbol: "CFA", code: "XOF", name: "West African CFA Franc" },
  ML: { symbol: "CFA", code: "XOF", name: "West African CFA Franc" },
  CM: { symbol: "FCFA", code: "XAF", name: "Central African CFA Franc" },
  CD: { symbol: "FC", code: "CDF", name: "Congolese Franc" },
  AO: { symbol: "Kz", code: "AOA", name: "Angolan Kwanza" },
  MZ: { symbol: "MT", code: "MZN", name: "Mozambican Metical" },
  MG: { symbol: "Ar", code: "MGA", name: "Malagasy Ariary" },
  MW: { symbol: "MK", code: "MWK", name: "Malawian Kwacha" },
  NA: { symbol: "N$", code: "NAD", name: "Namibian Dollar" },
  BW: { symbol: "P", code: "BWP", name: "Botswanan Pula" },
  LS: { symbol: "L", code: "LSL", name: "Lesotho Loti" },
  SZ: { symbol: "L", code: "SZL", name: "Swazi Lilangeni" },

  // Middle East & Others
  AE: { symbol: "AED", code: "AED", name: "UAE Dirham" },
  SA: { symbol: "SR", code: "SAR", name: "Saudi Riyal" },
  TR: { symbol: "₺", code: "TRY", name: "Turkish Lira" },
};

const DEFAULT_CURRENCY: CurrencyInfo = {
  symbol: "US$",
  code: "USD",
  name: "US Dollar",
};

const CURRENCY_STORAGE_KEY = "user_currency_preference";
const CURRENCY_AUTO_DETECTED_KEY = "currency_auto_detected";

interface CurrencyContextType {
  currency: CurrencyInfo;
  isLoading: boolean;
  isAutoDetected: boolean;
  formatAmount: (amount: number) => string;
  getCurrencySymbol: () => string;
  setCurrency: (countryCode: string) => Promise<void>;
  refreshCurrency: () => Promise<void>;
  getAvailableCurrencies: () => Array<{
    countryCode: string;
    currency: CurrencyInfo;
  }>;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(
  undefined
);

interface CurrencyProviderProps {
  children: ReactNode;
}

export const CurrencyProvider: React.FC<CurrencyProviderProps> = ({
  children,
}) => {
  const [currency, setCurrencyState] = useState<CurrencyInfo>(DEFAULT_CURRENCY);
  const [isLoading, setIsLoading] = useState(true);
  const [isAutoDetected, setIsAutoDetected] = useState(true);

  // Get currency from device locale/region settings
  const getCurrencyFromLocale = (): CurrencyInfo | null => {
    try {
      const locales = getLocales();
      if (locales && locales.length > 0) {
        const primaryLocale = locales[0];
        console.log("Device locale:", primaryLocale.languageTag);
        console.log("Device region:", primaryLocale.regionCode);

        // Try region code first (most reliable for currency)
        if (
          primaryLocale.regionCode &&
          CURRENCY_MAP[primaryLocale.regionCode.toUpperCase()]
        ) {
          return CURRENCY_MAP[primaryLocale.regionCode.toUpperCase()];
        }

        // Fallback: try to extract country from language tag
        const countryCode = primaryLocale.languageTag
          ?.split("-")[1]
          ?.toUpperCase();
        if (countryCode && CURRENCY_MAP[countryCode]) {
          return CURRENCY_MAP[countryCode];
        }
      }
      return null;
    } catch (error) {
      console.error("Error getting currency from locale:", error);
      return null;
    }
  };

  // Get currency from GPS location
  const getCurrencyFromLocation = async (): Promise<CurrencyInfo | null> => {
    try {
      console.log("Requesting location permission for currency...");

      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Location permission denied");
        return null;
      }

      console.log("Getting location for currency detection...");

      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Low,
      });

      const reverseGeocode = await Location.reverseGeocodeAsync({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });

      if (reverseGeocode && reverseGeocode.length > 0) {
        const countryCode = reverseGeocode[0].isoCountryCode?.toUpperCase();
        console.log("Country detected from location:", countryCode);

        if (countryCode && CURRENCY_MAP[countryCode]) {
          return CURRENCY_MAP[countryCode];
        }
      }

      return null;
    } catch (error) {
      console.error("Error getting currency from location:", error);
      return null;
    }
  };

  // Auto-detect currency
  const autoDetectCurrency = async (): Promise<CurrencyInfo> => {
    try {
      console.log("Auto-detecting currency...");

      // Method 1: Device locale (fastest)
      const localeBasedCurrency = getCurrencyFromLocale();
      if (localeBasedCurrency) {
        console.log("Currency detected from locale:", localeBasedCurrency);
        await AsyncStorage.setItem(
          CURRENCY_AUTO_DETECTED_KEY,
          JSON.stringify(localeBasedCurrency)
        );
        return localeBasedCurrency;
      }

      // Method 2: GPS location
      const locationBasedCurrency = await getCurrencyFromLocation();
      if (locationBasedCurrency) {
        console.log("Currency detected from location:", locationBasedCurrency);
        await AsyncStorage.setItem(
          CURRENCY_AUTO_DETECTED_KEY,
          JSON.stringify(locationBasedCurrency)
        );
        return locationBasedCurrency;
      }

      // Method 3: Fallback to default
      console.log("Using default currency:", DEFAULT_CURRENCY);
      return DEFAULT_CURRENCY;
    } catch (error) {
      console.error("Error in auto-detect currency:", error);
      return DEFAULT_CURRENCY;
    }
  };

  // Initialize currency on app start
  const initializeCurrency = async () => {
    try {
      setIsLoading(true);
      console.log("Initializing currency context...");

      // Check if user has a saved preference
      const savedCurrency = await AsyncStorage.getItem(CURRENCY_STORAGE_KEY);

      if (savedCurrency) {
        // User has manually set a preference
        const parsedCurrency = JSON.parse(savedCurrency);
        console.log("Using saved currency preference:", parsedCurrency);
        setCurrencyState(parsedCurrency);
        setIsAutoDetected(false);
      } else {
        // No user preference, auto-detect
        console.log("No saved preference, auto-detecting...");

        // First check if we have a cached auto-detection
        const cachedAutoDetected = await AsyncStorage.getItem(
          CURRENCY_AUTO_DETECTED_KEY
        );

        if (cachedAutoDetected) {
          // Use cached detection temporarily while we refresh
          const parsedCached = JSON.parse(cachedAutoDetected);
          console.log("Using cached auto-detected currency:", parsedCached);
          setCurrencyState(parsedCached);
          setIsAutoDetected(true);
        }

        // Refresh detection in background
        const detectedCurrency = await autoDetectCurrency();
        setCurrencyState(detectedCurrency);
        setIsAutoDetected(true);
      }
    } catch (error) {
      console.error("Error initializing currency:", error);
      setCurrencyState(DEFAULT_CURRENCY);
      setIsAutoDetected(true);
    } finally {
      setIsLoading(false);
    }
  };

  // Set currency manually (user preference)
  const setCurrency = async (countryCode: string) => {
    try {
      const newCurrency = CURRENCY_MAP[countryCode.toUpperCase()];
      if (newCurrency) {
        console.log("Setting currency to:", newCurrency);
        setCurrencyState(newCurrency);
        setIsAutoDetected(false);

        // Save user preference
        await AsyncStorage.setItem(
          CURRENCY_STORAGE_KEY,
          JSON.stringify(newCurrency)
        );

        console.log("Currency preference saved");
      } else {
        console.error("Invalid country code:", countryCode);
      }
    } catch (error) {
      console.error("Error setting currency:", error);
    }
  };

  // Refresh auto-detection
  const refreshCurrency = async () => {
    try {
      setIsLoading(true);
      console.log("Refreshing currency detection...");

      const detectedCurrency = await autoDetectCurrency();
      setCurrencyState(detectedCurrency);
      setIsAutoDetected(true);

      // Clear any saved manual preference
      await AsyncStorage.removeItem(CURRENCY_STORAGE_KEY);
    } catch (error) {
      console.error("Error refreshing currency:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Format amount with currency
  const formatAmount = (amount: number): string => {
    const formatted = amount.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
    return `${currency.symbol}${formatted}`;
  };

  // Get currency symbol
  const getCurrencySymbol = (): string => {
    return currency.symbol;
  };

  // Get available currencies
  const getAvailableCurrencies = () => {
    return Object.entries(CURRENCY_MAP).map(([code, currency]) => ({
      countryCode: code,
      currency,
    }));
  };

  // Initialize on mount
  useEffect(() => {
    initializeCurrency();
  }, []);

  const contextValue: CurrencyContextType = {
    currency,
    isLoading,
    isAutoDetected,
    formatAmount,
    getCurrencySymbol,
    setCurrency,
    refreshCurrency,
    getAvailableCurrencies,
  };

  return (
    <CurrencyContext.Provider value={contextValue}>
      {children}
    </CurrencyContext.Provider>
  );
};

// Hook to use currency context
export const useCurrency = (): CurrencyContextType => {
  const context = useContext(CurrencyContext);
  if (context === undefined) {
    throw new Error("useCurrency must be used within a CurrencyProvider");
  }
  return context;
};

// Helper functions for non-hook usage (optional)
export const getCurrencyInfo = (countryCode: string): CurrencyInfo | null => {
  return CURRENCY_MAP[countryCode.toUpperCase()] || null;
};
