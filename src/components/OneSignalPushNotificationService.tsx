"use client";
import React, { useEffect, useState } from "react";
import OneSignal from "react-onesignal";

export default function OneSignalPushNotificationService() {
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (!isInitialized) {
      OneSignal.init({
        appId: process.env.NEXT_PUBLIC_ONE_SIGNAL_APP_ID ?? "",
      }).then(() => {
        OneSignal.Slidedown.promptPush();
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <></>;
}
