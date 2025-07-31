import {
  confirmed,
  InfoRow,
  otherStatus,
} from "@/components/core/bookings/infoRow";
import { ServiceSummary } from "@/components/core/bookings/serviceSummary";
import { BackButton } from "@/components/ui/backButton";
import CustomText from "@/components/ui/customText";
import { InnerContainer } from "@/components/ui/innerContainer";
import { Colors } from "@/constants/Colors";
import { capitalize, handleDirections, mockBooking } from "@/utils";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useLocalSearchParams } from "expo-router";
import { MotiView } from "moti";
import { useMemo } from "react";
import { Dimensions, ScrollView, StyleSheet, View } from "react-native";

const { height } = Dimensions.get("window");

export default function BookingsItemScreen() {
  const { id } = useLocalSearchParams();

  const { businessName, location, img, service, time } = mockBooking;

  const total = useMemo(() => {
    const prices = service?.map((s) => Number(s.price) || 0);
    return prices?.reduce((acc, curr) => acc + curr, 0);
  }, []);

  type BookingStatus = "confirmed" | "cancelled";
  const status = "confirmed" as BookingStatus;

  const statusMap = {
    confirmed: {
      icon: "checkmark-done-circle-outline" as keyof typeof Ionicons.glyphMap,
      color: Colors.light.black,
    },
    cancelled: {
      icon: "close-circle-outline" as keyof typeof Ionicons.glyphMap,
      color: "red",
    },
  };

  const { icon: statusIcon, color: statusColor } = statusMap[status];

  return (
    <>
      <View style={styles.imageContainer}>
        <Image source={img} style={styles.image} />

        <View style={styles.iconRow}>
          <BackButton />
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        <InnerContainer style={{ gap: 24 }}>
          <View style={styles.status}>
            <CustomText style={styles.headerTitle}>{businessName}</CustomText>

            <View
              style={[styles.statusContainer, { backgroundColor: statusColor }]}
            >
              <Ionicons
                name={statusIcon}
                size={24}
                color={Colors.light.highlight}
              />
              <CustomText style={styles.confirmed}>
                {capitalize(status)}
              </CustomText>
            </View>
          </View>

          <CustomText style={styles.time}>Today at {time}</CustomText>

          <View>
            {status === "confirmed"
              ? confirmed.map((item, i) => {
                  const subtitleItem =
                    item.title === "Getting there"
                      ? location
                      : i === confirmed.length - 1
                      ? businessName
                      : item.subtitle;

                  return (
                    <MotiView
                      from={{ opacity: 0, translateY: 10 }}
                      animate={{ opacity: 1, translateY: 0 }}
                      transition={{
                        delay: i * 100,
                        type: "timing",
                        duration: 300,
                      }}
                      key={item.title}
                    >
                      <InfoRow
                        materialicon={item.materialicon}
                        ionicon={item.ionicon}
                        title={item.title}
                        subtitle={subtitleItem}
                        index={i}
                        item={confirmed}
                        onPress={() => {
                          if (item.link)
                            handleDirections({ location: location });
                          else if (item.favorite) console.log("favorited");
                          else if (item.calendar) console.log("calendar");
                        }}
                      />
                    </MotiView>
                  );
                })
              : otherStatus.map((item, i) => {
                  const subtitleItem =
                    i === otherStatus.length - 1 ? businessName : item.subtitle;

                  return (
                    <MotiView
                      from={{ opacity: 0, translateY: 10 }}
                      animate={{ opacity: 1, translateY: 0 }}
                      transition={{
                        delay: i * 100,
                        type: "timing",
                        duration: 300,
                      }}
                      key={item.title}
                    >
                      <InfoRow
                        ionicon={item.ionicon}
                        title={item.title}
                        subtitle={subtitleItem}
                        index={i}
                        item={otherStatus}
                        onPress={() => {
                          if (item.link)
                            handleDirections({ location: location });
                          else if (item.favorite) console.log("favorited");
                          else if (item.calendar) console.log("calendar");
                        }}
                      />
                    </MotiView>
                  );
                })}
          </View>

          <View style={{ marginTop: 20, gap: 12 }}>
            <CustomText style={styles.sectionTitle}>Overview</CustomText>

            <View>
              {service?.map((s) => (
                <ServiceSummary
                  key={`${s.serviceTitle}-${s.staff}`}
                  serviceTitle={s.serviceTitle}
                  price={s.price}
                />
              ))}
            </View>

            {/* Total */}
            <View style={styles.totalSection}>
              <CustomText style={styles.totalLabel}>Total</CustomText>
              <CustomText style={styles.totalLabel}>MX${total}</CustomText>
            </View>
          </View>
        </InnerContainer>
      </ScrollView>
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
  },
  image: {
    width: "100%",
    height: height / 2.8,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
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
  status: {
    gap: 12,
  },
  statusContainer: {
    borderRadius: 999,
    paddingVertical: 4,
    paddingHorizontal: 8,
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    alignSelf: "flex-start",
  },
  confirmed: {
    fontFamily: "Satoshi-Bold",
    fontSize: 14,
    color: Colors.light.white,
  },
  time: {
    fontSize: 18,
    fontFamily: "Satoshi-Bold",
  },
  subText: {
    color: "#888",
    fontSize: 14,
  },
  sectionTitle: {
    fontFamily: "Satoshi-Bold",
    fontSize: 18,
    marginBottom: 4,
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
