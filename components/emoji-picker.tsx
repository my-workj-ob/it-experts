"use client"

import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search } from "lucide-react"
import { useState } from "react"

// Simple emoji data for demonstration
const emojiCategories = {
  recent: ["😀", "😂", "❤️", "👍", "🙏", "🔥", "✨"],
  smileys: ["😀", "😃", "😄", "😁", "😆", "😅", "😂", "🤣", "😊", "😇", "🙂", "🙃", "😉", "😌", "😍", "🥰", "😘"],
  people: ["👶", "👧", "🧒", "👦", "👩", "🧑", "👨", "👵", "🧓", "👴", "👲", "👳‍♀️", "👳‍♂️", "🧕", "👮‍♀️", "👮‍♂️"],
  animals: ["🐶", "🐱", "🐭", "🐹", "🐰", "🦊", "🐻", "🐼", "🐨", "🐯", "🦁", "🐮", "🐷", "🐸", "🐵"],
  food: ["🍏", "🍎", "🍐", "🍊", "🍋", "🍌", "🍉", "🍇", "🍓", "🍈", "🍒", "🍑", "🥭", "🍍", "🥥"],
  activities: ["⚽️", "🏀", "🏈", "⚾️", "🥎", "🎾", "🏐", "🏉", "🥏", "🎱", "🪀", "🏓", "🏸", "🏒", "🏑"],
  travel: ["🚗", "🚕", "🚙", "🚌", "🚎", "🏎", "🚓", "🚑", "🚒", "🚐", "🚚", "🚛", "🚜", "🛴", "🚲"],
  symbols: ["❤️", "🧡", "💛", "💚", "💙", "💜", "🖤", "🤍", "🤎", "💔", "❣️", "💕", "💞", "💓", "💗"],
}

interface EmojiPickerProps {
  onEmojiSelect: (emoji: string) => void
}

export function EmojiPicker({ onEmojiSelect }: EmojiPickerProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState("recent")

  // Filter emojis based on search query
  const filteredEmojis = searchQuery
    ? Object.values(emojiCategories)
      .flat()
      .filter((emoji) => emoji.includes(searchQuery))
    : emojiCategories[activeCategory]

  return (
    <div className="emoji-picker">
      <div className="relative mb-3">
        <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search emoji"
          className="pl-8"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {searchQuery ? (
        <div className="grid grid-cols-8 gap-1 mt-2">
          {filteredEmojis.map((emoji, index) => (
            <button key={index} className="p-1 hover:bg-muted rounded text-xl" onClick={() => onEmojiSelect(emoji)}>
              {emoji}
            </button>
          ))}
        </div>
      ) : (
        <Tabs defaultValue="recent" onValueChange={setActiveCategory}>
          <TabsList className="grid grid-cols-8">
            <TabsTrigger value="recent">🕒</TabsTrigger>
            <TabsTrigger value="smileys">😀</TabsTrigger>
            <TabsTrigger value="people">👨</TabsTrigger>
            <TabsTrigger value="animals">🐶</TabsTrigger>
            <TabsTrigger value="food">🍔</TabsTrigger>
            <TabsTrigger value="activities">⚽️</TabsTrigger>
            <TabsTrigger value="travel">🚗</TabsTrigger>
            <TabsTrigger value="symbols">❤️</TabsTrigger>
          </TabsList>
          <TabsContent value={activeCategory} className="mt-2">
            <div className="grid grid-cols-8 gap-1">
              {emojiCategories[activeCategory].map((emoji, index) => (
                <button key={index} className="p-1 hover:bg-muted rounded text-xl" onClick={() => onEmojiSelect(emoji)}>
                  {emoji}
                </button>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      )}
    </div>
  )
}
