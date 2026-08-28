"use client";

import {
  Search,
  Bell,
  Download,
  Calendar,
  ChevronDown,
  TrendingUp,
  TrendingDown,
  Package,
  Users,
  AlertCircle,
  CheckCircle2,
  Clock,
  Activity as ActivityIcon,
  MoreHorizontal,
  Eye,
  Edit,
  ChevronRight,
} from "lucide-react";

export default function DashboardPage() {
  const today = new Date().toLocaleDateString("es-MX", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const capitalizedDate = today.charAt(0).toUpperCase() + today.slice(1);

  // Datos mock ---------------------------------------------------------
  const kpis = [
    { label: "Total proyectos", value: "12", tone: "neutral" },
    { label: "Activos", value: "4", tone: "success" },
    { label: "Completados/mes", value: "8", tone: "info" },
    { label: "Por verificar", value: "14", tone: "warning" },
    { label: "Con retraso", value: "2", tone: "danger" },
    { label: "Operadores online", value: "7/7", tone: "success" },
    { label: "Piezas hoy", value: "1,247", tone: "neutral", trend: "up" },
    { label: "Cumplimiento", value: "94%", tone: "success" },
  ];

  const proyectos = [
    { codigo: "P-001", nombre: "Display Temporada Verano", cliente: "PepsiCo", prioridad: "Alta", progreso: 65, estado: "Activo", fecha: "15 sep 2026", resp: "GR" },
    { codigo: "P-002", nombre: "Módulo Caja KFC Monterrey", cliente: "KFC", prioridad: "Media", progreso: 40, estado: "Activo", fecha: "22 sep 2026", resp: "OG" },
    { codigo: "P-003", nombre: "Rack Ropa Temporada", cliente: "Suburbia", prioridad: "Baja", progreso: 100, estado: "Completado", fecha: "20 ago 2026", resp: "GR" },
    { codigo: "P-004", nombre: "Isla Bolsos Premium", cliente: "Liverpool", prioridad: "Alta", progreso: 15, estado: "Activo", fecha: "30 sep 2026", resp: "OG" },
    { codigo: "P-005", nombre: "Exhibidor Snacks Ruta", cliente: "PepsiCo", prioridad: "Media", progreso: 8, estado: "Activo", fecha: "05 oct 2026", resp: "GR" },
    { codigo: "P-006", nombre: "Góndola Hardline Chedraui", cliente: "Chedraui", prioridad: "Alta", progreso: 72, estado: "Retraso", fecha: "10 sep 2026", resp: "OG" },
    { codigo: "P-007", nombre: "Vitrina Corner Boutique", cliente: "Suburbia", prioridad: "Baja", progreso: 45, estado: "Activo", fecha: "18 oct 2026", resp: "GR" },
    { codigo: "P-008", nombre: "Portagráficos Old Navy", cliente: "Old Navy", prioridad: "Media", progreso: 88, estado: "Activo", fecha: "12 sep 2026", resp: "OG" },
  ];

  const areas = [
    { nombre: "Corte de Tubo", ok: 5, proc: 3, pend: 2, util: 83 },
    { nombre: "Doblez", ok: 4, proc: 2, pend: 4, util: 60 },
    { nombre: "Corte de Lámina", ok: 6, proc: 1, pend: 1, util: 92 },
    { nombre: "Soldadura", ok: 3, proc: 4, pend: 3, util: 70 },
    { nombre: "Alambrón", ok: 7, proc: 0, pend: 1, util: 95 },
    { nombre: "Pintura", ok: 2, proc: 3, pend: 5, util: 45 },
    { nombre: "Empaque", ok: 8, proc: 1, pend: 0, util: 98 },
  ];

  const entregas = [
    { proyecto: "P-006 Góndola Hardline", cliente: "Chedraui", dias: -2, urgencia: "critica" },
    { proyecto: "P-008 Portagráficos", cliente: "Old Navy", dias: 3, urgencia: "alta" },
    { proyecto: "P-001 Display Verano", cliente: "PepsiCo", dias: 7, urgencia: "media" },
    { proyecto: "P-002 Módulo Caja", cliente: "KFC", dias: 14, urgencia: "baja" },
    { proyecto: "P-007 Vitrina Corner", cliente: "Suburbia", dias: 21, urgencia: "baja" },
  ];

  const topOperadores = [
    { nombre: "Juan M.", area: "Soldadura", piezas: 342, eficiencia: 98 },
    { nombre: "Erik A.", area: "Corte Tubo", piezas: 298, eficiencia: 95 },
    { nombre: "Luis P.", area: "Empaque", piezas: 285, eficiencia: 93 },
    { nombre: "María G.", area: "Pintura", piezas: 231, eficiencia: 91 },
    { nombre: "Carlos R.", area: "Doblez", piezas: 218, eficiencia: 88 },
  ];

  const alertas = [
    { tipo: "critica", mensaje: "Proyecto P-006 con 2 días de retraso", tiempo: "hace 15 min" },
    { tipo: "alta", mensaje: "Stock bajo de lámina C.14", tiempo: "hace 1 h" },
    { tipo: "media", mensaje: "5 actividades esperan verificación", tiempo: "hace 2 h" },
    { tipo: "info", mensaje: "Nuevo proyecto asignado a Corte Tubo", tiempo: "hace 3 h" },
    { tipo: "info", mensaje: "Reporte semanal disponible", tiempo: "hace 5 h" },
  ];

  return (
    <div className="space-y-6">
      {/* HEADER PRO --------------------------------------------------- */}
      <header className="sticky top-0 -mx-6 md:-mx-8 lg:-mx-10 px-6 md:px-8 lg:px-10 py-4 bg-[#2e2e2e] border-b border-white/[0.08] z-20">
        <div className="flex flex-col lg:flex-row lg:items-center gap-4">
          {/* Izquierda: título y breadcrumb */}
          <div className="min-w-0">
            <div className="flex items-center gap-1.5 text-xs text-white/50 mb-1">
              <span>Inicio</span>
              <ChevronRight className="w-3 h-3" />
              <span className="text-white/80">Dashboard</span>
            </div>
            <h1 className="text-xl font-bold tracking-tight">Dashboard</h1>
          </div>

          {/* Centro: búsqueda */}
          <div className="flex-1 max-w-xl lg:mx-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
              <input
                type="text"
                placeholder="Buscar proyectos, operadores, actividades..."
                className="w-full h-10 pl-10 pr-4 rounded-lg bg-white/[0.03] border border-white/[0.08] text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-[#E30613]/50 focus:bg-white/[0.05] transition-colors"
              />
            </div>
          </div>

          {/* Derecha: acciones */}
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 h-9 px-3 rounded-lg bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.08] text-xs font-medium text-white/80 transition-colors">
              <Calendar className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Últimos 7 días</span>
              <ChevronDown className="w-3 h-3 text-white/50" />
            </button>

            <button className="flex items-center gap-2 h-9 px-3 rounded-lg bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.08] text-xs font-medium text-white/80 transition-colors">
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Exportar</span>
            </button>

            <button className="relative h-9 w-9 rounded-lg bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.08] flex items-center justify-center text-white/80 transition-colors">
              <Bell className="w-4 h-4" />
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#E30613] text-[10px] font-bold text-white flex items-center justify-center animate-pulse">
                3
              </span>
            </button>

            <div className="flex items-center gap-2 pl-2 border-l border-white/[0.08]">
              <div className="w-9 h-9 rounded-full bg-[#E30613] flex items-center justify-center text-white font-bold text-sm">
                G
              </div>
              <div className="hidden md:block">
                <div className="text-xs font-semibold leading-tight">Ing. Gibrán</div>
                <div className="text-[10px] text-white/50">Administrador</div>
              </div>
              <ChevronDown className="w-3 h-3 text-white/50 hidden md:block" />
            </div>
          </div>
        </div>
      </header>

      {/* SALUDO + FECHA ---------------------------------------------- */}
      <section>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-400/15 mb-3">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs uppercase tracking-widest text-emerald-400 font-semibold">
            Sistema operativo
          </span>
        </div>
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white">
          Bienvenido de nuevo
        </h2>
        <p className="mt-1 text-sm text-white/60">{capitalizedDate}</p>
      </section>

      {/* STRIP DE KPIs ----------------------------------------------- */}
      <section className="rounded-xl border border-white/[0.08] bg-[#2e2e2e] overflow-hidden">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 divide-x divide-y md:divide-y-0 divide-white/[0.06]">
          {kpis.map((kpi, i) => (
            <div key={i} className="p-4 hover:bg-white/[0.02] transition-colors">
              <div className="text-[10px] uppercase tracking-widest text-white/50 font-medium mb-1.5">
                {kpi.label}
              </div>
              <div className="flex items-baseline gap-1.5">
                <div
                  className={`text-2xl font-bold tabular-nums ${
                    kpi.tone === "success" ? "text-emerald-400" :
                    kpi.tone === "warning" ? "text-amber-400" :
                    kpi.tone === "danger" ? "text-red-400" :
                    kpi.tone === "info" ? "text-blue-400" :
                    "text-white"
                  }`}
                >
                  {kpi.value}
                </div>
                {kpi.trend === "up" && (
                  <TrendingUp className="w-3 h-3 text-emerald-400" />
                )}
                {kpi.trend === "down" && (
                  <TrendingDown className="w-3 h-3 text-red-400" />
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* GRID PRINCIPAL ---------------------------------------------- */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* COLUMNA IZQUIERDA (2/3) */}
        <div className="lg:col-span-2 space-y-6">
          {/* TABLA PROYECTOS ACTIVOS */}
          <div className="rounded-xl border border-white/[0.08] bg-[#2e2e2e] overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-white/[0.08]">
              <div>
                <h3 className="text-sm font-semibold text-white">Proyectos activos</h3>
                <p className="text-xs text-white/50 mt-0.5">{proyectos.length} proyectos en curso</p>
              </div>
              <div className="flex items-center gap-2">
                <button className="text-xs text-white/60 hover:text-white transition-colors">Filtros</button>
                <button className="text-xs text-[#E30613] hover:text-[#c8050f] font-medium">Ver todos →</button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-[10px] uppercase tracking-widest text-white/40 font-semibold border-b border-white/[0.06]">
                    <th className="py-2.5 px-4">Código</th>
                    <th className="py-2.5 px-4">Proyecto</th>
                    <th className="py-2.5 px-4">Cliente</th>
                    <th className="py-2.5 px-4">Prioridad</th>
                    <th className="py-2.5 px-4">Progreso</th>
                    <th className="py-2.5 px-4">Estado</th>
                    <th className="py-2.5 px-4">Entrega</th>
                    <th className="py-2.5 px-4 text-center">Resp</th>
                    <th className="py-2.5 px-4"></th>
                  </tr>
                </thead>
                <tbody>
                  {proyectos.map((p, i) => (
                    <tr key={i} className="border-b border-white/[0.04] hover:bg-white/[0.03] transition-colors">
                      <td className="py-2.5 px-4 font-mono text-xs text-white/70">{p.codigo}</td>
                      <td className="py-2.5 px-4 font-medium text-white/90">{p.nombre}</td>
                      <td className="py-2.5 px-4 text-white/60 text-xs">{p.cliente}</td>
                      <td className="py-2.5 px-4">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wide ${
                          p.prioridad === "Alta" ? "bg-red-400/15 text-red-400" :
                          p.prioridad === "Media" ? "bg-amber-400/15 text-amber-400" :
                          "bg-blue-400/15 text-blue-400"
                        }`}>
                          {p.prioridad}
                        </span>
                      </td>
                      <td className="py-2.5 px-4">
                        <div className="flex items-center gap-2 min-w-[100px]">
                          <div className="flex-1 h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
                            <div
                              className={`h-full ${
                                p.progreso >= 70 ? "bg-emerald-400" :
                                p.progreso >= 30 ? "bg-amber-400" :
                                "bg-red-400"
                              }`}
                              style={{ width: `${p.progreso}%` }}
                            />
                          </div>
                          <span className="text-xs tabular-nums text-white/70 font-medium">{p.progreso}%</span>
                        </div>
                      </td>
                      <td className="py-2.5 px-4">
                        <span className={`inline-flex items-center gap-1.5 text-xs font-medium ${
                          p.estado === "Completado" ? "text-blue-400" :
                          p.estado === "Retraso" ? "text-red-400" :
                          "text-emerald-400"
                        }`}>
                          <div className={`w-1.5 h-1.5 rounded-full ${
                            p.estado === "Completado" ? "bg-blue-400" :
                            p.estado === "Retraso" ? "bg-red-400 animate-pulse" :
                            "bg-emerald-400"
                          }`} />
                          {p.estado}
                        </span>
                      </td>
                      <td className="py-2.5 px-4 text-xs text-white/60">{p.fecha}</td>
                      <td className="py-2.5 px-4 text-center">
                        <div className="inline-flex w-7 h-7 rounded-full bg-white/[0.08] items-center justify-center text-[10px] font-bold text-white/80">
                          {p.resp}
                        </div>
                      </td>
                      <td className="py-2.5 px-4 text-right">
                        <div className="flex items-center gap-1 justify-end">
                          <button className="p-1 rounded hover:bg-white/[0.08] text-white/50 hover:text-white transition-colors">
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                          <button className="p-1 rounded hover:bg-white/[0.08] text-white/50 hover:text-white transition-colors">
                            <Edit className="w-3.5 h-3.5" />
                          </button>
                          <button className="p-1 rounded hover:bg-white/[0.08] text-white/50 hover:text-white transition-colors">
                            <MoreHorizontal className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* ACTIVIDAD POR ÁREA */}
          <div className="rounded-xl border border-white/[0.08] bg-[#2e2e2e] p-4">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-semibold text-white">Actividad por área</h3>
                <p className="text-xs text-white/50 mt-0.5">Utilización de las 7 áreas de producción</p>
              </div>
              <div className="flex items-center gap-1 rounded-lg bg-white/[0.03] p-0.5">
                <button className="px-2.5 py-1 rounded text-xs font-medium bg-white/[0.08] text-white">Hoy</button>
                <button className="px-2.5 py-1 rounded text-xs font-medium text-white/50 hover:text-white transition-colors">Semana</button>
                <button className="px-2.5 py-1 rounded text-xs font-medium text-white/50 hover:text-white transition-colors">Mes</button>
              </div>
            </div>

            <div className="space-y-3">
              {areas.map((a, i) => {
                const total = a.ok + a.proc + a.pend;
                const okPct = (a.ok / total) * 100;
                const procPct = (a.proc / total) * 100;
                return (
                  <div key={i}>
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="text-xs font-medium text-white/90">{a.nombre}</div>
                      <div className="flex items-center gap-3 text-[10px] font-medium">
                        <span className="text-emerald-400">{a.ok} OK</span>
                        <span className="text-amber-400">{a.proc} PROC</span>
                        <span className="text-white/40">{a.pend} PEND</span>
                        <span className="text-white/70 tabular-nums w-8 text-right">{a.util}%</span>
                      </div>
                    </div>
                    <div className="h-1.5 rounded-full bg-white/[0.06] overflow-hidden flex">
                      <div className="bg-emerald-400" style={{ width: `${okPct}%` }} />
                      <div className="bg-amber-400" style={{ width: `${procPct}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex items-center gap-4 mt-4 pt-3 border-t border-white/[0.06] text-[10px] uppercase tracking-widest text-white/40 font-medium">
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-emerald-400" />
                Terminado
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-amber-400" />
                En proceso
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-white/40" />
                Pendiente
              </div>
            </div>
          </div>
        </div>

        {/* COLUMNA DERECHA (1/3) */}
        <div className="space-y-6">
          {/* PRÓXIMAS ENTREGAS */}
          <div className="rounded-xl border border-white/[0.08] bg-[#2e2e2e] p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-white/50" />
                Próximas entregas
              </h3>
              <span className="text-[10px] uppercase tracking-widest text-white/40 font-semibold">
                {entregas.length}
              </span>
            </div>
            <div className="space-y-2">
              {entregas.map((e, i) => (
                <div key={i} className="p-2.5 rounded-lg bg-white/[0.02] hover:bg-white/[0.05] border border-white/[0.04] transition-colors cursor-pointer">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <div className="text-xs font-medium text-white/90 truncate">{e.proyecto}</div>
                    <span className={`text-[10px] font-bold tabular-nums whitespace-nowrap ${
                      e.dias < 0 ? "text-red-400" :
                      e.dias <= 3 ? "text-amber-400" :
                      e.dias <= 7 ? "text-blue-400" :
                      "text-white/50"
                    }`}>
                      {e.dias < 0 ? `${Math.abs(e.dias)}d tarde` : `${e.dias}d`}
                    </span>
                  </div>
                  <div className="text-[11px] text-white/50">{e.cliente}</div>
                </div>
              ))}
            </div>
          </div>

          {/* TOP OPERADORES */}
          <div className="rounded-xl border border-white/[0.08] bg-[#2e2e2e] p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                <Users className="w-3.5 h-3.5 text-white/50" />
                Top operadores
              </h3>
              <span className="text-[10px] uppercase tracking-widest text-white/40 font-semibold">Semana</span>
            </div>
            <div className="space-y-2.5">
              {topOperadores.map((op, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-6 h-6 flex items-center justify-center text-[10px] font-bold text-white/40 tabular-nums">
                    #{i + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-medium text-white/90 truncate">{op.nombre}</div>
                    <div className="text-[10px] text-white/50">{op.area}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-bold tabular-nums text-white">{op.piezas}</div>
                    <div className="text-[10px] text-emerald-400 font-medium">{op.eficiencia}%</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ALERTAS */}
          <div className="rounded-xl border border-white/[0.08] bg-[#2e2e2e] p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                <AlertCircle className="w-3.5 h-3.5 text-white/50" />
                Alertas recientes
              </h3>
              <button className="text-[10px] text-[#E30613] hover:text-[#c8050f] font-medium uppercase tracking-wide">
                Ver todas
              </button>
            </div>
            <div className="space-y-2">
              {alertas.map((a, i) => (
                <div key={i} className={`p-2.5 rounded-lg border-l-2 ${
                  a.tipo === "critica" ? "bg-red-400/[0.05] border-red-400" :
                  a.tipo === "alta" ? "bg-amber-400/[0.05] border-amber-400" :
                  a.tipo === "media" ? "bg-blue-400/[0.05] border-blue-400" :
                  "bg-white/[0.02] border-white/20"
                }`}>
                  <div className="text-xs text-white/90 font-medium leading-tight">{a.mensaje}</div>
                  <div className="text-[10px] text-white/40 mt-1">{a.tiempo}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}