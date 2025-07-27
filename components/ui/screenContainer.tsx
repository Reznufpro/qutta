import { StatusBar } from "expo-status-bar";
import { MotiView } from "moti";
import { FC } from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { Easing } from "react-native-reanimated";
import { InnerContainer } from "./innerContainer";

interface Props {
  children: React.ReactNode;
}

export const ScreenContainer: FC<Props> = ({ children }) => {
  return (
    <SafeAreaView style={styles.container}>
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
        <InnerContainer style={{ gap: 12, marginTop: 20 }}>
          {children}
        </InnerContainer>
      </MotiView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAFAF7",
  },
});
