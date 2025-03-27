import type React from "react"
// This is a simplified version of the toast hook
import { toast as sonnerToast } from "sonner"

type ToastProps = {
  title?: string
  description?: string
  duration?: number
  action?: React.ReactNode
}

export function toast(props: ToastProps) {
  sonnerToast(props.title, {
    description: props.description,
    duration: props.duration || 3000,
    action: props.action,
  })
}

