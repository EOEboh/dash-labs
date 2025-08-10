import { MetricCard } from "@/components/metric-card";
import { PipelineChart } from "@/components/pipeline-chart";
import { ActivityFeed } from "@/components/activity-feed";
import { getInitialDealsByStage, getInitialActivities } from "@/lib/mock-data";

export default function OverviewPage() {
  const pipelineData = getInitialDealsByStage();
  const activities = getInitialActivities();

  return (
    <div className="space-y-6">
      <section
        aria-label="Key metrics"
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
      >
        <MetricCard title="Total Contacts" value="1,248" delta="+3.8%" />
        <MetricCard title="Open Deals" value="86" delta="+1.2%" />
        <MetricCard title="Pipeline Value" value="$412k" delta="+5.1%" />
        <MetricCard title="Win Rate" value="28%" delta="+0.6%" />
      </section>

      <section
        className="grid gap-6 lg:grid-cols-3"
        aria-label="Pipeline and activity"
      >
        <div className="lg:col-span-2 rounded-xl border bg-card text-card-foreground p-4 md:p-6 shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Sales Pipeline</h2>
          <PipelineChart data={pipelineData} />
        </div>
        <div className="rounded-xl border bg-card text-card-foreground p-4 md:p-6 shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
          <ActivityFeed items={activities} />
        </div>
      </section>
    </div>
  );
}
