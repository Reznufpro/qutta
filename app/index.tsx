import CustomHeading from "@/components/ui/customHeading";
import CustomText from "@/components/ui/customText";
import { AppName } from "@/constants";
import { Colors } from "@/constants/Colors";
import { useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { Animated, Easing, StyleSheet, View } from "react-native";

export default function IndexScreen() {
  const router = useRouter();
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const [status, setStatus] = useState("Checking for updates...");

  useEffect(() => {
    // Pulse animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.05,
          duration: 700,
          useNativeDriver: true,
          easing: Easing.inOut(Easing.ease),
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 700,
          useNativeDriver: true,
          easing: Easing.inOut(Easing.ease),
        }),
      ])
    ).start();

    // Text sequence
    setTimeout(() => setStatus("Loading data..."), 1000);

    const splashTimeout = setTimeout(() => {
      router.replace("/onboarding");
    }, 2200); // adjust total duration as needed

    return () => clearTimeout(splashTimeout);
  }, []);

  return (
    <View style={styles.container}>
      <Animated.Text style={[{ transform: [{ scale: scaleAnim }] }]}>
        <CustomHeading style={{ color: Colors.light.black, fontSize: 45 }}>
          {AppName}
        </CustomHeading>
      </Animated.Text>
      <CustomText style={styles.subtext}>{status}</CustomText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
    justifyContent: "center",
    alignItems: "center",
  },
  subtext: {
    marginTop: 5,
    fontSize: 16,
    color: Colors.light.black,
  },
});
