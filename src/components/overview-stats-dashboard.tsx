import { IconFlame, IconTrophy, IconTarget, IconTrendingUp } from "@tabler/icons-react";
import { useAuth } from "@/contexts/AuthContext";
import { Card } from "./ui/card";

const OverviewStatsDashboard = () => {
    const { user } = useAuth();

    const data = {
      stats: [
        {
          title: "Current Streak",
          value: user?.currentStreak || 0,
          icon: IconFlame,
          unit: "days",
          bgColor: "bg-gradient-to-l from-amber-400 to-orange-500 dark:from-amber-500 dark:to-orange-600"
        },
        {
          title: "Total Points",
          value: user?.totalPoints || 0,
          icon: IconTrophy,
          unit: "points",
          bgColor: "bg-gradient-to-l from-yellow-300 to-yellow-500 dark:from-yellow-500 dark:to-yellow-600"
        },
        {
          title: "Longest Streak",
          value: user?.longestStreak || 0,
          icon: IconTarget,
          unit: "days",
          bgColor: "bg-gradient-to-l from-green-400 to-green-500 dark:from-green-500 dark:to-green-600"
        },
        {
          title: "Daily Points",
          value: user?.dailyPoints || 0,
          icon: IconTrendingUp,
          unit: "points",
          bgColor: "bg-gradient-to-l from-blue-400 to-blue-500 dark:from-blue-500 dark:to-blue-600"
        }
      ]
    }
    return (
        <div className="flex flex-col md:contents">
          {/* Mobile Layout - Square Cards */}
          <div className="grid grid-cols-2 gap-4 md:hidden">
            {data.stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <Card key={index} className="border border-border rounded-[25px] p-4 bg-card flex flex-col gap-3">
                  <div className={`flex items-center justify-center w-11 h-11 rounded-lg ${stat.bgColor}`}>
                    <IconComponent className="size-6 text-white"/>
                  </div>
                  
                  <div className="flex flex-col gap-1">
                    <p className="text-xs font-medium">{stat.title}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className="text-xs text-muted-foreground">{stat.unit}</p>
                  </div>
                </Card>
              );
            })}
          </div>

          {/* Desktop Layout - Individual Cards */}
          <div className="hidden md:grid md:grid-cols-4 gap-4">
            {data.stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <Card key={index} className="border border-border rounded-[25px] p-6 bg-card">
                  <div className="flex flex-col gap-4 items-start">
                    <div className={`flex items-center justify-center w-11 h-11 rounded-[15px] ${stat.bgColor}`}>
                      <IconComponent className="size-6 text-white"/>
                    </div>
                    
                    <div className="flex flex-col gap-1">
                      <p className="text-sm font-medium">{stat.title}</p>
                      <p className="text-3xl font-bold">{stat.value}</p>
                      <p className="text-sm text-muted-foreground">{stat.unit}</p>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
    )       
}

export default OverviewStatsDashboard;