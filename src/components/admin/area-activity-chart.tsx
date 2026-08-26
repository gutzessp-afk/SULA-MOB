import { AREAS, mockProjects } from "@/lib/mock-data";

function getAreaStats() {
  const allActivities = mockProjects.flatMap((p) => p.activities);
  return AREAS.map((area) => {
    const acts = allActivities.filter((a) => a.area === area);
    const total = acts.length;
    const done = acts.filter((a) => a.status === "Terminado").length;
    const inProgress = acts.filter((a) => a.status === "En proceso").length;
    const pending = acts.filter((a) => a.status === "Pendiente").length;
    const pct = total > 0 ? Math.round((done / total) * 100) : 0;
    return { area, total, done, inProgress, pending, pct };
  });
}

function areaDotColor(pct: number) {
  if (pct >= 70) return "bg-emerald-400";
  if (pct >= 30) return "bg-amber-400";
  return "bg-[#E30613]";
}

export function AreaActivityChart() {
  const stats = getAreaStats();
  const maxTotal = Math.max(...stats.map((s) => s.total), 1);

  return (
    <div className="bg-[#2e2e2e] border border-white/[0.08] rounded-xl overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-white/[0.06]">
        <h3 className="text-sm font-semibold text-white">Actividad por área</h3>
      </div>

      <div className="px-6 py-4 space-y-4">
        {stats.map(({ area, total, done, inProgress, pending, pct }) => (
          <div key={area} className="space-y-2">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 min-w-0">
                <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${areaDotColor(pct)}`} />
                <span className="text-xs text-white/70 truncate">{area}</span>
              </div>
              {total > 0 ? (
                <div className="flex items-center gap-2.5 text-[11px] tabular-nums shrink-0">
                  <span className="text-emerald-400">{done} ok</span>
                  <span className="text-amber-400">{inProgress} act</span>
                  <span className="text-white/30">{pending} pend</span>
                </div>
              ) : (
                <span className="text-[11px] text-white/20">Sin actividad</span>
              )}
            </div>

            <div className="flex h-2 rounded-full overflow-hidden bg-white/[0.06]">
              {total > 0 && (
                <>
                  <div
                    className="bg-emerald-400 transition-all duration-300"
                    style={{ width: `${(done / maxTotal) * 100}%` }}
                  />
                  <div
                    className="bg-amber-400 transition-all duration-300"
                    style={{ width: `${(inProgress / maxTotal) * 100}%` }}
                  />
                  <div
                    className="bg-white/20 transition-all duration-300"
                    style={{ width: `${(pending / maxTotal) * 100}%` }}
                  />
                </>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="px-6 py-3 border-t border-white/[0.06] flex items-center gap-5">
        {[
          { color: "bg-emerald-400", label: "Terminado" },
          { color: "bg-amber-400", label: "En proceso" },
          { color: "bg-white/20", label: "Pendiente" },
        ].map(({ color, label }) => (
          <div key={label} className="flex items-center gap-1.5 text-[11px] text-white/40">
            <div className={`w-2 h-2 rounded-full ${color}`} />
            {label}
          </div>
        ))}
      </div>
    </div>
  );
}
