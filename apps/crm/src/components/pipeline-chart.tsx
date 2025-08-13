"use client";

import React, { memo } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

type Datum = { stage: string; value: number };

function PipelineChartComponent({ data }: { data: Datum[] }) {
  return (
    <ChartContainer
      config={{
        value: { label: "Value", color: "hsl(var(--primary))" },
      }}
      className="h-[320px] w-full"
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} barSize={24}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis
            dataKey="stage"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tick={{ fontSize: 12 }}
          />
          <YAxis
            tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
            tick={{ fontSize: 12 }}
            width={48}
          />
          <Tooltip
            content={(props) => (
              <ChartTooltip {...props}>
                <ChartTooltipContent label={props.label} />
              </ChartTooltip>
            )}
          />
          <Bar
            dataKey="value"
            fill="hsl(var(--primary))"
            radius={[6, 6, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}

// Only re-render if `data` has changed (shallow comparison)
export const PipelineChart = memo(
  PipelineChartComponent,
  (prevProps, nextProps) => {
    return JSON.stringify(prevProps.data) === JSON.stringify(nextProps.data);
  }
);
