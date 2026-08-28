import { BrandPanel } from "@/components/auth/brand-panel";
import { AuthPanel } from "@/components/auth/auth-panel";

// Forzar que la página sea dinámica para evitar errores de prerender en Vercel
export const dynamic = 'force-dynamic';

export const metadata = {
  title: "Acceso — SULA MOB",
};

export default function LoginPage() {
  return (
    <main className="min-h-screen w-full grid grid-cols-1 lg:grid-cols-2">
      <BrandPanel />
      <AuthPanel />
    </main>
  );
}