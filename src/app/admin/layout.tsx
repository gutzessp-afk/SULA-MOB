"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AdminSidebar } from "@/components/layout/admin-sidebar";
import { DashboardHeader } from "@/components/layout/dashboard-header";
import { getSession } from "@/lib/auth";

const pageTitles: Record<string, string> = {
  "/admin/dashboard": "Dashboard",
  "/admin/proyectos": "Proyectos",
  "/admin/actividades": "Actividades",
  "/admin/reportes": "Reportes",
  "/admin/configuracion": "Configuración",
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [ready, setReady] = useState(false);
  const [currentPath, setCurrentPath] = useState("/admin/dashboard");

  useEffect(() => {
    const user = getSession();
    if (!user || user.role !== "admin") {
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
      <div className="min-h-screen bg-[#242424] flex items-center justify-center">
        <span className="inline-block w-6 h-6 border-2 border-white/20 border-t-[#E30613] rounded-full animate-spin" />
      </div>
    );
  }

  const title = pageTitles[currentPath] ?? "Admin";

  return (
    <div className="flex h-screen bg-[#242424] text-white overflow-hidden">
      <AdminSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <DashboardHeader title={title} onMenuClick={() => setSidebarOpen(true)} />
        <main className="flex-1 overflow-y-auto p-6 md:p-8 lg:p-10">
          {children}
        </main>
      </div>
    </div>
  );
}
