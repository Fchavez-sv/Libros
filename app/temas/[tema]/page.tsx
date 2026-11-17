import Link from "next/link";
import { notFound } from "next/navigation";
import ListaLibros from "@/components/ListaLibros";
import { librosPorTema } from "@/lib/openlibrary";
import { buscarTema, temas } from "@/lib/temas";

export default async function TemaPage({ params }: PageProps<"/temas/[tema]">) {
  const { tema: slug } = await params;
  const tema = buscarTema(slug);

  if (!tema) {
    notFound();
  }

  const libros = await librosPorTema(tema.subject);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-2">Libros de {tema.nombre}</h1>

      <div className="flex flex-wrap gap-2 mb-6">
        {temas.map((otro) => (
          <Link
            key={otro.slug}
            href={`/temas/${otro.slug}`}
            className={
              otro.slug === tema.slug
                ? "border border-teal-700 bg-teal-700 text-white rounded px-2 py-1 text-sm"
                : "border border-stone-300 bg-white rounded px-2 py-1 text-sm hover:border-teal-700"
            }
          >
            {otro.nombre}
          </Link>
        ))}
      </div>

      {libros.length > 0 ? (
        <ListaLibros libros={libros} />
      ) : (
        <p>No hay libros para este tema.</p>
      )}
    </div>
  );
}
