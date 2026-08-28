import { createClient } from "@/lib/supabase/server";
import type { ProjectAlert } from "@/lib/types";

export async function getProjectAlerts(): Promise<ProjectAlert[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("v_project_alerts")
    .select("*")
    .order("days_late", { ascending: false });
  if (error) {
    console.error("Error cargando alertas:", error.message);
    return [];
  }
  return data as ProjectAlert[];
}

export async function getCalendarProjects() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("projects")
    .select("id, code, name, start_date, end_date, status")
    .not("end_date", "is", null);
  if (error) {
    console.error("Error cargando proyectos para calendario:", error.message);
    return [];
  }
  return data;
}

export async function getPendingActivities() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("activities")
    .select(
      "id, status, started_at, created_at, rejection_reason, projects(code, name), areas(name)"
    )
    .in("status", ["pendiente", "en_proceso", "en_revision", "rechazado"]);

  if (error) {
    console.error("Error cargando actividades pendientes:", error.message);
    return [];
  }

  return (data ?? []).map((a: any) => ({
    id: a.id,
    status: a.status,
    started_at: a.started_at,
    created_at: a.created_at,
    rejection_reason: a.rejection_reason,
    projects: Array.isArray(a.projects) ? a.projects[0] ?? null : a.projects,
    areas: Array.isArray(a.areas) ? a.areas[0] ?? null : a.areas,
  }));
}

export async function getCalendarEvents() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("calendar_events")
    .select("id, title, note, event_date, event_time")
    .order("event_date", { ascending: true });

  if (error) {
    console.error("Error cargando eventos de calendario:", error.message);
    return [];
  }
  return data;
}