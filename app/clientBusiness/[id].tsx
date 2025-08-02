import { ServiceTabs } from "@/components/core/bookings/serviceTabs";
import { ClientActions } from "@/components/core/business/clientActions";
import { ClientBooking } from "@/components/core/business/clientBooking";
import { AboutBusiness } from "@/components/core/business/clientBusiness/about";
import { BusinessMap } from "@/components/core/business/clientBusiness/businessMap";
import { ItemImagesCarousel } from "@/components/core/business/clientBusiness/itemImgCarousel";
import { StaffCard } from "@/components/core/business/clientBusiness/staffCard";
import { BackButton } from "@/components/ui/backButton";
import CustomText from "@/components/ui/customText";
import { FlexibleModal } from "@/components/ui/flexibleModal";
import { InnerContainer } from "@/components/ui/innerContainer";
import { Colors } from "@/constants/Colors";
import { useBooking } from "@/context/bookingContext";
import { useGetBusinessById } from "@/hooks/useCreateBusiness";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import { useMemo, useState } from "react";
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
  const { data, isLoading, error } = useGetBusinessById(id as string);

  const { bookingData, setBookingData, resetBookingData } = useBooking();

  const [modalVisible, setModalVisible] = useState(false);
  const [content, setContent] = useState("");
  const openModal = (content: string) => {
    setModalVisible(true);
    setContent(content);
  };

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

  const showSubmit = useMemo(() => {
    const check = bookingData.service.length > 0;
    return check;
  }, [bookingData.service]);

  return (
    <>
      <View style={styles.imageContainer}>
        <ItemImagesCarousel images={data?.image} />

        <View style={styles.iconRow}>
          <BackButton func={resetBookingData} />
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        <InnerContainer style={{ gap: 40 }}>
          <View style={{ gap: 12 }}>
            <View style={styles.headerContent}>
              <CustomText style={styles.headerTitle}>{data?.name}</CustomText>
            </View>

            <View style={styles.ratingContainer}>
              <View style={styles.itemsContainer}>
                <CustomText style={styles.text}>
                  {data?.rating === 0 ? "New" : data?.rating}
                </CustomText>
                <Ionicons name="star" size={14} color={Colors.light.black} />
              </View>

              <Pressable
                style={styles.itemsContainer}
                onPress={() => {
                  openModal("details");
                }}
              >
                <CustomText style={styles.itemText}>2.6km</CustomText>
                <Ionicons
                  name="chevron-forward-outline"
                  color={Colors.light.textSecondary}
                />
              </Pressable>
            </View>
          </View>

          <View>
            <CustomText style={styles.itemHeader}>Services</CustomText>
            {data?.services && (
              <ServiceTabs
                services={data.services}
                bookingData={bookingData}
                setBookingData={setBookingData}
              />
            )}
          </View>

          <View>
            <Pressable style={styles.itemsContainer} onPress={staffToggle}>
              <CustomText style={styles.itemHeader}>Choose Staff</CustomText>
              <Ionicons
                name={open ? "chevron-down-outline" : "chevron-forward-outline"}
                color={Colors.light.textSecondary}
              />
            </Pressable>

            {staffMembers && staffMembers.length > 0 && (
              <StaffCard
                staff={staffMembers}
                bookingData={bookingData}
                setBookingData={setBookingData}
              />
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

      <FlexibleModal
        modalVisible={modalVisible}
        closeModal={() => setModalVisible(false)}
        styles={{ backgroundColor: Colors.light.white }}
      >
        {content === "details" && data && (
          <ClientActions
            businessData={data}
            closeModal={() => setModalVisible(false)}
          />
        )}
      </FlexibleModal>

      {showSubmit && data && (
        <ClientBooking
          bookingData={bookingData}
          setBookingData={setBookingData}
          businessData={data}
        />
      )}
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
  itemHeader: {
    fontSize: 20,
    fontFamily: "Satoshi-Bold",
  },
  button: {
    backgroundColor: Colors.light.black,
    paddingVertical: 14,
    alignItems: "center",
    borderRadius: 5,
    paddingHorizontal: 16,
  },
  buttonText: {
    color: Colors.light.white,
    fontFamily: "Satoshi-Bold",
    fontSize: 14,
  },
});
