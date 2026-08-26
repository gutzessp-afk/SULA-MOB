export type ActivityStatus = "Pendiente" | "En proceso" | "Terminado";
export type ProjectStatus = "Activo" | "En pausa" | "Completado";

export const AREAS = [
  "Corte de Tubo",
  "Doblez",
  "Corte de Lámina",
  "Soldadura",
  "Alambrón",
  "Pintura",
  "Empaque",
] as const;

export type Area = (typeof AREAS)[number];

export interface Activity {
  id: string;
  projectId: string;
  area: Area;
  description: string;
  status: ActivityStatus;
  order: number;
  notes: string;
  updatedAt: string;
  updatedBy: string;
}

export interface Project {
  id: string;
  name: string;
  client: string;
  description: string;
  startDate: string;
  status: ProjectStatus;
  progress: number;
  areas: Area[];
  areaOrder: Area[];
  activities: Activity[];
}

export const mockProjects: Project[] = [
  {
    id: "P001",
    name: "Display Temporada Verano",
    client: "PepsiCo",
    description: "Display punto de venta para línea de bebidas verano 2026. 120 unidades.",
    startDate: "2026-07-15",
    status: "Activo",
    progress: 65,
    areas: ["Corte de Tubo", "Doblez", "Soldadura", "Pintura", "Empaque"],
    areaOrder: ["Corte de Tubo", "Doblez", "Soldadura", "Pintura", "Empaque"],
    activities: [
      { id: "A001", projectId: "P001", area: "Corte de Tubo", description: "Corte de tubería estructural 1\" galvanizada", status: "Terminado", order: 1, notes: "120 sets completados, sin merma.", updatedAt: "2026-08-20 09:15", updatedBy: "Operador Corte de Tubo" },
      { id: "A002", projectId: "P001", area: "Doblez", description: "Dobles a 90° y 45° en partes principales", status: "Terminado", order: 2, notes: "Verificados contra plano rev.3", updatedAt: "2026-08-22 14:30", updatedBy: "Operador Doblez" },
      { id: "A003", projectId: "P001", area: "Soldadura", description: "Ensamble y soldadura MIG estructura base", status: "En proceso", order: 3, notes: "80 de 120 unidades soldadas.", updatedAt: "2026-08-25 11:00", updatedBy: "Operador Soldadura" },
      { id: "A004", projectId: "P001", area: "Pintura", description: "Pintura electrostática rojo PepsiCo", status: "Pendiente", order: 4, notes: "Esperar liberación de soldadura.", updatedAt: "2026-08-15 08:00", updatedBy: "Administrador" },
      { id: "A005", projectId: "P001", area: "Empaque", description: "Empaque individual con espuma y caja corrugada", status: "Pendiente", order: 5, notes: "Material de empaque disponible.", updatedAt: "2026-08-15 08:00", updatedBy: "Administrador" },
    ],
  },
  {
    id: "P002",
    name: "Módulo Caja KFC Monterrey",
    client: "KFC",
    description: "Módulo metálico para caja registradora. 8 unidades para apertura tiendas Monterrey.",
    startDate: "2026-08-01",
    status: "Activo",
    progress: 40,
    areas: ["Corte de Lámina", "Doblez", "Soldadura", "Pintura", "Empaque"],
    areaOrder: ["Corte de Lámina", "Doblez", "Soldadura", "Pintura", "Empaque"],
    activities: [
      { id: "A006", projectId: "P002", area: "Corte de Lámina", description: "Corte CNC lámina calibre 14", status: "Terminado", order: 1, notes: "8 juegos completos.", updatedAt: "2026-08-10 10:00", updatedBy: "Operador Corte de Lámina" },
      { id: "A007", projectId: "P002", area: "Doblez", description: "Formado de canales y caras frontales", status: "En proceso", order: 2, notes: "5 de 8 unidades listas.", updatedAt: "2026-08-24 16:00", updatedBy: "Operador Doblez" },
      { id: "A008", projectId: "P002", area: "Soldadura", description: "Soldadura TIG acabado fino", status: "Pendiente", order: 3, notes: "", updatedAt: "2026-08-01 08:00", updatedBy: "Administrador" },
      { id: "A009", projectId: "P002", area: "Pintura", description: "Pintura en polvo negro mate", status: "Pendiente", order: 4, notes: "", updatedAt: "2026-08-01 08:00", updatedBy: "Administrador" },
      { id: "A010", projectId: "P002", area: "Empaque", description: "Empaque con strech film y tarima", status: "Pendiente", order: 5, notes: "", updatedAt: "2026-08-01 08:00", updatedBy: "Administrador" },
    ],
  },
  {
    id: "P003",
    name: "Rack Ropa Temporada",
    client: "Suburbia",
    description: "Rack de exhibición para colección otoño-invierno. 200 unidades.",
    startDate: "2026-06-01",
    status: "Completado",
    progress: 100,
    areas: ["Corte de Tubo", "Doblez", "Alambrón", "Pintura", "Empaque"],
    areaOrder: ["Corte de Tubo", "Doblez", "Alambrón", "Pintura", "Empaque"],
    activities: [
      { id: "A011", projectId: "P003", area: "Corte de Tubo", description: "Corte tubería ovalada 1.5\"", status: "Terminado", order: 1, notes: "Completado.", updatedAt: "2026-06-10 09:00", updatedBy: "Operador Corte de Tubo" },
      { id: "A012", projectId: "P003", area: "Doblez", description: "Curvaturas para brazos de rack", status: "Terminado", order: 2, notes: "Completado.", updatedAt: "2026-06-18 14:00", updatedBy: "Operador Doblez" },
      { id: "A013", projectId: "P003", area: "Alambrón", description: "Ganchos alambrón calibre 8 niquelado", status: "Terminado", order: 3, notes: "1600 ganchos (8 por rack).", updatedAt: "2026-07-01 11:00", updatedBy: "Operador Alambrón" },
      { id: "A014", projectId: "P003", area: "Pintura", description: "Pintura cromo satinado", status: "Terminado", order: 4, notes: "Completado.", updatedAt: "2026-07-15 10:00", updatedBy: "Operador Pintura" },
      { id: "A015", projectId: "P003", area: "Empaque", description: "Empaque y paletizado para distribución", status: "Terminado", order: 5, notes: "Entregado 2026-07-30.", updatedAt: "2026-07-30 17:00", updatedBy: "Operador Empaque" },
    ],
  },
  {
    id: "P004",
    name: "Isla Bolsos Premium",
    client: "Liverpool",
    description: "Isla central para exhibición de bolsos de piel. 15 unidades para tiendas flagship.",
    startDate: "2026-08-10",
    status: "Activo",
    progress: 15,
    areas: ["Corte de Lámina", "Soldadura", "Pintura", "Empaque"],
    areaOrder: ["Corte de Lámina", "Soldadura", "Pintura", "Empaque"],
    activities: [
      { id: "A016", projectId: "P004", area: "Corte de Lámina", description: "Corte lámina inoxidable calibre 16", status: "En proceso", order: 1, notes: "Material importado, en proceso de corte.", updatedAt: "2026-08-25 08:30", updatedBy: "Operador Corte de Lámina" },
      { id: "A017", projectId: "P004", area: "Soldadura", description: "Soldadura TIG inoxidable grado espejo", status: "Pendiente", order: 2, notes: "", updatedAt: "2026-08-10 08:00", updatedBy: "Administrador" },
      { id: "A018", projectId: "P004", area: "Pintura", description: "Acabado espejo pulido manual", status: "Pendiente", order: 3, notes: "", updatedAt: "2026-08-10 08:00", updatedBy: "Administrador" },
      { id: "A019", projectId: "P004", area: "Empaque", description: "Empaque con foam especializado y caja madera", status: "Pendiente", order: 4, notes: "", updatedAt: "2026-08-10 08:00", updatedBy: "Administrador" },
    ],
  },
  {
    id: "P005",
    name: "Exhibidor Snacks Ruta",
    client: "PepsiCo",
    description: "Exhibidor metálico portátil para punto de venta en tiendas de conveniencia. 500 unidades.",
    startDate: "2026-08-18",
    status: "Activo",
    progress: 8,
    areas: ["Corte de Tubo", "Alambrón", "Pintura", "Empaque"],
    areaOrder: ["Corte de Tubo", "Alambrón", "Pintura", "Empaque"],
    activities: [
      { id: "A020", projectId: "P005", area: "Corte de Tubo", description: "Corte tubería redonda 3/4\" negro", status: "En proceso", order: 1, notes: "Inicio de producción.", updatedAt: "2026-08-25 07:00", updatedBy: "Operador Corte de Tubo" },
      { id: "A021", projectId: "P005", area: "Alambrón", description: "Canastillas alambrón calibre 10", status: "Pendiente", order: 2, notes: "500 canastillas requeridas.", updatedAt: "2026-08-18 08:00", updatedBy: "Administrador" },
      { id: "A022", projectId: "P005", area: "Pintura", description: "Pintura electrostática negro brillante", status: "Pendiente", order: 3, notes: "", updatedAt: "2026-08-18 08:00", updatedBy: "Administrador" },
      { id: "A023", projectId: "P005", area: "Empaque", description: "Empaque individual bolsa polietileno", status: "Pendiente", order: 4, notes: "", updatedAt: "2026-08-18 08:00", updatedBy: "Administrador" },
    ],
  },
];

