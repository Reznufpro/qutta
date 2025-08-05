import { BASE_URL } from "@/constants";
import * as SecureStore from "expo-secure-store";
import { registerForPushNotificationsAsync } from "../notifications";

export const registerPushToken = async () => {
  try {
    const token = await SecureStore.getItemAsync("token");
    if (!token) return;

    const pushToken = await registerForPushNotificationsAsync();
    if (!pushToken) return;

    await fetch(`${BASE_URL}notifications/token`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token: pushToken }),
    });

    console.log("✅ Push token registered:", pushToken);
  } catch (err) {
    console.error("❌ Failed to register push token:", err);
  }
};
