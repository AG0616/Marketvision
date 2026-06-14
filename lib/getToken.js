import { getToken } from "firebase/messaging";
import { messaging } from "./firebase";

export async function getFCMToken() {
  const permission = await Notification.requestPermission();

  if (permission !== "granted") return null;

  const token = await getToken(messaging, {
    vapidKey: process.env.NEXT_PUBLIC_VAPID,
  });

    return token;
}