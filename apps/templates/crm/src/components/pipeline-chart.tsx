"use client";

import * as React from "react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const description = "An interactive area chart";

const chartData = [
  { date: "2024-04-01", onlineSales: 220, inStoreSales: 180 },
  { date: "2024-04-02", onlineSales: 260, inStoreSales: 210 },
  { date: "2024-04-03", onlineSales: 240, inStoreSales: 200 },
  { date: "2024-04-04", onlineSales: 280, inStoreSales: 230 },
  { date: "2024-04-05", onlineSales: 300, inStoreSales: 250 },
  { date: "2024-04-06", onlineSales: 270, inStoreSales: 240 },
  { date: "2024-04-07", onlineSales: 310, inStoreSales: 260 },
  { date: "2024-04-08", onlineSales: 290, inStoreSales: 250 },
  { date: "2024-04-09", onlineSales: 330, inStoreSales: 280 },
  { date: "2024-04-10", onlineSales: 350, inStoreSales: 300 },
  { date: "2024-04-11", onlineSales: 325, inStoreSales: 280 },
  { date: "2024-04-12", onlineSales: 355, inStoreSales: 295 },
  { date: "2024-04-13", onlineSales: 340, inStoreSales: 290 },
  { date: "2024-04-14", onlineSales: 360, inStoreSales: 305 },
  { date: "2024-04-15", onlineSales: 375, inStoreSales: 320 },
  { date: "2024-04-16", onlineSales: 345, inStoreSales: 295 },
  { date: "2024-04-17", onlineSales: 365, inStoreSales: 310 },
  { date: "2024-04-18", onlineSales: 340, inStoreSales: 290 },
  { date: "2024-04-19", onlineSales: 360, inStoreSales: 305 },
  { date: "2024-04-20", onlineSales: 380, inStoreSales: 320 },
  { date: "2024-04-21", onlineSales: 355, inStoreSales: 300 },
  { date: "2024-04-22", onlineSales: 375, inStoreSales: 315 },
  { date: "2024-04-23", onlineSales: 390, inStoreSales: 330 },
  { date: "2024-04-24", onlineSales: 365, inStoreSales: 310 },
  { date: "2024-04-25", onlineSales: 385, inStoreSales: 325 },
  { date: "2024-04-26", onlineSales: 370, inStoreSales: 315 },
  { date: "2024-04-27", onlineSales: 390, inStoreSales: 330 },
  { date: "2024-04-28", onlineSales: 410, inStoreSales: 345 },
  { date: "2024-04-29", onlineSales: 385, inStoreSales: 325 },
  { date: "2024-04-30", onlineSales: 405, inStoreSales: 340 },
  { date: "2024-05-01", onlineSales: 420, inStoreSales: 355 },
  { date: "2024-05-02", onlineSales: 395, inStoreSales: 335 },
  { date: "2024-05-03", onlineSales: 415, inStoreSales: 350 },
  { date: "2024-05-04", onlineSales: 435, inStoreSales: 365 },
  { date: "2024-05-05", onlineSales: 410, inStoreSales: 345 },
  { date: "2024-05-06", onlineSales: 430, inStoreSales: 360 },
  { date: "2024-05-07", onlineSales: 450, inStoreSales: 375 },
  { date: "2024-05-08", onlineSales: 425, inStoreSales: 355 },
  { date: "2024-05-09", onlineSales: 445, inStoreSales: 370 },
  { date: "2024-05-10", onlineSales: 465, inStoreSales: 385 },
  { date: "2024-05-11", onlineSales: 440, inStoreSales: 365 },
  { date: "2024-05-12", onlineSales: 460, inStoreSales: 380 },
  { date: "2024-05-13", onlineSales: 480, inStoreSales: 395 },
  { date: "2024-05-14", onlineSales: 455, inStoreSales: 375 },
  { date: "2024-05-15", onlineSales: 475, inStoreSales: 390 },
  { date: "2024-05-16", onlineSales: 495, inStoreSales: 405 },
  { date: "2024-05-17", onlineSales: 470, inStoreSales: 385 },
  { date: "2024-05-18", onlineSales: 490, inStoreSales: 400 },
  { date: "2024-05-19", onlineSales: 510, inStoreSales: 415 },
  { date: "2024-05-20", onlineSales: 485, inStoreSales: 395 },
  { date: "2024-05-21", onlineSales: 505, inStoreSales: 410 },
  { date: "2024-05-22", onlineSales: 525, inStoreSales: 425 },
  { date: "2024-05-23", onlineSales: 500, inStoreSales: 405 },
  { date: "2024-05-24", onlineSales: 520, inStoreSales: 420 },
  { date: "2024-05-25", onlineSales: 540, inStoreSales: 435 },
  { date: "2024-05-26", onlineSales: 515, inStoreSales: 415 },
  { date: "2024-05-27", onlineSales: 535, inStoreSales: 430 },
  { date: "2024-05-28", onlineSales: 555, inStoreSales: 445 },
  { date: "2024-05-29", onlineSales: 530, inStoreSales: 425 },
  { date: "2024-05-30", onlineSales: 550, inStoreSales: 440 },
  { date: "2024-05-31", onlineSales: 570, inStoreSales: 455 },
  { date: "2024-06-01", onlineSales: 545, inStoreSales: 435 },
  { date: "2024-06-02", onlineSales: 565, inStoreSales: 450 },
  { date: "2024-06-03", onlineSales: 540, inStoreSales: 430 },
  { date: "2024-06-04", onlineSales: 560, inStoreSales: 445 },
  { date: "2024-06-05", onlineSales: 580, inStoreSales: 460 },
  { date: "2024-06-06", onlineSales: 555, inStoreSales: 440 },
  { date: "2024-06-07", onlineSales: 575, inStoreSales: 455 },
  { date: "2024-06-08", onlineSales: 595, inStoreSales: 470 },
  { date: "2024-06-09", onlineSales: 570, inStoreSales: 450 },
  { date: "2024-06-10", onlineSales: 590, inStoreSales: 465 },
  { date: "2024-06-11", onlineSales: 610, inStoreSales: 480 },
  { date: "2024-06-12", onlineSales: 585, inStoreSales: 460 },
  { date: "2024-06-13", onlineSales: 605, inStoreSales: 475 },
  { date: "2024-06-14", onlineSales: 625, inStoreSales: 490 },
  { date: "2024-06-15", onlineSales: 600, inStoreSales: 470 },
  { date: "2024-06-16", onlineSales: 620, inStoreSales: 485 },
  { date: "2024-06-17", onlineSales: 640, inStoreSales: 500 },
  { date: "2024-06-18", onlineSales: 615, inStoreSales: 480 },
  { date: "2024-06-19", onlineSales: 635, inStoreSales: 495 },
  { date: "2024-06-20", onlineSales: 655, inStoreSales: 510 },
  { date: "2024-06-21", onlineSales: 630, inStoreSales: 490 },
  { date: "2024-06-22", onlineSales: 650, inStoreSales: 505 },
  { date: "2024-06-23", onlineSales: 670, inStoreSales: 520 },
  { date: "2024-06-24", onlineSales: 645, inStoreSales: 500 },
  { date: "2024-06-25", onlineSales: 665, inStoreSales: 515 },
  { date: "2024-06-26", onlineSales: 685, inStoreSales: 530 },
  { date: "2024-06-27", onlineSales: 660, inStoreSales: 510 },
  { date: "2024-06-28", onlineSales: 680, inStoreSales: 525 },
  { date: "2024-06-29", onlineSales: 700, inStoreSales: 540 },
  { date: "2024-06-30", onlineSales: 675, inStoreSales: 520 },
];

