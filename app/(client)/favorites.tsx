import { HeroCardBig } from "@/components/core/home/homeCard";
import CustomText from "@/components/ui/customText";
import { Header } from "@/components/ui/header";
import { ScreenContainer } from "@/components/ui/screenContainer";
import { Colors } from "@/constants/Colors";
import { featuredBusinesses } from "@/utils";
import Ionicons from "@expo/vector-icons/Ionicons";
import { FlatList, StyleSheet, View } from "react-native";

export default function FavoritesScreen() {
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
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
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
            extra={`${item.location} • ${item.distance}`}
            style={{ marginBottom: 0, paddingTop: 0 }}
          />
        )}
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
});
