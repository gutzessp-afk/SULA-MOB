"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  Search,
  Folder,
  LayoutDashboard,
  CheckSquare,
  Users,
  ArrowRight,
  Plus,
  Clock,
  TrendingUp,
  AlertTriangle,
  Package,
  Bell,
  CalendarDays,
  Inbox,
} from "lucide-react";

/* ---------------------------------------------------------------- */
/* Notificaciones                                                    */
/* ---------------------------------------------------------------- */

type Notificacion = {
  id: number;
  codigo: string;
  proyecto: string;
  cliente: string;
  inicio: string;
  fin: string;
  tono: "red" | "amber" | "blue";
  leida?: boolean;
};

const notificaciones: Notificacion[] = [];

function fmtFecha(iso: string) {
  return new Intl.DateTimeFormat("es-MX", {
    day: "2-digit",
    month: "short",
  }).format(new Date(`${iso}T12:00:00`));
}

function diasRestantes(iso: string) {
  const hoy = new Date();
  hoy.setHours(0, 0, 0, 0);
  return Math.round(
    (new Date(`${iso}T12:00:00`).getTime() - hoy.getTime()) / 86_400_000
  );
}

function NotificacionesBell() {
  const [abierto, setAbierto] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const sinLeer = notificaciones.filter((n) => !n.leida).length;

  const barra: Record<Notificacion["tono"], string> = {
    red: "bg-red-500",
    amber: "bg-amber-500",
    blue: "bg-blue-500",
  };

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setAbierto(false);
      }
    }
    function onEsc(e: KeyboardEvent) {
      if (e.key === "Escape") setAbierto(false);
    }
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onEsc);
    };
  }, []);

  return (
    <div className="relative flex-shrink-0" ref={ref}>
      <button
        type="button"
        onClick={() => setAbierto((v) => !v)}
        aria-label="Notificaciones"
        aria-expanded={abierto}
        className="relative grid place-items-center w-[42px] h-[42px] bg-[#1c1c1c] border border-white/[0.1] rounded-xl text-white/50 hover:text-white hover:border-white/[0.2] focus:outline-none focus:ring-1 focus:ring-red-500/50 transition-colors"
      >
        <Bell className="w-4 h-4" />
        {sinLeer > 0 && (
          <span className="absolute -top-1 -right-1 grid place-items-center min-w-[18px] h-[18px] px-1 rounded-full bg-red-600 text-[10px] font-bold text-white ring-2 ring-[#141414]">
            {sinLeer}
          </span>
        )}
      </button>

      {abierto && (
        <div className="absolute right-0 mt-2 w-[340px] z-50 bg-[#1c1c1c] border border-white/[0.1] rounded-2xl shadow-2xl shadow-black/60 overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.06]">
            <h3 className="text-xs font-bold uppercase tracking-wider">
              Notificaciones
            </h3>
            <span className="text-[10px] text-white/40 font-medium">
              {sinLeer} sin leer
            </span>
          </div>

          {notificaciones.length === 0 ? (
            <div className="px-6 py-10 text-center">
              <Inbox className="w-7 h-7 mx-auto text-white/15 mb-3" />
              <p className="text-xs font-semibold text-white/50">
                Sin notificaciones
              </p>
              <p className="text-[11px] text-white/30 mt-1">
                Las alertas de entrega aparecerán aquí
              </p>
            </div>
          ) : (
            <div className="max-h-[360px] overflow-y-auto divide-y divide-white/[0.04]">
              {notificaciones.map((n) => {
                const dias = diasRestantes(n.fin);
                return (
                  <button
                    key={n.id}
                    type="button"
                    className="w-full flex gap-3 px-4 py-3.5 text-left hover:bg-white/[0.03] transition-colors"
                  >
                    <div
                      className={`w-1 rounded-full flex-shrink-0 ${barra[n.tono]}`}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-baseline justify-between gap-2">
                        <span className="text-xs font-bold truncate">
                          {n.codigo} · {n.proyecto}
                        </span>
                        <span
                          className={`text-[11px] font-bold whitespace-nowrap ${
                            dias < 0
                              ? "text-red-400"
                              : dias <= 3
                                ? "text-amber-400"
                                : "text-white/40"
                          }`}
                        >
                          {dias < 0 ? `${Math.abs(dias)}d tarde` : `${dias}d`}
                        </span>
                      </div>
                      <div className="text-[10px] text-white/40 mt-0.5">
                        {n.cliente}
                      </div>
                      <div className="flex items-center gap-1.5 mt-2 text-[11px] text-white/50 font-medium">
                        <CalendarDays className="w-3 h-3 text-white/25" />
                        {fmtFecha(n.inicio)}{" "}
                        <span className="text-white/25">→</span>{" "}
                        {fmtFecha(n.fin)}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          )}

          <Link
            href="/admin/alertas"
            className="flex items-center justify-center gap-1.5 w-full py-3 text-xs font-semibold text-white/50 hover:text-white bg-white/[0.02] hover:bg-white/[0.05] border-t border-white/[0.06] transition-colors"
          >
            Ver todas <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      )}
    </div>
  );
}

/* ---------------------------------------------------------------- */
/* Estado vacío reutilizable                                         */
/* ---------------------------------------------------------------- */

function Vacio({
  titulo,
  detalle,
  icono: Icono,
}: {
  titulo: string;
  detalle: string;
  icono: React.ElementType;
}) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-12 px-4">
      <Icono className="w-7 h-7 text-white/15 mb-3" />
      <p className="text-xs font-semibold text-white/50">{titulo}</p>
      <p className="text-[11px] text-white/30 mt-1 max-w-[220px]">{detalle}</p>
    </div>
  );
}

/* ---------------------------------------------------------------- */
/* Dashboard                                                         */
/* ---------------------------------------------------------------- */

type Actividad = {
  id: number;
  titulo: string;
  codigo: string;
  area: string;
  resp: string;
  estado: string;
  tono: string;
  tiempo: string;
};

type Entrega = {
  proy: string;
  cliente: string;
  dias: number;
  tono: string;
};

type Area = {
  area: string;
  tareas: number;
  estado: string;
  dot: string;
};

export default function DashboardPage() {
  const today = new Date().toLocaleDateString("es-MX", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const fecha = today.charAt(0).toUpperCase() + today.slice(1);

  const kpis = [
    { title: "Proyectos activos", value: "0", subtitle: "En producción", delta: "", icon: <Folder className="w-4 h-4" />, color: "red", href: "/admin/proyectos" },
    { title: "Actividades activas", value: "0", subtitle: "En proceso", delta: "", icon: <LayoutDashboard className="w-4 h-4" />, color: "blue", href: "/admin/actividades" },
    { title: "Requieren atención", value: "0", subtitle: "Pendientes", delta: "", icon: <CheckSquare className="w-4 h-4" />, color: "amber", href: "/admin/actividades" },
    { title: "Operadores activos", value: "0/0", subtitle: "Disponibles", delta: "", icon: <Users className="w-4 h-4" />, color: "emerald" },
  ];

  const actividades: Actividad[] = [];
  const entregas: Entrega[] = [];
  const areas: Area[] = [];

  const cumplimiento: number | null = null;
  const piezasHoy = 0;
  const enRiesgo = 0;

  const estadoTono: Record<string, string> = {
    blue: "bg-blue-500/15 text-blue-400 border border-blue-500/25",
    amber: "bg-amber-500/15 text-amber-400 border border-amber-500/25",
    emerald: "bg-emerald-500/15 text-emerald-400 border border-emerald-500/25",
  };
  const dotTono: Record<string, string> = {
    blue: "bg-blue-500",
    amber: "bg-amber-500",
    emerald: "bg-emerald-500",
  };

  return (
    <div className="w-full min-h-screen text-white">
      {/* Cabecera */}
      <header className="px-4 sm:px-6 lg:px-8 pt-6 lg:pt-8 pb-5 flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-white/[0.06]">
        <div>
          <div className="text-[11px] uppercase tracking-wider text-red-500 font-bold mb-1.5 flex items-center gap-2">
            <span>SULA MOB</span>
            <span className="text-white/20">/</span>
            <span className="text-white/50">Control operativo</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">Panel de administración</h1>
          <p className="text-xs text-white/40 mt-1">{fecha}</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative flex-1 lg:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
            <input
              type="text"
              placeholder="Buscar proyecto, cliente..."
              className="w-full pl-10 pr-4 py-2.5 bg-[#1c1c1c] border border-white/[0.1] rounded-xl text-xs outline-none focus:border-red-500/50 focus:ring-1 focus:ring-red-500/50 transition-all placeholder:text-white/30"
            />
          </div>
          <NotificacionesBell />
          <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2.5 rounded-xl transition-colors flex items-center gap-2 text-xs font-semibold whitespace-nowrap shadow-lg shadow-red-600/20">
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">Nuevo proyecto</span>
          </button>
        </div>
      </header>

      <div className="px-4 sm:px-6 lg:px-8 py-6 space-y-6 max-w-[1600px] mx-auto w-full">
        {/* KPIs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {kpis.map((kpi, i) => {
            const colors: Record<string, string> = {
              red: "text-red-500 bg-red-500/10 border-red-500/20",
              blue: "text-blue-400 bg-blue-500/10 border-blue-500/20",
              amber: "text-amber-400 bg-amber-500/10 border-amber-500/20",
              emerald: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
            };
            const card = (
              <div className="relative bg-gradient-to-br from-[#1e1e1e] to-[#161616] rounded-2xl p-5 border border-white/[0.08] flex flex-col justify-between h-36 overflow-hidden group hover:border-white/[0.18] hover:shadow-xl hover:shadow-black/40 transition-all duration-300">
                <div className="flex justify-between items-start">
                  <h3 className="text-[11px] font-medium text-white/40 tracking-wide uppercase">{kpi.title}</h3>
                  <div className={`p-2 rounded-xl border ${colors[kpi.color]}`}>{kpi.icon}</div>
                </div>
                <div>
                  <div className="text-4xl font-black tracking-tight leading-none mb-1.5 text-white/25">{kpi.value}</div>
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-white/40">{kpi.subtitle}</p>
                    {kpi.delta && <span className="text-[10px] font-semibold text-emerald-400">{kpi.delta}</span>}
                  </div>
                </div>
              </div>
            );
            return kpi.href ? <Link key={i} href={kpi.href}>{card}</Link> : <div key={i}>{card}</div>;
          })}
        </div>

        {/* Banda de resumen: Cumplimiento + Piezas + En riesgo */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Cumplimiento */}
          <div className="bg-[#1c1c1c] border border-white/[0.08] rounded-2xl p-5 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-4 h-4 text-white/25" />
                <span className="text-[11px] uppercase tracking-wider text-white/50 font-semibold">Cumplimiento</span>
              </div>
              {cumplimiento === null ? (
                <>
                  <div className="text-4xl font-black text-white/20">—</div>
                  <p className="text-[10px] text-white/30 font-medium mt-1">Sin datos del periodo</p>
                </>
              ) : (
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-black">{cumplimiento}</span>
                  <span className="text-xl font-bold text-white/50">%</span>
                </div>
              )}
            </div>
          </div>

          {/* Piezas hoy */}
          <div className="bg-[#1c1c1c] border border-white/[0.08] rounded-2xl p-5 flex items-center justify-between hover:border-white/[0.15] transition-colors">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Package className="w-4 h-4 text-white/25" />
                <span className="text-[11px] uppercase tracking-wider text-white/50 font-semibold">Piezas hoy</span>
              </div>
              <div className="text-4xl font-black text-white/25">{piezasHoy.toLocaleString("es-MX")}</div>
              <p className="text-[10px] text-white/30 font-medium mt-1">Sin registros hoy</p>
            </div>
          </div>

          {/* Proyectos en riesgo */}
          <Link href="/admin/alertas" className="bg-[#1c1c1c] border border-white/[0.08] rounded-2xl p-5 flex items-center justify-between hover:border-white/[0.15] transition-colors">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="w-4 h-4 text-white/25" />
                <span className="text-[11px] uppercase tracking-wider text-white/50 font-semibold">En riesgo</span>
              </div>
              <div className="text-4xl font-black text-white/25">{enRiesgo}</div>
              <p className="text-[10px] text-white/30 font-medium mt-1">Todo en orden</p>
            </div>
            <ArrowRight className="w-4 h-4 text-white/20" />
          </Link>
        </div>

        {/* Grid inferior: Actividad + Entregas + Áreas */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-4">
          {/* Actividad reciente */}
          <div className="xl:col-span-5 bg-[#1c1c1c] border border-white/[0.08] rounded-2xl p-5 lg:p-6">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 className="text-sm font-bold uppercase tracking-wider">Actividad reciente</h2>
                <p className="text-xs text-white/40 mt-0.5">Lo que sucede ahora</p>
              </div>
              <Link href="/admin/alertas" className="text-xs font-medium text-white/50 hover:text-white flex items-center gap-1 transition-colors">
                Ver todo <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
            {actividades.length === 0 ? (
              <Vacio
                icono={Clock}
                titulo="Sin actividad registrada"
                detalle="Cuando los operadores reporten avances, aparecerán aquí"
              />
            ) : (
              <div className="divide-y divide-white/[0.04]">
                {actividades.map((a) => (
                  <div key={a.id} className="py-3.5 flex items-start justify-between gap-3 first:pt-0 last:pb-0">
                    <div className="flex items-start gap-3 min-w-0">
                      <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${dotTono[a.tono]}`} />
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-xs font-bold">{a.titulo}</span>
                          <span className={`text-[10px] px-2 py-0.5 rounded font-semibold ${estadoTono[a.tono]}`}>{a.estado}</span>
                        </div>
                        <div className="text-[11px] text-white/40 mt-1 truncate">{a.codigo} · {a.resp}</div>
                      </div>
                    </div>
                    <span className="text-[11px] text-white/40 font-medium whitespace-nowrap flex items-center gap-1">
                      <Clock className="w-3 h-3" />{a.tiempo}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Próximas entregas */}
          <div className="xl:col-span-3 bg-[#1c1c1c] border border-white/[0.08] rounded-2xl p-5 lg:p-6">
            <div className="mb-5">
              <h2 className="text-sm font-bold uppercase tracking-wider">Próximas entregas</h2>
              <p className="text-xs text-white/40 mt-0.5">Ordenadas por urgencia</p>
            </div>
            {entregas.length === 0 ? (
              <Vacio
                icono={CalendarDays}
                titulo="Sin entregas programadas"
                detalle="Crea un proyecto para empezar a darle seguimiento"
              />
            ) : (
              <div className="space-y-3">
                {entregas.map((e, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-[#252525] border border-white/[0.04] hover:border-white/[0.1] transition-colors">
                    <div className={`w-1 h-9 rounded-full flex-shrink-0 ${
                      e.tono === "red" ? "bg-red-500" : e.tono === "amber" ? "bg-amber-500" : e.tono === "blue" ? "bg-blue-500" : "bg-white/20"
                    }`} />
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-semibold text-white truncate">{e.proy}</div>
                      <div className="text-[10px] text-white/40">{e.cliente}</div>
                    </div>
                    <span className={`text-xs font-bold whitespace-nowrap ${
                      e.dias < 0 ? "text-red-400" : e.dias <= 3 ? "text-amber-400" : e.dias <= 7 ? "text-blue-400" : "text-white/50"
                    }`}>
                      {e.dias < 0 ? `${Math.abs(e.dias)}d tarde` : `${e.dias}d`}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Estado operativo por área */}
          <div className="xl:col-span-4 bg-[#1c1c1c] border border-white/[0.08] rounded-2xl p-5 lg:p-6 flex flex-col">
            <div className="mb-5">
              <h2 className="text-sm font-bold uppercase tracking-wider">Estado operativo</h2>
              <p className="text-xs text-white/40 mt-0.5">Situación de las áreas</p>
            </div>
            {areas.length === 0 ? (
              <div className="flex-1 flex items-center justify-center">
                <Vacio
                  icono={LayoutDashboard}
                  titulo="Sin áreas configuradas"
                  detalle="Da de alta las áreas de producción para verlas aquí"
                />
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3 flex-1">
                {areas.map((item, i) => (
                  <div key={i} className="bg-[#252525] border border-white/[0.06] rounded-xl p-3.5 flex flex-col justify-between hover:border-white/[0.12] transition-colors">
                    <div className="flex justify-between items-start mb-3">
                      <span className="text-xs font-bold text-white/90 leading-tight">{item.area}</span>
                      <span className="text-lg font-black">{item.tareas}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className={`w-1.5 h-1.5 rounded-full ${item.dot}`} />
                      <span className="text-[10px] text-white/40 font-medium">{item.estado}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
            <Link href="/admin/calendario" className="w-full mt-4 py-2.5 text-xs font-semibold text-white/60 hover:text-white bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.08] rounded-xl transition-colors flex items-center justify-center gap-1.5">
              Ver todas las áreas <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
