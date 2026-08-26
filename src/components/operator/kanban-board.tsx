"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { mockProjects, type Activity, type ActivityStatus } from "@/lib/mock-data";
import type { MockUser } from "@/lib/mock-users";

const COLUMNS: ActivityStatus[] = ["Pendiente", "En proceso", "Terminado"];

function columnStyle(col: ActivityStatus) {
  if (col === "Terminado") return { header: "text-emerald-400", dot: "bg-emerald-500", border: "border-emerald-500/20" };
  if (col === "En proceso") return { header: "text-[#E30613]", dot: "bg-[#E30613]", border: "border-[#E30613]/20" };
  return { header: "text-white/50", dot: "bg-white/30", border: "border-white/[0.08]" };
}

function nextStatus(current: ActivityStatus): ActivityStatus {
  if (current === "Pendiente") return "En proceso";
  if (current === "En proceso") return "Terminado";
  return "Pendiente";
}

function getProjectName(projectId: string) {
  return mockProjects.find((p) => p.id === projectId)?.name ?? projectId;
}

function getProjectClient(projectId: string) {
  return mockProjects.find((p) => p.id === projectId)?.client ?? "";
}

interface KanbanBoardProps {
  user: MockUser;
}

export function KanbanBoard({ user }: KanbanBoardProps) {
  const initialActivities = mockProjects
    .flatMap((p) => p.activities)
    .filter((a) => a.area === user.area);

  const [activities, setActivities] = useState<Activity[]>(initialActivities);

  function handleStatusChange(id: string, newStatus: ActivityStatus) {
    setActivities((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: newStatus } : a))
    );
    const label = newStatus === "En proceso" ? "en proceso" : newStatus === "Terminado" ? "terminada" : "pendiente";
    toast.success(`Actividad marcada como ${label}`, {
      description: "Estado actualizado correctamente.",
      duration: 3000,
    });
  }

  const columns = COLUMNS.map((col) => ({
    status: col,
    items: activities.filter((a) => a.status === col),
  }));

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {columns.map(({ status, items }) => {
        const style = columnStyle(status);
        return (
          <div key={status} className="flex flex-col gap-3">
            {/* Column header */}
            <div className="flex items-center gap-2 px-1">
              <div className={`w-2 h-2 rounded-full ${style.dot}`} />
              <span className={`text-xs font-semibold tracking-wide ${style.header}`}>{status}</span>
              <span className="ml-auto text-xs text-white/25 tabular-nums">{items.length}</span>
            </div>

            {/* Cards */}
            <div className="flex flex-col gap-3 min-h-[120px]">
              {items.length === 0 && (
                <div className="flex items-center justify-center h-20 rounded-xl border border-dashed border-white/[0.06] text-xs text-white/20">
                  Sin actividades
                </div>
              )}
              {items.map((activity) => (
                <Card
                  key={activity.id}
                  className={`bg-white/[0.03] border transition-colors hover:border-white/[0.14] ${style.border}`}
                >
                  <CardContent className="p-4 space-y-3">
                    <div>
                      <p className="text-sm font-medium text-white leading-snug">
                        {activity.description}
                      </p>
                      <p className="text-xs text-white/40 mt-1">
                        {getProjectName(activity.projectId)}
                      </p>
                      <p className="text-[11px] text-white/25">{getProjectClient(activity.projectId)}</p>
                    </div>

                    {activity.notes && (
                      <p className="text-xs text-white/40 bg-white/[0.03] rounded-lg px-3 py-2 leading-relaxed">
                        {activity.notes}
                      </p>
                    )}

                    <div className="flex items-center justify-between pt-1">
                      <Badge className="text-[10px] bg-white/[0.05] text-white/40 border-white/[0.08]">
                        Orden {activity.order}
                      </Badge>
                      {status !== "Terminado" && (
                        <Button
                          size="sm"
                          onClick={() => handleStatusChange(activity.id, nextStatus(status))}
                          className="h-7 px-3 text-[11px] bg-[#E30613]/10 hover:bg-[#E30613]/20 text-[#E30613] border border-[#E30613]/25 hover:border-[#E30613]/40 transition-colors"
                        >
                          {status === "Pendiente" ? "Iniciar" : "Terminar"}
                          <ChevronRight size={12} className="ml-1" />
                        </Button>
                      )}
                      {status === "Terminado" && (
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleStatusChange(activity.id, "Pendiente")}
                          className="h-7 px-3 text-[11px] text-white/25 hover:text-white/60"
                        >
                          Reabrir
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
