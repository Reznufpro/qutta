import { HeroCardBig } from "@/components/core/home/homeCard";
import { HomeSection } from "@/components/core/home/homeSections";
import { Header } from "@/components/ui/header";
import LoadingScreen from "@/components/ui/loadingScreen";
import { ScreenContainer } from "@/components/ui/screenContainer";
import { useGetAllBusinessess } from "@/hooks/useCreateBusiness";
import { marketingHome } from "@/utils";
import { useMemo } from "react";
import { Platform, ScrollView, StyleSheet } from "react-native";

export default function HomeScreen() {
  const { data: featuredBusinesses, isLoading } = useGetAllBusinessess();

  const recommended = useMemo(() => {
    return featuredBusinesses?.filter((items) => items.tag === "Recommended");
  }, [featuredBusinesses]);

  const newBusinesses = useMemo(() => {
    return featuredBusinesses?.filter((items) => items.tag === "New");
  }, [featuredBusinesses]);

  if (isLoading) {
    return <LoadingScreen status="Loading businesses..." />;
  }

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

        <HomeSection heading="Recommended" business={recommended} />

        <HeroCardBig
          img={marketingHome[1].img}
          title={marketingHome[1].title}
          subtitle={marketingHome[1].subtitle}
          extra={marketingHome[1].extra}
          heading="Explore"
        />

        <HeroCardBig
          img={marketingHome[2].img}
          title={marketingHome[2].title}
          subtitle={marketingHome[2].subtitle}
          extra={marketingHome[2].extra}
          heading="Manage"
        />

        <HomeSection heading="New" business={newBusinesses} />
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
