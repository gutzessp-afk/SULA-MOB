import { Card, CardContent } from "@/components/ui/card";
import { FolderKanban, Clock, Zap, CheckCircle2 } from "lucide-react";
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
    trend: "+2 este mes",
    trendUp: true,
    color: "text-blue-400",
    glow: "rgba(96,165,250,0.08)",
  },
  {
    label: "Actividades pendientes",
    key: "pending" as const,
    icon: Clock,
    trend: "-3 vs ayer",
    trendUp: false,
    color: "text-amber-400",
    glow: "rgba(251,191,36,0.08)",
  },
  {
    label: "En proceso",
    key: "inProgress" as const,
    icon: Zap,
    trend: "+1 hoy",
    trendUp: true,
    color: "text-[#E30613]",
    glow: "rgba(227,6,19,0.08)",
  },
  {
    label: "Terminadas hoy",
    key: "done" as const,
    icon: CheckCircle2,
    trend: "+4 vs ayer",
    trendUp: true,
    color: "text-emerald-400",
    glow: "rgba(52,211,153,0.08)",
  },
];

export function StatsCards() {
  const stats = getStats();

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map(({ label, key, icon: Icon, trend, trendUp, color, glow }) => (
        <Card
          key={key}
          className="bg-white/[0.03] border-white/[0.08] hover:border-white/[0.14] transition-colors"
          style={{ boxShadow: `inset 0 1px 0 rgba(255,255,255,0.04)` }}
        >
          <CardContent className="p-5">
            <div className="flex items-start justify-between mb-3">
              <div
                className="p-2 rounded-lg"
                style={{ background: glow }}
              >
                <Icon size={16} className={color} />
              </div>
              <span
                className={`text-[11px] font-medium ${trendUp ? "text-emerald-400" : "text-amber-400"}`}
              >
                {trend}
              </span>
            </div>
            <p className="text-2xl font-bold text-white tabular-nums">{stats[key]}</p>
            <p className="text-xs text-white/40 mt-1">{label}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
