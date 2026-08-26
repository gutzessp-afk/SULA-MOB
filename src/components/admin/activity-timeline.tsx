import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { recentActivityFeed } from "@/lib/mock-data";

export function ActivityTimeline() {
  return (
    <Card className="bg-white/[0.03] border-white/[0.08]">
      <CardHeader className="pb-3 px-5 pt-5">
        <CardTitle className="text-sm font-semibold text-white">Actividad reciente</CardTitle>
      </CardHeader>
      <CardContent className="px-5 pb-5">
        <ol className="space-y-4" aria-label="Timeline de actividad">
          {recentActivityFeed.map((item, i) => (
            <li key={item.id} className="flex gap-3">
              {/* Timeline line */}
              <div className="flex flex-col items-center">
                <div className="w-2 h-2 rounded-full bg-[#E30613] mt-1 shrink-0" />
                {i < recentActivityFeed.length - 1 && (
                  <div className="w-px flex-1 bg-white/[0.06] mt-1" />
                )}
              </div>
              <div className="pb-4 min-w-0">
                <p className="text-sm text-white/80 leading-snug">
                  <span className="font-medium text-white">{item.user}</span>{" "}
                  <span className="text-white/50">{item.action}</span>
                </p>
                <p className="text-xs text-white/40 mt-0.5 truncate">{item.project}</p>
                <p className="text-[11px] text-white/25 mt-1">{item.time}</p>
              </div>
            </li>
          ))}
        </ol>
      </CardContent>
    </Card>
  );
}
