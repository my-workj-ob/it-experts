import type React from "react"
import ClientLayout from "./clientLayout"
import './globals.css'
export const metadata = {
  title: "DevConnect - IT Networking Platform",
  description: "Connect with IT professionals, find projects, and attend events",
  generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <ClientLayout>{children}</ClientLayout>
}



import './globals.css'
