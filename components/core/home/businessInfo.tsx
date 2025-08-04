import CustomText from "@/components/ui/customText";
import { Colors } from "@/constants/Colors";
import { BusinessData, BusinessInfoData } from "@/types";
import { trimTextToOneLine } from "@/utils";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";

interface BusinessInfoProps {
  business: BusinessData | BusinessInfoData;
  styleCard?: StyleProp<ViewStyle>;
}

export const BusinessInfo = ({ business, styleCard }: BusinessInfoProps) => {
  return (
    <View style={[styles.businessInfo, styleCard]}>
      <View style={styles.imageContainer}>
        <Image source={business.image[0]} style={styles.image} />
      </View>

      <View style={{ flex: 1 }}>
        <CustomText style={styles.businessTitle}>{business.name}</CustomText>

        <View style={[styles.itemsContainer, { paddingVertical: 2 }]}>
          <CustomText>
            {business.rating === 0 ? "New" : business.rating}
          </CustomText>
          <Ionicons name="star" size={14} color={Colors.light.black} />
        </View>

        {business.coordinates && (
          <CustomText style={styles.addressText}>
            {trimTextToOneLine(business.coordinates?.location, 40)}
          </CustomText>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  businessInfo: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    paddingVertical: 16,
  },
  itemsContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  businessTitle: {
    fontFamily: "Satoshi-Bold",
    fontSize: 16,
  },
  imageContainer: {
    width: 75,
    height: 75,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 5,
  },
  addressText: {
    fontSize: 14,
    lineHeight: 20,
    fontFamily: "CarosSoftLight",
  },
});
