import CustomHeading from "@/components/ui/customHeading";
import { Colors } from "@/constants/Colors";
import { businessType } from "@/utils";
import Ionicons from "@expo/vector-icons/Ionicons";
import { FlatList, StyleSheet, View } from "react-native";
import { HomeCard } from "./homeCard";

interface HomeSectionT {
  heading: string;
  business: businessType[];
}

export const HomeSection = ({ heading, business }: HomeSectionT) => {
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <CustomHeading
          style={{
            fontFamily: "CormorantGaramond-Light",
            fontSize: 30,
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
          <HomeCard
            img={item.image}
            name={item.name}
            rating={item.rating}
            distance={item.distance}
            tag={item.tag}
          />
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
