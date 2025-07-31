import CustomText from "@/components/ui/customText";
import { Colors } from "@/constants/Colors";
import { bookingClientCardT, capitalize, handleDirections } from "@/utils";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useMemo } from "react";
import {
  Image,
  Linking,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

interface Props {
  booking: bookingClientCardT;
}

export const ClientBookingCard = ({ booking }: Props) => {
  const router = useRouter();

  const handleCalendar = () => {
    if (booking.calendarUrl) {
      Linking.openURL(booking.calendarUrl);
    }
  };

  const handlePress = () => {
    router.push("/bookings/[id]");
  };

  const total = useMemo(() => {
    const prices = booking.service?.map((s) => Number(s.price) || 0);
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

  const { color: statusColor } = statusMap[status];

  return (
    <TouchableOpacity onPress={handlePress} activeOpacity={0.95}>
      <View style={styles.card}>
        <View style={styles.imageWrapper}>
          <View style={[styles.overlay]} />
          <Image source={booking.img} style={styles.image} />
          {status ? (
            <View style={[styles.statusTag, { backgroundColor: statusColor }]}>
              <CustomText style={styles.statusText}>
                {capitalize(status)}
              </CustomText>
            </View>
          ) : null}
        </View>

        <View style={styles.details}>
          <CustomText style={styles.name}>{booking.businessName}</CustomText>
          <CustomText style={styles.dateTime}>
            {`${booking.date} at ${booking.time}`}
          </CustomText>

          <CustomText style={styles.totalLabel}>Total: MX${total}</CustomText>

          <View style={styles.buttons}>
            <TouchableOpacity
              onPress={() => handleDirections({ location: booking.location })}
              style={styles.button}
            >
              <Ionicons
                name="location-outline"
                size={16}
                color={Colors.light.highlight}
              />
              <CustomText style={styles.buttonText}>Directions</CustomText>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleCalendar} style={styles.button}>
              <Ionicons
                name="calendar-outline"
                size={16}
                color={Colors.light.highlight}
              />
              <CustomText style={styles.buttonText}>Calendar</CustomText>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.light.white,
    borderWidth: 0.5,
    borderColor: "#E7E7E7",
    borderRadius: 15,
    overflow: "hidden",
    marginBottom: 20,
    shadowColor: "#E7E7E7",
    shadowOpacity: 0.6,
    shadowRadius: 15,
    shadowOffset: { width: 0, height: 4 },
    elevation: 1,
  },
  imageWrapper: {
    width: "100%",
    height: 160,
    overflow: "hidden",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    position: "relative",
  },
  image: {
    width: "100%",
    height: 160,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  statusTag: {
    position: "absolute",
    top: 12,
    right: 12,
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 12,
    zIndex: 2,
  },
  statusText: {
    fontSize: 14,
    color: "#fff",
    fontFamily: "CarosSoftMedium",
  },
  details: {
    padding: 16,
    gap: 6,
  },
  name: {
    fontSize: 16,
    fontFamily: "Satoshi-Bold",
    color: Colors.light.text,
  },
  dateTime: {
    fontFamily: "CarosSoftMedium",
    fontSize: 14,
    color: Colors.light.textSecondary,
  },
  totalLabel: {
    fontSize: 14,
    fontFamily: "CarosSoftBold",
  },
  buttons: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 12,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 999,
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: Colors.light.black,
    gap: 6,
  },
  buttonText: {
    fontSize: 14,
    color: Colors.light.white,
    fontFamily: "CarosSoftBold",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.3)",
    zIndex: 1,
    borderRadius: 15,
  },
});
