import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const jakarta = localFont({
  src: [
    { path: "./fonts/plus-jakarta-sans-v12-latin_latin-ext-regular.woff2", weight: "400", style: "normal" },
    { path: "./fonts/plus-jakarta-sans-v12-latin_latin-ext-500.woff2", weight: "500", style: "normal" },
    { path: "./fonts/plus-jakarta-sans-v12-latin_latin-ext-600.woff2", weight: "600", style: "normal" },
    { path: "./fonts/plus-jakarta-sans-v12-latin_latin-ext-700.woff2", weight: "700", style: "normal" },
    { path: "./fonts/plus-jakarta-sans-v12-latin_latin-ext-800.woff2", weight: "800", style: "normal" },
  ],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  title: "SULA MOB — Panel de Control",
  description: "Sistema de seguimiento de producción — SULA MOB",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="es"
      className={`${jakarta.variable} h-full antialiased dark`}
    >
      <body
        className="min-h-full flex flex-col bg-[#0a0a0a]"
        style={{ fontFamily: "var(--font-jakarta), system-ui, sans-serif" }}
      >
        {children}
      </body>
    </html>
  );
}