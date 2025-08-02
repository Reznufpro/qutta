import CustomHeading from "@/components/ui/customHeading";
import { Colors } from "@/constants/Colors";
import { BusinessData } from "@/types";
import { getShortLocation, trimTextToOneLine } from "@/utils";
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

  const showLimit = business?.slice(0, 3);

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <CustomHeading style={styles.headerText}>{heading}</CustomHeading>
        <Ionicons
          name="chevron-forward-outline"
          size={12}
          color={Colors.light.text}
        />
      </View>

      <FlatList
        data={showLimit}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <Pressable onPress={() => handlePress(item.id)}>
            <HomeCard
              img={item.image}
              name={trimTextToOneLine(item.name, 16)}
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
  headerText: {
    fontFamily: "CarosSoftLight",
    fontSize: 24,
    textTransform: "capitalize",
    color: Colors.light.textSecondary,
  },
  listContent: {
    gap: 15,
  },
});
