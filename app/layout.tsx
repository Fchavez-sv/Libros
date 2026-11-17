import type { Metadata } from "next";
import { Suspense } from "react";
import Navbar from "@/components/Navbar";
import "./globals.css";

const nombreApp = process.env.NEXT_PUBLIC_APP_NAME || "Buscador de Libros";

export const metadata: Metadata = {
  title: nombreApp,
  description: "Busca libros usando la API de Open Library",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es">
      <body className="min-h-screen flex flex-col">
        <header className="bg-teal-700 text-white">
          <div className="max-w-5xl mx-auto px-4 py-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <span className="text-xl font-bold">{nombreApp}</span>
            <Suspense fallback={<nav className="h-6" />}>
              <Navbar />
            </Suspense>
          </div>
        </header>
        <main className="flex-1 w-full max-w-5xl mx-auto px-4 py-6">
          {children}
        </main>
        <footer className="border-t border-stone-300 text-center text-sm text-stone-600 py-4">
          Datos de{" "}
          <a href="https://openlibrary.org" className="underline">
            Open Library
          </a>
        </footer>
      </body>
    </html>
  );
}
