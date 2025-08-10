import CustomText from "@/components/ui/customText";
import { Colors } from "@/constants/Colors";
import { useCurrency } from "@/context/currencyContext";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { StyleSheet, TouchableOpacity, View } from "react-native";

export const CurrencySettings = () => {
  const router = useRouter();
  const { currency } = useCurrency();

  const handlePress = () => {
    router.push("/accountSettings/currency");
  };

  return (
    <>
      <View style={styles.card}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 20 }}>
          <Ionicons name="cash-outline" size={24} color={Colors.light.black} />
          <CustomText style={styles.label}>Currency</CustomText>
        </View>

        <TouchableOpacity onPress={handlePress}>
          <CustomText>{currency.symbol}</CustomText>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    justifyContent: "space-between",
    borderRadius: 16,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: 4,
  },
  label: {
    fontSize: 16,
    fontFamily: "CarosSoftMedium",
    textAlign: "center",
    textTransform: "capitalize",
    color: Colors.light.black,
  },
});
