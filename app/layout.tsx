"use client"
import Navbar from "@/components/navbar"
import { ThemeProvider } from "@/components/theme-provider"
import { AuthProvider } from "@/hooks/auth/useAuth"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { Inter } from "next/font/google"
import type React from "react"
import "./globals.css"
const inter = Inter({ subsets: ["latin"] })



export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const queryClient = new QueryClient()
  return (
    <html lang="en">
      <body className={inter.className}>
        <QueryClientProvider client={queryClient} >
          <AuthProvider>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
              <Navbar />
              <main className="flex-1  px-4 md:px-8">{children}</main>
            </ThemeProvider>
          </AuthProvider>
        </QueryClientProvider>
      </body>
    </html >
  )
}



import './globals.css'

