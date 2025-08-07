import { BASE_URL } from "@/constants";
import { registerForPushNotificationsAsync } from "../notifications";
import { getAuthHeaders } from "./auth";

export const registerPushToken = async () => {
  try {
    const headers = await getAuthHeaders();

    const pushToken = await registerForPushNotificationsAsync();
    if (!pushToken) return;

    console.log(pushToken);

    await fetch(`${BASE_URL}notifications/token`, {
      method: "PATCH",
      headers,
      body: JSON.stringify({ token: pushToken }),
    });

    console.log("✅ Push token registered:", pushToken);
  } catch (err) {
    console.error("❌ Failed to register push token:", err);
  }
};
