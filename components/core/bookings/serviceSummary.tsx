import CustomText from "@/components/ui/customText";
import { Colors } from "@/constants/Colors";
import { useCurrency } from "@/context/currencyContext";
import { StyleSheet, View } from "react-native";

export const ServiceSummary = ({
  serviceTitle,
  price,
}: {
  serviceTitle: string | undefined;
  price: string | undefined;
}) => {
  const { formatAmount, isLoading } = useCurrency();

  return (
    <View style={styles.row}>
      <CustomText style={styles.text}>{serviceTitle}</CustomText>
      <CustomText style={styles.text}>
        {price && formatAmount(Number(price))}
      </CustomText>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 4,
  },
  text: {
    fontSize: 14,
    color: Colors.light.black,
    fontFamily: "CarosSoftLight",
  },
});