const chartConfig = {
  onlineSales: {
    label: "Online Sales",
    color: "var(--chart-1)",
  },
  inStoreSales: {
    label: "In-Store Sales",
    color: "var(--chart-3)",
  },
} satisfies ChartConfig;

export function PipelineChart() {
  const [timeRange, setTimeRange] = React.useState("90d");

  const filteredData = chartData.filter((item) => {
    const date = new Date(item.date);
    const referenceDate = new Date("2024-06-30");
    let daysToSubtract = 90;
    if (timeRange === "30d") {
      daysToSubtract = 30;
    } else if (timeRange === "7d") {
      daysToSubtract = 7;
    }
    const startDate = new Date(referenceDate);
    startDate.setDate(startDate.getDate() - daysToSubtract);
    return date >= startDate;
  });

  return (
    <Card className="pt-0 border-none">
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1">
          <CardTitle>Online vs In-Store Sales Trends (Last 3 Months)</CardTitle>
          <CardDescription>
            Showing total sales type for the last 3 months
          </CardDescription>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger
            className="hidden w-[160px] rounded-lg sm:ml-auto sm:flex"
            aria-label="Select a value"
          >
            <SelectValue placeholder="Last 3 months" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="90d" className="rounded-lg">
              Last 3 months
            </SelectItem>
            <SelectItem value="30d" className="rounded-lg">
              Last 30 days
            </SelectItem>
            <SelectItem value="7d" className="rounded-lg">
              Last 7 days
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart data={filteredData}>
            <defs>
              {Object.entries(chartConfig).map(([key, { color }]) => (
                <linearGradient
                  key={key}
                  id={`fill-${key}`}
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="5%" stopColor={color} stopOpacity={0.8} />
                  <stop offset="95%" stopColor={color} stopOpacity={0} />
                </linearGradient>
              ))}
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={true} />
            <YAxis
              domain={[0, "auto"]}
              tickFormatter={(value) => `$${value}`}
              tickCount={6}
            />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                });
              }}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    });
                  }}
                  indicator="dot"
                />
              }
            />
            {Object.entries(chartConfig).map(([key, { color }]) => (
              <Area
                key={key}
                type="natural"
                dataKey={key}
                stroke={color}
                fill={`url(#fill-${key})`}
                strokeWidth={2}
              />
            ))}

            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
