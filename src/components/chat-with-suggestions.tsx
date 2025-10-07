import { useState } from "react"
import { Chat } from "@/components/ui/chat"
import { type Message } from "@/components/ui/chat-message"


export function useChat() {
    const [messages, setMessages] = useState<Message[]>([])
    const [input, setInput] = useState("")
    const [status, setStatus] = useState("idle")

    const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setInput(e.target.value)
    }

    const handleSubmit = (e?: { preventDefault?: () => void }) => {
        e?.preventDefault?.()
        if (!input.trim()) return

        const userMessage = {
            id: Date.now().toString(),
            role: "user" as const,
            content: input,
        }

        setMessages(prev => [...prev, userMessage])
        setInput("")
        setStatus("submitted")
    }

    const append = (message: { role: "user"; content: string }) => {
        const userMessage = {
            id: Date.now().toString(),
            role: message.role,
            content: message.content,
        }
        setMessages(prev => [...prev, userMessage])
        setStatus("submitted")
    }

    const stop = () => {
        setStatus("idle")
    }

    return {
        messages,
        input,
        handleInputChange,
        handleSubmit,
        append,
        status,
        stop,
        setMessages,
    }
}

export function ChatWithSuggestions() {
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    append,
    status,
    stop,
  } = useChat()
 
  const isLoading = status === "submitted" || status === "streaming"
 
  return (
    <Chat
      messages={messages}
      input={input}
      handleInputChange={handleInputChange}
      handleSubmit={handleSubmit}
      isGenerating={isLoading}
      stop={stop}
      append={append}
      suggestions={[
        "How many TWA's have I completed today?",
        "Generate a meal plan for today.",
        "What is an important wellness tip for today?",
      ]}
    />
  )
}
