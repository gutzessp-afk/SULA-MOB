"use client";

import { Bell, Menu, Search } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

import { getSession } from "@/lib/auth";

interface DashboardHeaderProps {
  title: string;
  onMenuClick: () => void;
  showAreaBadge?: boolean;
}

export function DashboardHeader({
  title,
  onMenuClick,
  showAreaBadge = false,
}: DashboardHeaderProps) {
  const user = getSession();

  const initials =
    user?.name
      ?.split(" ")
      .map((word) => word[0])
      .slice(0, 2)
      .join("")
      .toUpperCase() || "U";

  return (
    <header className="sticky top-0 z-40 flex h-[76px] w-full shrink-0 items-center justify-between border-b border-zinc-800/80 bg-[#111111]/95 px-4 backdrop-blur-xl sm:px-6 lg:px-8">
      {/* Izquierda */}
      <div className="flex min-w-0 items-center gap-4">
        <button
          onClick={onMenuClick}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-zinc-800 bg-zinc-900 text-zinc-400 transition hover:border-zinc-700 hover:text-white lg:hidden"
          aria-label="Abrir menú"
        >
          <Menu className="h-5 w-5" />
        </button>

        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <h1 className="truncate text-lg font-bold text-white sm:text-xl">
              {title}
            </h1>

            {showAreaBadge && user?.area && (
              <Badge className="hidden border-[#E30613]/20 bg-[#E30613]/10 text-[10px] text-[#E30613] sm:flex">
                {user.area}
              </Badge>
            )}
          </div>

          <p className="hidden text-[11px] text-zinc-500 sm:block">
            Centro de control operativo
          </p>
        </div>
      </div>

      {/* Derecha */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Search */}
        <button className="flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-800 bg-zinc-900 text-zinc-500 transition hover:border-zinc-700 hover:text-white sm:hidden">
          <Search className="h-4 w-4" />
        </button>

        <div className="relative hidden w-[220px] md:block lg:w-[280px]">
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-600" />

          <input
            type="text"
            placeholder="Buscar..."
            className="h-10 w-full rounded-xl border border-zinc-800 bg-zinc-900/80 pl-10 pr-4 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-[#E30613]/40"
          />
        </div>

        {/* Notificaciones */}
        <button className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-800 bg-zinc-900 text-zinc-500 transition hover:border-zinc-700 hover:text-white">
          <Bell className="h-[17px] w-[17px]" />

          <span className="absolute right-1.5 top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#E30613] px-1 text-[8px] font-bold text-white">
            3
          </span>
        </button>

        {/* Usuario */}
        <div className="hidden items-center gap-3 border-l border-zinc-800 pl-3 sm:flex">
          <Avatar className="h-9 w-9 border border-zinc-700">
            <AvatarFallback className="bg-[#E30613]/10 text-xs font-bold text-[#E30613]">
              {initials}
            </AvatarFallback>
          </Avatar>

          <div className="hidden min-w-0 lg:block">
            <p className="max-w-[130px] truncate text-xs font-semibold text-white">
              {user?.name || "Usuario"}
            </p>

            <p className="text-[10px] text-zinc-500">
              Administrador
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}