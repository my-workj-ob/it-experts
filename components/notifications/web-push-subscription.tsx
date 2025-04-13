"use client"

import { useNotifications } from "@/hooks/notification/use-notification"
import useProfile from "@/hooks/profile/use-profile"
import { get } from "lodash"
import { useEffect } from "react"

export function WebPushSubscription() {
  const { userProfileData } = useProfile()
  const userId = get(userProfileData, "id")
  const { registerWebPush } = useNotifications({ userId })

  useEffect(() => {

    if (!userId) return

    // Service Worker qo'llab-quvvatlanishini tekshirish
    if ("serviceWorker" in navigator && "PushManager" in window) {
      // Service Worker faylini ro'yxatdan o'tkazish
      navigator.serviceWorker.register('/service-worker.js').then((registration) => {
        console.log('Service Worker registered:', registration);

        registration.pushManager.getSubscription().then((subscription) => {
          if (subscription) {
            console.log('Already subscribed:', subscription);
            registerWebPush(subscription); // Backendga yuborish
          } else {
            requestNotificationPermission(registration); // Yangi obuna qilish
          }
        });
      }).catch((error) => {
        console.error('Service Worker registration failed:', error);
      });
    } else {
      console.log("Push notifications not supported in this browser")
    }
  }, [userId])

  const requestNotificationPermission = (registration: ServiceWorkerRegistration) => {
    Notification.requestPermission().then((permission) => {
      if (permission === "granted") {
        // VAPID public key ni olish
        const vapidPublicKey = 'BC4yDDwdnwnMTh8nbwbcxjEj7Fasu_HzIcv_l7Opujo9_VVMoX0wwtMFX2CLcbqM4pfkKvO1puROcef4Tml8nIs';

        if (!vapidPublicKey) {
          console.error("VAPID public key not found")
          return
        }

        // Base64 formatdagi VAPID public key ni Uint8Array ga o'girish
        const convertedVapidKey = urlBase64ToUint8Array(vapidPublicKey)

        console.log(convertedVapidKey);

        // Obuna yaratish
        registration.pushManager
          .subscribe({
            userVisibleOnly: true,
            applicationServerKey: convertedVapidKey,
          })
          .then((subscription) => {
            console.log("Subscribed:", subscription)
            // Obuna ma'lumotlarini backendga yuborish
            registerWebPush(subscription)
          })
          .catch((error) => {
            console.error("Subscription failed:", error)
          })
      } else {
        console.error("Notification permission denied.")
      }
    })
  }

  // Base64 formatdagi VAPID public key ni Uint8Array ga o'girish
  const urlBase64ToUint8Array = (base64String: string) => {
    const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  };


  return null // Bu komponent UI ko'rsatmaydi
}
