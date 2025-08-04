import { AppName } from "@/constants";
import { Colors } from "@/constants/Colors";
import { useEffect, useRef } from "react";
import { Animated, Easing, StyleSheet, View } from "react-native";
import CustomHeading from "./customHeading";
import CustomText from "./customText";

interface LoadingScreenProps {
  status?: string;
}

export default function LoadingScreen({
  status = "Loading...",
}: LoadingScreenProps) {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const animation = Animated.loop(
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
    );
    animation.start();

    return () => animation.stop(); // clean up on unmount
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
        <CustomHeading style={styles.title}>{AppName}</CustomHeading>
      </Animated.View>
      <CustomText style={styles.status}>{status}</CustomText>
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
  title: {
    fontSize: 45,
    color: Colors.light.black,
  },
  status: {
    marginTop: 5,
    fontSize: 16,
    color: Colors.light.black,
  },
});
