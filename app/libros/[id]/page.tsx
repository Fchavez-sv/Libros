import Link from "next/link";
import { notFound } from "next/navigation";
import BotonGuardar from "@/components/BotonGuardar";
import Portada from "@/components/Portada";
import { obtenerLibro } from "@/lib/openlibrary";

export default async function DetalleLibroPage({
  params,
}: PageProps<"/libros/[id]">) {
  const { id } = await params;

  if (!/^OL\d+W$/.test(id)) {
    notFound();
  }

  const libro = await obtenerLibro(id);

  if (!libro) {
    notFound();
  }

  return (
    <div>
      <Link href="/libros" className="underline text-teal-700">
        ← Volver al buscador
      </Link>

      <div className="mt-4 bg-white border border-stone-300 rounded p-4 flex flex-col sm:flex-row gap-6">
        <div className="w-48 mx-auto sm:mx-0 shrink-0">
          <Portada portada={libro.portada} titulo={libro.titulo} tamano="L" />
        </div>

        <div className="flex-1">
          <h1 className="text-2xl font-bold">{libro.titulo}</h1>
          <p className="mt-2">
            <span className="font-bold">Autor: </span>
            {libro.autores.length > 0 ? libro.autores.join(", ") : "Desconocido"}
          </p>
          <p>
            <span className="font-bold">Año de publicación: </span>
            {libro.anio ?? "Desconocido"}
          </p>

          <div className="mt-4">
            <BotonGuardar
              libro={{
                id: libro.id,
                titulo: libro.titulo,
                autores: libro.autores,
                anio: libro.anio,
                portada: libro.portada,
              }}
            />
          </div>

          <h2 className="text-lg font-bold mt-4 mb-1">Descripción</h2>
          <p className="whitespace-pre-line">
            {libro.descripcion || "Este libro no tiene descripción disponible."}
          </p>

          <a
            href={`https://openlibrary.org/works/${libro.id}`}
            target="_blank"
            rel="noreferrer"
            className="inline-block mt-4 underline text-teal-700"
          >
            Ver en Open Library
          </a>
        </div>
      </div>
    </div>
  );
}
