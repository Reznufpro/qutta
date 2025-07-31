import { HeroCardBig } from "@/components/core/home/homeCard";
import CustomHeading from "@/components/ui/customHeading";
import CustomText from "@/components/ui/customText";
import { Header } from "@/components/ui/header";
import { ScreenContainer } from "@/components/ui/screenContainer";
import { Colors } from "@/constants/Colors";
import { featuredBusinesses } from "@/utils";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import { FlatList, Pressable, StyleSheet, View } from "react-native";

export default function FavoritesScreen() {
  const router = useRouter();

  const handleGetStarted = () => router.push("/(client)/home");

  const handlePress = () => {
    router.push("/clientBusiness/[id]");
  };

  return (
    <ScreenContainer>
      <Header
        headerTitle="Favorites"
        subHeader="See your favorite businesses and book appointments easily."
        style={{ marginBottom: 12 }}
      />

      <FlatList
        data={featuredBusinesses}
        keyExtractor={(item) => item.id}
        scrollEnabled
        horizontal={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <Pressable onPress={handlePress}>
            <HeroCardBig
              img={item.image}
              title={item.name}
              subtitle={
                <View
                  style={{ flexDirection: "row", alignItems: "center", gap: 4 }}
                >
                  <CustomText style={styles.text}>{item.rating}</CustomText>
                  <Ionicons name="star" size={14} color={Colors.light.white} />
                </View>
              }
              extra={`${item.coordinates?.location} • ${item.distance}`}
              style={{ marginBottom: 0, paddingTop: 0 }}
            />
          </Pressable>
        )}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <CustomHeading style={styles.headin}>No favorites</CustomHeading>

            <CustomText style={styles.emptyText}>
              Your favorites are empty, Explore businesses and save some. They
              will appear here.
            </CustomText>

            <Pressable style={styles.button} onPress={handleGetStarted}>
              <CustomText style={styles.buttonText}>Get started</CustomText>
            </Pressable>
          </View>
        }
      />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  listContent: {
    gap: 15,
    paddingBottom: 150,
  },
  text: {
    fontFamily: "CarosSoftLight",
    fontSize: 15,
    color: Colors.light.background,
  },
  emptyContainer: {
    flexDirection: "column",
    gap: 5,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 150,
  },
  headin: {
    fontFamily: "CarosSoftBold",
    textAlign: "center",
    fontSize: 18,
    textTransform: "capitalize",
    color: Colors.light.black,
  },
  emptyText: {
    fontFamily: "Satoshi-Bold",
    fontSize: 14,
    marginBottom: 16,
    textAlign: "center",
    color: Colors.light.textSecondary,
    maxWidth: 350,
  },
  button: {
    backgroundColor: Colors.light.black,
    paddingVertical: 14,
    paddingHorizontal: 14,
    alignItems: "center",
    borderRadius: 8,
    marginBottom: 40,
  },
  buttonText: {
    color: Colors.light.white,
    fontFamily: "CarosSoftBold",
    fontSize: 15,
  },
});
