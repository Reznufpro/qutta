import { BackButton } from "@/components/ui/backButton";
import CustomText from "@/components/ui/customText";
import { Header } from "@/components/ui/header";
import { ScreenContainer } from "@/components/ui/screenContainer";
import { useCurrency } from "@/context/currencyContext";
import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";

export default function CurrencyScreen() {
  const { currency, setCurrency, getAvailableCurrencies } = useCurrency();

  const availableCurrencies = getAvailableCurrencies();

  return (
    <ScreenContainer>
      <View style={styles.iconRow}>
        <BackButton />
      </View>

      <Header
        headerTitle="Choose a currency"
        style={{ marginTop: 8, marginBottom: 18 }}
      />

      <FlatList
        data={availableCurrencies}
        keyExtractor={({ countryCode }) => countryCode}
        showsVerticalScrollIndicator={false}
        style={{ paddingBottom: 150 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={{
              padding: 15,
              borderBottomWidth: 1,
              borderBottomColor: "#eee",
              backgroundColor:
                currency.code === item.currency.code ? "#e3f2fd" : "white",
            }}
            onPress={() => {
              setCurrency(item.countryCode);
            }}
          >
            <CustomText style={{ fontSize: 16 }}>
              {item.currency.name} ({item.currency.symbol})
            </CustomText>
            <CustomText style={{ fontSize: 12, color: "#666", marginTop: 2 }}>
              {item.countryCode}
            </CustomText>
          </TouchableOpacity>
        )}
      />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  iconRow: {
    flexDirection: "row",
  },
});
