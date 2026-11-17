"use client";

import Link from "next/link";
import Portada from "@/components/Portada";
import { useMiLista } from "@/lib/mi-lista";

export default function MiListaPage() {
  const { libros, quitar } = useMiLista();

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Mi lista para leer</h1>

      {libros === null && <p>Cargando...</p>}

      {libros !== null && libros.length === 0 && (
        <p>
          Todavía no has guardado libros.{" "}
          <Link href="/libros" className="underline text-teal-700">
            Busca uno
          </Link>{" "}
          y presiona &quot;Guardar en mi lista&quot;.
        </p>
      )}

      {libros !== null && libros.length > 0 && (
        <>
          <p className="mb-3 text-stone-600">{libros.length} libros guardados</p>
          <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {libros.map((libro) => (
              <li
                key={libro.id}
                className="bg-white border border-stone-300 rounded p-3"
              >
                <Link href={`/libros/${libro.id}`}>
                  <Portada portada={libro.portada} titulo={libro.titulo} />
                  <h3 className="font-bold mt-2 hover:underline">{libro.titulo}</h3>
                </Link>
                <p className="text-sm text-stone-600">
                  {libro.autores.join(", ") || "Autor desconocido"}
                </p>
                <button
                  onClick={() => quitar(libro.id)}
                  className="mt-2 text-sm text-red-700 underline"
                >
                  Quitar
                </button>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
