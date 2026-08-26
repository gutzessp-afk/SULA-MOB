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
    <header className="sticky top-0 z-30 flex items-center justify-between h-14 px-4 md:px-6 border-b border-white/[0.06] bg-[#0a0a0a]/80 backdrop-blur-md shrink-0">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="md:hidden text-white/50 hover:text-white transition-colors p-1 rounded focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#E30613]"
          aria-label="Abrir menú"
        >
          <Menu size={20} />
        </button>
        <div className="flex items-center gap-3">
          <h1 className="text-sm font-semibold text-white">{title}</h1>
          {showAreaBadge && user?.area && (
            <Badge className="bg-[#E30613]/15 text-[#E30613] border border-[#E30613]/30 text-[11px]">
              {user.area}
            </Badge>
          )}
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button
          className="relative text-white/40 hover:text-white transition-colors p-1.5 rounded focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#E30613]"
          aria-label="Notificaciones"
        >
          <Bell size={18} />
          <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-[#E30613] rounded-full" />
        </button>
        <Avatar className="h-7 w-7 border border-white/[0.12]">
          <AvatarFallback className="bg-[#E30613]/20 text-[#E30613] text-[11px] font-semibold">
            {initials}
          </AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}
