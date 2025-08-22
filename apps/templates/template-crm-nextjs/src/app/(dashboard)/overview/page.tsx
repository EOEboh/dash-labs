import { MetricCard } from "@/components/metric-card";
import { PipelineChart } from "@/components/pipeline-chart";
import { ActivityFeed } from "@/components/activity-feed";
import { getInitialActivities } from "@/lib/mock-data";
import MainTable from "@/components/sales-table/main-table-view";

export default async function OverviewPage() {
  const activities = getInitialActivities();

  return (
    <div className="w-full max-w-full overflow-hidden">
      <div className="space-y-4 sm:space-y-6 p-2 sm:p-6">
        {/* Metrics Section */}
        <section
          aria-label="Key metrics"
          className="w-full min-w-0 grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
        >
          <MetricCard title="Active Sales" value="$32,197" delta="+3.8%" />
          <MetricCard title="Product Revenue" value="$12,027" delta="+1.2%" />
          <MetricCard title="Product Sold" value="1932" delta="+5.1%" />
        </section>

        {/* Performance and Activity Section */}
        <section
          className="w-full min-w-0 grid gap-4 sm:gap-6 grid-cols-1 lg:grid-cols-3"
          aria-label="Performance and activity"
        >
          {/* Performance Chart */}
          <div className="lg:col-span-2 w-full min-w-0 rounded-xl border bg-card text-card-foreground p-3 sm:p-4 md:p-6 shadow-sm">
            <h2 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">
              Performance
            </h2>
            <div className="w-full min-w-0 overflow-hidden">
              <PipelineChart />
            </div>
          </div>

          {/* Activity Feed */}
          <div className="w-full min-w-0 rounded-xl border bg-card text-card-foreground p-3 sm:p-4 md:p-6 shadow-sm">
            <h2 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">
              Top 5 Country Sales
            </h2>
            <div className="w-full overflow-hidden">
              <ActivityFeed items={activities} />
            </div>
          </div>
        </section>

        {/* Sales Table Section */}
        <section className="w-full" aria-label="Sales data table">
          <div className="w-full min-w-0">
            <MainTable />
          </div>
        </section>
      </div>
    </div>
  );
}
