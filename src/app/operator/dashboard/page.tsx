"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getSession } from "@/lib/auth";
import type { MockUser } from "@/lib/mock-users";
import { KanbanBoard } from "@/components/operator/kanban-board";
import { Badge } from "@/components/ui/badge";
import { mockProjects } from "@/lib/mock-data";
import { Toaster } from "@/components/ui/sonner";

export default function OperatorDashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<MockUser | null>(null);

  useEffect(() => {
    const u = getSession();
    if (!u || u.role !== "operator") {
      router.replace("/login");
      return;
    }
    setUser(u);
  }, [router]);

  if (!user) return null;

  const myActivities = mockProjects.flatMap((p) => p.activities).filter((a) => a.area === user.area);
  const pending = myActivities.filter((a) => a.status === "Pendiente").length;
  const inProgress = myActivities.filter((a) => a.status === "En proceso").length;
  const done = myActivities.filter((a) => a.status === "Terminado").length;

  return (
    <>
      <Toaster theme="dark" position="bottom-right" />
      <div className="space-y-6 max-w-6xl">
        {/* Welcome card */}
        <div
          className="rounded-2xl p-6"
          style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <p className="text-xs text-white/40 tracking-wide uppercase mb-1">Bienvenido</p>
              <h2 className="text-xl font-bold text-white">{user.name}</h2>
              <Badge className="mt-2 bg-[#E30613]/15 text-[#E30613] border border-[#E30613]/30">
                {user.area}
              </Badge>
            </div>
            <div className="flex gap-4">
              {[
                { label: "Pendientes", value: pending, color: "text-white/50" },
                { label: "En proceso", value: inProgress, color: "text-[#E30613]" },
                { label: "Terminadas", value: done, color: "text-emerald-400" },
              ].map(({ label, value, color }) => (
                <div key={label} className="text-center">
                  <p className={`text-2xl font-bold tabular-nums ${color}`}>{value}</p>
                  <p className="text-[11px] text-white/30 mt-0.5">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Kanban */}
        <div>
          <h3 className="text-sm font-semibold text-white mb-4">Mis actividades</h3>
          <KanbanBoard user={user} />
        </div>
      </div>
    </>
  );
}
