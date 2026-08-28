
import { getCalendarProjects, getCalendarEvents, getPendingActivities } from "@/lib/queries";
import { CalendarGrid } from "@/components/admin/calendar-grid";

export default async function CalendarioPage() {
  const [projects, events, pendingActivities] = await Promise.all([
    getCalendarProjects(),
    getCalendarEvents(),
    getPendingActivities(),
  ]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-white">Calendario</h1>
        <p className="text-sm text-white/50">
          Entregas y pendientes detectados automáticamente de tus proyectos y actividades.
        </p>
      </div>
      <CalendarGrid projects={projects} events={events} pendingActivities={pendingActivities} />
    </div>
  );
}