import CustomText from "@/components/ui/customText";
import { Colors } from "@/constants/Colors";
import { formatISODate, getInitials } from "@/utils";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { MotiView } from "moti";
import { StyleSheet, View } from "react-native";

interface IdentityCardProps {
  name: string;
  image?: string;
  type: string;
  joined: string;
}

export const IdentityCard = ({
  name,
  image,
  type,
  joined,
}: IdentityCardProps) => {
  if (!name || !type) {
    return null;
  }

  return (
    <MotiView
      from={{
        opacity: 0,
        scale: 0.95,
        translateY: 20,
      }}
      animate={{
        opacity: 1,
        scale: 1,
        translateY: 0,
      }}
      transition={{
        type: "timing",
        duration: 500,
        delay: 100,
      }}
      style={styles.card}
    >
      <View style={styles.profileSection}>
        <View style={styles.avatarBg}>
          {image ? (
            <Image source={image} style={styles.avatar} />
          ) : (
            <CustomText style={styles.avatarText}>
              {name && getInitials(name || "")}
            </CustomText>
          )}
        </View>
        <View style={styles.badge}>
          <Ionicons name="person" size={14} color={Colors.light.black} />
          <CustomText style={styles.badgeText}>{type}</CustomText>
        </View>
        <CustomText style={styles.name}>{name}</CustomText>
        <CustomText style={styles.subText}>{formatISODate(joined)}</CustomText>
      </View>
    </MotiView>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.light.white,
    borderRadius: 15,
    borderWidth: 0.5,
    borderColor: "#E7E7E7",
    padding: 16,
    paddingVertical: 24,
    alignItems: "center",
    shadowColor: "#E7E7E7",
    shadowOpacity: 0.6,
    shadowRadius: 15,
    shadowOffset: { width: 0, height: 4 },
    elevation: 1,
    marginBottom: 20,
  },
  profileSection: {
    alignItems: "center",
  },
  avatarBg: {
    width: 80,
    height: 80,
    borderRadius: 999,
    backgroundColor: Colors.light.highlight,
    justifyContent: "center",
    alignItems: "center",
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 36,
  },
  avatarText: {
    fontSize: 28,
    fontWeight: "600",
    color: "#fff",
    fontFamily: "CarosSoftBold",
  },
  badge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.dark.tint,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    position: "absolute",
    top: 4,
    right: -8,
  },
  badgeText: {
    color: "#000",
    fontSize: 12,
    marginLeft: 4,
    fontFamily: "CarosSoftBold",
  },
  name: {
    fontSize: 18,
    fontFamily: "CarosSoftBold",
    marginTop: 8,
  },
  subText: {
    fontSize: 13,
    color: Colors.light.black,
    fontFamily: "CarosSoftLight",
    marginTop: 4,
  },
  stats: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    paddingTop: 12,
    borderTopWidth: 1,
    borderColor: "#eee",
  },
});
