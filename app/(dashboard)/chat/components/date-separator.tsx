import { formatMessageDate } from "./../../../../lib/chat-utils"

// Date separator component
export const DateSeparator = ({ date }: { date: string }) => {
  const formattedDate = formatMessageDate(date)

  return (
    <div className="flex justify-center my-4">
      <div className="bg-slate-800 px-3 py-1 rounded-full text-xs text-slate-400 animate-fade-in">{formattedDate}</div>
    </div>
  )
}
