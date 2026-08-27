export type ActivityStatus = "Pendiente" | "En proceso" | "Terminado";
export type ProjectStatus = "Activo" | "Completado" | "Pausado";

export interface Activity {
  id: string;
  projectId: string;
  area: string;
  status: ActivityStatus;
  operator: string;
  notes?: string;
  startedAt?: string;
  finishedAt?: string;
}

export interface Project {
  id: string;
  code: string;
  name: string;
  client: string;
  clientLogo?: string;
  image?: string;
  description?: string;
  status: ProjectStatus;
  progress: number;
  startDate: string;
  endDate?: string;
  activities: Activity[];
}

export interface RecentActivity {
  id: string;
  user: string;
  action: string;
  project: string;
  timestamp: string;
  type: "info" | "success" | "warning" | "error";
}

// 7 áreas fijas de producción
export const AREAS = [
  "Corte de Tubo",
  "Doblez",
  "Corte de Lámina",
  "Soldadura",
  "Alambrón",
  "Pintura",
  "Empaque",
] as const;

export type AreaName = (typeof AREAS)[number];

// Proyectos con imágenes placeholder de Unsplash (retail/mobiliario)
export const mockProjects: Project[] = [
  {
    id: "p001",
    code: "P001",
    name: "Display Temporada Verano",
    client: "PepsiCo",
    image:
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80",
    description: "Displays de temporada para tiendas de conveniencia",
    status: "Activo",
    progress: 65,
    startDate: "2026-07-15",
    activities: [],
  },
  {
    id: "p002",
    code: "P002",
    name: "Módulo Caja KFC Monterrey",
    client: "KFC",
    image:
      "https://images.unsplash.com/photo-1567521464027-f127ff144326?w=800&q=80",
    description: "Módulos de caja para expansión Monterrey",
    status: "Activo",
    progress: 40,
    startDate: "2026-08-01",
    activities: [],
  },
  {
    id: "p003",
    code: "P003",
    name: "Rack Ropa Temporada",
    client: "Suburbia",
    image:
      "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=800&q=80",
    description: "Racks metálicos para exhibición de ropa",
    status: "Completado",
    progress: 100,
    startDate: "2026-06-01",
    endDate: "2026-08-20",
    activities: [],
  },
  {
    id: "p004",
    code: "P004",
    name: "Isla Bolsos Premium",
    client: "Liverpool",
    image:
      "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800&q=80",
    description: "Islas premium para departamento de bolsos",
    status: "Activo",
    progress: 15,
    startDate: "2026-08-10",
    activities: [],
  },
  {
    id: "p005",
    code: "P005",
    name: "Exhibidor Snacks Ruta",
    client: "PepsiCo",
    image:
      "https://images.unsplash.com/photo-1601599963565-b7f49deb1c47?w=800&q=80",
    description: "Exhibidores móviles para ruta comercial",
    status: "Activo",
    progress: 8,
    startDate: "2026-08-18",
    activities: [],
  },
];

// Feed vacío por ahora — se llenará con datos reales de Supabase
export const recentActivityFeed: RecentActivity[] = [];