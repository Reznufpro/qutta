import { Login } from "@/components/core/login";
import CustomHeading from "@/components/ui/customHeading";
import CustomText from "@/components/ui/customText";
import { InnerContainer } from "@/components/ui/innerContainer";
import { AppName } from "@/constants";
import { Colors } from "@/constants/Colors";
import { backgrounds } from "@/types";
import { Asset } from "expo-asset";
import { MotiView } from "moti";
import React, { useEffect, useRef, useState } from "react";
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
    text: "Relax. We’ve got you.",
  },
];

export default function OnboardingScreen() {
  const [isReady, setIsReady] = useState(false);
  const [index, setIndex] = useState(0);
  const fadeAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const loadAssets = async () => {
      await Asset.fromModule(BACKGROUNDS[0].source).downloadAsync();
      setIsReady(true);
      animateStep(0);
    };

    loadAssets();
  }, []);

  const progressAnim = useRef(
    BACKGROUNDS.map(() => new Animated.Value(0))
  ).current;

  const animateStep = (current: number) => {
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

        // Step 3: If we're at index 0, reset all progress to 0 before continuing
        if (next === 0) {
          progressAnim.forEach((anim) => anim.setValue(0));
        }

        // Step 4: Change background index
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
      });
    });
  };

  if (!isReady) {
    return <View style={{ flex: 1, backgroundColor: "black" }} />;
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
          <SafeAreaView style={{ flex: 1, zIndex: 2 }}>
            <InnerContainer style={{ flex: 1, marginTop: 40 }}>
              <CustomHeading style={{ color: Colors.light.cream }}>
                {AppName}
              </CustomHeading>

              <View style={styles.indicatorContainer}>
                {progressAnim.map((anim, i) => {
                  const width = anim.interpolate({
                    inputRange: [0, 1],
                    outputRange: ["0%", "100%"],
                  });

                  return (
                    <View
                      key={i}
                      style={{
                        flex: 1,
                        height: 2,
                        backgroundColor: Colors.light.button,
                        borderRadius: 2,
                        overflow: "hidden",
                        marginHorizontal: 4,
                      }}
                    >
                      <Animated.View
                        style={{
                          height: 4,
                          backgroundColor: Colors.light.cream,
                          width,
                        }}
                      />
                    </View>
                  );
                })}
              </View>

              <CustomText style={styles.subtitle}>
                Where your time meets care.
              </CustomText>

              <Animated.View style={[styles.boldText, { opacity: fadeAnim }]}>
                <CustomHeading
                  style={{
                    fontFamily: "CarosSoftBold",
                    fontSize: 28,
                    color: Colors.light.cream,
                  }}
                >
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
  indicatorContainer: {
    flexDirection: "row",
    marginTop: 15,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
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
  bottomButtonWrapper: {
    paddingHorizontal: 24,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.3)",
    zIndex: 1,
  },
});
