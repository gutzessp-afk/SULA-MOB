export type ProjectStatus = "activo" | "pausado" | "completado" | "cancelado";
export type ActivityStatus = "pendiente" | "en_proceso" | "terminado" | "en_revision" | "verificado" | "rechazado";

export interface ProjectAlert {
  project_id: string;
  project_code: string;
  project_name: string;
  client_name: string;
  end_date: string;
  days_late: number;
  current_area: string | null;
  severity: "critico" | "advertencia" | "info";
  cause: string;
  suggestion: string;
}
