"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ListChecks, History, User, LogOut, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { clearSession, getSession } from "@/lib/auth";
import { SulaMobLogo } from "./logo";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

const navItems = [
  { href: "/operator/dashboard", label: "Mis actividades", icon: ListChecks },
  { href: "/operator/historial", label: "Historial", icon: History },
  { href: "/operator/perfil", label: "Perfil", icon: User },
];

interface OperatorSidebarProps {
  open: boolean;
  onClose: () => void;
}

export function OperatorSidebar({ open, onClose }: OperatorSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const user = getSession();

  function handleLogout() {
    clearSession();
    router.push("/login");
  }

  const sidebarContent = (
    <div className="flex flex-col h-full">
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

      {user?.area && (
        <div className="px-6 py-3">
          <Badge className="bg-[#E30613]/15 text-[#E30613] border border-[#E30613]/30 text-[11px] font-medium">
            {user.area}
          </Badge>
        </div>
      )}

      <nav className="flex-1 px-3 py-4 space-y-0.5" aria-label="Navegación">
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

      <div className="px-3 pb-5">
        <Separator className="bg-white/[0.06] mb-4" />
        <div className="px-3 mb-3">
          <p className="text-xs font-semibold text-white truncate">{user?.name ?? "Operador"}</p>
          <p className="text-[11px] text-white/40 mt-0.5">{user?.area ?? "Área"}</p>
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
      <aside className="hidden md:flex flex-col w-[220px] shrink-0 border-r border-white/[0.06] bg-[#0a0a0a]">
        {sidebarContent}
      </aside>

      {open && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />
          <aside className="relative flex flex-col w-[220px] bg-[#0d0d0d] border-r border-white/[0.06] z-10">
            {sidebarContent}
          </aside>
        </div>
      )}
    </>
  );
}
