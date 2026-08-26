"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, AlertCircle, Loader2 } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mockUsers } from "@/lib/mock-users";
import { saveSession } from "@/lib/auth";

type LoginTab = "admin" | "operator";

export function AuthPanel() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<LoginTab>("admin");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    // Pequeño delay para simular request
    await new Promise((r) => setTimeout(r, 600));

    const user = mockUsers.find(
      (u) => u.username === username.trim() && u.password === password
    );

    if (!user) {
      setError("Usuario o contraseña incorrectos.");
      setLoading(false);
      return;
    }

    if (activeTab === "admin" && user.role !== "admin") {
      setError("Este acceso es solo para administradores.");
      setLoading(false);
      return;
    }

    if (activeTab === "operator" && user.role !== "operator") {
      setError("Este acceso es solo para operadores.");
      setLoading(false);
      return;
    }

    saveSession(user);
    router.push(
      user.role === "admin" ? "/admin/dashboard" : "/operator/dashboard"
    );
  };

  return (
    <section
      className="min-h-[60vh] lg:min-h-screen flex items-center justify-center p-6 md:p-10 lg:p-16"
      style={{
        background:
          "linear-gradient(135deg, #1a1a1a 0%, #141414 50%, #1a1a1a 100%)",
      }}
    >
      <div className="w-full max-w-md space-y-6">
        {/* Tabs Admin / Operador */}
        <Tabs
          value={activeTab}
          onValueChange={(v) => {
            setActiveTab(v as LoginTab);
            setError(null);
          }}
        >
          <TabsList className="grid w-full grid-cols-2 bg-white/[0.05] p-1 rounded-lg border border-white/[0.08] h-11">
            <TabsTrigger
              value="admin"
              className="data-[state=active]:bg-white data-[state=active]:text-black text-white/50 hover:text-white rounded-md transition-all font-medium"
            >
              Administrador
            </TabsTrigger>
            <TabsTrigger
              value="operator"
              className="data-[state=active]:bg-white data-[state=active]:text-black text-white/50 hover:text-white rounded-md transition-all font-medium"
            >
              Operador
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Título */}
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
            Bienvenido de nuevo
          </h2>
          <p className="text-sm text-white/50 mt-2">
            Ingresa tus credenciales para entrar al panel.
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="flex items-start gap-2 bg-[#E30613]/10 border border-[#E30613]/30 text-[#E30613] rounded-lg p-3 text-sm">
            <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Usuario */}
          <div>
            <label
              htmlFor="username"
              className="text-xs uppercase tracking-widest text-white/60 mb-2 block font-medium"
            >
              Usuario
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Ingresa tu usuario"
              autoFocus
              autoComplete="username"
              spellCheck={false}
              required
              className="w-full h-12 px-4 rounded-lg bg-white text-black placeholder:text-black/40 border border-white/20 focus:outline-none focus:ring-2 focus:ring-[#E30613] focus:border-transparent transition-all duration-200 text-base"
            />
          </div>

          {/* Contraseña */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label
                htmlFor="password"
                className="text-xs uppercase tracking-widest text-white/60 font-medium"
              >
                Contraseña
              </label>
              <button
                type="button"
                className="text-xs text-[#E30613] hover:text-[#c8050f] font-medium cursor-pointer"
                onClick={(e) => e.preventDefault()}
              >
                ¿Olvidaste tu contraseña?
              </button>
            </div>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                autoComplete="current-password"
                required
                className="w-full h-12 px-4 pr-12 rounded-lg bg-white text-black placeholder:text-black/40 border border-white/20 focus:outline-none focus:ring-2 focus:ring-[#E30613] focus:border-transparent transition-all duration-200 text-base"
              />
              <button
                type="button"
                onClick={() => setShowPassword((s) => !s)}
                aria-label={
                  showPassword ? "Ocultar contraseña" : "Mostrar contraseña"
                }
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 text-black/50 hover:text-black transition-colors"
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          {/* Botón */}
          <button
            type="submit"
            disabled={loading}
            className="w-full h-12 bg-[#E30613] hover:bg-[#c8050f] text-white font-semibold rounded-lg transition-all duration-200 shadow-lg shadow-[#E30613]/25 hover:shadow-[#E30613]/40 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              "Iniciar sesión"
            )}
          </button>
        </form>

        {/* Footer legal */}
        <p className="text-xs text-white/40 text-center">
          Al continuar aceptas los{" "}
          <a href="#" className="text-[#E30613] hover:underline">
            Términos de servicio
          </a>{" "}
          y la{" "}
          <a href="#" className="text-[#E30613] hover:underline">
            Política de privacidad
          </a>
          .
        </p>
      </div>
    </section>
  );
}