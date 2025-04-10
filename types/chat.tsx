export interface Message {
  id: number
  sender: {
    id: number
    email: string
  }
  receiver: {
    id: number
    email: string
  }
  message: string
  isRead: boolean
  timestamp: string
  isNew?: boolean // Flag for new messages to animate them
  audioUrl?: string // For voice messages
  fileUrls?: string[] // For file attachments
}

export interface User {
  id: number
  profile: {
    firstName: string
    lastName?: string
    avatar: string
    jobTitle?: string
    skills?: string[]
    location?: string
    experience?: string
  }
  email: string
  online: boolean
  lastMessage?: string
  unread?: number
  status?: string
  matchPercentage?: number
  isBlocked?: boolean
  isSpam?: boolean
}

export interface Connection {
  id: number
  requesterId: number
  requester: {
    id: number
    email: string
    password: string
    profile: {
      id: number
      firstName: string
      name: string | null
      lastName: string
      email: string
      jobTitle: string
      avatar: string
    }
    isTwoFactorEnabled: boolean
    twoFactorSecret: string | null
    profileViews: number
    updatedAt: string
  }
  receiverId: number
  receiver: {
    id: number
    email: string
    password: string
    profile: {
      id: number
      firstName: string
      name: string | null
      lastName: string
      email: string
      jobTitle: string
      avatar: string
    }
    isTwoFactorEnabled: boolean
    twoFactorSecret: string | null
    profileViews: number
    updatedAt: string
  }
  status: string
  createdAt: string
  updatedAt: string
}
