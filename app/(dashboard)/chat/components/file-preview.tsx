"use client"

import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"
import { FileIcon, X } from "lucide-react"
import { useState } from "react"

interface FilePreviewProps {
  file: File
  onRemove: () => void
  uploadProgress?: number
  isUploading?: boolean
  isError?: boolean
}

export const FilePreview = ({
  file,
  onRemove,
  uploadProgress = 0,
  isUploading = false,
  isError = false,
}: FilePreviewProps) => {
  const [preview, setPreview] = useState<string | null>(null)

  // Generate preview for images
  useState(() => {
    if (file.type.startsWith("image/")) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setPreview(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  })

  // Format file size
  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B"
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB"
    else return (bytes / 1048576).toFixed(1) + " MB"
  }

  return (
    <div
      className={cn(
        "flex items-center gap-3 p-2 rounded-md bg-slate-800/50 border border-slate-700",
        isError && "border-red-500/50 bg-red-500/10",
      )}
    >
      {preview ? (
        <div className="h-12 w-12 rounded overflow-hidden flex-shrink-0">
          <img src={preview || "/placeholder.svg"} alt={file.name} className="h-full w-full object-cover" />
        </div>
      ) : (
        <div className="h-12 w-12 rounded bg-slate-700 flex items-center justify-center flex-shrink-0">
          <FileIcon className="h-6 w-6 text-slate-400" />
        </div>
      )}

      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-white truncate">{file.name}</p>
        <p className="text-xs text-slate-400">{formatFileSize(file.size)}</p>

        {isUploading && <Progress value={uploadProgress} className="h-1 mt-1" />}

        {isError && <p className="text-xs text-red-400 mt-1">Upload failed. Try again.</p>}
      </div>

      <Button
        variant="ghost"
        size="icon"
        className="h-7 w-7 text-slate-400 hover:text-white hover:bg-slate-700"
        onClick={onRemove}
        disabled={isUploading && !isError}
      >
        <X className="h-4 w-4" />
      </Button>
    </div>
  )
}
