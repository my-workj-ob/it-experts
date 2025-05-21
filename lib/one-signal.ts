// lib/oneSignal.ts
export function initializeOneSignal() {
  if (typeof window !== "undefined" && "OneSignal" in window) {
    const OneSignal = (window as any).OneSignal || [];
    OneSignal.push(function () {
      OneSignal.init({
        appId: "6945200b-8f3d-44e5-868e-f216d2a1ed2a", // <-- o'zingizning ID bilan almashtiring
        notifyButton: {
          enable: true,
        },
        allowLocalhostAsSecureOrigin: true,
        autoRegister: true,
      });
      OneSignal?.showSlidedownPrompt();
    });
  }
}
