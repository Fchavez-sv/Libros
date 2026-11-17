import Link from "next/link";
import { temas } from "@/lib/temas";

export default function Home() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-2">Bienvenido</h1>
      <p className="mb-6">
        Busca libros por título o autor, revisa sus detalles y guarda los que
        quieras leer en tu lista.
      </p>

      <Link
        href="/libros"
        className="inline-block bg-teal-700 text-white px-4 py-2 rounded mb-8"
      >
        Ir al buscador
      </Link>

      <h2 className="text-xl font-bold mb-3">Explorar por tema</h2>
      <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
        {temas.map((tema) => (
          <li key={tema.slug}>
            <Link
              href={`/temas/${tema.slug}`}
              className="block bg-white border border-stone-300 rounded p-4 text-center hover:border-teal-700"
            >
              {tema.nombre}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
