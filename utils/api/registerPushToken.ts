import { BASE_URL } from "@/constants";
import * as SecureStore from "expo-secure-store";
import { registerForPushNotificationsAsync } from "../notifications";

export const registerPushToken = async () => {
  try {
    console.log("🔄 Starting push token registration...");

    const authToken = await SecureStore.getItemAsync("token");
    console.log("📦 Loaded auth token:", authToken ? "Found" : "Not found");

    if (!authToken) {
      console.warn("No auth token found, cannot register push token.");
      return;
    }

    console.log("🔄 Getting push token...");
    const pushToken = await registerForPushNotificationsAsync();
    console.log("📱 Push token result:", pushToken ? "Received" : "Failed");

    if (!pushToken) {
      console.error("No push token received");
      return;
    }

    console.log("📡 Sending to server:", `${BASE_URL}notifications/token`);
    const res = await fetch(`${BASE_URL}notifications/token`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify({ token: pushToken }),
    });

    const text = await res.text();
    console.log("Push token server response:", res.status, text);

    if (!res.ok) {
      console.error("Failed to register push token:", text);
    } else {
      console.log("Push token registered successfully!");
    }
  } catch (err) {
    console.error("Failed to register push token:", err);
  }
};
