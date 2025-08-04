import { BusinessInfo } from "@/components/core/home/businessInfo";
import { MapSearchResults } from "@/components/core/home/mapResults";
import { SearchBar } from "@/components/core/home/searchBar";
import CustomText from "@/components/ui/customText";
import { Colors } from "@/constants/Colors";
import { useGetAllBusinessess } from "@/hooks/useCreateBusiness";
import { useUserCoordinates } from "@/hooks/useUserCoordinates";
import { BusinessData } from "@/types";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { useRouter } from "expo-router";
import { useMemo, useRef, useState } from "react";
import {
  Dimensions,
  Keyboard,
  Pressable,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import MapView, { Marker } from "react-native-maps";

const { width, height } = Dimensions.get("window");

export default function MapSearchScreen() {
  const { data: coords, isLoading } = useUserCoordinates();
  const { data: allBusinesses } = useGetAllBusinessess();
  const [searchInput, setSearchInput] = useState("");

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

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View>
          <View style={styles.searchBar}>
            <SearchBar setSearchInput={setSearchInput} />
          </View>

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

          {selectedBuss && (
            <Pressable
              style={styles.selectedBusinessCard}
              onPress={handlePress}
            >
              <BusinessInfo
                business={selectedBuss}
                styleCard={{
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
                }}
              />
            </Pressable>
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
          {searchedResults && (
            <MapSearchResults allBusinesses={searchedResults} />
          )}
        </BottomSheetView>
      </BottomSheet>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  searchBar: {
    position: "absolute",
    top: 60,
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
  },
  selectedBusinessCard: {
    position: "absolute",
    bottom: -620,
    alignSelf: "center",
    width: width - 35,
    zIndex: 10,
  },
});
