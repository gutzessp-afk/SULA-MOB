import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { mockProjects, type ProjectStatus } from "@/lib/mock-data";

function statusStyle(status: ProjectStatus) {
  if (status === "Activo") return "bg-emerald-400/15 text-emerald-400 border-emerald-400/25";
  if (status === "En pausa") return "bg-amber-400/15 text-amber-400 border-amber-400/25";
  return "bg-white/10 text-white/50 border-white/15";
}

function progressColor(pct: number) {
  if (pct < 30) return "bg-[#E30613]";
  if (pct < 70) return "bg-amber-400";
  return "bg-emerald-400";
}

export function RecentProjects() {
  const projects = mockProjects.slice(0, 5);

  return (
    <div className="bg-[#2e2e2e] border border-white/[0.08] rounded-xl overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.06]">
        <h3 className="text-sm font-semibold text-white">Proyectos recientes</h3>
        <Link
          href="/admin/proyectos"
          className="flex items-center gap-1 text-xs text-white/40 hover:text-[#E30613] transition-colors font-medium"
        >
          Ver todos
          <ArrowRight size={12} />
        </Link>
      </div>

      {/* Rows */}
      <div>
        {projects.map((project, i) => (
          <div
            key={project.id}
            className={`px-6 py-4 hover:bg-white/[0.03] cursor-pointer transition-colors ${
              i < projects.length - 1 ? "border-b border-white/[0.05]" : ""
            }`}
          >
            <div className="flex items-start justify-between gap-4 mb-3">
              <div className="min-w-0">
                <p className="text-sm font-semibold text-white truncate">{project.name}</p>
                <p className="text-xs text-white/50 mt-0.5">{project.client}</p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <Badge className={`text-[10px] border font-medium ${statusStyle(project.status)}`}>
                  {project.status}
                </Badge>
              </div>
            </div>

            {/* Progress bar */}
            <div className="flex items-center gap-3">
              <div className="flex-1 h-[2px] bg-white/[0.08] rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all ${progressColor(project.progress)}`}
                  style={{ width: `${project.progress}%` }}
                />
              </div>
              <span className="text-[11px] text-white/40 tabular-nums shrink-0 w-7 text-right">
                {project.progress}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
