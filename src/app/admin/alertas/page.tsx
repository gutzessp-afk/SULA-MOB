import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getProjectAlerts } from "@/lib/queries";

const severityStyles: Record<string, string> = {
  critico: "bg-red-500/10 text-red-400 border-red-500/20",
  advertencia: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  info: "bg-blue-500/10 text-blue-400 border-blue-500/20",
};

export default async function AlertasPage() {
  const alerts = await getProjectAlerts();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-white">Alertas</h1>
        <p className="text-sm text-white/50">{alerts.length} proyecto(s) con atraso detectado</p>
      </div>

      {alerts.length === 0 && (
        <Card className="bg-white/[0.03] border-white/[0.08]">
          <CardContent className="py-10 text-center text-white/50">
            No hay proyectos atrasados por ahora
          </CardContent>
        </Card>
      )}

      <div className="space-y-4">
        {alerts.map((alert) => (
          <Card key={alert.project_id} className="bg-white/[0.03] border-white/[0.08]">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-white text-base">
                  {alert.project_code} — {alert.project_name}
                </CardTitle>
                <span className={`text-xs px-2 py-1 rounded-full border ${severityStyles[alert.severity]}`}>
                  {alert.days_late} día(s) de atraso
                </span>
              </div>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <p className="text-white/60"><span className="text-white/40">Cliente:</span> {alert.client_name}</p>
              <p className="text-white/60"><span className="text-white/40">Etapa actual:</span> {alert.current_area ?? "Sin iniciar"}</p>
              <p className="text-white/70"><span className="text-white/40">Causa:</span> {alert.cause}</p>
              <p className="text-white/80 font-medium"><span className="text-white/40 font-normal">Solución recomendada:</span> {alert.suggestion}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}