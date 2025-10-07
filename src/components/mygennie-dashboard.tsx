import { ChatWithSuggestions } from "./chat-with-suggestions";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "./ui/card";

export function useChat() {
    return {
        messages: [],
        input: "",
        handleInputChange: () => {},
        handleSubmit: () => {},
        append: () => {},
        status: "submitted",
        stop: () => {},
    }
}

const MyGennieDashboard = () => {
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
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center text-lg mb-0 gap-0">AI Assistant</CardTitle>
                <CardDescription>Your personalized AI assistant to help you achieve your wellness goals.</CardDescription>
                </CardHeader>
                <CardContent>
                    <ChatWithSuggestions />
                </CardContent>
            </Card>
    )
}

export default MyGennieDashboard;