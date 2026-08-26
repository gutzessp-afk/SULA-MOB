"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { OperatorSidebar } from "@/components/layout/operator-sidebar";
import { DashboardHeader } from "@/components/layout/dashboard-header";
import { getSession } from "@/lib/auth";

const pageTitles: Record<string, string> = {
  "/operator/dashboard": "Mis Actividades",
  "/operator/historial": "Historial",
  "/operator/perfil": "Perfil",
};

export default function OperatorLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [ready, setReady] = useState(false);
  const [currentPath, setCurrentPath] = useState("/operator/dashboard");

  useEffect(() => {
    const user = getSession();
    if (!user || user.role !== "operator") {
      router.replace("/login");
      return;
    }
    setCurrentPath(window.location.pathname);
    setReady(true);
  }, [router]);

  useEffect(() => {
    setCurrentPath(window.location.pathname);
  });

  if (!ready) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <span className="inline-block w-6 h-6 border-2 border-white/20 border-t-[#E30613] rounded-full animate-spin" />
      </div>
    );
  }

  const title = pageTitles[currentPath] ?? "Operador";

  return (
    <div className="flex h-screen bg-[#0a0a0a] text-white overflow-hidden">
      <OperatorSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <DashboardHeader title={title} onMenuClick={() => setSidebarOpen(true)} showAreaBadge />
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
