import { HapticTab } from "@/components/HapticTab";
import { Colors } from "@/constants/Colors";
import { useUserData } from "@/context/userContext";
import { getIconNameClient } from "@/utils";
import { ParamListBase, RouteProp } from "@react-navigation/native";
import { Tabs } from "expo-router";
import React from "react";
import { StyleSheet, View } from "react-native";

export default function TabLayout() {
  const { userData } = useUserData();

  console.log(userData.role);

  return (
    <Tabs
      initialRouteName="home"
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
              {getIconNameClient(route.name, focused)}
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
        name="home"
        options={{
          title: "",
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          title: "",
        }}
      />
      <Tabs.Screen
        name="bookings"
        options={{
          title: "",
        }}
      />
      <Tabs.Screen
        name="profile"
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
