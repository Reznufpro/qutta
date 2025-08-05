import { Login } from "@/components/core/login";
import CustomHeading from "@/components/ui/customHeading";
import CustomText from "@/components/ui/customText";
import { InnerContainer } from "@/components/ui/innerContainer";
import { AppName } from "@/constants";
import { Colors } from "@/constants/Colors";
import { backgrounds } from "@/types";
import { Asset } from "expo-asset";
import { MotiView } from "moti";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Animated,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  View,
} from "react-native";

export const BACKGROUNDS: backgrounds[] = [
  {
    source: require("../../assets/onBoarding/barber.jpg"),
    text: "Crafted care, right on time.",
  },
  {
    source: require("../../assets/onBoarding/wellness.jpg"),
    text: "Move with purpose.",
  },
  {
    source: require("../../assets/onBoarding/spa1.jpg"),
    text: "Relax. We've got you.",
  },
];

export default function OnboardingScreen() {
  const [isReady, setIsReady] = useState(false);
  const [index, setIndex] = useState(0);
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const animationTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(
    null
  );

  // Initialize progress animations once
  const progressAnim = useRef(
    BACKGROUNDS.map(() => new Animated.Value(0))
  ).current;

  const animateStep = useCallback(
    (current: number) => {
      // Clear any existing timeout
      if (animationTimeoutRef.current) {
        clearTimeout(animationTimeoutRef.current);
      }

      fadeAnim.setValue(1);

      // Step 1: Animate progress fill
      Animated.timing(progressAnim[current], {
        toValue: 1,
        duration: 2000,
        useNativeDriver: false,
      }).start(() => {
        // Step 2: Fade out text
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }).start(() => {
          const next = (current + 1) % BACKGROUNDS.length;

          // Step 3: If we're at index 0, reset all progress to 0
          if (next === 0) {
            progressAnim.forEach((anim) => anim.setValue(0));
          }

          // Step 4: Change background index with a small delay to prevent conflicts
          animationTimeoutRef.current = setTimeout(() => {
            setIndex(next);

            // Step 5: Fade in new text
            fadeAnim.setValue(0);
            Animated.timing(fadeAnim, {
              toValue: 1,
              duration: 500,
              useNativeDriver: true,
            }).start(() => {
              // Step 6: Start next animation
              animateStep(next);
            });
          }, 50);
        });
      });
    },
    [fadeAnim, progressAnim]
  );

  useEffect(() => {
    const loadAssets = async () => {
      try {
        await Asset.fromModule(BACKGROUNDS[0].source).downloadAsync();
        setIsReady(true);

        // Start animation with a small delay after component is ready
        setTimeout(() => {
          animateStep(0);
        }, 100);
      } catch (error) {
        console.error("Failed to load assets:", error);
        setIsReady(true); // Still show the component even if assets fail to load
      }
    };

    loadAssets();

    // Cleanup function
    return () => {
      if (animationTimeoutRef.current) {
        clearTimeout(animationTimeoutRef.current);
      }
    };
  }, [animateStep]);

  if (!isReady) {
    return <View style={styles.loadingContainer} />;
  }

  return (
    <View style={{ flex: 1 }}>
      <MotiView
        from={{ opacity: 0, translateY: 10 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{
          delay: 400,
          type: "timing",
          duration: 400,
        }}
        style={{ flex: 1 }}
      >
        <ImageBackground
          source={BACKGROUNDS[index].source}
          style={styles.background}
          resizeMode="cover"
        >
          <View style={styles.overlay} />
          <SafeAreaView style={styles.safeArea}>
            <InnerContainer style={styles.innerContainer}>
              <CustomHeading style={styles.appName}>{AppName}</CustomHeading>

              <View style={styles.indicatorContainer}>
                {progressAnim.map((anim, i) => {
                  const width = anim.interpolate({
                    inputRange: [0, 1],
                    outputRange: ["0%", "100%"],
                  });

                  return (
                    <View key={i} style={styles.progressBarContainer}>
                      <Animated.View style={[styles.progressBar, { width }]} />
                    </View>
                  );
                })}
              </View>

              <CustomText style={styles.subtitle}>
                Where your time meets care.
              </CustomText>

              <Animated.View style={[styles.boldText, { opacity: fadeAnim }]}>
                <CustomHeading style={styles.backgroundText}>
                  {BACKGROUNDS[index].text}
                </CustomHeading>
              </Animated.View>
            </InnerContainer>

            <View style={styles.bottomButtonWrapper}>
              <Login />
            </View>
          </SafeAreaView>
        </ImageBackground>
      </MotiView>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: "black",
  },
  safeArea: {
    flex: 1,
    zIndex: 2,
  },
  innerContainer: {
    flex: 1,
    marginTop: 40,
  },
  appName: {
    color: Colors.light.cream,
  },
  indicatorContainer: {
    flexDirection: "row",
    marginTop: 15,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  progressBarContainer: {
    flex: 1,
    height: 2,
    backgroundColor: Colors.light.button,
    borderRadius: 2,
    overflow: "hidden",
    marginHorizontal: 4,
  },
  progressBar: {
    height: 4,
    backgroundColor: Colors.light.cream,
  },
  subtitle: {
    fontFamily: "CarosSoftBold",
    fontSize: 18,
    marginTop: 15,
    color: Colors.light.cream,
  },
  boldText: {
    marginTop: 25,
    maxWidth: 230,
  },
  backgroundText: {
    fontFamily: "CarosSoftBold",
    fontSize: 28,
    color: Colors.light.cream,
  },
  bottomButtonWrapper: {
    paddingHorizontal: 24,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.3)",
    zIndex: 1,
  },
});
