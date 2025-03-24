import type React from "react"
import { Toaster } from "sonner"
import ClientLayout from "./clientLayout"

export const metadata = {
  title: "DevConnect - IT Networking Platform",
  description: "Connect with IT professionals, find projects, and attend events",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClientLayout>
      {children}
      <Toaster position="top-right" />
    </ClientLayout>
  )
}

