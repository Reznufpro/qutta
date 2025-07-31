import CustomText from "@/components/ui/customText";
import { Colors } from "@/constants/Colors";
import { bookingData, initialBookingData } from "@/context/bookingContext";
import { fullBusinessT, getInitials } from "@/utils";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { MotiView } from "moti";
import { useState } from "react";
import { FlatList, Pressable, StyleSheet, View } from "react-native";

interface StaffCardProps {
  staff: fullBusinessT["staff"];
  bookingData: bookingData;
  setBookingData: React.Dispatch<React.SetStateAction<bookingData>>;
}

interface item {
  id: string;
  name: string;
  rating?: number;
  image?: any;
}

export const StaffCard = ({
  staff,
  bookingData,
  setBookingData,
}: StaffCardProps) => {
  const [selectedStaff, setSelectedStaff] = useState<item | undefined>(
    undefined
  );

  const handleSelected = (selected: item) => {
    setBookingData((prev) => {
      const isSameStaff = prev.staff?.id === selected.id;
      const newStaff = isSameStaff ? initialBookingData["staff"] : selected;

      setSelectedStaff(newStaff);

      return {
        ...prev,
        staff: newStaff,
      };
    });
  };

  const renderItem = ({ item, index }: { item: item; index: number }) => {
    const { name, image, rating } = item;

    const selected = bookingData.staff?.id === item?.id;

    return (
      <MotiView
        from={{ opacity: 0, translateY: 10 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ delay: index * 100 }}
        style={styles.itemContainer}
      >
        <Pressable
          style={styles.avatar}
          onPress={() => {
            handleSelected(item);
          }}
        >
          {image ? (
            <Image
              source={image}
              style={[styles.avatarImg, selected && styles.selected]}
            />
          ) : (
            <CustomText style={styles.avatarText}>
              {getInitials(name || "")}
            </CustomText>
          )}

          <View style={styles.rating}>
            <CustomText style={styles.ratingText}>{rating}</CustomText>
            <Ionicons name="star" color={Colors.light.black} />
          </View>
        </Pressable>

        <View style={{ paddingTop: 10 }}>
          <CustomText style={styles.staffText}>{name}</CustomText>
        </View>
      </MotiView>
    );
  };

  return (
    <View>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator
        contentContainerStyle={styles.containerStaff}
        data={staff}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  containerStaff: {
    gap: 24,
  },
  itemContainer: {
    flexDirection: "column",
    alignContent: "center",
    alignItems: "center",
    paddingVertical: 16,
    maxWidth: 80,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 999,
    backgroundColor: Colors.light.highlight,
    justifyContent: "center",
    alignItems: "center",
  },
  selected: {
    borderWidth: 3,
    borderColor: Colors.light.black,
  },
  avatarImg: {
    width: 80,
    height: 80,
    borderRadius: 999,
    objectFit: "cover",
  },
  avatarText: {
    fontSize: 28,
    fontWeight: "600",
    color: "#fff",
    fontFamily: "CarosSoftBold",
  },
  rating: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
    paddingHorizontal: 2,
    backgroundColor: Colors.dark.tint,
    borderRadius: 12,
    position: "absolute",
    top: 4,
    right: -8,
  },
  ratingText: {
    color: "#000",
    fontSize: 12,
    marginLeft: 4,
    fontFamily: "CarosSoftBold",
  },
  staffText: {
    fontFamily: "CarosSoftMedium",
    fontSize: 15,
    textAlign: "center",
  },
});
