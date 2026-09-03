"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, ClipboardList, History, User } from "lucide-react";

const items = [
  { href: "/operator", label: "Inicio", icon: Home },
  { href: "/operator/actividades", label: "Actividades", icon: ClipboardList },
  { href: "/operator/historial", label: "Historial", icon: History },
  { href: "/operator/perfil", label: "Perfil", icon: User },
];

export function OperatorSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:flex lg:w-60 lg:flex-col lg:border-r lg:border-white/[0.08] lg:bg-[#1c1c1c] lg:px-4 lg:py-6">
      <div className="mb-8 px-2">
        <p className="text-lg font-extrabold tracking-tight">
          SULA<span className="text-[#E30613]">MOB</span>
        </p>
        <p className="mt-1 text-[10px] font-medium tracking-widest text-white/30">
          CALIDAD · CONFIANZA · INNOVACIÓN
        </p>
      </div>

      <nav className="flex flex-col gap-1">
        {items.map(({ href, label, icon: Icon }) => {
          const isActive =
            href === "/operator"
              ? pathname === "/operator"
              : pathname.startsWith(href);

          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
                isActive
                  ? "bg-[#E30613]/10 text-[#E30613]"
                  : "text-white/50 hover:bg-white/[0.05] hover:text-white/80"
              }`}
            >
              <Icon size={18} strokeWidth={isActive ? 2.4 : 1.8} />
              {label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}