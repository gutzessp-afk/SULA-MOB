
"use client";

import { useState } from "react";
import { addCalendarEvent, deleteCalendarEvent } from "@/lib/actions";
import {
  startOfMonth, endOfMonth, startOfWeek, endOfWeek,
  addDays, addMonths, subMonths, format, isSameMonth, isSameDay, isToday, isAfter, parseISO
} from "date-fns";
import { es } from "date-fns/locale";

interface CalendarItem {
  id: string;
  date: string;
  time?: string | null;
  title: string;
  note?: string | null;
  type: "proyecto" | "pendiente" | "actividad";
}

interface PendingActivity {
  id: string;
  status: string | null;
  started_at: string | null;
  created_at: string | null;
  rejection_reason: string | null;
  projects: { code: string; name: string } | null;
  areas: { name: string } | null;
}

interface Props {
  projects: { id: string; code: string; name: string; end_date: string | null }[];
  events: { id: string; title: string; note: string | null; event_date: string; event_time: string | null }[];
  pendingActivities: PendingActivity[];
}

const statusLabel: Record<string, string> = {
  pendiente: "Sin iniciar",
  en_proceso: "En proceso",
  en_revision: "En revisión",
  rechazado: "Rechazado",
};

export function CalendarGrid({ projects, events, pendingActivities }: Props) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState<Date | null>(null);
  const today = new Date();

  const items: CalendarItem[] = [
        ...projects.filter((p) => p.end_date).map((p) => ({
      id: `proj-${p.id}`, date: p.end_date as string, time: null, title: `${p.code} — ${p.name}`, type: "proyecto" as const,
    })),
    ...events.map((e) => ({
      id: `evt-${e.id}`, date: e.event_date, time: e.event_time, title: e.title, note: e.note, type: "pendiente" as const,
    })),
    ...pendingActivities.map((a) => {
      const dateRaw = a.started_at || a.created_at;
      const date = dateRaw ? dateRaw.slice(0, 10) : format(today, "yyyy-MM-dd");
            return {
        id: `act-${a.id}`,
        date,
        time: null,
        title: `${a.projects?.code ?? "?"} — ${a.areas?.name ?? "Etapa"}`,
        note: a.rejection_reason || statusLabel[a.status ?? ""] || a.status || "",
        type: "actividad" as const,
      };
    }),
  ].sort((a, b) => (a.time || "").localeCompare(b.time || ""));

  const itemsForDay = (day: Date) => items.filter((it) => isSameDay(parseISO(it.date), day));
  const todayItems = itemsForDay(today);
  const upcoming = items
    .filter((it) => isAfter(parseISO(it.date), today))
    .filter((it) => parseISO(it.date) <= addDays(today, 7))
    .sort((a, b) => a.date.localeCompare(b.date));

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const gridStart = startOfWeek(monthStart, { weekStartsOn: 1 });
  const gridEnd = endOfWeek(monthEnd, { weekStartsOn: 1 });
  const days: Date[] = [];
  let d = gridStart;
  while (d <= gridEnd) {
    days.push(d);
    d = addDays(d, 1);
  }

  const selectedItems = selectedDay ? itemsForDay(selectedDay) : [];

  const colorFor = (type: CalendarItem["type"]) =>
    type === "proyecto" ? "bg-blue-500/15 text-blue-300"
    : type === "actividad" ? "bg-orange-500/15 text-orange-300"
    : "bg-[#E30613]/15 text-[#E30613]";

  const labelFor = (type: CalendarItem["type"]) =>
    type === "proyecto" ? "Entrega de proyecto"
    : type === "actividad" ? "Actividad en curso"
    : "Pendiente manual";

    
  return (
    <div className="space-y-6">
      <div className="bg-white/[0.03] border border-white/[0.08] rounded-xl p-4">
        <h3 className="text-sm font-semibold text-white mb-2">
          Hoy — {format(today, "EEEE d 'de' MMMM", { locale: es })}
        </h3>
        {todayItems.length === 0 ? (
          <p className="text-sm text-white/40">No hay pendientes ni entregas detectadas para hoy.</p>
        ) : (
          <div className="space-y-1.5">
            {todayItems.map((it) => (
              <div key={it.id} className="flex items-center gap-2 text-sm">
                {it.time && <span className="text-white/40 text-xs w-12">{it.time.slice(0, 5)}</span>}
                <span className="text-white/80">{it.title}</span>
                <span className={`text-[10px] uppercase px-1.5 py-0.5 rounded ${colorFor(it.type)}`}>{labelFor(it.type)}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {upcoming.length > 0 && (
        <div className="bg-white/[0.03] border border-white/[0.08] rounded-xl p-4">
          <h3 className="text-sm font-semibold text-white mb-2">Próximos 7 días</h3>
          <div className="space-y-1.5">
            {upcoming.map((it) => (
              <div key={it.id} className="flex items-center gap-2 text-sm">
                <span className="text-white/40 text-xs w-20">{format(parseISO(it.date), "d MMM", { locale: es })}</span>
                {it.time && <span className="text-white/40 text-xs w-12">{it.time.slice(0, 5)}</span>}
                <span className="text-white/80">{it.title}</span>
                <span className={`text-[10px] uppercase px-1.5 py-0.5 rounded ${colorFor(it.type)}`}>{labelFor(it.type)}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <button onClick={() => setCurrentMonth(subMonths(currentMonth, 1))} className="px-3 py-1.5 rounded-lg text-sm text-white/70 hover:bg-white/[0.06]">← Anterior</button>
          <h2 className="text-lg font-semibold text-white capitalize">{format(currentMonth, "MMMM yyyy", { locale: es })}</h2>
          <button onClick={() => setCurrentMonth(addMonths(currentMonth, 1))} className="px-3 py-1.5 rounded-lg text-sm text-white/70 hover:bg-white/[0.06]">Siguiente →</button>
        </div>

        <div className="grid grid-cols-7 gap-1 text-xs text-white/40 px-1">
          {["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"].map((d) => (
            <div key={d} className="text-center py-1">{d}</div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1">
          {days.map((day) => {
            const dayItems = itemsForDay(day);
            const inMonth = isSameMonth(day, currentMonth);
            return (
              <button
                key={day.toISOString()}
                onClick={() => setSelectedDay(day)}
                className={`min-h-[80px] rounded-lg border p-1.5 text-left align-top transition-colors ${
                  inMonth ? "bg-white/[0.03] border-white/[0.08]" : "bg-transparent border-transparent opacity-40"
                } ${isToday(day) ? "ring-1 ring-[#E30613]" : ""} hover:bg-white/[0.06]`}
              >
                <div className="text-xs text-white/60">{format(day, "d")}</div>
                <div className="mt-1 space-y-0.5">
                  {dayItems.slice(0, 2).map((it) => (
                    <div key={it.id} className={`text-[10px] truncate rounded px-1 py-0.5 ${colorFor(it.type)}`}>
                      {it.time ? `${it.time.slice(0, 5)} ` : ""}{it.title}
                    </div>
                  ))}
                  {dayItems.length > 2 && <div className="text-[10px] text-white/40">+{dayItems.length - 2} más</div>}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {selectedDay && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={() => setSelectedDay(null)}>
          <div className="bg-[#2e2e2e] border border-white/10 rounded-xl p-5 w-full max-w-md space-y-4" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between">
              <h3 className="text-white font-semibold capitalize">{format(selectedDay, "EEEE d 'de' MMMM", { locale: es })}</h3>
              <button onClick={() => setSelectedDay(null)} className="text-white/50 hover:text-white text-sm">Cerrar</button>
            </div>

            <div className="space-y-2">
              {selectedItems.length === 0 && <p className="text-sm text-white/40">Nada detectado este día.</p>}
              {selectedItems.map((it) => (
                <div key={it.id} className="flex items-center justify-between bg-white/[0.04] rounded-lg px-3 py-2">
                  <div>
                    <p className="text-sm text-white">
                      {it.time && <span className="text-white/40 mr-2">{it.time.slice(0, 5)}</span>}
                      {it.title}
                    </p>
                    {it.note && <p className="text-xs text-white/40">{it.note}</p>}
                    <p className="text-[10px] uppercase tracking-wide text-white/30 mt-0.5">{labelFor(it.type)}</p>
                  </div>
                  {it.type === "pendiente" && (
                    <form action={deleteCalendarEvent.bind(null, it.id.replace("evt-", ""))}>
                      <button className="text-xs text-white/40 hover:text-red-400">Eliminar</button>
                    </form>
                  )}
                </div>
              ))}
            </div>

            <details className="pt-2 border-t border-white/10">
              <summary className="text-xs text-white/40 cursor-pointer">+ Agregar recordatorio manual (opcional)</summary>
              <form action={addCalendarEvent} className="space-y-2 mt-2">
                <input type="hidden" name="event_date" value={format(selectedDay, "yyyy-MM-dd")} />
                <input name="title" placeholder="Título" required className="w-full bg-white/[0.05] border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder:text-white/30" />
                <div className="flex gap-2">
                  <input type="time" name="event_time" className="bg-white/[0.05] border border-white/10 rounded-lg px-3 py-2 text-sm text-white" />
                  <input name="note" placeholder="Nota" className="flex-1 bg-white/[0.05] border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder:text-white/30" />
                </div>
                <button type="submit" className="w-full bg-[#E30613] hover:bg-[#c8050f] text-white text-sm font-medium py-2 rounded-lg transition-colors">Agregar</button>
              </form>
            </details>
          </div>
        </div>
      )}
    </div>
  );
}