export const CLIENTS = ["PepsiCo", "KFC", "Suburbia", "Liverpool", "Oxxo", "7-Eleven", "Walmart", "Coppel"] as const;

export interface RecentActivity {
  id: string;
  user: string;
  area: Area;
  action: string;
  project: string;
  time: string;
}

export const recentActivityFeed: RecentActivity[] = [
  { id: "F1", user: "Operador Soldadura", area: "Soldadura", action: "cambió estado a En proceso", project: "Display Temporada Verano", time: "Hace 1 hora" },
  { id: "F2", user: "Operador Doblez", area: "Doblez", action: "cambió estado a En proceso", project: "Módulo Caja KFC Monterrey", time: "Hace 2 horas" },
  { id: "F3", user: "Operador Corte de Lámina", area: "Corte de Lámina", action: "cambió estado a En proceso", project: "Isla Bolsos Premium", time: "Hace 3 horas" },
  { id: "F4", user: "Operador Corte de Tubo", area: "Corte de Tubo", action: "cambió estado a En proceso", project: "Exhibidor Snacks Ruta", time: "Hace 4 horas" },
  { id: "F5", user: "Administrador", area: "Empaque", action: "creó proyecto", project: "Exhibidor Snacks Ruta", time: "Hace 1 día" },
  { id: "F6", user: "Operador Empaque", area: "Empaque", action: "cambió estado a Terminado", project: "Rack Ropa Temporada", time: "Hace 2 días" },
];
