import { cn } from "@/lib/utils"
import { Check, CheckCheck } from "lucide-react"

interface ReadReceiptIndicatorProps {
  isRead: boolean
  timestamp: string
  className?: string
}

export const ReadReceiptIndicator = ({ isRead, timestamp, className }: ReadReceiptIndicatorProps) => {
  // Format time as HH:MM
  const time = new Date(timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })

  return (
    <div className={cn("flex items-center justify-end text-xs", className)}>
      <span className="mr-1">{time}</span>
      {isRead ? (
        <CheckCheck className="h-3 w-3 animate-read-receipt text-green-500" />
      ) : (
        <Check className="h-3 w-3 text-slate-400" />
      )}
    </div>
  )
}
