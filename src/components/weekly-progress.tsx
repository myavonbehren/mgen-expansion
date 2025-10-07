"use client"

import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

export const description = "A line chart with dots"

const chartData = [
  { day: "Monday", points: 54},
  { day: "Tuesday", points: 72 },
  { day: "Wednesday", points: 34 },
  { day: "Thursday", points: 80 },
  { day: "Friday", points: 55 },
  { day: "Saturday", points: 100 },
  { day: "Sunday", points: 40 },
]

const chartConfig = {
  points: {
    label: "Points",
    color: "var(--color-primary)",
  }
} satisfies ChartConfig

export function WeeklyProgress() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-medium">Weekly Progress</CardTitle>
        <CardDescription>Your daily points over the past week</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              top: 12,
              bottom: 12,
              left: 16,
              right: 16,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="day"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              interval={0}
              padding={{ left: 10, right: 10 }}
              tickFormatter={(value) => value.slice(0, 3)}
            />
           
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent />}
            />
            <Line
              dataKey="points"
              type="monotone"
              stroke="var(--color-points)"
              strokeWidth={2}
              dot={{
                fill: "var(--color-points)",
              }}
              activeDot={{
                r: 6
              }}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
