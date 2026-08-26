const stats = [
  { value: "142", label: "Proyectos", red: false },
  { value: "89", label: "Operadores", red: false },
  { value: "14", label: "Por verificar", red: true },
];

export function BrandPanel() {
  return (
    <section
      className="relative min-h-[60vh] lg:min-h-screen flex flex-col justify-between p-8 md:p-12 lg:p-16 overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(135deg, rgba(10,10,10,0.88) 0%, rgba(10,10,10,0.65) 50%, rgba(227,6,19,0.18) 100%), url('/boutique-bg.png')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Logo arriba */}
      <div className="flex items-center gap-3">
        <img
          src="/logo-sula-mob.png"
          alt="SULA MOB"
          className="h-20 w-auto"
        />
      </div>

      {/* Hero central */}
      <div className="max-w-xl">
        <div
          className="w-14 h-[3px] bg-[#E30613] rounded-full mb-6"
          style={{ boxShadow: "0 0 20px rgba(227,6,19,0.5)" }}
        />
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight">
          Producción inteligente,
          <br />
          <span className="text-white/90">decisiones certeras.</span>
        </h1>
        <p className="mt-6 text-base md:text-lg text-white/60 max-w-md leading-relaxed">
          El administrador publica los proyectos, cada operador reporta su
          avance y el estado global se actualiza en tiempo real.
        </p>
      </div>

      {/* Stats abajo */}
      <div className="grid grid-cols-3 gap-6 md:gap-8 max-w-md">
        <div>
          <div className="text-4xl md:text-5xl font-bold text-white">142</div>
          <div className="text-xs uppercase tracking-widest text-white/50 mt-2 font-medium">
            Proyectos
          </div>
        </div>
        <div>
          <div className="text-4xl md:text-5xl font-bold text-white">89</div>
          <div className="text-xs uppercase tracking-widest text-white/50 mt-2 font-medium">
            Operadores
          </div>
        </div>
        <div>
          <div className="text-4xl md:text-5xl font-bold text-[#E30613]">14</div>
          <div className="text-xs uppercase tracking-widest text-white/50 mt-2 font-medium">
            Por verificar
          </div>
        </div>
      </div>
    </section>
  );
}