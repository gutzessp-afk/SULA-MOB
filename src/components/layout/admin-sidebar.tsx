"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, FolderKanban, ListChecks, BarChart3, Settings, LogOut, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { clearSession, getSession } from "@/lib/auth";
import { Button } from "@/components/ui/button";

const navItems = [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/proyectos", label: "Proyectos", icon: FolderKanban },
  { href: "/admin/actividades", label: "Actividades", icon: ListChecks },
  { href: "/admin/reportes", label: "Reportes", icon: BarChart3 },
  { href: "/admin/configuracion", label: "Configuración", icon: Settings },
];

interface AdminSidebarProps {
  open: boolean;
  onClose: () => void;
}

export function AdminSidebar({ open, onClose }: AdminSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const user = getSession();

  const initials = user?.name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase() ?? "A";

  function handleLogout() {
    clearSession();
    router.push("/login");
  }

  const sidebarContent = (
    <div className="flex flex-col h-full bg-[#2e2e2e]">
      {/* Logo */}
      <div className="flex items-center justify-between px-5 py-5 border-b border-white/[0.06]">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#E30613] flex items-center justify-center shrink-0">
            <span className="font-bold text-white text-sm leading-none">S</span>
          </div>
          <span className="font-semibold text-white tracking-tight">SULA MOB</span>
        </div>
        <button
          onClick={onClose}
          className="md:hidden text-white/40 hover:text-white transition-colors"
          aria-label="Cerrar menú"
        >
          <X size={18} />
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-0.5" aria-label="Navegación principal">
        <p className="px-3 mb-2 text-[10px] uppercase tracking-widest text-white/30 font-medium">
          General
        </p>
        {navItems.map(({ href, label, icon: Icon }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              onClick={onClose}
              className={cn(
                "relative flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors duration-150",
                active
                  ? "bg-[#E30613]/12 text-white"
                  : "text-white/50 hover:text-white hover:bg-white/[0.05]"
              )}
            >
              {active && (
                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-[2px] h-5 bg-[#E30613] rounded-r-full" />
              )}
              <Icon
                size={18}
                className={active ? "text-[#E30613]" : "text-white/40"}
              />
              {label}
            </Link>
          );
        })}
      </nav>

      {/* User section */}
      <div className="px-3 pb-4 border-t border-white/[0.06] pt-4">
        <div className="flex items-center gap-3 px-3 mb-3">
          <div className="w-8 h-8 rounded-full bg-[#E30613]/20 flex items-center justify-center shrink-0">
            <span className="text-[11px] font-semibold text-[#E30613]">{initials}</span>
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold text-white truncate">{user?.name ?? "Admin"}</p>
            <p className="text-[11px] text-white/40">Administrador</p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleLogout}
          className="w-full justify-start gap-2.5 text-white/40 hover:text-white hover:bg-white/[0.05] px-3 h-9"
        >
          <LogOut size={15} />
          <span className="text-sm">Cerrar sesión</span>
        </Button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop */}
      <aside className="hidden md:flex flex-col w-[240px] shrink-0 border-r border-white/[0.06]">
        {sidebarContent}
      </aside>

      {/* Mobile overlay */}
      {open && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />
          <aside className="relative flex flex-col w-[240px] border-r border-white/[0.06] z-10">
            {sidebarContent}
          </aside>
        </div>
      )}
    </>
  );
}
