import CustomText from "@/components/ui/customText";
import { InnerContainer } from "@/components/ui/innerContainer";
import { Colors } from "@/constants/Colors";
import { BusinessData } from "@/types";
import { useMemo, useState } from "react";
import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import { MapResultsCard } from "./mapResultsCard";

interface MapSearchResults {
  allBusinesses: BusinessData[];
}

export const MapSearchResults = ({ allBusinesses }: MapSearchResults) => {
  const [visibleCount, setVisibleCount] = useState(4);

  const totalAmount = useMemo(() => {
    return allBusinesses.length;
  }, [allBusinesses]);

  const currentBusinesses = allBusinesses.slice(0, visibleCount);

  const hasMore = visibleCount < totalAmount;

  const handleSeeMore = () => {
    setVisibleCount((prev) => prev + 4);
  };

  return (
    <InnerContainer style={{ paddingBottom: 20 }}>
      <View style={styles.modalHeader}>
        <CustomText style={styles.text}>
          {totalAmount}{" "}
          {totalAmount === 1 ? "business nearby" : "businesses nearby"}
        </CustomText>
      </View>

      <FlatList
        data={currentBusinesses}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        contentContainerStyle={{ paddingBottom: 200, gap: 30 }}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => <MapResultsCard data={item} />}
        ListFooterComponent={
          hasMore ? (
            <TouchableOpacity
              onPress={handleSeeMore}
              style={styles.seeMoreButton}
            >
              <CustomText style={styles.seeMoreText}>See more</CustomText>
            </TouchableOpacity>
          ) : null
        }
      />
    </InnerContainer>
  );
};

const styles = StyleSheet.create({
  modalHeader: {
    alignItems: "center",
    marginBottom: 24,
  },
  text: {
    fontSize: 14,
    color: Colors.light.black,
    fontFamily: "CarosSoftLight",
  },
  seeMoreButton: {
    marginTop: 10,
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderRadius: 5,
    borderWidth: 0.5,
    borderColor: Colors.light.textSecondary,
    backgroundColor: Colors.light.white,
  },
  seeMoreText: {
    fontSize: 14,
    fontFamily: "CarosSoftBold",
    color: Colors.light.black,
  },
});
