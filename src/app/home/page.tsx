"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  TrendingUp,
  Package,
  CheckCircle2,
  Clock,
  AlertTriangle,
  ArrowRight,
  Calendar,
  Zap,
} from "lucide-react";
import { getSession, clearSession } from "@/lib/auth";
import type { MockUser } from "@/lib/mock-users";

export default function HomePage() {
  const router = useRouter();
  const [user, setUser] = useState<MockUser | null>(null);
  const [count, setCount] = useState(9135);

  useEffect(() => {
    const s = getSession();
    if (!s) {
      router.push("/login");
      return;
    }
    setUser(s);
  }, [router]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((c) => c + Math.floor(Math.random() * 3) + 1);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  if (!user) return null;

  const handleLogout = () => {
    clearSession();
    router.push("/login");
  };

  const dashboardHref =
    user.role === "admin" ? "/admin/dashboard" : "/operator/dashboard";

  return (
    <div className="min-h-screen bg-[#242424] text-white">
      {/* Header sticky */}
      <header className="border-b border-white/[0.08] bg-[#2e2e2e] sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src="/logo-sula-mob.png"
              alt="SULA MOB"
              className="h-16 w-auto"
            />
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <div className="text-sm font-semibold">{user.name}</div>
              <div className="text-xs text-white/60 capitalize">
                {user.role === "admin" ? "Administrador" : `Operador · ${user.area}`}
              </div>
            </div>
            <Link
              href={dashboardHref}
              className="hidden md:flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/15 border border-white/10 text-sm font-medium transition-colors"
            >
              Ir al panel
              <ArrowRight className="w-4 h-4" />
            </Link>
            <button
              onClick={handleLogout}
              className="text-sm text-white/70 hover:text-white transition-colors"
            >
              Salir
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 md:px-10 py-10 md:py-16">
        {/* Hero */}
        <section className="mb-12">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-1.5 h-1.5 rounded-full bg-[#E30613] animate-pulse" />
            <span className="text-xs uppercase tracking-widest text-[#E30613] font-semibold">
              En operación
            </span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight leading-tight">
            Bienvenido de vuelta,
            <br />
            <span className="text-white/60">
              {user.name.split(" ")[0] || user.name}.
            </span>
          </h1>
          <p className="mt-4 text-base md:text-lg text-white/60 max-w-2xl">
            Panel de control de producción SULA MOB × PepsiCo. Toda la
            operación en tiempo real.
          </p>
        </section>

        {/* Contador principal grande */}
        <section className="mb-12">
          <div
            className="relative overflow-hidden rounded-2xl p-8 md:p-12 border border-white/[0.1]"
            style={{
              background:
                "linear-gradient(135deg, rgba(227,6,19,0.18) 0%, rgba(58,58,58,0.6) 40%, rgba(46,46,46,1) 100%)",
            }}
          >
            <div
              className="absolute -top-20 -right-20 w-64 h-64 rounded-full blur-3xl opacity-30"
              style={{ background: "#E30613" }}
            />

            <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-8">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <TrendingUp className="w-4 h-4 text-[#E30613]" />
                  <span className="text-xs uppercase tracking-widest text-white/70 font-semibold">
                    Contador en vivo
                  </span>
                </div>
                <div className="text-sm text-white/60 mb-2">
                  Productos fabricados totales
                </div>
                <div className="text-6xl md:text-8xl font-bold tracking-tight tabular-nums">
                  {count.toLocaleString("es-MX")}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6 md:gap-8 md:border-l md:border-white/[0.12] md:pl-8">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Package className="w-4 h-4 text-white/50" />
                    <span className="text-xs uppercase tracking-widest text-white/60 font-medium">
                      Proyectos
                    </span>
                  </div>
                  <div className="text-3xl md:text-4xl font-bold">10</div>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="w-4 h-4 text-white/50" />
                    <span className="text-xs uppercase tracking-widest text-white/60 font-medium">
                      Meses con PepsiCo
                    </span>
                  </div>
                  <div className="text-3xl md:text-4xl font-bold">8</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Grid de métricas operativas */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold mb-5 text-white/90">
            Estado de la operación
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <MetricCard
              icon={<Package className="w-5 h-5" />}
              label="Proyectos activos"
              value={0}
              tone="neutral"
            />
            <MetricCard
              icon={<Clock className="w-5 h-5" />}
              label="Pendientes"
              value={0}
              tone="warning"
            />
            <MetricCard
              icon={<Zap className="w-5 h-5" />}
              label="En proceso"
              value={0}
              tone="info"
            />
            <MetricCard
              icon={<CheckCircle2 className="w-5 h-5" />}
              label="Terminadas hoy"
              value={0}
              tone="success"
            />
          </div>
        </section>

        {/* Acciones rápidas */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold mb-5 text-white/90">
            Accesos rápidos
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <QuickAction
              href={dashboardHref}
              icon={<TrendingUp className="w-5 h-5" />}
              title="Ir al panel"
              description={
                user.role === "admin"
                  ? "Panel de administración con todos los proyectos"
                  : `Mis actividades del área ${user.area}`
              }
            />
            {user.role === "admin" && (
              <QuickAction
                href="/admin/proyectos"
                icon={<Package className="w-5 h-5" />}
                title="Gestionar proyectos"
                description="Crear, editar y asignar áreas a proyectos"
              />
            )}
            <QuickAction
              href={dashboardHref}
              icon={<AlertTriangle className="w-5 h-5" />}
              title="Pendientes de verificar"
              description="Actividades esperando revisión del admin"
            />
          </div>
        </section>

        <footer className="pt-8 border-t border-white/[0.08] text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-white/50">
            Calidad · Confianza · Innovación
          </p>
          <p className="text-xs text-white/40 mt-2">
            SULA MOB × PepsiCo · 2026
          </p>
        </footer>
      </main>
    </div>
  );
}

interface MetricCardProps {
  icon: React.ReactNode;
  label: string;
  value: number;
  tone: "neutral" | "warning" | "info" | "success";
}

function MetricCard({ icon, label, value, tone }: MetricCardProps) {
  const toneClasses = {
    neutral: "text-white/70 bg-white/10",
    warning: "text-amber-400 bg-amber-400/15",
    info: "text-blue-400 bg-blue-400/15",
    success: "text-emerald-400 bg-emerald-400/15",
  };

  return (
    <div className="rounded-xl border border-white/[0.1] bg-[#2e2e2e] p-5 hover:bg-[#353535] transition-colors">
      <div
        className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 ${toneClasses[tone]}`}
      >
        {icon}
      </div>
      <div className="text-3xl md:text-4xl font-bold tabular-nums mb-1">
        {value}
      </div>
      <div className="text-xs uppercase tracking-wider text-white/60 font-medium">
        {label}
      </div>
    </div>
  );
}

interface QuickActionProps {
  href: string;
  icon: React.ReactNode;
  title: string;
  description: string;
}

function QuickAction({ href, icon, title, description }: QuickActionProps) {
  return (
    <Link
      href={href}
      className="group rounded-xl border border-white/[0.1] bg-[#2e2e2e] p-5 hover:bg-[#353535] hover:border-white/[0.15] transition-all"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="w-10 h-10 rounded-lg bg-[#E30613]/15 border border-[#E30613]/30 flex items-center justify-center text-[#E30613]">
          {icon}
        </div>
        <ArrowRight className="w-4 h-4 text-white/40 group-hover:text-[#E30613] group-hover:translate-x-1 transition-all" />
      </div>
      <div className="text-base font-semibold text-white mb-1">{title}</div>
      <div className="text-sm text-white/60 leading-relaxed">{description}</div>
    </Link>
  );
}