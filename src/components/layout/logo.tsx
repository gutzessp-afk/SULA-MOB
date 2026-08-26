export function SulaMobLogo({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const dims = size === "sm" ? { w: 90, h: 32, text: 9, swirl: 0.7 } : size === "lg" ? { w: 140, h: 48, text: 13, swirl: 1 } : { w: 110, h: 38, text: 11, swirl: 0.85 };

  return (
    <svg width={dims.w} height={dims.h} viewBox="0 0 140 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="SULA MOB">
      <g transform={`scale(${dims.swirl})`}>
        <path d="M24 24 C24 18, 18 14, 13 17 C8 20, 8 27, 13 30 C18 33, 25 31, 27 26 C29 21, 26 15, 21 13 C16 11, 10 14, 8 19" stroke="#E30613" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
        <circle cx="24" cy="24" r="3" fill="#E30613"/>
      </g>
      <text x="42" y="20" fontFamily="'Geist', 'Inter', sans-serif" fontSize={dims.text} fontWeight="700" letterSpacing="3" fill="white">SULA</text>
      <text x="42" y="36" fontFamily="'Geist', 'Inter', sans-serif" fontSize={dims.text} fontWeight="700" letterSpacing="3" fill="#E30613">MOB</text>
    </svg>
  );
}
