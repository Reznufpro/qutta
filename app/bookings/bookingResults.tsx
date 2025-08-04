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
import {
  useAddFavorite,
  useFavorites,
  useRemoveFavorite,
} from "@/hooks/useFavorite";
import { BookingReturnType } from "@/types";
import {
  addToCalendar,
  capitalize,
  handleCallNumber,
  handleDirections,
} from "@/utils";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useLocalSearchParams, useRouter } from "expo-router";
import { MotiView } from "moti";
import { useMemo } from "react";
import { Dimensions, ScrollView, StyleSheet, View } from "react-native";

const { height } = Dimensions.get("window");

export default function BookingsItemScreen() {
  const { results } = useLocalSearchParams();

  const parsedResults: BookingReturnType = useMemo(() => {
    try {
      return JSON.parse(decodeURIComponent(results as string));
    } catch (err) {
      console.log("Error parsing flight results:", err);
      return [];
    }
  }, [results]);

  const { service, status, business, dateTime } = parsedResults;
  const router = useRouter();

  const { data: favorites } = useFavorites();
  const addFavorite = useAddFavorite();
  const removeFavorite = useRemoveFavorite();

  const isFavorited =
    parsedResults &&
    favorites?.some((fav) => fav.id === parsedResults.business.id);

  const toggleFavorite = () => {
    if (addFavorite.isPending || removeFavorite.isPending || !parsedResults)
      return;

    if (isFavorited) {
      removeFavorite.mutate(parsedResults.business.id);
    } else {
      addFavorite.mutate(parsedResults.business.id);
    }
  };

  const total = useMemo(() => {
    const prices = service?.map((s) => Number(s.price) || 0);
    return prices?.reduce((acc, curr) => acc + curr, 0);
  }, []);

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

  const bookingAgain = () => {
    router.push({
      pathname: "/clientBusiness/[id]",
      params: { id: business.id },
    });
  };

  return (
    <>
      <View style={styles.imageContainer}>
        <Image source={business.image[0]} style={styles.image} />

        <View style={styles.iconRow}>
          <BackButton />
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        <InnerContainer style={{ gap: 24 }}>
          <View style={styles.status}>
            <CustomText style={styles.headerTitle}>{business.name}</CustomText>

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

          <CustomText style={styles.time}>{dateTime}</CustomText>

          <View>
            {status === "confirmed"
              ? confirmed.map((item, i) => {
                  const subtitleItem =
                    item.title === "Getting there"
                      ? business.coordinates?.location
                      : item.title === "Contact business"
                      ? business.phone_number
                      : i === confirmed.length - 1
                      ? business.name
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
                        ionicon={
                          item.favorite
                            ? isFavorited
                              ? "heart"
                              : "heart-outline"
                            : item.ionicon
                        }
                        title={
                          item.favorite
                            ? isFavorited
                              ? "Remove from favorite"
                              : "Add to favorite"
                            : item.title
                        }
                        subtitle={subtitleItem}
                        index={i}
                        item={confirmed}
                        iconColor={
                          item.favorite && isFavorited
                            ? "red"
                            : Colors.light.highlight
                        }
                        onPress={() => {
                          if (item.link)
                            handleDirections({
                              location: business.coordinates?.location,
                            });
                          else if (item.favorite) toggleFavorite();
                          else if (item.call)
                            handleCallNumber(business.phone_number);
                          else if (item.calendar)
                            addToCalendar(
                              business.name,
                              dateTime,
                              business.coordinates?.location
                            );
                          else if (item.bookAgain) bookingAgain();
                        }}
                      />
                    </MotiView>
                  );
                })
              : otherStatus.map((item, i) => {
                  const subtitleItem =
                    item.title === "Contact business"
                      ? business.phone_number
                      : i === otherStatus.length - 1
                      ? business.name
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
                        ionicon={
                          item.favorite
                            ? isFavorited
                              ? "heart"
                              : "heart-outline"
                            : item.ionicon
                        }
                        title={
                          item.favorite
                            ? isFavorited
                              ? "Remove from favorite"
                              : "Add to favorite"
                            : item.title
                        }
                        subtitle={subtitleItem}
                        index={i}
                        item={otherStatus}
                        iconColor={
                          item.favorite && isFavorited
                            ? "red"
                            : Colors.light.highlight
                        }
                        onPress={() => {
                          if (item.link)
                            handleDirections({
                              location: business.coordinates?.location,
                            });
                          else if (item.favorite) toggleFavorite();
                          else if (item.call)
                            handleCallNumber(business.phone_number);
                          else if (item.bookAgain) bookingAgain();
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
                  key={`${s.title}-${s.price}`}
                  serviceTitle={s.title}
                  price={s.price.toString()}
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
