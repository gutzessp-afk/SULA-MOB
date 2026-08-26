"use client";

import { Menu, Bell } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { getSession } from "@/lib/auth";
import { Badge } from "@/components/ui/badge";

interface DashboardHeaderProps {
  title: string;
  onMenuClick: () => void;
  showAreaBadge?: boolean;
}

export function DashboardHeader({ title, onMenuClick, showAreaBadge }: DashboardHeaderProps) {
  const user = getSession();
  const initials = user?.name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase() ?? "U";

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between h-16 px-6 border-b border-white/[0.06] bg-[#2e2e2e] shrink-0">
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          className="md:hidden text-white/50 hover:text-white transition-colors p-1 rounded focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#E30613]"
          aria-label="Abrir menú"
        >
          <Menu size={20} />
        </button>
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-semibold text-white tracking-tight">{title}</h1>
          {showAreaBadge && user?.area && (
            <Badge className="bg-[#E30613]/15 text-[#E30613] border border-[#E30613]/30 text-[11px]">
              {user.area}
            </Badge>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button
          className="relative flex items-center justify-center w-9 h-9 rounded-lg text-white/40 hover:text-white hover:bg-white/[0.06] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#E30613]"
          aria-label="Notificaciones"
        >
          <Bell size={18} />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-[#E30613] rounded-full ring-2 ring-[#2e2e2e]" />
        </button>

        <div className="flex items-center gap-2.5 pl-2 border-l border-white/[0.08] ml-1">
          <Avatar className="h-8 w-8 border border-white/[0.12]">
            <AvatarFallback className="bg-[#E30613]/15 text-[#E30613] text-xs font-semibold">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div className="hidden sm:block">
            <p className="text-xs font-medium text-white leading-none">{user?.name ?? "Usuario"}</p>
            <p className="text-[11px] text-white/40 mt-0.5">Administrador</p>
          </div>
        </div>
      </div>
    </header>
  );
}
