"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  CheckSquare,
  BarChart3,
  Settings,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { getSession, clearSession } from "@/lib/auth";

const menuItems = [
  { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { label: "Proyectos", href: "/admin/proyectos", icon: Package },
  { label: "Actividades", href: "/admin/actividades", icon: CheckSquare },
  { label: "Reportes", href: "/admin/reportes", icon: BarChart3 },
  { label: "Configuración", href: "/admin/configuracion", icon: Settings },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(true);
  const user = getSession();

  const handleLogout = () => {
    clearSession();
    router.push("/login");
  };

  return (
    <>
      {/* Botón toggle — siempre visible arriba a la izquierda */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 w-10 h-10 rounded-lg bg-[#2e2e2e] border border-white/[0.08] hover:bg-[#353535] flex items-center justify-center text-white transition-colors"
        aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
      >
        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Overlay oscuro cuando está abierta */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-screen w-64 bg-[#2e2e2e] border-r border-white/[0.06] z-40 flex flex-col transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header con logo */}
        <div className="p-6 border-b border-white/[0.06] flex flex-col items-center">
          <img
            src="/logo-sula-mob.png"
            alt="SULA MOB"
            className="h-16 w-auto mb-2"
          />
          <span className="text-sm font-semibold text-white/80 tracking-wider">
            SULA MOB
          </span>
        </div>

        {/* Menú */}
        <nav className="flex-1 p-4 overflow-y-auto">
          <div className="text-xs uppercase tracking-widest text-white/40 font-semibold mb-3 px-3">
            General
          </div>
          <ul className="space-y-1">
            {menuItems.map((item) => {
              const active = pathname.startsWith(item.href);
              const Icon = item.icon;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                      active
                        ? "bg-[#E30613]/15 text-[#E30613] border-l-2 border-[#E30613] pl-[10px]"
                        : "text-white/70 hover:bg-white/[0.05] hover:text-white"
                    }`}
                  >
                    <Icon className="w-4 h-4 flex-shrink-0" />
                    <span>{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Footer con usuario */}
        <div className="border-t border-white/[0.06] p-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-[#E30613] flex items-center justify-center text-white font-bold text-sm">
              {user?.name?.charAt(0) || "A"}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-semibold text-white truncate">
                {user?.name || "Administrador"}
              </div>
              <div className="text-xs text-white/50 capitalize">
                {user?.role === "admin" ? "Administrador" : "Operador"}
              </div>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-white/70 hover:bg-white/[0.05] hover:text-white transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Cerrar sesión</span>
          </button>
        </div>
      </aside>
    </>
  );
}