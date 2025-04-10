"use client"

import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Mic, Send, Square, X } from "lucide-react"
import { useEffect, useRef, useState } from "react"

interface VoiceRecorderProps {
  onComplete: (blob: Blob) => void
  onCancel: () => void
  maxDuration?: number // in seconds
}

export const VoiceRecorder = ({ onComplete, onCancel, maxDuration = 60 }: VoiceRecorderProps) => {
  const [isRecording, setIsRecording] = useState(false)
  const [recordingTime, setRecordingTime] = useState(0)
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null)
  const [audioUrl, setAudioUrl] = useState<string | null>(null)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const audioChunksRef = useRef<Blob[]>([])
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  // Start recording when component mounts
  useEffect(() => {
    startRecording()

    return () => {
      // Clean up
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
      if (mediaRecorderRef.current && isRecording) {
        mediaRecorderRef.current.stop()
      }
      if (audioUrl) {
        URL.revokeObjectURL(audioUrl)
      }
    }
  }, [])

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })

      const mediaRecorder = new MediaRecorder(stream)
      mediaRecorderRef.current = mediaRecorder
      audioChunksRef.current = []

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data)
        }
      }

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: "audio/webm" })
        setAudioBlob(audioBlob)

        const url = URL.createObjectURL(audioBlob)
        setAudioUrl(url)

        // Stop all tracks in the stream
        stream.getTracks().forEach((track) => track.stop())
      }

      // Start recording
      mediaRecorder.start()
      setIsRecording(true)

      // Set up timer
      timerRef.current = setInterval(() => {
        setRecordingTime((prev) => {
          if (prev >= maxDuration - 1) {
            stopRecording()
            return maxDuration
          }
          return prev + 1
        })
      }, 1000)
    } catch (error) {
      console.error("Error accessing microphone:", error)
      onCancel()
    }
  }

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop()
      setIsRecording(false)

      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }

  const handleCancel = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop()
    }

    if (timerRef.current) {
      clearInterval(timerRef.current)
    }

    if (audioUrl) {
      URL.revokeObjectURL(audioUrl)
    }

    onCancel()
  }

  const handleSend = () => {
    if (audioBlob) {
      onComplete(audioBlob)
    }
  }

  // Format time as MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <div className="bg-slate-800 p-3 rounded-lg animate-fade-in">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          {isRecording ? (
            <>
              <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse"></span>
              <span className="text-sm font-medium text-white">Recording...</span>
            </>
          ) : (
            <>
              <Mic className="h-4 w-4 text-green-500" />
              <span className="text-sm font-medium text-white">Recording complete</span>
            </>
          )}
        </div>
        <span className="text-sm text-slate-400">{formatTime(recordingTime)}</span>
      </div>

      <Progress value={(recordingTime / maxDuration) * 100} className="h-1 mb-3" />

      {audioUrl && !isRecording && (
        <div className="mb-3">
          <audio src={audioUrl} controls className="w-full h-8" />
        </div>
      )}

      <div className="flex justify-between">
        <Button
          variant="ghost"
          size="sm"
          onClick={handleCancel}
          className="text-slate-400 hover:text-white hover:bg-slate-700"
        >
          <X className="h-4 w-4 mr-1" />
          Cancel
        </Button>

        {isRecording ? (
          <Button
            variant="ghost"
            size="sm"
            onClick={stopRecording}
            className="text-red-400 hover:text-red-300 hover:bg-slate-700"
          >
            <Square className="h-4 w-4 mr-1" />
            Stop
          </Button>
        ) : (
          <Button
            variant="default"
            size="sm"
            onClick={handleSend}
            className="bg-green-500 hover:bg-green-600 text-white"
          >
            <Send className="h-4 w-4 mr-1" />
            Send
          </Button>
        )}
      </div>
    </div>
  )
}
