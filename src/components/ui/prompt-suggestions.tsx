interface PromptSuggestionsProps {
  label: string
  append: (message: { role: "user"; content: string }) => void
  suggestions: string[]
}

export function PromptSuggestions({
  label,
  append,
  suggestions,
}: PromptSuggestionsProps) {
  return (
    <div className="space-y-6 mb-2">
      <h2 className="text-sm font-medium text-muted-foreground mb-2">{label}</h2>
      <div className="flex flex-col gap-2">
        {suggestions.map((suggestion) => (
          <button
            key={suggestion}
            onClick={() => append({ role: "user", content: suggestion })}
            className="h-max w-fit flex-1 rounded-[20px] border bg-background p-3 hover:bg-muted text-left justify-start"
          >
            <p className="text-left justify-start text-xs">{suggestion}</p>
          </button>
        ))}
      </div>
    </div>
  )
}
