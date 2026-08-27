"use client";

import { TrendingUp, Package, Clock, Zap, CheckCircle2 } from "lucide-react";

export default function DashboardPage() {
  const today = new Date().toLocaleDateString("es-MX", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const capitalizedDate = today.charAt(0).toUpperCase() + today.slice(1);

  return (
    <div className="space-y-8">
      {/* Hero */}
      <section>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-400/15 mb-4">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs uppercase tracking-widest text-emerald-400 font-semibold">
            Sistema operativo
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-white">
          Bienvenido de nuevo
        </h1>
        <p className="mt-2 text-sm text-white/60">{capitalizedDate}</p>
      </section>

      {/* Stats cards */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={<Package className="w-5 h-5" />}
          label="Proyectos activos"
          value={0}
          trend="Sin datos"
          tone="neutral"
        />
        <StatCard
          icon={<Clock className="w-5 h-5" />}
          label="Actividades pendientes"
          value={0}
          trend="Sin datos"
          tone="warning"
        />
        <StatCard
          icon={<Zap className="w-5 h-5" />}
          label="En proceso"
          value={0}
          trend="Sin datos"
          tone="info"
        />
        <StatCard
          icon={<CheckCircle2 className="w-5 h-5" />}
          label="Terminadas hoy"
          value={0}
          trend="Sin datos"
          tone="success"
        />
      </section>

      {/* Placeholder para futuros módulos */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="rounded-xl border border-white/[0.08] bg-[#2e2e2e] p-8 text-center">
          <div className="w-12 h-12 rounded-lg bg-white/[0.05] flex items-center justify-center mx-auto mb-3">
            <Package className="w-6 h-6 text-white/40" />
          </div>
          <h3 className="text-sm font-semibold text-white mb-1">
            Proyectos recientes
          </h3>
          <p className="text-xs text-white/50">
            Sin datos aún. Los proyectos aparecerán aquí.
          </p>
        </div>

        <div className="rounded-xl border border-white/[0.08] bg-[#2e2e2e] p-8 text-center">
          <div className="w-12 h-12 rounded-lg bg-white/[0.05] flex items-center justify-center mx-auto mb-3">
            <TrendingUp className="w-6 h-6 text-white/40" />
          </div>
          <h3 className="text-sm font-semibold text-white mb-1">
            Actividad por área
          </h3>
          <p className="text-xs text-white/50">
            Sin datos aún. La actividad de las 7 áreas aparecerá aquí.
          </p>
        </div>
      </section>
    </div>
  );
}

// StatCard --------------------------------------------------------------

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: number;
  trend: string;
  tone: "neutral" | "warning" | "info" | "success";
}

function StatCard({ icon, label, value, trend, tone }: StatCardProps) {
  const toneClasses = {
    neutral: "text-white/70 bg-white/10",
    warning: "text-amber-400 bg-amber-400/15",
    info: "text-blue-400 bg-blue-400/15",
    success: "text-emerald-400 bg-emerald-400/15",
  };

  return (
    <div className="rounded-xl border border-white/[0.08] bg-[#2e2e2e] p-6 hover:bg-[#353535] transition-colors">
      <div className="flex items-start justify-between mb-4">
        <div
          className={`w-10 h-10 rounded-lg flex items-center justify-center ${toneClasses[tone]}`}
        >
          {icon}
        </div>
        <span className="text-xs text-white/40 font-medium">{trend}</span>
      </div>
      <div className="text-xs uppercase tracking-widest text-white/50 font-medium mb-2">
        {label}
      </div>
      <div className="text-4xl md:text-5xl font-bold tabular-nums text-white">
        {value}
      </div>
    </div>
  );
}