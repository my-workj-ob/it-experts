"use client";
import Navbar from "@/components/navbar";
import { ThemeProvider } from "@/components/theme-provider";
import { AuthProvider } from "@/hooks/auth/useAuth";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Inter } from "next/font/google";
import type React from "react";
import "./globals.css";
import OneSignalInit from "@/components/notifications/one-signal-init";
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const queryClient = new QueryClient();
  return (
    <html lang="en" suppressHydrationWarning>
      <Script
        src="https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.page.js"
        strategy="afterInteractive"
        defer
      />
      <Script id="onesignal-init" strategy="afterInteractive">
        {`
          window.OneSignalDeferred = window.OneSignalDeferred || [];
          OneSignalDeferred.push(async function(OneSignal) {
            await OneSignal.init({
              appId: "6945200b-8f3d-44e5-868e-f216d2a1ed2a",
              safari_web_id: "web.onesignal.auto.13dd012d-81c7-44d8-8660-15690626d9c4",
              notifyButton: {
                enable: true,
              },
              allowLocalhostAsSecureOrigin: true,
            });
          });
        `}
      </Script>
      <body className={inter.className}>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
              <OneSignalInit />
              <Navbar />
              <main className="flex-1  px-4 md:px-8">{children}</main>
            </ThemeProvider>
          </AuthProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}

import "./globals.css";
import Script from "next/script";
