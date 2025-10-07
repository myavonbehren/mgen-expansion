import { Card, CardHeader, CardTitle, CardDescription } from "./ui/card";    
import { Button } from "./ui/button";
import { IconArrowRight } from "@tabler/icons-react";

const questions = [
    {
        question: "How did you feel about your wellness routine this week?",
    },
    {
        question: "Which activities brought you the most satisfaction?",
    },
    {
        question: "What challenges did you face this week, and how can we address them?",
    }
]

const WeeklyReview = () => {
    return (
        <Card className="mb-4">
            <CardHeader>
                <CardTitle className="flex items-center text-lg mb-0 gap-0">Weekly Review</CardTitle>
                <CardDescription className="mb-2">Your weekly review of your wellness journey.</CardDescription>
                <div className="flex flex-col gap-5">
                    {questions.map((question) => (
                        <div key={question.question}>
                            <div className="flex items-center gap-4">
                                <div className="w-1 h-1 bg-primary rounded-full"/>
                                <h3 className="text-sm font-light">{question.question}</h3>
                            </div>
                        </div>
                    ))}
                    <Button>
                        Start Review Session
                    </Button>
                </div>
            </CardHeader>
        </Card>
    )
}

export default WeeklyReview;