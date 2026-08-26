"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { mockUsers } from "@/lib/mock-users";
import { saveSession } from "@/lib/auth";

export function LoginForm() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Simulate slight network delay for polish
    await new Promise((r) => setTimeout(r, 400));

    const user = mockUsers.find(
      (u) => u.username === username.trim() && u.password === password
    );

    if (!user) {
      setError("Usuario o contraseña incorrectos.");
      setLoading(false);
      return;
    }

    saveSession(user);

    if (user.role === "admin") {
      router.push("/admin/dashboard");
    } else {
      router.push("/operator/dashboard");
    }
  }

  return (
    <div
      className="rounded-2xl shadow-2xl px-8 py-10"
      style={{
        background: "rgba(255,255,255,0.03)",
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        border: "1px solid rgba(255,255,255,0.10)",
      }}
    >
      {/* Red decorative line */}
      <div className="w-12 h-[2px] bg-[#E30613] rounded-full mx-auto mb-6" />

      {/* Logo */}
      <div className="flex justify-center mb-3">
        <div
          className="flex items-center justify-center rounded-xl px-4 py-2"
          style={{ background: "rgba(255,255,255,0.04)" }}
        >
          {/* Placeholder SVG logo until public/logo-sula-mob.png is uploaded */}
          <svg width="140" height="48" viewBox="0 0 140 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="SULA MOB Logo">
            {/* Spiral swirl */}
            <g>
              <path d="M24 24 C24 18, 18 14, 13 17 C8 20, 8 27, 13 30 C18 33, 25 31, 27 26 C29 21, 26 15, 21 13 C16 11, 10 14, 8 19" stroke="#E30613" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
              <circle cx="24" cy="24" r="3" fill="#E30613"/>
            </g>
            {/* SULA MOB text */}
            <text x="42" y="20" fontFamily="'Geist', 'Inter', sans-serif" fontSize="13" fontWeight="700" letterSpacing="3" fill="white">SULA</text>
            <text x="42" y="36" fontFamily="'Geist', 'Inter', sans-serif" fontSize="13" fontWeight="700" letterSpacing="3" fill="#E30613">MOB</text>
          </svg>
        </div>
      </div>

      <p className="text-center text-xs text-white/40 tracking-widest uppercase mb-6">
        Panel de acceso
      </p>

      <div className="border-t border-white/[0.08] mb-6" />

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-1.5">
          <Label
            htmlFor="username"
            className="text-[11px] tracking-widest text-white/50 uppercase"
          >
            Usuario
          </Label>
          <Input
            id="username"
            type="text"
            autoComplete="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            placeholder="Ingresa tu usuario"
            className="bg-white/[0.05] border-white/[0.12] text-white placeholder:text-white/25 focus-visible:ring-[#E30613] focus-visible:border-[#E30613]/50 h-11"
          />
        </div>

        <div className="space-y-1.5">
          <Label
            htmlFor="password"
            className="text-[11px] tracking-widest text-white/50 uppercase"
          >
            Contraseña
          </Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
              className="bg-white/[0.05] border-white/[0.12] text-white placeholder:text-white/25 focus-visible:ring-[#E30613] focus-visible:border-[#E30613]/50 h-11 pr-11"
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/70 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#E30613] rounded"
              aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>

        {error && (
          <div
            className="rounded-lg px-4 py-3 text-sm"
            style={{ background: "rgba(227,6,19,0.12)", border: "1px solid rgba(227,6,19,0.25)", color: "#ff6b6b" }}
            role="alert"
          >
            {error}
          </div>
        )}

        <Button
          type="submit"
          disabled={loading}
          className="w-full h-11 bg-[#E30613] hover:bg-[#ff0a18] text-white font-semibold tracking-wide transition-colors duration-200 disabled:opacity-60"
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Verificando...
            </span>
          ) : (
            <span className="flex items-center gap-2">
              Iniciar sesión
              <ArrowRight size={16} />
            </span>
          )}
        </Button>
      </form>

      <p className="mt-6 text-center text-[11px] text-white/25">
        ¿Problemas para acceder? Contacta al administrador
      </p>
    </div>
  );
}
