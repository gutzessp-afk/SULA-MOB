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

export function OperatorBottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-white/[0.08] bg-[#0a0a0a]/95 backdrop-blur-md lg:hidden">
      <div className="mx-auto flex max-w-md items-center justify-around px-2 pb-[env(safe-area-inset-bottom)] pt-1">
        {items.map(({ href, label, icon: Icon }) => {
          const isActive =
            href === "/operator"
              ? pathname === "/operator"
              : pathname.startsWith(href);

          return (
            <Link
              key={href}
              href={href}
              className="flex flex-1 flex-col items-center gap-1 py-2 transition-colors"
            >
              <Icon
                size={22}
                strokeWidth={isActive ? 2.4 : 1.8}
                className={isActive ? "text-[#E30613]" : "text-white/40"}
              />
              <span
                className={`text-[11px] font-medium ${
                  isActive ? "text-[#E30613]" : "text-white/40"
                }`}
              >
                {label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}