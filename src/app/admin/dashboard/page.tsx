"use client";

import {
  Search,
  Bell,
  Download,
  Calendar,
  ChevronDown,
  ChevronRight,
  ArrowUpRight,
  ArrowDownRight,
  Circle,
  Layers,
  Activity,
  CheckCircle2,
  ClipboardCheck,
  AlertTriangle,
  Users,
  Package,
  Target,
} from "lucide-react";

export default function DashboardPage() {
  const today = new Date().toLocaleDateString("es-MX", {
    weekday: "short",
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  const now = new Date().toLocaleTimeString("es-MX", {
    hour: "2-digit",
    minute: "2-digit",
  });

  // ---------------------------------------------------------------------
  // Datos mock
  // ---------------------------------------------------------------------
  const kpis = [
    { label: "PROYECTOS", value: "12", delta: "+2", trend: "up", tone: "neutral", icon: Layers },
    { label: "ACTIVOS", value: "4", delta: "0", trend: "flat", tone: "blue", icon: Activity },
    { label: "COMPLETADOS", value: "8", delta: "+3", trend: "up", tone: "green", icon: CheckCircle2 },
    { label: "POR VERIFICAR", value: "14", delta: "+5", trend: "up", tone: "amber", icon: ClipboardCheck },
    { label: "CON RETRASO", value: "2", delta: "+1", trend: "up", tone: "red", icon: AlertTriangle },
    { label: "OPERADORES", value: "7/7", delta: "100%", trend: "flat", tone: "green", icon: Users },
    { label: "PIEZAS HOY", value: "1,247", delta: "+18%", trend: "up", tone: "neutral", icon: Package },
    { label: "CUMPLIMIENTO", value: "94%", delta: "+2%", trend: "up", tone: "green", icon: Target },
  ];

  const proyectos = [
    { codigo: "P-001", nombre: "Display Verano", cliente: "PepsiCo", prio: "A", prog: 65, estado: "ACT", entrega: "15 SEP", resp: "GR", cambio: "+5%" },
    { codigo: "P-002", nombre: "Caja KFC MTY", cliente: "KFC", prio: "M", prog: 40, estado: "ACT", entrega: "22 SEP", resp: "OG", cambio: "+2%" },
    { codigo: "P-003", nombre: "Rack Ropa Temp", cliente: "Suburbia", prio: "B", prog: 100, estado: "OK", entrega: "20 AGO", resp: "GR", cambio: "0%" },
    { codigo: "P-004", nombre: "Isla Bolsos Prem", cliente: "Liverpool", prio: "A", prog: 15, estado: "ACT", entrega: "30 SEP", resp: "OG", cambio: "+3%" },
    { codigo: "P-005", nombre: "Exhib Snacks", cliente: "PepsiCo", prio: "M", prog: 8, estado: "ACT", entrega: "05 OCT", resp: "GR", cambio: "+1%" },
    { codigo: "P-006", nombre: "Góndola Hardline", cliente: "Chedraui", prio: "A", prog: 72, estado: "DELAY", entrega: "10 SEP", resp: "OG", cambio: "-4%" },
    { codigo: "P-007", nombre: "Vitrina Corner", cliente: "Suburbia", prio: "B", prog: 45, estado: "ACT", entrega: "18 OCT", resp: "GR", cambio: "+7%" },
    { codigo: "P-008", nombre: "Portagráficos ON", cliente: "Old Navy", prio: "M", prog: 88, estado: "ACT", entrega: "12 SEP", resp: "OG", cambio: "+2%" },
  ];

  const areas = [
    { nombre: "Corte tubo", ok: 5, proc: 3, pend: 2, util: 83 },
    { nombre: "Doblez", ok: 4, proc: 2, pend: 4, util: 60 },
    { nombre: "Corte lámina", ok: 6, proc: 1, pend: 1, util: 92 },
    { nombre: "Soldadura", ok: 3, proc: 4, pend: 3, util: 70 },
    { nombre: "Alambrón", ok: 7, proc: 0, pend: 1, util: 95 },
    { nombre: "Pintura", ok: 2, proc: 3, pend: 5, util: 45 },
    { nombre: "Empaque", ok: 8, proc: 1, pend: 0, util: 98 },
  ];

  const entregas = [
    { proy: "P-006", cliente: "Chedraui", dias: -2, alert: "CRIT" },
    { proy: "P-008", cliente: "Old Navy", dias: 3, alert: "HIGH" },
    { proy: "P-001", cliente: "PepsiCo", dias: 7, alert: "MED" },
    { proy: "P-002", cliente: "KFC", dias: 14, alert: "LOW" },
    { proy: "P-007", cliente: "Suburbia", dias: 21, alert: "LOW" },
  ];

  const operadores = [
    { rank: 1, nombre: "Juan M.", area: "Soldadura", pzs: 342, ef: 98 },
    { rank: 2, nombre: "Erik A.", area: "Corte tubo", pzs: 298, ef: 95 },
    { rank: 3, nombre: "Luis P.", area: "Empaque", pzs: 285, ef: 93 },
    { rank: 4, nombre: "María G.", area: "Pintura", pzs: 231, ef: 91 },
    { rank: 5, nombre: "Carlos R.", area: "Doblez", pzs: 218, ef: 88 },
  ];

  const alertas = [
    { tipo: "CRIT", msg: "P-006 con 2 días de retraso", t: "15m" },
    { tipo: "HIGH", msg: "Stock bajo de lámina calibre 14", t: "1h" },
    { tipo: "MED", msg: "5 actividades esperan verificación", t: "2h" },
    { tipo: "INFO", msg: "Nuevo proyecto asignado a Corte Tubo", t: "3h" },
    { tipo: "INFO", msg: "Reporte semanal disponible", t: "5h" },
  ];

  // ---------------------------------------------------------------------
  // Helpers de tono
  // ---------------------------------------------------------------------
  const toneText: Record<string, string> = {
    neutral: "text-[#F4F5F7]",
    blue: "text-[#5B9BFF]",
    green: "text-[#2DD4A7]",
    amber: "text-[#F2B705]",
    red: "text-[#FF5A6E]",
  };
  const toneBg: Record<string, string> = {
    neutral: "bg-white/[0.06]",
    blue: "bg-[#5B9BFF]/[0.12]",
    green: "bg-[#2DD4A7]/[0.12]",
    amber: "bg-[#F2B705]/[0.12]",
    red: "bg-[#FF5A6E]/[0.12]",
  };
  const prioStyle: Record<string, string> = {
    A: "bg-[#FF5A6E]/[0.14] text-[#FF5A6E] border-[#FF5A6E]/30",
    M: "bg-[#F2B705]/[0.14] text-[#F2B705] border-[#F2B705]/30",
    B: "bg-[#5B9BFF]/[0.14] text-[#5B9BFF] border-[#5B9BFF]/30",
  };
  const estadoStyle: Record<string, string> = {
    ACT: "bg-[#5B9BFF]/[0.14] text-[#5B9BFF]",
    OK: "bg-[#2DD4A7]/[0.14] text-[#2DD4A7]",
    DELAY: "bg-[#FF5A6E]/[0.16] text-[#FF5A6E]",
  };
  const alertDot: Record<string, string> = {
    CRIT: "bg-[#FF5A6E]",
    HIGH: "bg-[#F2B705]",
    MED: "bg-[#5B9BFF]",
    LOW: "bg-white/25",
    INFO: "bg-white/25",
  };

  const card =
    "rounded-2xl border border-[#2A2D33] bg-[#17191D] shadow-[0_1px_0_0_rgba(255,255,255,0.03)_inset,0_12px_28px_-14px_rgba(0,0,0,0.65)] overflow-hidden";

  const hazardStripe = {
    backgroundImage:
      "repeating-linear-gradient(135deg, #E30613 0px, #E30613 14px, #17191D 14px, #17191D 28px)",
  };

  return (
    <div
      className="min-h-screen bg-[#0E0F11] text-[#F4F5F7]"
      style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@400;500;600;700&family=Inter:wght@400;500;600;700;800&family=IBM+Plex+Mono:wght@400;500;600&display=swap');
        .font-display { font-family: 'Oswald', sans-serif; }
        .font-data { font-family: 'IBM Plex Mono', ui-monospace, monospace; }
      `}</style>

      {/* franja de seguridad — elemento de firma, único en la página junto con las alertas críticas */}
      <div className="h-[5px] w-full" style={hazardStripe} />

      {/* HEADER --------------------------------------------------------- */}
      <header className="sticky top-0 z-30 border-b border-[#2A2D33] bg-[#0E0F11]/95 backdrop-blur">
        <div className="mx-auto max-w-[1600px] px-4 py-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-3">
            <div className="flex min-w-0 items-center gap-3">
              <div className="flex items-center gap-1.5 rounded-full border border-[#2DD4A7]/30 bg-[#2DD4A7]/10 px-2.5 py-1">
                <Circle className="h-1.5 w-1.5 animate-pulse fill-[#2DD4A7] text-[#2DD4A7]" />
                <span className="font-display text-[10px] font-semibold tracking-[0.15em] text-[#2DD4A7]">
                  EN VIVO
                </span>
              </div>
              <div className="hidden min-w-0 flex-col leading-tight sm:flex">
                <span className="font-display text-sm font-semibold tracking-wide text-[#F4F5F7]">
                  PISO DE PRODUCCIÓN
                </span>
                <span className="font-data text-[11px] text-[#62666F]">
                  {today.toUpperCase()} · {now}
                </span>
              </div>
            </div>

            <div className="hidden max-w-md flex-1 md:block">
              <div className="relative">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#62666F]" />
                <input
                  type="text"
                  placeholder="Buscar proyecto, cliente, área…"
                  className="h-9 w-full rounded-lg border border-[#2A2D33] bg-[#17191D] pl-9 pr-3 text-sm text-[#F4F5F7] placeholder:text-[#62666F] outline-none transition-colors focus:border-[#E30613]/60"
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button className="hidden h-9 items-center gap-1.5 rounded-lg border border-[#2A2D33] bg-[#17191D] px-3 text-xs font-medium text-[#9AA0AB] transition-colors hover:border-[#383B42] hover:text-[#F4F5F7] md:flex">
                <Calendar className="h-3.5 w-3.5" />
                Últimos 7 días
                <ChevronDown className="h-3 w-3" />
              </button>
              <button className="hidden h-9 items-center gap-1.5 rounded-lg border border-[#2A2D33] bg-[#17191D] px-3 text-xs font-medium text-[#9AA0AB] transition-colors hover:border-[#383B42] hover:text-[#F4F5F7] md:flex">
                <Download className="h-3.5 w-3.5" />
                Exportar
              </button>
              <button className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-[#2A2D33] bg-[#17191D] text-[#9AA0AB] transition-colors hover:border-[#383B42] hover:text-[#F4F5F7]">
                <Bell className="h-4 w-4" />
                <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#E30613] text-[9px] font-bold text-white">
                  3
                </span>
              </button>
              <div className="flex items-center gap-2 border-l border-[#2A2D33] pl-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#E30613] font-display text-sm font-bold text-white">
                  G
                </div>
                <div className="hidden leading-tight xl:block">
                  <div className="text-xs font-semibold text-[#F4F5F7]">Ing. Gibrán</div>
                  <div className="font-data text-[10px] text-[#62666F]">Administrador</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-[1600px] space-y-4 px-4 py-5 sm:px-6 lg:px-8">
        {/* KPIs -------------------------------------------------------- */}
        <section className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 2xl:grid-cols-8">
          {kpis.map((k, i) => {
            const Icon = k.icon;
            return (
              <div key={i} className={`${card} p-4`}>
                <div className={`mb-3 flex h-8 w-8 items-center justify-center rounded-lg ${toneBg[k.tone]}`}>
                  <Icon className={`h-4 w-4 ${toneText[k.tone]}`} />
                </div>
                <div className="font-display text-[11px] font-medium uppercase tracking-[0.1em] text-[#62666F]">
                  {k.label}
                </div>
                <div className="mt-1 font-display text-2xl font-semibold tabular-nums tracking-tight text-[#F4F5F7]">
                  {k.value}
                </div>
                <div
                  className={`mt-1.5 flex items-center gap-0.5 font-data text-[11px] font-medium ${
                    k.trend === "flat" ? "text-[#62666F]" : toneText[k.tone === "neutral" ? "green" : k.tone]
                  }`}
                >
                  {k.trend === "up" && <ArrowUpRight className="h-3 w-3" />}
                  {k.trend === "down" && <ArrowDownRight className="h-3 w-3" />}
                  {k.delta}
                </div>
              </div>
            );
          })}
        </section>

        {/* GRID PRINCIPAL ------------------------------------------------ */}
        <section className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          {/* COLUMNA IZQUIERDA */}
          <div className="space-y-4 lg:col-span-2">
            {/* PROYECTOS ACTIVOS */}
            <div className={card}>
              <div className="flex items-center justify-between border-b border-[#2A2D33] px-4 py-3.5 sm:px-5">
                <div className="flex items-center gap-2.5">
                  <div className="h-4 w-1 rounded-full bg-[#E30613]" />
                  <h3 className="font-display text-sm font-semibold tracking-wide text-[#F4F5F7]">
                    Proyectos activos
                  </h3>
                  <span className="font-data text-xs text-[#62666F]">({proyectos.length})</span>
                </div>
                <button className="flex items-center gap-1 font-display text-xs font-semibold tracking-wide text-[#E30613] hover:text-[#ff2f3e]">
                  Ver todos <ChevronRight className="h-3.5 w-3.5" />
                </button>
              </div>

              {/* Vista tabla — sm y superior */}
              <div className="hidden overflow-x-auto sm:block">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-[#2A2D33] text-left font-display text-[11px] uppercase tracking-wider text-[#62666F]">
                      <th className="px-5 py-2.5 font-medium">Código</th>
                      <th className="px-3 py-2.5 font-medium">Proyecto</th>
                      <th className="hidden px-3 py-2.5 font-medium md:table-cell">Cliente</th>
                      <th className="px-3 py-2.5 text-center font-medium">Prio</th>
                      <th className="px-3 py-2.5 font-medium">Progreso</th>
                      <th className="px-3 py-2.5 font-medium">Estado</th>
                      <th className="hidden px-3 py-2.5 font-medium lg:table-cell">Entrega</th>
                      <th className="hidden px-5 py-2.5 text-center font-medium md:table-cell">Resp</th>
                    </tr>
                  </thead>
                  <tbody>
                    {proyectos.map((p, i) => (
                      <tr
                        key={i}
                        className="border-b border-[#2A2D33]/70 transition-colors last:border-0 hover:bg-white/[0.02]"
                      >
                        <td className="px-5 py-3 font-data text-xs font-medium text-[#9AA0AB]">{p.codigo}</td>
                        <td className="whitespace-nowrap px-3 py-3 font-medium text-[#F4F5F7]">{p.nombre}</td>
                        <td className="hidden px-3 py-3 text-[#9AA0AB] md:table-cell">{p.cliente}</td>
                        <td className="px-3 py-3 text-center">
                          <span
                            className={`inline-flex h-6 w-6 items-center justify-center rounded-md border font-data text-[11px] font-semibold ${prioStyle[p.prio]}`}
                          >
                            {p.prio}
                          </span>
                        </td>
                        <td className="px-3 py-3">
                          <div className="flex min-w-[110px] items-center gap-2.5">
                            <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/[0.06]">
                              <div
                                className={`h-full rounded-full ${
                                  p.prog >= 70 ? "bg-[#2DD4A7]" : p.prog >= 30 ? "bg-[#F2B705]" : "bg-[#FF5A6E]"
                                }`}
                                style={{ width: `${p.prog}%` }}
                              />
                            </div>
                            <span className="w-9 text-right font-data text-xs font-medium text-[#9AA0AB]">
                              {p.prog}%
                            </span>
                          </div>
                        </td>
                        <td className="px-3 py-3">
                          <span
                            className={`inline-flex items-center rounded-md px-2 py-0.5 font-display text-[10px] font-semibold uppercase tracking-wider ${estadoStyle[p.estado]}`}
                          >
                            {p.estado === "ACT" ? "Activo" : p.estado === "OK" ? "Completado" : "Retraso"}
                          </span>
                        </td>
                        <td className="hidden px-3 py-3 font-data text-xs text-[#9AA0AB] lg:table-cell">
                          {p.entrega}
                        </td>
                        <td className="hidden px-5 py-3 text-center md:table-cell">
                          <div className="mx-auto flex h-7 w-7 items-center justify-center rounded-full bg-white/[0.06] font-data text-[10px] font-semibold text-[#9AA0AB]">
                            {p.resp}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Vista tarjetas — solo móvil */}
              <div className="divide-y divide-[#2A2D33]/70 sm:hidden">
                {proyectos.map((p, i) => (
                  <div key={i} className="px-4 py-3.5">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-data text-[11px] font-medium text-[#62666F]">{p.codigo}</span>
                          <span
                            className={`inline-flex h-5 w-5 items-center justify-center rounded border font-data text-[10px] font-semibold ${prioStyle[p.prio]}`}
                          >
                            {p.prio}
                          </span>
                        </div>
                        <div className="mt-0.5 truncate font-medium text-[#F4F5F7]">{p.nombre}</div>
                        <div className="text-xs text-[#62666F]">{p.cliente} · Entrega {p.entrega}</div>
                      </div>
                      <span
                        className={`shrink-0 rounded-md px-2 py-0.5 font-display text-[10px] font-semibold uppercase tracking-wider ${estadoStyle[p.estado]}`}
                      >
                        {p.estado === "ACT" ? "Activo" : p.estado === "OK" ? "Completado" : "Retraso"}
                      </span>
                    </div>
                    <div className="mt-2.5 flex items-center gap-2.5">
                      <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/[0.06]">
                        <div
                          className={`h-full rounded-full ${
                            p.prog >= 70 ? "bg-[#2DD4A7]" : p.prog >= 30 ? "bg-[#F2B705]" : "bg-[#FF5A6E]"
                          }`}
                          style={{ width: `${p.prog}%` }}
                        />
                      </div>
                      <span className="font-data text-xs font-medium text-[#9AA0AB]">{p.prog}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ACTIVIDAD POR ÁREA */}
            <div className={card}>
              <div className="flex items-center justify-between border-b border-[#2A2D33] px-4 py-3.5 sm:px-5">
                <div className="flex items-center gap-2.5">
                  <div className="h-4 w-1 rounded-full bg-[#5B9BFF]" />
                  <h3 className="font-display text-sm font-semibold tracking-wide text-[#F4F5F7]">
                    Actividad por área
                  </h3>
                </div>
                <div className="flex items-center gap-1 rounded-lg border border-[#2A2D33] bg-[#0E0F11] p-0.5">
                  {["Hoy", "7D", "30D"].map((t, i) => (
                    <button
                      key={t}
                      className={`rounded-md px-2.5 py-1 font-display text-[11px] font-semibold tracking-wide transition-colors ${
                        i === 0 ? "bg-white/[0.08] text-[#F4F5F7]" : "text-[#62666F] hover:text-[#9AA0AB]"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
              <div className="space-y-3.5 p-4 sm:p-5">
                {areas.map((a, i) => {
                  const total = a.ok + a.proc + a.pend;
                  const okPct = (a.ok / total) * 100;
                  const procPct = (a.proc / total) * 100;
                  return (
                    <div key={i} className="grid grid-cols-[92px_1fr_auto] items-center gap-3 sm:grid-cols-[120px_1fr_auto]">
                      <div className="truncate text-xs font-medium text-[#9AA0AB]">{a.nombre}</div>
                      <div className="flex h-2 overflow-hidden rounded-full bg-white/[0.06]">
                        <div className="bg-[#2DD4A7]" style={{ width: `${okPct}%` }} />
                        <div className="bg-[#F2B705]" style={{ width: `${procPct}%` }} />
                      </div>
                      <div className="font-data text-xs font-semibold tabular-nums text-[#F4F5F7]">{a.util}%</div>
                    </div>
                  );
                })}
                <div className="flex items-center gap-4 border-t border-[#2A2D33] pt-3 font-data text-[11px] text-[#62666F]">
                  <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-[#2DD4A7]" /> Completado</span>
                  <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-[#F2B705]" /> En proceso</span>
                  <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-white/[0.15]" /> Pendiente</span>
                </div>
              </div>
            </div>
          </div>

          {/* COLUMNA DERECHA */}
          <div className="space-y-4">
            {/* PRÓXIMAS ENTREGAS */}
            <div className={card}>
              <div className="flex items-center justify-between border-b border-[#2A2D33] px-4 py-3.5 sm:px-5">
                <div className="flex items-center gap-2.5">
                  <div className="h-4 w-1 rounded-full bg-[#F2B705]" />
                  <h3 className="font-display text-sm font-semibold tracking-wide text-[#F4F5F7]">
                    Próximas entregas
                  </h3>
                </div>
                <span className="font-data text-xs text-[#62666F]">{entregas.length}</span>
              </div>
              <div className="divide-y divide-[#2A2D33]/70">
                {entregas.map((e, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between gap-3 px-4 py-3 transition-colors hover:bg-white/[0.02] sm:px-5"
                  >
                    <div className="flex min-w-0 items-center gap-3">
                      <span className={`h-8 w-1 rounded-full ${alertDot[e.alert]}`} />
                      <div className="min-w-0">
                        <div className="font-data text-xs font-semibold text-[#F4F5F7]">{e.proy}</div>
                        <div className="truncate text-xs text-[#62666F]">{e.cliente}</div>
                      </div>
                    </div>
                    <div
                      className={`shrink-0 font-data text-sm font-semibold tabular-nums ${
                        e.dias < 0 ? "text-[#FF5A6E]" : e.dias <= 3 ? "text-[#F2B705]" : e.dias <= 7 ? "text-[#5B9BFF]" : "text-[#62666F]"
                      }`}
                    >
                      {e.dias < 0 ? `${Math.abs(e.dias)}d tarde` : `${e.dias}d`}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* TOP OPERADORES */}
            <div className={card}>
              <div className="flex items-center justify-between border-b border-[#2A2D33] px-4 py-3.5 sm:px-5">
                <div className="flex items-center gap-2.5">
                  <div className="h-4 w-1 rounded-full bg-[#2DD4A7]" />
                  <h3 className="font-display text-sm font-semibold tracking-wide text-[#F4F5F7]">
                    Top operadores
                  </h3>
                </div>
                <span className="font-display text-[11px] font-medium tracking-wide text-[#62666F]">SEMANA</span>
              </div>
              <div className="divide-y divide-[#2A2D33]/70">
                {operadores.map((op) => (
                  <div key={op.rank} className="flex items-center gap-3 px-4 py-3 transition-colors hover:bg-white/[0.02] sm:px-5">
                    <div
                      className={`font-display w-5 text-sm font-bold ${
                        op.rank === 1 ? "text-[#F2B705]" : op.rank === 2 ? "text-[#9AA0AB]" : op.rank === 3 ? "text-[#C77B3E]" : "text-[#62666F]"
                      }`}
                    >
                      {op.rank}
                    </div>
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/[0.06] text-xs font-semibold text-[#F4F5F7]">
                      {op.nombre.split(" ")[0][0]}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="truncate text-sm font-medium text-[#F4F5F7]">{op.nombre}</div>
                      <div className="text-xs text-[#62666F]">{op.area}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-data text-sm font-semibold tabular-nums text-[#F4F5F7]">{op.pzs}</div>
                      <div className="font-data text-[11px] font-medium text-[#2DD4A7]">{op.ef}%</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ALERTAS */}
            <div className={card}>
              <div className="flex items-center justify-between border-b border-[#2A2D33] px-4 py-3.5 sm:px-5">
                <div className="flex items-center gap-2.5">
                  <div className="h-4 w-1 rounded-full bg-[#FF5A6E]" />
                  <h3 className="font-display text-sm font-semibold tracking-wide text-[#F4F5F7]">Alertas</h3>
                </div>
                <span className="font-data text-xs text-[#62666F]">{alertas.length}</span>
              </div>
              <div className="divide-y divide-[#2A2D33]/70">
                {alertas.map((a, i) => (
                  <div key={i} className="relative px-4 py-3 pl-5 transition-colors hover:bg-white/[0.02] sm:px-5 sm:pl-6">
                    <span
                      className="absolute left-0 top-0 h-full w-1"
                      style={a.tipo === "CRIT" ? hazardStripe : undefined}
                    />
                    {a.tipo !== "CRIT" && (
                      <span className={`absolute left-0 top-0 h-full w-1 ${alertDot[a.tipo]}`} />
                    )}
                    <div className="flex items-center gap-2">
                      <span
                        className={`rounded px-1.5 py-0.5 font-display text-[10px] font-bold tracking-wide ${
                          a.tipo === "CRIT" ? "bg-[#FF5A6E]/15 text-[#FF5A6E]" :
                          a.tipo === "HIGH" ? "bg-[#F2B705]/15 text-[#F2B705]" :
                          a.tipo === "MED" ? "bg-[#5B9BFF]/15 text-[#5B9BFF]" :
                          "bg-white/[0.08] text-[#62666F]"
                        }`}
                      >
                        {a.tipo}
                      </span>
                      <span className="font-data text-[11px] text-[#62666F]">hace {a.t}</span>
                    </div>
                    <div className="mt-1 text-sm leading-snug text-[#D8DAE0]">{a.msg}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}