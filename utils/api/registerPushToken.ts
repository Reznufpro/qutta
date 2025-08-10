import { BASE_URL } from "@/constants";
import * as SecureStore from "expo-secure-store";
import { registerForPushNotificationsAsync } from "../notifications";

export const registerPushToken = async () => {
  try {
    const authToken = await SecureStore.getItemAsync("token");

    if (!authToken) {
      console.warn("No auth token found, cannot register push token.");
      return;
    }

    const pushToken = await registerForPushNotificationsAsync();

    if (!pushToken) {
      console.error("No push token received");
      return;
    }

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
