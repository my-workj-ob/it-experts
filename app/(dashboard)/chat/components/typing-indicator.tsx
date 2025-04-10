// Typing indicator animation component
export const TypingIndicator = () => {
  return (
    <div className="flex items-center space-x-1">
      <span className="text-green-500 font-medium">Typing</span>
      <span className="flex space-x-1">
        <span className="h-1.5 w-1.5 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></span>
        <span
          className="h-1.5 w-1.5 bg-green-500 rounded-full animate-bounce"
          style={{ animationDelay: "150ms" }}
        ></span>
        <span
          className="h-1.5 w-1.5 bg-green-500 rounded-full animate-bounce"
          style={{ animationDelay: "300ms" }}
        ></span>
      </span>
    </div>
  )
}
