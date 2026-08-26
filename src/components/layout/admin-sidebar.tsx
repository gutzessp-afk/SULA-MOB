"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, FolderKanban, ListChecks, BarChart3, Settings, LogOut, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { clearSession, getSession } from "@/lib/auth";
import { SulaMobLogo } from "./logo";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

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

  function handleLogout() {
    clearSession();
    router.push("/login");
  }

  const sidebarContent = (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="flex items-center justify-between px-6 py-5">
        <SulaMobLogo size="md" />
        <button
          onClick={onClose}
          className="md:hidden text-white/40 hover:text-white transition-colors"
          aria-label="Cerrar menú"
        >
          <X size={20} />
        </button>
      </div>

      <Separator className="bg-white/[0.06]" />

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-0.5" aria-label="Navegación principal">
        {navItems.map(({ href, label, icon: Icon }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              onClick={onClose}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors duration-150",
                active
                  ? "bg-[#E30613]/15 text-white border border-[#E30613]/25"
                  : "text-white/50 hover:text-white hover:bg-white/[0.05]"
              )}
            >
              <Icon size={16} className={active ? "text-[#E30613]" : ""} />
              {label}
            </Link>
          );
        })}
      </nav>

      {/* User + Logout */}
      <div className="px-3 pb-5">
        <Separator className="bg-white/[0.06] mb-4" />
        <div className="px-3 mb-3">
          <p className="text-xs font-semibold text-white truncate">{user?.name ?? "Admin"}</p>
          <p className="text-[11px] text-white/40 mt-0.5">Administrador</p>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleLogout}
          className="w-full justify-start gap-3 text-white/40 hover:text-white hover:bg-white/[0.05] px-3"
        >
          <LogOut size={15} />
          Cerrar sesión
        </Button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden md:flex flex-col w-[240px] shrink-0 border-r border-white/[0.06] bg-[#0a0a0a]">
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
          <aside className="relative flex flex-col w-[240px] bg-[#0d0d0d] border-r border-white/[0.06] z-10">
            {sidebarContent}
          </aside>
        </div>
      )}
    </>
  );
}
