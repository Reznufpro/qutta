import CustomText from "@/components/ui/customText";
import { Colors } from "@/constants/Colors";
import { fullBusinessT } from "@/utils";
import { MotiView } from "moti";
import React, { useState } from "react";
import {
  FlatList,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

interface ServiceTabsProps {
  services: fullBusinessT["services"];
}

export const ServiceTabs = ({ services }: ServiceTabsProps) => {
  const tabData = Object.values(services);
  const [selectedTab, setSelectedTab] = useState(0);
  const [visibleCount, setVisibleCount] = useState(4);

  const currentServices = tabData[selectedTab].service.slice(0, visibleCount);
  const hasMore = visibleCount < tabData[selectedTab].service.length;

  const handleSeeMore = () => {
    setVisibleCount((prev) => prev + 4);
  };

  const renderItem = ({
    item,
    index,
  }: {
    item: {
      title: string;
      time: string;
      price: number;
      description?: string;
    };
    index: number;
  }) => (
    <MotiView
      from={{ opacity: 0, translateY: 10 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ delay: index * 100 }}
      style={styles.card}
    >
      <View style={{ flex: 1, gap: 12 }}>
        <View>
          <CustomText style={styles.serviceTitle}>{item.title}</CustomText>
          <CustomText style={styles.serviceTime}>{item.time}</CustomText>
        </View>
        <CustomText style={styles.servicePrice}>MX${item.price}</CustomText>
      </View>
      <TouchableOpacity style={styles.bookButton}>
        <CustomText style={styles.bookButtonText}>Book</CustomText>
      </TouchableOpacity>
    </MotiView>
  );

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.tabScroll}
      >
        {tabData.map((tab, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => {
              setSelectedTab(index);
              setVisibleCount(4);
            }}
            style={[
              styles.tabButton,
              selectedTab === index && styles.activeTabButton,
            ]}
          >
            <CustomText
              style={[
                styles.tabText,
                selectedTab === index && styles.activeTabText,
              ]}
            >
              {tab.title}
            </CustomText>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <FlatList
        data={currentServices}
        scrollEnabled={false}
        keyExtractor={(item) => item.title}
        contentContainerStyle={styles.listContainer}
        renderItem={renderItem}
        ListFooterComponent={
          hasMore ? (
            <TouchableOpacity
              onPress={handleSeeMore}
              style={styles.seeMoreButton}
            >
              <CustomText style={styles.seeMoreText}>See more</CustomText>
            </TouchableOpacity>
          ) : null
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 16,
  },
  tabScroll: {
    gap: 12,
  },
  tabButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#F0F0F0",
  },
  activeTabButton: {
    backgroundColor: Colors.light.black,
  },
  tabText: {
    fontSize: 14,
    fontFamily: "Satoshi-Bold",
    color: Colors.light.black,
  },
  activeTabText: {
    color: Colors.light.white,
    fontFamily: "Satoshi-Bold",
  },
  listContainer: {
    paddingTop: 16,
  },
  card: {
    backgroundColor: Colors.light.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  serviceTitle: {
    fontSize: 16,
    fontFamily: "Satoshi-Bold",
    color: Colors.light.text,
  },
  serviceTime: {
    fontSize: 14,
    color: Colors.light.textSecondary,
    fontFamily: "Satoshi-Bold",
    marginTop: 4,
  },
  servicePrice: {
    fontSize: 14,
    fontFamily: "Satoshi-Bold",
    marginTop: 2,
    color: Colors.light.text,
  },
  bookButton: {
    backgroundColor: Colors.light.black,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  bookButtonText: {
    color: Colors.light.white,
    fontFamily: "Satoshi-Bold",
    fontSize: 14,
  },
  seeMoreButton: {
    marginTop: 10,
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderRadius: 5,
    borderWidth: 0.5,
    borderColor: Colors.light.textSecondary,
    backgroundColor: Colors.light.white,
  },
  seeMoreText: {
    fontSize: 14,
    fontFamily: "CarosSoftBold",
    color: Colors.light.black,
  },
});
