"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AdminSidebar } from "@/components/layout/admin-sidebar";
import { getSession } from "@/lib/auth";
import type { MockUser } from "@/lib/mock-users";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [user, setUser] = useState<MockUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const s = getSession();
    if (!s) {
      router.push("/login");
      return;
    }
    if (s.role !== "admin") {
      router.push("/home");
      return;
    }
    setUser(s);
    setLoading(false);
  }, [router]);

  if (loading || !user) return null;

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <AdminSidebar />
      <main className="min-h-screen w-full">
        {children}
      </main>
    </div>
  );
}