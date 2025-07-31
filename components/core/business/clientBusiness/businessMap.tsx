import CustomText from "@/components/ui/customText";
import { Colors } from "@/constants/Colors";
import { fullBusinessT } from "@/utils";
import { Linking, Pressable, StyleSheet, View } from "react-native";
import MapView, { Marker } from "react-native-maps";

interface BusinessMapProps {
  coordinates: fullBusinessT["coordinates"];
  rating: number;
}

export const BusinessMap = ({ coordinates, rating }: BusinessMapProps) => {
  const openMaps = () => {
    if (!coordinates) return;
    const url = `https://maps.apple.com/?q=${encodeURIComponent(
      coordinates?.location
    )}`;
    Linking.openURL(url);
  };

  if (
    !coordinates ||
    typeof coordinates.latitude !== "number" ||
    typeof coordinates.longitude !== "number"
  ) {
    return null;
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={{
          latitude: coordinates.latitude,
          longitude: coordinates.longitude,
          latitudeDelta: 0.002,
          longitudeDelta: 0.002,
        }}
        scrollEnabled={false}
        zoomEnabled={false}
        pitchEnabled={false}
        rotateEnabled={false}
        pointerEvents="none"
      >
        <Marker
          coordinate={{
            latitude: coordinates.latitude as number,
            longitude: coordinates.longitude as number,
          }}
        >
          <View style={styles.ratingPin}>
            <CustomText style={styles.ratingText}>{rating} ★</CustomText>
          </View>
        </Marker>
      </MapView>

      <CustomText style={styles.addressText}>{coordinates.location}</CustomText>

      <Pressable onPress={openMaps}>
        <CustomText style={styles.directionsLink}>Get directions</CustomText>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
  },
  map: {
    width: "100%",
    height: 200,
    borderRadius: 5,
  },
  ratingPin: {
    backgroundColor: "#000",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 16,
  },
  ratingText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 12,
  },
  addressText: {
    paddingVertical: 12,
    fontSize: 14,
    lineHeight: 20,
    fontFamily: "CarosSoftLight",
  },
  directionsLink: {
    color: Colors.light.button,
    fontFamily: "Satoshi-Bold",
  },
});
