import { CustomDivider } from "@/components/ui/customDivider";
import CustomText from "@/components/ui/customText";
import { Colors } from "@/constants/Colors";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Pressable, StyleSheet, View } from "react-native";

interface itemDetails {
  ionicon?: keyof typeof Ionicons.glyphMap;
  materialicon?: keyof typeof MaterialIcons.glyphMap;
  title: string;
  subtitle?: string;
  link?: boolean;
  favorite?: boolean;
  calendar?: boolean;
  bookAgain?: boolean;
}

export const confirmed: itemDetails[] = [
  {
    materialicon: "calendar-today",
    title: "Add to calendar",
    subtitle: "Set yourself a reminder",
    calendar: true,
  },
  { ionicon: "location-sharp", title: "Getting there", link: true },
  { ionicon: "heart-outline", title: "Add to favorites", favorite: true },
  {
    materialicon: "edit-calendar",
    title: "Manage appointment",
    subtitle: "Cancel",
  },
  { ionicon: "business-outline", title: "Business details" },
];

export const businessCards: itemDetails[] = [
  { ionicon: "location-sharp", title: "Getting there", link: true },
  { ionicon: "time-outline", title: "Opening hours" },
  { ionicon: "heart-outline", title: "Add to favorites", favorite: true },
];

export const otherStatus: itemDetails[] = [
  {
    ionicon: "add-circle-outline",
    title: "Book again",
    subtitle: "Book your next appointment",
    bookAgain: true,
  },
  { ionicon: "heart-outline", title: "Add to favorites", favorite: true },
  {
    ionicon: "business-outline",
    title: "Business details",
  },
];

export const InfoRow = ({
  materialicon,
  isFavorited,
  iconColor,
  ionicon,
  onPress,
  title,
  subtitle,
  index,
  item,
}: {
  materialicon?: keyof typeof MaterialIcons.glyphMap;
  ionicon?: keyof typeof Ionicons.glyphMap;
  title: string;
  subtitle?: string | null | undefined;
  index: number;
  item: itemDetails[];
  iconColor?: string;
  onPress?: () => void;
  isFavorited?: boolean | undefined;
}) => (
  <Pressable
    style={({ pressed }) => [styles.container, pressed && { opacity: 0.5 }]}
    onPress={onPress}
  >
    <View style={styles.row}>
      {materialicon ? (
        <View style={styles.iconContainer}>
          <MaterialIcons
            name={materialicon}
            size={20}
            color={Colors.light.highlight}
          />
        </View>
      ) : ionicon ? (
        <View style={styles.iconContainer}>
          <Ionicons
            name={ionicon}
            size={20}
            color={iconColor || Colors.light.highlight}
          />
        </View>
      ) : null}

      <View style={styles.textContainer}>
        <CustomText style={styles.title}>{title}</CustomText>
        {subtitle ? (
          <CustomText style={styles.subtitle}>{subtitle}</CustomText>
        ) : null}
      </View>
    </View>

    {index < item.length - 1 && <CustomDivider style={styles.divider} />}
  </Pressable>
);

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.light.black,
  },
  textContainer: {
    flex: 1,
    gap: 4,
  },
  title: {
    fontSize: 15,
    color: Colors.light.black,
    fontFamily: "Satoshi-Bold",
  },
  subtitle: {
    fontSize: 13,
    color: Colors.light.textSecondary,
    fontFamily: "CarosSoftLight",
    maxWidth: 300,
  },
  divider: {
    marginVertical: 0,
    marginTop: 10,
    marginLeft: 52,
  },
});
