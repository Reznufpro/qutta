import CustomHeading from "@/components/ui/customHeading";
import CustomText from "@/components/ui/customText";
import { AppName, BASE_URL } from "@/constants";
import { Colors } from "@/constants/Colors";
import { useUserData } from "@/context/userContext";
import { registerPushToken } from "@/utils";
import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { useEffect, useRef, useState } from "react";
import { Animated, Easing, StyleSheet, View } from "react-native";

export default function IndexScreen() {
  const router = useRouter();
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const [status, setStatus] = useState("Checking for updates...");
  const { setUser } = useUserData();

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

    const tryAuth = async () => {
      try {
        const token = await SecureStore.getItemAsync("token");

        if (!token) {
          setStatus("No token found. Redirecting...");
          return router.replace("/onboarding");
        }

        setStatus("Loading data...");

        const res = await fetch(`${BASE_URL}auth/me`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          throw new Error("Token invalid or expired");
        }

        const user = await res.json();
        setUser({ ...user, token }); // Save user data
        await registerPushToken();

        if (user.role === "Client") {
          router.replace("/(client)/home");
        } else if (user.role === "Business") {
          router.replace("/(business)/dashboard");
        }
      } catch (err) {
        console.error("Auth failed:", err);
        router.replace("/onboarding");
      }
    };

    const splashTimeout = setTimeout(tryAuth, 1000); // delay for animation

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
