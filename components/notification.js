"use client";

import { useEffect } from "react";
import { onMessage } from "firebase/messaging";
import { messaging } from "@/lib/firebase";

export default function NotificationListener() {
  useEffect(() => {
    const unsubscribe = onMessage(messaging, (payload) => {
      console.log("Message received:", payload);

      new Notification(
        payload.notification?.title || "MarketVision",
        {
          body: payload.notification?.body,
        }
      );
    });

    return unsubscribe;
  }, []);

  return null;
}