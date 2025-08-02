import { ServiceTabs } from "@/components/core/bookings/serviceTabs";
import { AboutBusiness } from "@/components/core/business/clientBusiness/about";
import { BusinessMap } from "@/components/core/business/clientBusiness/businessMap";
import { ItemImagesCarousel } from "@/components/core/business/clientBusiness/itemImgCarousel";
import { StaffCard } from "@/components/core/business/clientBusiness/staffCard";
import { BackButton } from "@/components/ui/backButton";
import CustomText from "@/components/ui/customText";
import { InnerContainer } from "@/components/ui/innerContainer";
import { Colors } from "@/constants/Colors";
import { useGetBusinessById } from "@/hooks/useCreateBusiness";
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

export default function BusinessItemScreen() {
  const { id } = useLocalSearchParams();
  const { data, isLoading, error } = useGetBusinessById(id as string);

  const [open, setOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(3);
  const staffMembers = data?.staff.slice(0, visibleCount);
  const staffToggle = () => {
    if (!data?.staff) return;
    setOpen((prev) => !prev);
    setVisibleCount((prev) =>
      prev >= data?.staff.length ? 3 : Math.min(prev + 3, data.staff.length)
    );
  };

  return (
    <>
      <View style={styles.imageContainer}>
        <ItemImagesCarousel images={data?.image} />

        <View style={styles.iconRow}>
          <BackButton />
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        <InnerContainer style={{ gap: 40 }}>
          <View style={{ gap: 12 }}>
            <View style={styles.headerContent}>
              <View style={styles.clientHeader}>
                <Ionicons name="alert-circle" color="red" />
                <CustomText style={styles.clientTitle}>
                  This is what clients see
                </CustomText>
              </View>
              <CustomText style={styles.headerTitle}>{data?.name}</CustomText>
            </View>

            <View style={styles.ratingContainer}>
              <View style={styles.itemsContainer}>
                <CustomText style={styles.text}>
                  {data?.rating === 0 ? "No ratings yet" : data?.rating}
                </CustomText>
                <Ionicons name="star" size={14} color={Colors.light.black} />
              </View>
            </View>
          </View>

          <View>
            <CustomText style={styles.itemHeader}>Services</CustomText>
            {data?.services && (
              <ServiceTabs services={data?.services} preview />
            )}
          </View>

          <View>
            <Pressable onPress={staffToggle}>
              <View style={styles.itemsContainer}>
                <CustomText style={styles.itemHeader}>Choose Staff</CustomText>
                <Ionicons
                  name={
                    open ? "chevron-down-outline" : "chevron-forward-outline"
                  }
                  color={Colors.light.textSecondary}
                />
              </View>
            </Pressable>

            {staffMembers && staffMembers.length > 0 && (
              <StaffCard staff={staffMembers} preview />
            )}
          </View>

          <View>
            <CustomText style={styles.itemHeader}>About</CustomText>
            {data?.about && <AboutBusiness about={data?.about} />}
          </View>

          <View>
            <BusinessMap
              coordinates={data?.coordinates}
              rating={data?.rating}
            />
          </View>
        </InnerContainer>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
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
  container: {
    paddingBottom: 100,
  },
  headerTitle: {
    fontSize: 25,
    fontFamily: "Satoshi-Bold",
  },
  clientTitle: {
    fontFamily: "CarosSoftLight",
    fontSize: 12,
  },
  clientHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 5,
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
  itemHeader: {
    fontSize: 20,
    fontFamily: "Satoshi-Bold",
  },
});
