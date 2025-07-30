import CustomText from "@/components/ui/customText";
import { Colors } from "@/constants/Colors";
import { bookingClientCardT } from "@/utils";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
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

  const handlePress = () => {
    router.push("/bookings/[id]");
  };

  console.log(booking.img);

  return (
    <TouchableOpacity onPress={handlePress}>
      <View style={styles.card}>
        <Image source={booking.img} style={styles.image} />
        <View style={styles.details}>
          <CustomText style={styles.name}>{booking.businessName}</CustomText>
          <CustomText
            style={styles.dateTime}
          >{`${booking.date} at ${booking.time}`}</CustomText>

          {booking.service &&
            booking.service.map((serv) => {
              return (
                <View
                  style={{ flexDirection: "row", gap: 4 }}
                  key={serv.serviceTitle}
                >
                  <CustomText style={styles.service}>
                    MX${serv.price} {"•"}
                  </CustomText>
                  <CustomText style={styles.service}>
                    {serv.serviceTitle} {"•"}
                  </CustomText>
                  {serv.staff && (
                    <CustomText style={styles.service}>
                      with {serv.staff}
                    </CustomText>
                  )}
                </View>
              );
            })}

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
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.light.white,
    borderWidth: 0.5,
    borderColor: "#E7E7E7",
    borderRadius: 16,
    overflow: "hidden",
    marginBottom: 20,
    shadowColor: "#E7E7E7",
    shadowOpacity: 0.6,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 1,
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
    fontFamily: "Satoshi-Bold",
    color: Colors.light.text,
  },
  dateTime: {
    fontFamily: "CarosSoftMedium",
    fontSize: 14,
    color: Colors.light.textSecondary,
  },
  service: {
    fontFamily: "CarosSoftLight",
    fontSize: 14,
    color: Colors.light.textSecondary,
  },
  buttons: {
    flexDirection: "row",
    marginTop: 10,
    gap: 12,
    width: "100%",
    justifyContent: "space-between",
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  buttonText: {
    fontSize: 14,
    color: Colors.light.black,
    fontFamily: "CarosSoftBold",
  },
});
