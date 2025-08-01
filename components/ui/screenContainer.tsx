import { StatusBar } from "expo-status-bar";
import { MotiView } from "moti";
import { FC } from "react";
import { SafeAreaView, StyleProp, StyleSheet, ViewStyle } from "react-native";
import { Easing } from "react-native-reanimated";
import { InnerContainer } from "./innerContainer";

interface Props {
  children: React.ReactNode;
  outterStyle?: StyleProp<ViewStyle>;
  innerStyle?: StyleProp<ViewStyle>;
}

export const ScreenContainer: FC<Props> = ({
  children,
  innerStyle,
  outterStyle,
}) => {
  return (
    <SafeAreaView style={[styles.container, outterStyle]}>
      <StatusBar style="dark" />

      <MotiView
        from={{ opacity: 0, translateY: 10 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{
          type: "timing",
          duration: 250,
          delay: 120,
          easing: Easing.out(Easing.ease),
        }}
      >
        <InnerContainer
          style={[{ gap: 12, marginTop: 20, paddingBottom: 70 }, innerStyle]}
        >
          {children}
        </InnerContainer>
      </MotiView>
    </SafeAreaView>
  );
};

export const ScreenContainerWithoutAnimation: FC<Props> = ({
  children,
  innerStyle,
  outterStyle,
}) => {
  return (
    <SafeAreaView style={[styles.container, outterStyle]}>
      <StatusBar style="dark" />

      <InnerContainer
        style={[{ gap: 12, marginTop: 20, paddingBottom: 30 }, innerStyle]}
      >
        {children}
      </InnerContainer>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAFAF7",
  },
});
