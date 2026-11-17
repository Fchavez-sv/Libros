import Link from "next/link";
import Portada from "./Portada";
import type { Libro } from "@/lib/tipos";

export default function LibroCard({ libro }: { libro: Libro }) {
  return (
    <Link
      href={`/libros/${libro.id}`}
      className="block bg-white border border-stone-300 rounded p-3 hover:border-teal-700"
    >
      <Portada portada={libro.portada} titulo={libro.titulo} />
      <h3 className="font-bold mt-2">{libro.titulo}</h3>
      <p className="text-sm text-stone-600">
        {libro.autores.length > 0 ? libro.autores.join(", ") : "Autor desconocido"}
      </p>
      {libro.anio && <p className="text-sm text-stone-600">{libro.anio}</p>}
    </Link>
  );
}
