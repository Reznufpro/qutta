import CustomHeading from "@/components/ui/customHeading";
import { Colors } from "@/constants/Colors";
import { BusinessData } from "@/types";
import { getShortLocation } from "@/utils";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import { FlatList, Pressable, StyleSheet, View } from "react-native";
import { HomeCard } from "./homeCard";

interface HomeSectionT {
  heading: string;
  business: BusinessData[] | undefined;
}

export const HomeSection = ({ heading, business }: HomeSectionT) => {
  const router = useRouter();

  const handlePress = (id: string) => {
    router.push({ pathname: "/clientBusiness/[id]", params: { id: id } });
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <CustomHeading
          style={{
            fontFamily: "CarosSoftLight",
            fontSize: 24,
            textTransform: "capitalize",
            color: Colors.light.textSecondary,
          }}
        >
          {heading}
        </CustomHeading>
        <Ionicons
          name="chevron-forward-outline"
          size={12}
          color={Colors.light.text}
        />
      </View>

      <FlatList
        data={business}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <Pressable onPress={() => handlePress(item.id)}>
            <HomeCard
              img={item.image}
              name={item.name}
              rating={item.rating}
              location={getShortLocation(item.coordinates.location)}
              tag={item.tag}
            />
          </Pressable>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 8,
    marginBottom: 30,
    gap: 15,
  },
  headerContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  listContent: {
    gap: 15,
  },
});
