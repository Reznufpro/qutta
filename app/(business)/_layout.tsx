import { HapticTab } from "@/components/HapticTab";
import { Colors } from "@/constants/Colors";
import { getIconNameBusiness } from "@/utils";
import { ParamListBase, RouteProp } from "@react-navigation/native";
import { Tabs } from "expo-router";
import React from "react";
import { StyleSheet, View } from "react-native";

export default function TabLayout() {
  console.log("business");

  return (
    <Tabs
      initialRouteName="business"
      screenOptions={({
        route,
      }: {
        route: RouteProp<ParamListBase, string>;
      }) => ({
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarIcon: ({ focused }) => {
          return (
            <View style={styles.iconContainer}>
              {getIconNameBusiness(route.name, focused)}
            </View>
          );
        },
        tabBarStyle: {
          backgroundColor: Colors.light.white,
          borderTopWidth: 0,
          elevation: 0,
          shadowColor: "transparent",
        },
      })}
    >
      <Tabs.Screen
        name="dashboard"
        options={{
          title: "",
        }}
      />
      <Tabs.Screen
        name="waitlist"
        options={{
          title: "",
        }}
      />
      <Tabs.Screen
        name="schedule"
        options={{
          title: "",
        }}
      />
      <Tabs.Screen
        name="business"
        options={{
          title: "",
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    marginTop: 35,
    height: 40,
  },
});
