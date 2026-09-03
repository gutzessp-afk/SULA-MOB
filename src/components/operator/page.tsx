"use client";

import { CheckCircle2, Calendar } from "lucide-react";

type ActividadCerrada = {
  id: string;
  titulo: string;
  proyecto: string;
  cliente: string;
  piezasTotal: number;
  fechaCierre: string;
};

const actividadesCerradas: ActividadCerrada[] = [];

export default function HistorialPage() {
  return (
    <div className="mx-auto max-w-md px-4 pt-6">
      <h1 className="text-xl font-bold">Historial</h1>
      <p className="mt-1 text-sm text-white/40">Actividades terminadas</p>

      {actividadesCerradas.length === 0 ? (
        <div className="mt-16 flex flex-col items-center gap-3 text-center">
          <CheckCircle2 size={40} className="text-white/15" />
          <p className="text-sm text-white/30">
            Todavía no tienes actividades terminadas
          </p>
        </div>
      ) : (
        <div className="mt-6 flex flex-col gap-3">
          {actividadesCerradas.map((a) => (
            <div
              key={a.id}
              className="rounded-2xl border border-white/[0.08] bg-[#1c1c1c] p-4"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="font-semibold leading-tight">{a.titulo}</h3>
                  <p className="mt-0.5 text-xs text-white/40">
                    {a.proyecto} · {a.cliente}
                  </p>
                </div>
                <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-[#E30613]" />
              </div>

              <div className="mt-3 flex items-center justify-between text-xs text-white/40">
                <span>{a.piezasTotal} piezas</span>
                <span className="flex items-center gap-1">
                  <Calendar size={12} />
                  {a.fechaCierre}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}