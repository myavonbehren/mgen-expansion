import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  IconSun, 
  IconBottleFilled, 
  IconToolsKitchen3, 
  IconMoon,
  IconClock
} from "@tabler/icons-react";

interface Activity {
  id: string;
  time: string;
  title: string;
  description: string;
  points: number;
  icon: React.ReactNode;
}

const activities: Activity[] = [
  {
    id: "1",
    time: "08:00 AM",
    title: "Morning Routine",
    description: "Start your day with 5 minutes of mindful breathing",
    points: 15,
    icon: <IconSun className="w-4 h-4" />
  },
  {
    id: "2", 
    time: "08:00 AM",
    title: "Hydration Check",
    description: "Drink a full glass of water",
    points: 15,
    icon: <IconBottleFilled className="w-4 h-4" />
  },
  {
    id: "3",
    time: "11:00 AM", 
    title: "Mindful Lunch Break",
    description: "Take a moment to appreciate your meal",
    points: 15,
    icon: <IconToolsKitchen3 className="w-4 h-4" />
  }
];

const ActivityLog = () => {
  return (
    <Card className="w-full gap-4">
      <CardHeader>
        <CardTitle className="flex items-center text-xl mb-0 gap-0">
          Today's Activity
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative">
          {/* Timeline */}
          <div className="absolute left-6 top-0 bottom-0 w-px bg-border"></div>
          
          <div className="space-y-6 gap-0">
            {activities.map((activity) => (
              <div key={activity.id} className="relative flex items-start gap-4">
                {/* Timeline circle with icon */}
                <div className="relative z-10 flex items-center justify-center w-12 h-12 bg-card border-2 border-border rounded-full">
                    {activity.icon}
                </div>
                
                {/* Activity card */}
                <Card className="flex-1 border border-border p-2">
                  <CardContent className="p-2">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="text-sm text-muted-foreground mb-1 flex justify-between">
                          {activity.time}
                          <Badge variant="secondary" className="ml-4"> {activity.points} pts </Badge>
                        </div>
                       
                        <h3 className="font-semibold text-base mb-2">
                          {activity.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {activity.description}
                        </p>
                      </div>
                     
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
            
            {/* End of timeline indicator */}
            <div className="relative flex items-start gap-4">
              <div className="relative z-10 flex items-center justify-center w-12 h-12 bg-card border-2 border-border rounded-full">
                  <IconMoon className="w-4 h-4 text-muted-foreground" />
              </div>
              <div className="flex-1 flex items-center h-12">
                <p className="text-sm text-muted-foreground">
                  More activities coming up...
                </p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ActivityLog;