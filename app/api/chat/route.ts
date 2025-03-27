import { NextResponse } from "next/server"
import { HfInference } from "@huggingface/inference"

// Initialize Hugging Face Inference with token
const HF_TOKEN = process.env.HF_TOKEN || "hf_dummy_token_for_demo"
const hf = new HfInference(HF_TOKEN)

export async function POST(request: Request) {
  try {
    const { messages } = await request.json()
    const formattedMessages = formatMessages(messages)

    // Create a streaming response using Hugging Face's streaming API
    const stream = new ReadableStream({
      async start(controller) {
        try {
          // Use Mistral 7B model
          const response = await hf.textGenerationStream({
            model: "mistralai/Mistral-7B-Instruct-v0.2",
            inputs: formattedMessages,
            parameters: {
              max_new_tokens: 512,
              temperature: 0.7,
              repetition_penalty: 1.2,
            },
          })

          console.log("Starting Hugging Face API response stream...")

          // Accumulate text for better streaming experience
          let accumulatedText = ""

          for await (const chunk of response) {
            console.log("Received chunk:", chunk)

            if (chunk && chunk.token && typeof chunk.token.text === "string") {
              // Accumulate the text
              accumulatedText += chunk.token.text

              // Send the accumulated text
              const data = JSON.stringify({ text: accumulatedText })
              controller.enqueue(new TextEncoder().encode(`data: ${data}\n\n`))
            } else {
              console.warn("Invalid chunk format:", chunk)
            }
          }

          // Signal the end of the stream with proper SSE format
          console.log("Ending stream")
          controller.enqueue(new TextEncoder().encode("data: [DONE]\n\n"))
          controller.close()
        } catch (error) {
          console.error("Error in streaming:", error)
          controller.error(error)
        }
      },
    })

    // Return the streaming response with proper headers
    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    })
  } catch (error) {
    console.error("Error in chat API:", error)
    return NextResponse.json({ error: "There was an error processing your request" }, { status: 500 })
  }
}

// Helper function to format messages for the Mistral model
function formatMessages(messages) {
  // Add system prompt
  const systemPrompt =
    "You are a helpful AI assistant for DevConnect, an IT networking platform. You can help users with networking advice, project ideas, technical questions, and career guidance. Be professional, friendly, and provide specific, actionable advice tailored to IT professionals."

  // Format messages for Mistral model - simplified format
  let formattedText = `<s>[INST] ${systemPrompt} [/INST]</s>\n\n`

  for (let i = 0; i < messages.length; i++) {
    const message = messages[i]
    if (message.role === "user") {
      formattedText += `<s>[INST] ${message.content} [/INST]`
    } else if (message.role === "assistant") {
      formattedText += ` ${message.content} </s>\n\n`
    }
  }

  // If the last message is from a user, close it properly
  if (messages.length > 0 && messages[messages.length - 1].role === "user") {
    formattedText += ` `
  }

  return formattedText
}

