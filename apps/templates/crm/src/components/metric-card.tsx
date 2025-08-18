import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import MetricChart from "./metric-chart";

export function MetricCard({
  title,
  value,
  delta,
}: {
  title: string;
  value: string;
  delta?: string;
}) {
  return (
    <Card className="shadow-sm border border-gray-200/60 overflow-hidden hover:border-gray-300/80 transition-colors">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm text-muted-foreground">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-semibold flex justify-between items-center">
          {value}

          <MetricChart />
        </div>
        {delta && (
          <div className="text-xs text-muted-foreground mt-1">
            {delta} this month
          </div>
        )}
      </CardContent>
    </Card>
  );
}
