import { ClientActions } from "@/components/core/business/clientActions";
import { ItemImagesCarousel } from "@/components/core/business/clientBusiness/itemImgCarousel";
import { BackButton } from "@/components/ui/backButton";
import CustomText from "@/components/ui/customText";
import { FlexibleModal } from "@/components/ui/flexibleModal";
import { InnerContainer } from "@/components/ui/innerContainer";
import { Colors } from "@/constants/Colors";
import { mockBusiness } from "@/utils";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import {
  Dimensions,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";

const { height } = Dimensions.get("window");

export default function ClientBusinessScreen() {
  const { id } = useLocalSearchParams();
  const { image, name, rating, location, distance } = mockBusiness;

  const [modalVisible, setModalVisible] = useState(false);
  const openModal = () => setModalVisible(true);

  return (
    <>
      <View style={styles.imageContainer}>
        <ItemImagesCarousel images={image} />

        <View style={styles.iconRow}>
          <BackButton />
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        <InnerContainer style={{ gap: 24 }}>
          <View style={{ gap: 12 }}>
            <View style={styles.headerContent}>
              <CustomText style={styles.headerTitle}>{name}</CustomText>
            </View>

            <View style={styles.ratingContainer}>
              <View style={styles.itemsContainer}>
                <CustomText style={styles.text}>{rating}</CustomText>
                <Ionicons name="star" size={14} color={Colors.light.black} />
              </View>

              <Pressable style={styles.itemsContainer} onPress={openModal}>
                <CustomText style={styles.itemText}>{distance}</CustomText>
                <Ionicons
                  name="chevron-forward-outline"
                  color={Colors.light.black}
                />
              </Pressable>
            </View>
          </View>
        </InnerContainer>
      </ScrollView>

      <FlexibleModal
        modalVisible={modalVisible}
        closeModal={() => setModalVisible(false)}
      >
        <ClientActions
          mockBusiness={mockBusiness}
          closeModal={() => setModalVisible(false)}
        />
      </FlexibleModal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 100,
  },
  imageContainer: {
    width: "100%",
    height: height / 2.6,
    position: "relative",
    marginBottom: 24,
  },
  iconRow: {
    position: "absolute",
    left: 20,
    top: 60,
    right: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 25,
    fontFamily: "Satoshi-Bold",
  },
  headerContent: {
    gap: 12,
  },
  text: {
    fontSize: 15,
    fontFamily: "CarosSoftBold",
  },
  ratingContainer: {
    gap: 24,
    flexDirection: "row",
    alignItems: "center",
  },
  itemsContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  itemText: {
    fontFamily: "CarosSoftMedium",
    color: Colors.light.textSecondary,
    fontSize: 15,
  },
});
