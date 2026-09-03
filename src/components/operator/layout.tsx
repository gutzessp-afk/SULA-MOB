import { OperatorSidebar } from "@/components/layout/operator-sidebar";
import { OperatorBottomNav } from "@/components/layout/operador-bottom-nav";

export default function OperatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white lg:flex">
      <OperatorSidebar />

      <div className="flex-1">
        <main className="pb-24 lg:pb-6">{children}</main>
      </div>

      <OperatorBottomNav />
    </div>
  );
}