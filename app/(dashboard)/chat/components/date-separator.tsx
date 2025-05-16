import type React from "react"
import { formatMessageDate } from "@/lib/chat-utils"

interface DateSeparatorProps {
  date: string
}

export const DateSeparator: React.FC<DateSeparatorProps> = ({ date }) => {
  const formattedDate = formatMessageDate(date)

  return (
    <div className="flex items-center justify-center my-4">
      <div className="bg-slate-700 text-xs text-slate-300 px-3 py-1 rounded-full">{formattedDate}</div>
    </div>
  )
}

export default DateSeparator
