import CustomText from "@/components/ui/customText";
import { Colors } from "@/constants/Colors";
import { bookingClientCardT } from "@/utils";
import { Ionicons } from "@expo/vector-icons";
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
  const handleDirections = () => {
    if (booking.location) {
      const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        booking.location
      )}`;
      Linking.openURL(url);
    }
  };

  const handleCalendar = () => {
    if (booking.calendarUrl) {
      Linking.openURL(booking.calendarUrl);
    }
  };

  return (
    <View style={styles.card}>
      <Image source={booking.img} style={styles.image} />
      <View style={styles.details}>
        <CustomText style={styles.name}>{booking.businessName}</CustomText>
        <CustomText
          style={styles.dateTime}
        >{`${booking.date} at ${booking.time}`}</CustomText>

        <View style={styles.buttons}>
          <TouchableOpacity onPress={handleDirections} style={styles.button}>
            <Ionicons
              name="location-outline"
              size={16}
              color={Colors.light.text}
            />
            <CustomText style={styles.buttonText}>Get Directions</CustomText>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleCalendar} style={styles.button}>
            <Ionicons
              name="calendar-outline"
              size={16}
              color={Colors.light.text}
            />
            <CustomText style={styles.buttonText}>Add to Calendar</CustomText>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.light.white,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.05)",
    borderRadius: 16,
    overflow: "hidden",
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 2,
  },
  image: {
    width: "100%",
    height: 160,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  details: {
    padding: 16,
    gap: 6,
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.light.text,
  },
  dateTime: {
    fontSize: 14,
    color: Colors.light.textSecondary,
  },
  buttons: {
    flexDirection: "row",
    marginTop: 10,
    gap: 12,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  buttonText: {
    fontSize: 14,
    color: Colors.light.text,
  },
});
