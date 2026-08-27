"use client";

import Link from "next/link";
import { Plus, Calendar, MoreVertical } from "lucide-react";
import { mockProjects } from "@/lib/mock-data";

export default function ProyectosPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <section className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-white">
            Proyectos
          </h1>
          <p className="mt-2 text-sm text-white/60">
            {mockProjects.length} proyectos en total
          </p>
        </div>
        <button className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#E30613] hover:bg-[#c8050f] text-white font-medium text-sm transition-colors shadow-lg shadow-[#E30613]/25">
          <Plus className="w-4 h-4" />
          Nuevo proyecto
        </button>
      </section>

      {/* Grid Netflix-style */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {mockProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </section>
    </div>
  );
}

// ProjectCard -----------------------------------------------------------

interface ProjectCardProps {
  project: (typeof mockProjects)[number];
}

function ProjectCard({ project }: ProjectCardProps) {
  const statusColor = {
    Activo: "bg-emerald-400/15 text-emerald-400 border-emerald-400/30",
    Completado: "bg-blue-400/15 text-blue-400 border-blue-400/30",
    Pausado: "bg-amber-400/15 text-amber-400 border-amber-400/30",
  }[project.status];

  const progressColor =
    project.progress >= 70
      ? "bg-emerald-400"
      : project.progress >= 30
      ? "bg-amber-400"
      : "bg-[#E30613]";

  return (
    <Link
      href={`/admin/proyectos/${project.id}`}
      className="group rounded-xl overflow-hidden border border-white/[0.08] bg-[#2e2e2e] hover:border-white/[0.15] hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
    >
      {/* Imagen */}
      <div className="relative aspect-[16/10] overflow-hidden bg-[#1a1a1a]">
        {project.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={project.image}
            alt={project.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-white/30 text-xs">
            Sin imagen
          </div>
        )}
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        {/* Badge de estado arriba a la derecha */}
        <div
          className={`absolute top-3 right-3 px-2.5 py-1 rounded-full text-xs font-medium border backdrop-blur-sm ${statusColor}`}
        >
          {project.status}
        </div>

        {/* Código del proyecto */}
        <div className="absolute top-3 left-3 px-2 py-1 rounded bg-black/50 backdrop-blur-sm">
          <span className="text-xs font-mono text-white/80">{project.code}</span>
        </div>
      </div>

      {/* Contenido */}
      <div className="p-5">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-white text-base truncate">
              {project.name}
            </h3>
            <p className="text-xs text-white/50 mt-0.5">{project.client}</p>
          </div>
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
            className="p-1 rounded hover:bg-white/[0.08] text-white/40 hover:text-white transition-colors"
          >
            <MoreVertical className="w-4 h-4" />
          </button>
        </div>

        {/* Barra de progreso */}
        <div className="mb-2">
          <div className="flex justify-between items-center mb-1.5">
            <span className="text-xs text-white/50 font-medium">Progreso</span>
            <span className="text-xs text-white font-bold tabular-nums">
              {project.progress}%
            </span>
          </div>
          <div className="h-1.5 rounded-full bg-white/[0.08] overflow-hidden">
            <div
              className={`h-full rounded-full transition-all ${progressColor}`}
              style={{ width: `${project.progress}%` }}
            />
          </div>
        </div>

        {/* Fecha */}
        <div className="flex items-center gap-1.5 text-xs text-white/40 mt-3">
          <Calendar className="w-3 h-3" />
          <span>Inicio: {project.startDate}</span>
        </div>
      </div>
    </Link>
  );
}