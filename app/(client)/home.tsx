import { HeroCardBig } from "@/components/core/home/homeCard";
import { HomeSection } from "@/components/core/home/homeSections";
import { Header } from "@/components/ui/header";
import { ScreenContainer } from "@/components/ui/screenContainer";
import { featuredBusinesses, marketingHome } from "@/utils";
import { Platform, ScrollView, StyleSheet } from "react-native";

export default function HomeScreen() {
  return (
    <ScreenContainer>
      <Header headerTitle="Home" style={{ marginBottom: 12 }} />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <HomeSection heading="For you" business={featuredBusinesses} />

        <HeroCardBig
          img={marketingHome[0].img}
          title={marketingHome[0].title}
          subtitle={marketingHome[0].subtitle}
          extra={marketingHome[0].extra}
          heading="Comfort"
        />

        <HeroCardBig
          img={marketingHome[1].img}
          title={marketingHome[1].title}
          subtitle={marketingHome[1].subtitle}
          extra={marketingHome[1].extra}
          heading="Explore"
        />

        <HomeSection heading="Top picks" business={featuredBusinesses} />
      </ScrollView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAFAF7",
  },
  scrollContent: {
    paddingBottom: Platform.OS === "ios" ? 70 : 30,
  },
});
