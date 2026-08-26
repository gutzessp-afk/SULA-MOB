import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { mockProjects, type ProjectStatus } from "@/lib/mock-data";

function statusColor(status: ProjectStatus) {
  if (status === "Activo") return "bg-emerald-500/15 text-emerald-400 border-emerald-500/25";
  if (status === "En pausa") return "bg-amber-500/15 text-amber-400 border-amber-500/25";
  return "bg-white/10 text-white/50 border-white/15";
}

export function RecentProjects() {
  const projects = mockProjects.slice(0, 5);

  return (
    <Card className="bg-white/[0.03] border-white/[0.08]">
      <CardHeader className="pb-3 px-5 pt-5">
        <CardTitle className="text-sm font-semibold text-white">Proyectos recientes</CardTitle>
      </CardHeader>
      <CardContent className="px-5 pb-5">
        <div className="space-y-4">
          {projects.map((project) => (
            <div key={project.id} className="space-y-2">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-sm font-medium text-white truncate">{project.name}</p>
                  <p className="text-xs text-white/40">{project.client}</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-xs font-semibold text-white/60 tabular-nums">{project.progress}%</span>
                  <Badge className={`text-[10px] border ${statusColor(project.status)}`}>
                    {project.status}
                  </Badge>
                </div>
              </div>
              <Progress
                value={project.progress}
                className="h-1 bg-white/[0.06]"
              />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
