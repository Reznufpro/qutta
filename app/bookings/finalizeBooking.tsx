import { ServiceSummary } from "@/components/core/bookings/serviceSummary";
import { BackButton } from "@/components/ui/backButton";
import CustomText from "@/components/ui/customText";
import { Header } from "@/components/ui/header";
import { HoverButton } from "@/components/ui/hoverButton";
import { InnerContainer } from "@/components/ui/innerContainer";
import { ListingButtons } from "@/components/ui/listingButtons";
import { ScreenContainer } from "@/components/ui/screenContainer";
import { Colors } from "@/constants/Colors";
import { useBooking } from "@/context/bookingContext";
import { getInitials, trimTextToOneLine } from "@/utils";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert, StyleSheet, View } from "react-native";

export default function FinalizeBookingScreen() {
  const { bookingData, resetBookingData } = useBooking();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const { service, staff, total, business } = bookingData;

  const handleBack = () => {
    Alert.alert(
      "Cancel Booking",
      "Are you sure you want to cancel the booking process?",
      [
        {
          text: "No",
          style: "cancel",
        },
        {
          text: "Yes, Cancel",
          onPress: () => {
            resetBookingData();
            router.push("/(client)/home");
          },
          style: "destructive",
        },
      ]
    );
  };

  const handleNext = () => {
    try {
      // perform api request here
      router.push("/bookings/success");
    } catch (error) {
      console.log("Error", error);
    }
  };

  return (
    <>
      <ScreenContainer>
        <View style={styles.iconRow}>
          <BackButton />
        </View>

        <Header
          headerTitle="Review and finalize"
          style={{ marginBottom: 12 }}
        />

        <View style={styles.businessInfo}>
          <View style={styles.imageContainer}>
            <Image source={business.image[0]} style={styles.image} />
          </View>

          <View style={{ flex: 1 }}>
            <CustomText style={styles.businessTitle}>
              {business.name}
            </CustomText>

            <View style={[styles.itemsContainer, { paddingVertical: 2 }]}>
              <CustomText>{business.rating}</CustomText>
              <Ionicons name="star" size={14} color={Colors.light.black} />
            </View>

            {business.coordinates?.location && (
              <CustomText style={styles.addressText}>
                {trimTextToOneLine(business.coordinates?.location, 40)}
              </CustomText>
            )}
          </View>
        </View>

        <View style={{ flexDirection: "column", gap: 12 }}>
          <View style={styles.timeContainer}>
            <Ionicons name="calendar-outline" size={16} />
            <CustomText style={styles.addressText}>Thu, 31 Jul 2025</CustomText>
          </View>

          <View style={styles.timeContainer}>
            <Ionicons name="time-outline" size={16} />
            <CustomText style={styles.addressText}>10:20 pm</CustomText>
          </View>
        </View>

        {staff?.id && (
          <View style={{ paddingVertical: 16 }}>
            <CustomText style={styles.sectionTitle}>Selected Staff</CustomText>

            <View style={styles.itemContainer}>
              <View style={styles.avatar}>
                {staff?.image ? (
                  <Image source={staff?.image} style={styles.avatarImg} />
                ) : (
                  <CustomText style={styles.avatarText}>
                    {getInitials(staff?.name || "")}
                  </CustomText>
                )}

                {staff.rating && staff.rating > 0 && (
                  <View style={styles.rating}>
                    <CustomText style={styles.ratingText}>
                      {staff?.rating}
                    </CustomText>
                    <Ionicons name="star" color={Colors.light.black} />
                  </View>
                )}
              </View>

              <View style={{ paddingTop: 10 }}>
                <CustomText style={styles.staffText}>{staff?.name}</CustomText>
              </View>
            </View>
          </View>
        )}

        <View style={{ paddingVertical: 16, gap: 12 }}>
          <CustomText style={styles.sectionTitle}>Overview</CustomText>

          <View>
            {service?.map((s) => (
              <ServiceSummary
                key={`${s.title}-${s.price}`}
                serviceTitle={s.title}
                price={s.price.toString()}
              />
            ))}
          </View>

          <View style={styles.totalSection}>
            <CustomText style={styles.totalLabel}>Total</CustomText>
            <CustomText style={styles.totalLabel}>MX${total}</CustomText>
          </View>
        </View>
      </ScreenContainer>

      <HoverButton keyId="finalize">
        <InnerContainer style={styles.container}>
          <ListingButtons
            backBtnTitle="Cancel"
            nextBtnTitle="Finalize"
            handleBack={handleBack}
            handleNext={handleNext}
          />
        </InnerContainer>
      </HoverButton>
    </>
  );
}

const styles = StyleSheet.create({
  iconRow: {
    flexDirection: "row",
  },
  container: {
    paddingVertical: 20,
  },
  businessInfo: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    paddingVertical: 16,
  },
  businessTitle: {
    fontFamily: "Satoshi-Bold",
    fontSize: 16,
  },
  sectionTitle: {
    fontFamily: "Satoshi-Bold",
    fontSize: 18,
    marginBottom: 4,
  },
  itemsContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  itemContainer: {
    flexDirection: "column",
    alignContent: "center",
    alignItems: "center",
    paddingVertical: 16,
    maxWidth: 80,
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
  timeContainer: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 999,
    backgroundColor: Colors.light.highlight,
    justifyContent: "center",
    alignItems: "center",
  },
  avatarImg: {
    width: 80,
    height: 80,
    borderRadius: 999,
    objectFit: "cover",
  },
  avatarText: {
    fontSize: 28,
    fontWeight: "600",
    color: "#fff",
    fontFamily: "CarosSoftBold",
  },
  rating: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
    paddingHorizontal: 2,
    backgroundColor: Colors.dark.tint,
    borderRadius: 12,
    position: "absolute",
    top: 4,
    right: -8,
  },
  ratingText: {
    color: "#000",
    fontSize: 13,
    marginLeft: 4,
    fontFamily: "CarosSoftBold",
  },
  staffText: {
    fontFamily: "CarosSoftMedium",
    fontSize: 15,
    textAlign: "center",
  },
  totalSection: {
    borderTopWidth: 1,
    borderColor: "#E0E0E0",
    paddingTop: 24,
    marginTop: 8,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  totalLabel: {
    fontSize: 16,
    fontFamily: "CarosSoftBold",
  },
});
