"use client";

import { useEffect } from "react";

/**
 * PwaDisableProvider:
 * 1. Blocks Chrome / Android browser from ever showing the "Install App" banner (e.preventDefault on beforeinstallprompt).
 * 2. Cleans up and unregisters any stale service workers cached in the client browser.
 */
export default function PwaDisableProvider() {
  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      return false;
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    // Unregister all legacy service workers in user's browser
    if (typeof window !== "undefined" && "serviceWorker" in navigator) {
      navigator.serviceWorker.getRegistrations().then((registrations) => {
        for (const registration of registrations) {
          registration.unregister();
        }
      });
    }

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    };
  }, []);

  return null;
}
