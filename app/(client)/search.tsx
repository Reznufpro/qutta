import { BusinessInfo } from "@/components/core/home/businessInfo";
import { MapSearchResults } from "@/components/core/home/mapResults";
import { SearchBar } from "@/components/core/home/searchBar";
import CustomText from "@/components/ui/customText";
import { HoverError } from "@/components/ui/hoverError";
import { Colors } from "@/constants/Colors";
import { useGetAllBusinessess } from "@/hooks/useCreateBusiness";
import { useUserCoordinates } from "@/hooks/useUserCoordinates";
import { BusinessData } from "@/types";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { useRouter } from "expo-router";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  Dimensions,
  Keyboard,
  Pressable,
  SafeAreaView,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import MapView, { Marker } from "react-native-maps";

const { width, height } = Dimensions.get("window");

export default function MapSearchScreen() {
  const { data: coords, isError } = useUserCoordinates();
  const { data: allBusinesses } = useGetAllBusinessess();
  const [searchInput, setSearchInput] = useState("");
  const [showError, setShowError] = useState(false);

  const router = useRouter();
  const [selectedBuss, setSelectedBuss] = useState<BusinessData | null>(null);

  const searchedResults = useMemo(() => {
    if (!searchInput) return allBusinesses;

    return allBusinesses?.filter((business) =>
      business.name.toLowerCase().includes(searchInput.toLowerCase())
    );
  }, [searchInput, allBusinesses]);

  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => {
    return selectedBuss !== null ? ["25%"] : ["25%", "52%", "85%"];
  }, [selectedBuss]);

  const handleSelect = (buss: BusinessData) => {
    setSelectedBuss(buss);
    bottomSheetRef.current?.snapToIndex(0);
  };

  const handlePress = () => {
    if (selectedBuss) {
      router.push({
        pathname: "/clientBusiness/[id]",
        params: { id: selectedBuss.id },
      });
    }
  };

  useEffect(() => {
    if (isError) {
      setShowError(true);

      const timer = setTimeout(() => {
        setShowError(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isError]);

  // Calculate if user is far from available businesses (for MVP feedback)
  const isUserNearBusinesses = useMemo(() => {
    if (!coords || !allBusinesses?.length) return false;

    // Simple distance check - you might want to use a proper distance calculation
    return allBusinesses.some((business) => {
      const latDiff = Math.abs(coords.lat - business.coordinates.latitude);
      const lonDiff = Math.abs(coords.lon - business.coordinates.longitude);
      // Rough check for ~50km radius (adjust as needed)
      return latDiff < 0.5 && lonDiff < 0.5;
    });
  }, [coords, allBusinesses]);

  return (
    <>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={{ flex: 1 }}>
            <SafeAreaView style={styles.searchBar}>
              <SearchBar setSearchInput={setSearchInput} />
            </SafeAreaView>

            <MapView
              userInterfaceStyle="light"
              style={{
                position: "absolute",
                width: width,
                height: height,
              }}
              initialRegion={{
                latitude: (coords && coords.lat) || 25.6866,
                longitude: (coords && coords.lon) || -100.3161,
                latitudeDelta: 0.2,
                longitudeDelta: 0.2,
              }}
              onPress={() => setSelectedBuss(null)}
            >
              {searchedResults?.map((business) => (
                <Marker
                  key={business.id}
                  coordinate={{
                    latitude: business.coordinates.latitude,
                    longitude: business.coordinates.longitude,
                  }}
                  onPress={(e) => {
                    e.stopPropagation();
                    handleSelect(business);
                  }}
                >
                  <Pressable style={styles.ratingPin}>
                    <CustomText style={styles.ratingText}>
                      {business.rating === 0 ? "New ★" : `${business.rating} ★`}
                    </CustomText>
                  </Pressable>
                </Marker>
              ))}
            </MapView>

            {/* No coverage message */}
            {coords &&
              !isUserNearBusinesses &&
              allBusinesses &&
              allBusinesses?.length > 0 && (
                <View style={styles.noCoverageMessage}>
                  <CustomText style={styles.noCoverageText}>
                    We're not in your area yet, but we're expanding soon! 🚀
                  </CustomText>
                  <CustomText style={styles.noCoverageSubtext}>
                    Available in Monterrey, México
                  </CustomText>
                </View>
              )}

            {/* Selected business card with better positioning */}
            {selectedBuss && (
              <View style={styles.selectedBusinessContainer}>
                <Pressable
                  style={styles.selectedBusinessCard}
                  onPress={handlePress}
                >
                  <BusinessInfo
                    business={selectedBuss}
                    styleCard={styles.businessInfo}
                  />
                </Pressable>
              </View>
            )}
          </View>
        </TouchableWithoutFeedback>

        <BottomSheet
          ref={bottomSheetRef}
          index={0}
          snapPoints={snapPoints}
          enableOverDrag={false}
          enableDynamicSizing={false}
          backgroundStyle={styles.bottomSheetBackground}
          handleIndicatorStyle={styles.handleIndicator}
        >
          <BottomSheetView style={styles.contentContainer}>
            {searchedResults && searchedResults.length > 0 ? (
              <MapSearchResults allBusinesses={searchedResults} />
            ) : (
              <View style={styles.noResultsContainer}>
                <CustomText style={styles.noResultsText}>
                  {searchInput
                    ? `No businesses found matching "${searchInput}"`
                    : "No businesses available yet"}
                </CustomText>
              </View>
            )}
          </BottomSheetView>
        </BottomSheet>
      </GestureHandlerRootView>

      {showError && (
        <HoverError error="We cannot access your location. Showing available businesses instead." />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  searchBar: {
    position: "absolute",
    top: 20,
    left: 20,
    zIndex: 10,
  },
  ratingPin: {
    backgroundColor: "#000",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 16,
  },
  ratingText: {
    color: "#fff",
    fontFamily: "CarosSoftBold",
    fontSize: 12,
  },
  bottomSheetBackground: {
    borderRadius: 20,
  },
  handleIndicator: {
    width: 50,
    height: 5,
    backgroundColor: Colors.light.muted,
    borderRadius: 10,
    alignSelf: "center",
    marginVertical: 10,
  },
  contentContainer: {
    paddingBottom: 80,
    flex: 1,
  },
  selectedBusinessContainer: {
    position: "absolute",
    bottom: 120, // Better positioning relative to bottom sheet
    left: 0,
    right: 0,
    alignItems: "center",
    zIndex: 10,
  },
  selectedBusinessCard: {
    width: width - 35,
  },
  businessInfo: {
    backgroundColor: Colors.light.white,
    borderWidth: 0.5,
    borderColor: "#E7E7E7",
    borderRadius: 5,
    overflow: "hidden",
    paddingVertical: 2,
    shadowColor: "#E7E7E7",
    shadowOpacity: 0.6,
    shadowRadius: 15,
    shadowOffset: { width: 0, height: 4 },
    elevation: 1,
  },
  noCoverageMessage: {
    position: "absolute",
    top: 120,
    left: 20,
    right: 20,
    backgroundColor: Colors.light.white,
    padding: 16,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    zIndex: 5,
  },
  noCoverageText: {
    textAlign: "center",
    fontFamily: "CarosSoftBold",
    fontSize: 14,
    color: Colors.light.text,
    marginBottom: 4,
  },
  noCoverageSubtext: {
    textAlign: "center",
    fontSize: 12,
    color: Colors.light.muted,
  },
  noResultsContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  noResultsText: {
    textAlign: "center",
    color: Colors.light.muted,
    fontSize: 16,
  },
});
