import { CustomListingHeader } from "@/components/ui/customListingHeader";
import CustomText from "@/components/ui/customText";
import { InnerContainer } from "@/components/ui/innerContainer";
import { AppName } from "@/constants";
import { Colors } from "@/constants/Colors";
import { useBooking } from "@/context/bookingContext";
import { useRouter } from "expo-router";
import LottieView from "lottie-react-native";
import { SafeAreaView, StyleSheet, TouchableOpacity, View } from "react-native";
import * as Animatable from "react-native-animatable";

export default function BusinessSuccessScreen() {
  const router = useRouter();
  const { resetBookingData } = useBooking();

  const handleFinish = () => {
    resetBookingData();
    router.push("/(business)/dashboard");
  };

  return (
    <SafeAreaView style={styles.container}>
      <InnerContainer style={{ flex: 1 }}>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <View>
            <Animatable.View
              animation="fadeInDown"
              duration={1000}
              style={styles.header}
            >
              <CustomListingHeader
                heading={`Welcome to ${AppName}`}
                subHeading="Your appointment has been successfully listed your business."
                style={{ textAlign: "center" }}
                stylesub={{ textAlign: "center" }}
              />
            </Animatable.View>

            <Animatable.View animation="bounceIn" delay={500}>
              <LottieView
                source={require("../../../assets/confetti.json")}
                autoPlay
                loop={true}
                style={styles.lottie}
              />
            </Animatable.View>
          </View>

          <Animatable.View animation="fadeInUp" delay={800}>
            <TouchableOpacity onPress={handleFinish} style={styles.button}>
              <CustomText style={styles.buttonText}>Finish</CustomText>
            </TouchableOpacity>
          </Animatable.View>
        </View>
      </InnerContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "space-between",
  },
  header: {
    alignItems: "center",
    textAlign: "center",
  },
  heading: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#222",
    marginBottom: 10,
  },
  subheading: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    paddingVertical: 20,
  },
  lottie: {
    width: "100%",
    height: 300,
    marginBottom: 50,
  },
  button: {
    backgroundColor: Colors.light.black,
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 12,
    alignItems: "center",
  },
  buttonText: {
    color: Colors.light.white,
    fontFamily: "Satoshi-Bold",
    fontSize: 18,
  },
});
