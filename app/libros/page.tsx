import type { Metadata } from "next";
import Buscador from "@/components/Buscador";

export const metadata: Metadata = {
  title: "Buscar libros",
};

export default function LibrosPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Buscar libros</h1>
      <Buscador />
    </div>
  );
}
