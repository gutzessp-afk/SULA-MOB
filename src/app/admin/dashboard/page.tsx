import { StatsCards } from "@/components/admin/stats-cards";
import { RecentProjects } from "@/components/admin/recent-projects";
import { AreaActivityChart } from "@/components/admin/area-activity-chart";
import { ActivityTimeline } from "@/components/admin/activity-timeline";

function getFormattedDate() {
  return new Date().toLocaleDateString("es-MX", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function AdminDashboardPage() {
  const date = getFormattedDate();
  const dateFormatted = date.charAt(0).toUpperCase() + date.slice(1);

  return (
    <div className="space-y-8 max-w-7xl">
      {/* Hero */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <span className="relative flex items-center gap-1.5 bg-emerald-400/10 border border-emerald-400/20 text-emerald-400 text-[11px] font-medium px-2.5 py-1 rounded-full tracking-wide">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Sistema operativo
          </span>
        </div>
        <h2 className="text-3xl font-bold text-white tracking-tight">Bienvenido de nuevo</h2>
        <p className="text-sm text-white/40 mt-1.5">{dateFormatted}</p>
      </div>

      <StatsCards />

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
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
