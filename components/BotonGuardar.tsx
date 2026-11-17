"use client";

import { useMiLista } from "@/lib/mi-lista";
import type { Libro } from "@/lib/tipos";

export default function BotonGuardar({ libro }: { libro: Libro }) {
  const { libros, agregar, quitar } = useMiLista();

  if (libros === null) {
    return <p>Cargando...</p>;
  }

  const guardado = libros.some((item) => item.id === libro.id);

  return (
    <button
      onClick={() => (guardado ? quitar(libro.id) : agregar(libro))}
      className={
        guardado
          ? "border border-teal-700 text-teal-700 bg-white rounded px-4 py-2"
          : "bg-teal-700 text-white rounded px-4 py-2"
      }
    >
      {guardado ? "Quitar de mi lista" : "Guardar en mi lista"}
    </button>
  );
}
