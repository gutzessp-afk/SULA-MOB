"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function TestSupabasePage() {
  const [areas, setAreas] = useState<{ id: string; name: string; slug: string; sort_order: number }[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function testConnection() {
      const { data, error } = await supabase
        .from("areas")
        .select("*")
        .order("sort_order");

      if (error) {
        setError(error.message);
        console.error("❌ Error Supabase:", error);
      } else {
        setAreas(data || []);
        console.log("✅ Áreas desde Supabase:", data);
      }
      setLoading(false);
    }

    testConnection();
  }, []);

  return (
    <div className="min-h-screen bg-[#242424] text-white p-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">🧪 Test Supabase</h1>
        <p className="text-white/60 mb-8">
          Página de prueba para verificar conexión a Supabase
        </p>

        {loading && (
          <div className="p-6 bg-blue-500/10 border border-blue-500/30 rounded-lg text-blue-400">
            Conectando a Supabase...
          </div>
        )}

        {error && (
          <div className="p-6 bg-red-500/10 border border-red-500/30 rounded-lg">
            <p className="text-red-400 font-semibold mb-2">❌ Error de conexión</p>
            <p className="text-white/80 text-sm font-mono">{error}</p>
          </div>
        )}

        {!loading && !error && areas.length > 0 && (
          <>
            <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-lg text-emerald-400 mb-6">
              ✅ Conexión exitosa. {areas.length} áreas encontradas en la BD.
            </div>

            <div className="space-y-2">
              {areas.map((area) => (
                <div
                  key={area.id}
                  className="p-4 bg-white/[0.03] border border-white/[0.08] rounded-lg flex items-center justify-between"
                >
                  <div>
                    <div className="font-semibold">{area.name}</div>
                    <div className="text-xs text-white/50 font-mono">
                      slug: {area.slug} · id: {area.id.slice(0, 8)}...
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-white/40 tabular-nums">
                    {area.sort_order}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {!loading && !error && areas.length === 0 && (
          <div className="p-6 bg-amber-500/10 border border-amber-500/30 rounded-lg text-amber-400">
            ⚠️ Conexión exitosa pero no se encontraron áreas. Verifica que las
            insertaste en la BD.
          </div>
        )}
      </div>
    </div>
  );
}