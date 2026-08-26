import { recentActivityFeed, type RecentActivity } from "@/lib/mock-data";

function getInitials(name: string) {
  return name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function dotColor(action: string) {
  if (action.includes("Terminado")) return "bg-emerald-400 ring-emerald-400/20";
  if (action.includes("En proceso")) return "bg-amber-400 ring-amber-400/20";
  if (action.includes("creó")) return "bg-blue-400 ring-blue-400/20";
  return "bg-white/30 ring-white/10";
}

function avatarColor(action: string) {
  if (action.includes("Terminado")) return "bg-emerald-400/15 text-emerald-400";
  if (action.includes("En proceso")) return "bg-amber-400/15 text-amber-400";
  if (action.includes("creó")) return "bg-blue-400/15 text-blue-400";
  return "bg-white/10 text-white/50";
}

function TimelineItem({ item, isLast }: { item: RecentActivity; isLast: boolean }) {
  const initials = getInitials(item.user);

  return (
    <li className="flex gap-3">
      {/* Left: dot + line */}
      <div className="flex flex-col items-center pt-1">
        <span className={`w-2 h-2 rounded-full ring-4 shrink-0 ${dotColor(item.action)}`} />
        {!isLast && <div className="w-px flex-1 bg-white/[0.06] mt-2 mb-1" />}
      </div>

      {/* Right: content */}
      <div className={`flex gap-3 min-w-0 ${!isLast ? "pb-5" : ""}`}>
        <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-[10px] font-semibold ${avatarColor(item.action)}`}>
          {initials}
        </div>
        <div className="min-w-0">
          <p className="text-sm text-white/80 leading-snug">
            <span className="font-medium text-white">{item.user}</span>{" "}
            <span className="text-white/50">{item.action}</span>
          </p>
          <p className="text-xs text-white/40 mt-0.5 truncate">{item.project}</p>
          <p className="text-[11px] text-white/25 mt-1">{item.time}</p>
        </div>
      </div>
    </li>
  );
}

export function ActivityTimeline() {
  const feed = recentActivityFeed.slice(0, 6);

  return (
    <div className="bg-[#2e2e2e] border border-white/[0.08] rounded-xl overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.06]">
        <h3 className="text-sm font-semibold text-white">Actividad reciente</h3>
        <span className="text-[11px] text-white/30">{feed.length} eventos</span>
      </div>

      <ol className="px-6 py-5 space-y-0" aria-label="Timeline de actividad">
        {feed.map((item, i) => (
          <TimelineItem key={item.id} item={item} isLast={i === feed.length - 1} />
        ))}
      </ol>
    </div>
  );
}
