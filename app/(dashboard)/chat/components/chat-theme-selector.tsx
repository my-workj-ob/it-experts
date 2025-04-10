"use client"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { Palette } from "lucide-react"

interface ThemeOption {
  name: string
  primaryColor: string
  secondaryColor: string
  bgColor: string
  textColor: string
}

interface ChatThemeSelectorProps {
  onSelectTheme: (theme: ThemeOption) => void
  currentTheme: string
}

export const ChatThemeSelector = ({ onSelectTheme, currentTheme }: ChatThemeSelectorProps) => {
  const themes: ThemeOption[] = [
    {
      name: "dark",
      primaryColor: "bg-slate-900",
      secondaryColor: "bg-slate-800",
      bgColor: "bg-slate-900",
      textColor: "text-white",
    },
    {
      name: "green",
      primaryColor: "bg-green-500",
      secondaryColor: "bg-green-600",
      bgColor: "bg-slate-900",
      textColor: "text-white",
    },
    {
      name: "blue",
      primaryColor: "bg-blue-500",
      secondaryColor: "bg-blue-600",
      bgColor: "bg-slate-900",
      textColor: "text-white",
    },
    {
      name: "purple",
      primaryColor: "bg-purple-500",
      secondaryColor: "bg-purple-600",
      bgColor: "bg-slate-900",
      textColor: "text-white",
    },
    {
      name: "amber",
      primaryColor: "bg-amber-500",
      secondaryColor: "bg-amber-600",
      bgColor: "bg-slate-900",
      textColor: "text-white",
    },
    {
      name: "rose",
      primaryColor: "bg-rose-500",
      secondaryColor: "bg-rose-600",
      bgColor: "bg-slate-900",
      textColor: "text-white",
    },
  ]

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white hover:bg-slate-800">
          <Palette className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64 p-3 bg-slate-800 border-slate-700">
        <h4 className="text-sm font-medium text-white mb-2">Chat Theme</h4>
        <div className="grid grid-cols-3 gap-2">
          {themes.map((theme) => (
            <button
              key={theme.name}
              className={cn(
                "p-2 rounded-md flex flex-col items-center gap-1 hover:bg-slate-700 transition-colors",
                currentTheme === theme.name && "ring-2 ring-green-500 ring-offset-1 ring-offset-slate-800",
              )}
              onClick={() => onSelectTheme(theme)}
            >
              <div className="flex w-full h-6 rounded-sm overflow-hidden">
                <div className={cn("w-1/2", theme.primaryColor)}></div>
                <div className={cn("w-1/2", theme.secondaryColor)}></div>
              </div>
              <span className="text-xs text-slate-300 capitalize">{theme.name}</span>
            </button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  )
}
