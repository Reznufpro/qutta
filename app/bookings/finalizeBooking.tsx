import { ServiceSummary } from "@/components/core/bookings/serviceSummary";
import { BusinessInfo } from "@/components/core/home/businessInfo";
import { BackButton } from "@/components/ui/backButton";
import CustomText from "@/components/ui/customText";
import { Header } from "@/components/ui/header";
import { HoverButton } from "@/components/ui/hoverButton";
import { HoverError } from "@/components/ui/hoverError";
import { InnerContainer } from "@/components/ui/innerContainer";
import { ListingButtons } from "@/components/ui/listingButtons";
import { ScreenContainer } from "@/components/ui/screenContainer";
import { Colors } from "@/constants/Colors";
import { useBooking } from "@/context/bookingContext";
import { useCreateBooking } from "@/hooks/useBooking";
import { getInitials } from "@/utils";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, StyleSheet, View } from "react-native";

export default function FinalizeBookingScreen() {
  const { bookingData, resetBookingData } = useBooking();
  const { mutate, isError } = useCreateBooking();
  const [showError, setShowError] = useState(false);
  const router = useRouter();

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

  useEffect(() => {
    if (isError) {
      setShowError(true);

      const timer = setTimeout(() => {
        setShowError(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isError]);

  const handleNext = () => {
    if (!bookingData) return;

    try {
      mutate(bookingData, {
        onSuccess: (res) => {
          console.log("Booking successful:", res);
          router.push("/(client)/bookings");
        },
        onError: (err) => {
          console.log("Booking failed:", err);
          // optionally show toast/snackbar here
        },
      });
    } catch (error) {
      console.log("Error", error);
    }
  };

  return (
    <>
      <ScreenContainer innerStyle={{ paddingBottom: 0 }}>
        <View style={styles.iconRow}>
          <BackButton />
        </View>

        <View>
          <Header
            headerTitle="Review and finalize"
            style={{ marginBottom: 12 }}
          />

          <BusinessInfo business={business} />

          <View style={styles.timeContainer}>
            <Ionicons name="calendar-outline" size={16} />
            <CustomText style={[styles.addressText, { textTransform: "none" }]}>
              {bookingData.dateTime}
            </CustomText>
          </View>

          {staff?.id && (
            <View style={{ paddingVertical: 16 }}>
              <CustomText style={styles.sectionTitle}>
                Selected Staff
              </CustomText>

              <View style={styles.itemContainer}>
                <View style={styles.avatar}>
                  {staff?.image ? (
                    <Image source={staff?.image} style={styles.avatarImg} />
                  ) : (
                    <CustomText style={styles.avatarText}>
                      {getInitials(staff?.name || "")}
                    </CustomText>
                  )}

                  <View style={styles.rating}>
                    <CustomText style={styles.ratingText}>
                      {staff?.rating === 0 ? "5" : staff.rating}
                    </CustomText>
                    <Ionicons name="star" color={Colors.light.black} />
                  </View>
                </View>

                <View style={{ paddingTop: 10 }}>
                  <CustomText style={styles.staffText}>
                    {staff?.name}
                  </CustomText>
                </View>
              </View>
            </View>
          )}

          <View style={{ paddingVertical: 16, gap: 12 }}>
            <CustomText style={styles.sectionTitle}>Overview</CustomText>

            <View>
              {service.map((s) => {
                return (
                  <ServiceSummary
                    key={`${s.title}-${s.price}}`}
                    serviceTitle={s.title}
                    price={s.price.toString()}
                  />
                );
              })}
            </View>

            <View style={styles.totalSection}>
              <CustomText style={styles.totalLabel}>Total</CustomText>
              <CustomText style={styles.totalLabel}>MX${total}</CustomText>
            </View>
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

      {showError && (
        <HoverError error="Error submitting appoinment, try again later" />
      )}
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
  input: {
    borderWidth: 1,
    borderColor: Colors.light.muted,
    borderRadius: 5,
    padding: 12,
    fontSize: 16,
    height: 55.5,
    backgroundColor: "#fafafa",
  },
  focusedInput: {
    borderColor: "#000",
    borderWidth: 2,
    borderRadius: 4,
  },
  textArea: {
    height: 150,
    textAlignVertical: "top",
    borderRadius: 5,
  },
});
