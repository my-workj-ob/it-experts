import type React from "react"
import Sidebar from "@/components/sidebar"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <div className="md:flex relative">
        <Sidebar />
        <main className="flex-1 py-12 px-4 md:px-8">{children}</main>
      </div>
    </>
  )
}

