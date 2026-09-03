"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import {
  LayoutDashboard,
  Package,
  CheckSquare,
  BarChart3,
  Settings,
  Calendar,
  Bell,
  LogOut,
  ChevronRight,
  X,
} from "lucide-react";

import { getSession, clearSession } from "@/lib/auth";

const menuItems = [
  {
    label: "Dashboard",
    href: "/admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Proyectos",
    href: "/admin/proyectos",
    icon: Package,
  },
  {
    label: "Actividades",
    href: "/admin/actividades",
    icon: CheckSquare,
  },
  {
    label: "Reportes",
    href: "/admin/reportes",
    icon: BarChart3,
  },
  {
    label: "Calendario",
    href: "/admin/calendario",
    icon: Calendar,
  },
  {
    label: "Alertas",
    href: "/admin/alertas",
    icon: Bell,
  },
  {
    label: "Configuración",
    href: "/admin/configuracion",
    icon: Settings,
  },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);

  const user = getSession();

  const handleLogout = () => {
    clearSession();
    router.push("/login");
  };

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (event.clientX <= 8 && window.innerWidth >= 1024) {
        setIsOpen(true);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <>
      {/* Zona invisible para abrir el sidebar */}
      <div
        className="fixed left-0 top-0 z-[60] hidden h-screen w-3 lg:block"
        onMouseEnter={() => setIsOpen(true)}
      />

      {/* Botón móvil */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed left-4 top-4 z-[70] flex h-11 w-11 items-center justify-center rounded-xl bg-[#E30613] text-white shadow-xl shadow-red-950/40 transition hover:bg-[#c8050f] lg:hidden"
        aria-label="Abrir menú"
      >
        <div className="flex flex-col gap-1">
          <span className="h-0.5 w-5 rounded bg-white" />
          <span className="h-0.5 w-5 rounded bg-white" />
          <span className="h-0.5 w-5 rounded bg-white" />
        </div>
      </button>

      {/* Overlay móvil */}
      {isOpen && (
        <div
          className="fixed inset-0 z-[55] bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        onMouseLeave={() => {
          if (window.innerWidth >= 1024) {
            setIsOpen(false);
          }
        }}
        className={`
          fixed left-0 top-0 z-[65]
          flex h-screen w-[270px] flex-col
          border-r border-white/[0.08]
          bg-[#242424]
          shadow-2xl shadow-black/40
          transition-transform duration-300 ease-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Header */}
        <div className="flex h-[100px] shrink-0 items-center justify-between border-b border-white/[0.07] px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-xl bg-white/5">
              <img
                src="/logo-sula-mob.png"
                alt="SULA MOB"
                className="h-9 w-auto object-contain"
              />
            </div>

            <div>
              <p className="text-sm font-bold tracking-wide text-white">
                SULA MOB
              </p>

              <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/35">
                SULA MTI
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsOpen(false)}
            className="rounded-lg p-2 text-white/30 transition hover:bg-white/5 hover:text-white lg:hidden"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Navegación */}
        <nav className="flex-1 overflow-y-auto px-4 py-6">
          <div className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[0.2em] text-white/30">
            Administración
          </div>

          <div className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;

              const active =
                pathname === item.href ||
                pathname.startsWith(`${item.href}/`);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`
                    group flex items-center gap-3 rounded-xl px-3 py-3
                    text-sm font-medium
                    transition-all duration-200
                    ${
                      active
                        ? "bg-[#E30613]/12 text-white"
                        : "text-white/55 hover:bg-white/[0.045] hover:text-white"
                    }
                  `}
                >
                  <div
                    className={`
                      flex h-9 w-9 shrink-0 items-center justify-center rounded-lg
                      transition
                      ${
                        active
                          ? "bg-[#E30613] text-white shadow-lg shadow-red-950/30"
                          : "bg-white/[0.035] text-white/45 group-hover:bg-white/[0.07] group-hover:text-white"
                      }
                    `}
                  >
                    <Icon className="h-[17px] w-[17px]" />
                  </div>

                  <span className="flex-1">{item.label}</span>

                  {active && (
                    <ChevronRight className="h-4 w-4 text-[#E30613]" />
                  )}
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Usuario */}
        <div className="shrink-0 border-t border-white/[0.07] p-4">
          <div className="mb-3 flex items-center gap-3 rounded-xl bg-white/[0.035] p-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#E30613] text-sm font-bold text-white">
              {user?.name?.charAt(0)?.toUpperCase() || "A"}
            </div>

            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-white">
                {user?.name || "Administrador"}
              </p>

              <p className="mt-0.5 text-[11px] text-white/40">
                {user?.role === "admin" ? "Administrador" : "Operador"}
              </p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-white/45 transition hover:bg-red-500/10 hover:text-red-400"
          >
            <LogOut className="h-4 w-4" />
            Cerrar sesión
          </button>
        </div>
      </aside>
    </>
  );
}