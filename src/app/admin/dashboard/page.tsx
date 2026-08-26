import { StatsCards } from "@/components/admin/stats-cards";
import { RecentProjects } from "@/components/admin/recent-projects";
import { AreaActivityChart } from "@/components/admin/area-activity-chart";
import { ActivityTimeline } from "@/components/admin/activity-timeline";

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6 max-w-7xl">
      <div>
        <h2 className="text-xl font-bold text-white">Bienvenido de nuevo</h2>
        <p className="text-sm text-white/40 mt-1">Resumen general de operaciones — SULA MOB</p>
      </div>

      <StatsCards />

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        <div className="lg:col-span-3">
          <RecentProjects />
        </div>
        <div className="lg:col-span-2">
          <AreaActivityChart />
        </div>
      </div>

      <ActivityTimeline />
    </div>
  );
}
