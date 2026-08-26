import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AREAS, mockProjects, type Area } from "@/lib/mock-data";

function getAreaStats() {
  const allActivities = mockProjects.flatMap((p) => p.activities);
  return AREAS.map((area) => {
    const areaActs = allActivities.filter((a) => a.area === area);
    return {
      area,
      total: areaActs.length,
      done: areaActs.filter((a) => a.status === "Terminado").length,
      inProgress: areaActs.filter((a) => a.status === "En proceso").length,
      pending: areaActs.filter((a) => a.status === "Pendiente").length,
    };
  });
}

export function AreaActivityChart() {
  const stats = getAreaStats();
  const maxTotal = Math.max(...stats.map((s) => s.total), 1);

  return (
    <Card className="bg-white/[0.03] border-white/[0.08]">
      <CardHeader className="pb-3 px-5 pt-5">
        <CardTitle className="text-sm font-semibold text-white">Actividad por área</CardTitle>
      </CardHeader>
      <CardContent className="px-5 pb-5">
        <div className="space-y-3">
          {stats.map(({ area, total, done, inProgress, pending }) => (
            <div key={area} className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-xs text-white/60 truncate max-w-[140px]">{area}</span>
                <div className="flex items-center gap-3 text-[11px] text-white/40 tabular-nums">
                  <span className="text-emerald-400">{done} ok</span>
                  <span className="text-[#E30613]">{inProgress} act</span>
                  <span className="text-white/30">{pending} pend</span>
                </div>
              </div>
              <div className="flex h-1.5 rounded-full overflow-hidden bg-white/[0.06] w-full">
                {total > 0 && (
                  <>
                    <div
                      className="bg-emerald-500 transition-all"
                      style={{ width: `${(done / maxTotal) * 100}%` }}
                    />
                    <div
                      className="bg-[#E30613] transition-all"
                      style={{ width: `${(inProgress / maxTotal) * 100}%` }}
                    />
                    <div
                      className="bg-white/20 transition-all"
                      style={{ width: `${(pending / maxTotal) * 100}%` }}
                    />
                  </>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="flex items-center gap-4 mt-4 pt-3 border-t border-white/[0.06]">
          <div className="flex items-center gap-1.5 text-[11px] text-white/40">
            <div className="w-2 h-2 rounded-full bg-emerald-500" />
            Terminado
          </div>
          <div className="flex items-center gap-1.5 text-[11px] text-white/40">
            <div className="w-2 h-2 rounded-full bg-[#E30613]" />
            En proceso
          </div>
          <div className="flex items-center gap-1.5 text-[11px] text-white/40">
            <div className="w-2 h-2 rounded-full bg-white/20" />
            Pendiente
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
