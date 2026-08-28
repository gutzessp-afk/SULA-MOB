"use client";

import { useState } from "react";
import { toast } from "sonner";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Plus, Eye, Pencil, Trash2 } from "lucide-react";
import { mockProjects, AREAS, CLIENTS, type Project, type Area, type ProjectStatus } from "@/lib/mock-data";
import { Toaster } from "@/components/ui/sonner";

function statusColor(status: ProjectStatus) {
  if (status === "Activo") return "bg-emerald-500/15 text-emerald-400 border-emerald-500/25";
  if (status === "Pausado") return "bg-amber-500/15 text-amber-400 border-amber-500/25";
  return "bg-white/10 text-white/50 border-white/15";
}

function generateId() {
  return `P${String(Math.floor(Math.random() * 900) + 100)}`;
}

interface NewProjectForm {
  name: string;
  client: string | null;
  description: string;
  areas: Area[];
}

const emptyForm: NewProjectForm = { name: "", client: null, description: "", areas: [] };

interface ProjectDetailProps {
  project: Project;
  onClose: () => void;
}

function ProjectDetail({ project, onClose }: ProjectDetailProps) {
  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="bg-[#111] border-white/[0.10] text-white max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-white">{project.name}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 mt-2">
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div>
              <p className="text-white/40 text-xs mb-1">Cliente</p>
              <p className="text-white font-medium">{project.client}</p>
            </div>
            <div>
              <p className="text-white/40 text-xs mb-1">Estado</p>
              <Badge className={`border ${statusColor(project.status)}`}>{project.status}</Badge>
            </div>
            <div>
              <p className="text-white/40 text-xs mb-1">Inicio</p>
              <p className="text-white">{project.startDate}</p>
            </div>
            <div>
              <p className="text-white/40 text-xs mb-1">Progreso</p>
              <p className="text-white font-semibold">{project.progress}%</p>
            </div>
          </div>

          {project.description && (
            <div>
              <p className="text-white/40 text-xs mb-1">Descripción</p>
              <p className="text-sm text-white/70">{project.description}</p>
            </div>
          )}

          <div>
            <p className="text-white/40 text-xs mb-2">Orden de áreas</p>
            <div className="flex flex-wrap gap-2">
              {(project.areaOrder ?? []).map((area, i) => (
                <div key={area} className="flex items-center gap-1.5 bg-white/[0.04] border border-white/[0.08] rounded-lg px-3 py-1.5 text-xs text-white/70">
                  <span className="text-[#E30613] font-semibold">{i + 1}</span>
                  {area}
                </div>
              ))}
            </div>
          </div>

          <div>
            <p className="text-white/40 text-xs mb-3">Actividades</p>
            <div className="space-y-2">
              {project.activities.map((act) => (
                <div key={act.id} className="flex items-start gap-3 bg-white/[0.03] border border-white/[0.06] rounded-lg px-4 py-3">
                  <span className="text-[11px] font-semibold text-white/30 mt-0.5 w-4 shrink-0">{act.order}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-white">{act.description}</p>
                    <p className="text-xs text-white/40 mt-0.5">{act.area}</p>
                    {act.notes && <p className="text-xs text-white/30 mt-1">{act.notes}</p>}
                  </div>
                  <Badge className={`text-[10px] border shrink-0 ${
                    act.status === "Terminado" ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/25" :
                    act.status === "En proceso" ? "bg-[#E30613]/15 text-[#E30613] border-[#E30613]/25" :
                    "bg-white/[0.05] text-white/40 border-white/10"
                  }`}>
                    {act.status}
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="ghost" onClick={onClose} className="text-white/50 hover:text-white">
            Cerrar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export function ProjectsTable() {
  const [projects, setProjects] = useState<Project[]>(mockProjects);
  const [createOpen, setCreateOpen] = useState(false);
  const [form, setForm] = useState<NewProjectForm>(emptyForm);
  const [detailProject, setDetailProject] = useState<Project | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Project | null>(null);

  function handleToggleArea(area: Area) {
    setForm((f) => ({
      ...f,
      areas: f.areas.includes(area) ? f.areas.filter((a) => a !== area) : [...f.areas, area],
    }));
  }

  function handleCreate() {
    if (!form.name.trim() || !form.client) return;
    const newProject: Project = {
      id: generateId(),
      name: form.name.trim(),
      client: form.client as string,
      description: form.description,
      startDate: new Date().toISOString().split("T")[0],
      status: "Activo",
      progress: 0,
      areaOrder: form.areas,
      activities: form.areas.map((area, i) => ({
        id: `${generateId()}-${i}`,
        projectId: generateId(),
        area,
        description: `Actividad de ${area}`,
        status: "Pendiente",
        order: i + 1,
        notes: "",
        updatedAt: new Date().toLocaleDateString("es-MX"),
        updatedBy: "Administrador",
      })),
    };
    setProjects((prev) => [newProject, ...prev]);
    setCreateOpen(false);
    setForm(emptyForm);
    toast.success("Proyecto creado", { description: `"${newProject.name}" fue creado exitosamente.` });
  }

  function handleDelete(project: Project) {
    setProjects((prev) => prev.filter((p) => p.id !== project.id));
    setDeleteTarget(null);
    toast.success("Proyecto eliminado", { description: `"${project.name}" fue eliminado.` });
  }

  return (
    <>
      <Toaster theme="dark" position="bottom-right" />

      {/* Header row */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-xl font-bold text-white">Proyectos</h2>
          <p className="text-sm text-white/40 mt-0.5">{projects.length} proyectos en total</p>
        </div>
        <Button
          onClick={() => setCreateOpen(true)}
          className="bg-[#E30613] hover:bg-[#ff0a18] text-white gap-2"
        >
          <Plus size={16} />
          Nuevo proyecto
        </Button>
      </div>

      {/* Table */}
      <div className="rounded-xl border border-white/[0.08] overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="border-white/[0.08] hover:bg-transparent">
              <TableHead className="text-white/40 text-xs">Proyecto</TableHead>
              <TableHead className="text-white/40 text-xs">Cliente</TableHead>
              <TableHead className="text-white/40 text-xs hidden md:table-cell">Inicio</TableHead>
              <TableHead className="text-white/40 text-xs">Estado</TableHead>
              <TableHead className="text-white/40 text-xs hidden lg:table-cell">Progreso</TableHead>
              <TableHead className="text-white/40 text-xs text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {projects.map((project) => (
              <TableRow
                key={project.id}
                className="border-white/[0.06] hover:bg-white/[0.025] cursor-pointer transition-colors"
                onClick={() => setDetailProject(project)}
              >
                <TableCell>
                  <p className="text-sm font-medium text-white">{project.name}</p>
                  <p className="text-[11px] text-white/30 mt-0.5">{project.id}</p>
                </TableCell>
                <TableCell className="text-sm text-white/60">{project.client}</TableCell>
                <TableCell className="text-sm text-white/40 hidden md:table-cell">{project.startDate}</TableCell>
                <TableCell>
                  <Badge className={`text-[10px] border ${statusColor(project.status)}`}>
                    {project.status}
                  </Badge>
                </TableCell>
                <TableCell className="hidden lg:table-cell">
                  <div className="flex items-center gap-2">
                    <Progress value={project.progress} className="h-1 w-20 bg-white/[0.06]" />
                    <span className="text-xs text-white/40 tabular-nums">{project.progress}%</span>
                  </div>
                </TableCell>
                <TableCell className="text-right" onClick={(e) => e.stopPropagation()}>
                  <div className="flex items-center justify-end gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 text-white/30 hover:text-white hover:bg-white/[0.05]"
                      onClick={() => setDetailProject(project)}
                      aria-label="Ver proyecto"
                    >
                      <Eye size={14} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 text-white/30 hover:text-white hover:bg-white/[0.05]"
                      aria-label="Editar proyecto"
                    >
                      <Pencil size={14} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 text-white/30 hover:text-[#E30613] hover:bg-[#E30613]/10"
                      onClick={() => setDeleteTarget(project)}
                      aria-label="Eliminar proyecto"
                    >
                      <Trash2 size={14} />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Create modal */}
      <Dialog open={createOpen} onOpenChange={setCreateOpen}>
        <DialogContent className="bg-[#111] border-white/[0.10] text-white max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-white">Nuevo proyecto</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-2">
            <div className="space-y-1.5">
              <Label htmlFor="proj-name" className="text-xs text-white/50 tracking-widest uppercase">
                Nombre
              </Label>
              <Input
                id="proj-name"
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                placeholder="Ej. Display Temporada Verano"
                className="bg-white/[0.05] border-white/[0.12] text-white placeholder:text-white/25 focus-visible:ring-[#E30613]"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="proj-client" className="text-xs text-white/50 tracking-widest uppercase">
                Cliente
              </Label>
              <Select value={form.client ?? undefined} onValueChange={(v) => setForm((f) => ({ ...f, client: v }))}>
                <SelectTrigger id="proj-client" className="bg-white/[0.05] border-white/[0.12] text-white focus:ring-[#E30613]">
                  <SelectValue placeholder="Seleccionar cliente..." />
                </SelectTrigger>
                <SelectContent className="bg-[#1a1a1a] border-white/[0.10] text-white">
                  {CLIENTS.map((c) => (
                    <SelectItem key={c.id} value={c.name} className="focus:bg-white/[0.08] focus:text-white">
                      {c.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="proj-desc" className="text-xs text-white/50 tracking-widest uppercase">
                Descripción
              </Label>
              <Input
                id="proj-desc"
                value={form.description}
                onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                placeholder="Descripción breve del proyecto"
                className="bg-white/[0.05] border-white/[0.12] text-white placeholder:text-white/25 focus-visible:ring-[#E30613]"
              />
            </div>

            <div className="space-y-2">
              <p className="text-xs text-white/50 tracking-widest uppercase">
                Áreas participantes
              </p>
              <div className="flex flex-wrap gap-2">
                {AREAS.map((area) => {
                  const selected = form.areas.includes(area);
                  return (
                    <button
                      key={area}
                      type="button"
                      onClick={() => handleToggleArea(area)}
                      className={`text-xs px-3 py-1.5 rounded-lg border transition-colors duration-150 ${
                        selected
                          ? "bg-[#E30613]/15 border-[#E30613]/40 text-[#E30613]"
                          : "bg-white/[0.03] border-white/[0.10] text-white/50 hover:text-white hover:border-white/20"
                      }`}
                    >
                      {selected && <span className="mr-1 font-bold">{form.areas.indexOf(area) + 1}.</span>}
                      {area}
                    </button>
                  );
                })}
              </div>
              <p className="text-[11px] text-white/25">El orden de selección define el flujo de producción.</p>
            </div>
          </div>
          <DialogFooter className="mt-4">
            <Button
              variant="ghost"
              onClick={() => { setCreateOpen(false); setForm(emptyForm); }}
              className="text-white/50 hover:text-white"
            >
              Cancelar
            </Button>
            <Button
              onClick={handleCreate}
              disabled={!form.name.trim() || !form.client}
              className="bg-[#E30613] hover:bg-[#ff0a18] text-white disabled:opacity-40"
            >
              Crear proyecto
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete confirmation */}
      <Dialog open={!!deleteTarget} onOpenChange={() => setDeleteTarget(null)}>
        <DialogContent className="bg-[#111] border-white/[0.10] text-white max-w-sm">
          <DialogHeader>
            <DialogTitle className="text-white">Eliminar proyecto</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-white/60 mt-2">
            ¿Estás seguro de que deseas eliminar{" "}
            <span className="font-semibold text-white">"{deleteTarget?.name}"</span>? Esta acción no se puede deshacer.
          </p>
          <DialogFooter className="mt-4">
            <Button variant="ghost" onClick={() => setDeleteTarget(null)} className="text-white/50 hover:text-white">
              Cancelar
            </Button>
            <Button
              onClick={() => deleteTarget && handleDelete(deleteTarget)}
              className="bg-[#E30613] hover:bg-[#ff0a18] text-white"
            >
              Eliminar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Project detail */}
      {detailProject && (
        <ProjectDetail project={detailProject} onClose={() => setDetailProject(null)} />
      )}
    </>
  );
}