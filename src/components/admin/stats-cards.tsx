import { FolderKanban, Clock, Zap, CheckCircle2, TrendingUp, TrendingDown } from "lucide-react";
import { mockProjects } from "@/lib/mock-data";

function getStats() {
  const allActivities = mockProjects.flatMap((p) => p.activities);
  return {
    activeProjects: mockProjects.filter((p) => p.status === "Activo").length,
    pending: allActivities.filter((a) => a.status === "Pendiente").length,
    inProgress: allActivities.filter((a) => a.status === "En proceso").length,
    done: allActivities.filter((a) => a.status === "Terminado").length,
  };
}

const cards = [
  {
    label: "Proyectos activos",
    key: "activeProjects" as const,
    icon: FolderKanban,
    trend: "+12% vs ayer",
    trendUp: true,
    iconBg: "bg-blue-400/15",
    iconColor: "text-blue-400",
  },
  {
    label: "Actividades pendientes",
    key: "pending" as const,
    icon: Clock,
    trend: "-3% vs ayer",
    trendUp: false,
    iconBg: "bg-amber-400/15",
    iconColor: "text-amber-400",
  },
  {
    label: "En proceso",
    key: "inProgress" as const,
    icon: Zap,
    trend: "+8% vs ayer",
    trendUp: true,
    iconBg: "bg-[#E30613]/12",
    iconColor: "text-[#E30613]",
  },
  {
    label: "Terminadas hoy",
    key: "done" as const,
    icon: CheckCircle2,
    trend: "+21% vs ayer",
    trendUp: true,
    iconBg: "bg-emerald-400/15",
    iconColor: "text-emerald-400",
  },
];

export function StatsCards() {
  const stats = getStats();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map(({ label, key, icon: Icon, trend, trendUp, iconBg, iconColor }) => (
        <div
          key={key}
          className="bg-[#2e2e2e] border border-white/[0.08] rounded-xl p-6 hover:bg-[#353535] hover:border-white/[0.12] transition-all duration-200"
        >
          <div className="flex items-start justify-between mb-4">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${iconBg}`}>
              <Icon size={18} className={iconColor} />
            </div>
            <div className={`flex items-center gap-1 text-[11px] font-medium ${trendUp ? "text-emerald-400" : "text-red-400"}`}>
              {trendUp
                ? <TrendingUp size={12} />
                : <TrendingDown size={12} />}
              {trend}
            </div>
          </div>

          <p className="text-[11px] uppercase tracking-wider text-white/50 font-medium mb-1.5">
            {label}
          </p>
          <p className="text-4xl font-bold text-white tabular-nums leading-none">
            {stats[key]}
          </p>
        </div>
      ))}
    </div>
  );
}
