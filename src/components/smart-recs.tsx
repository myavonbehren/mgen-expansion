import { useState, useEffect } from 'react';
import { IconSparkles } from "@tabler/icons-react";

const recommendations = [
    {
        title: "Optimize Morning Routine",
        description: "You complete 85% more activities when scheduled before 9 AM. Consider moving your meditation earlier.",
        level: "high"
    },
    {
        title: "Streak Opportunity",
        description: "You're 2 days away from a 30-day streak! Keep up the momentum with consistent hydration tracking.",
        level: "medium"
    },
    {
        title: "Recovery Focus",
        description: "Your sleep quality has improved 20% this week. Consider adding a gentle evening stretch routine.",
        level: "low"
    }
];

const SmartRecs = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        const timer = setInterval(() => {
            setIsAnimating(true);
            setTimeout(() => {
                setCurrentIndex((prev) => (prev + 1) % recommendations.length);
                setIsAnimating(false);
            }, 300);
        }, 5000);

        return () => clearInterval(timer);
    }, []);

    const currentRec = recommendations[currentIndex];

    return (
        <div className="rounded-[25px] border bg-card text-card-foreground shadow-sm p-6  h-[250px] md:h-[210px] flex flex-col">
            {/* Header - Fixed height */}
            <div className="flex gap-2 items-center mb-3">
                <IconSparkles className="size-5" />
                <h3 className="text-lg font-semibold">Smart Recommendations</h3>
            </div>
            
             {/* Content - Fixed height */}
             <div className="flex-1 overflow-hidden mb-6">
                 <div
                     className={`transition-opacity duration-300 ${
                         isAnimating ? 'opacity-0' : 'opacity-100'
                     }`}
                 >
                     <h4 className="text-base font-semibold mb-2 text-left">{currentRec.title}</h4>
                     <p className="text-sm text-muted-foreground leading-relaxed text-left">{currentRec.description}</p>
                 </div>
             </div>

            {/* Footer - Fixed position */}
            <div className="flex flex-col gap-4">
                <div className="flex gap-2">
                    {recommendations.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => {
                                setIsAnimating(true);
                                setTimeout(() => {
                                    setCurrentIndex(index);
                                    setIsAnimating(false);
                                }, 300);
                            }}
                            className={`h-2 rounded-full transition-all duration-300 ${
                                index === currentIndex
                                    ? 'w-8 bg-primary'
                                    : 'w-2 bg-muted-foreground/30'
                            }`}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SmartRecs;