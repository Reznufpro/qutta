import { CustomDivider } from "@/components/ui/customDivider";
import CustomText from "@/components/ui/customText";
import { SectionImgCarousel } from "@/components/ui/sectionImgCarousel";
import { Colors } from "@/constants/Colors";
import { BusinessData } from "@/types";
import { trimTextToOneLine } from "@/utils";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, StyleSheet, TouchableOpacity, View } from "react-native";
import { ServiceSummary } from "../bookings/serviceSummary";

interface MapResultsCardProps {
  data: BusinessData;
}

export const MapResultsCard = ({ data }: MapResultsCardProps) => {
  const router = useRouter();
  const [isScrolling, setIsScrolling] = useState(false);

  const tabData = Object.values(data.services);

  const handlePress = () => {
    if (!isScrolling && data.id) {
      router.push({
        pathname: "/clientBusiness/[id]",
        params: { id: data.id },
      });
    }
  };

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={handlePress}
      activeOpacity={0.9}
      disabled={isScrolling}
    >
      <View style={styles.imageContainer}>
        <SectionImgCarousel
          images={data.image}
          setIsScrolling={setIsScrolling}
        />
      </View>

      <View style={styles.content}>
        <CustomText numberOfLines={1} style={styles.name}>
          {data.name}
        </CustomText>

        <View style={{ marginTop: 5, gap: 4 }}>
          <View style={styles.itemsContainer}>
            <CustomText style={styles.text}>
              {data?.rating === 0 ? "No ratings yet" : data?.rating}
            </CustomText>
            <Ionicons name="star" size={14} color={Colors.light.black} />
          </View>

          <CustomText style={styles.distanceText}>
            {trimTextToOneLine(data.coordinates.location, 40)}
          </CustomText>

          <CustomDivider />

          <View>
            {tabData[0].service.slice(0, 3).map((s) => {
              return (
                <ServiceSummary
                  key={`${s.title}-${s.price}}`}
                  serviceTitle={s.title}
                  price={s.price.toString()}
                />
              );
            })}

            <Pressable style={{ paddingTop: 15 }} onPress={handlePress}>
              <CustomText
                style={[styles.distanceText, { color: Colors.light.darkBrown }]}
              >
                See more
              </CustomText>
            </Pressable>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: "100%",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: 4,
    overflow: "hidden",
    marginRight: 5,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  name: {
    fontSize: 16,
    fontFamily: "Satoshi-Bold",
    color: Colors.light.text,
  },
  itemsContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  content: {
    paddingTop: 16,
  },
  imageContainer: {
    width: "100%",
    height: 200,
    position: "relative",
  },
  text: {
    fontSize: 15,
    fontFamily: "CarosSoftBold",
  },
  distanceText: {
    color: Colors.light.textSecondary,
    fontFamily: "CarosSoftLight",
    fontSize: 14,
  },
});
