import { MetricCard } from "@/components/metric-card";
// import { PipelineChart } from "@/components/pipeline-chart";
import { ActivityFeed } from "@/components/activity-feed";
import { getInitialDealsByStage, getInitialActivities } from "@/lib/mock-data";
// import { useMemo } from "react";

export default function OverviewPage() {
  // const pipelineData = useMemo(() => getInitialDealsByStage(), []);

  const activities = getInitialActivities();

  return (
    <div className="space-y-6">
      <section
        aria-label="Key metrics"
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 "
      >
        <MetricCard title="Active Sales" value="$32,197" delta="+3.8%" />
        <MetricCard title="Product Revenue" value="$12,027" delta="+1.2%" />
        <MetricCard title="Product Sold" value="1932" delta="+5.1%" />
      </section>

      <section
        className="grid gap-6 lg:grid-cols-3"
        aria-label="Pipeline and activity"
      >
        <div className="lg:col-span-2 rounded-xl border bg-card text-card-foreground p-4 md:p-6 shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Sales Pipeline</h2>
          {/* <PipelineChart data={pipelineData} /> */}
        </div>
        <div className="rounded-xl border bg-card text-card-foreground p-4 md:p-6 shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
          <ActivityFeed items={activities} />
        </div>
      </section>
    </div>
  );
}
