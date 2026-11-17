import LibroCard from "./LibroCard";
import type { Libro } from "@/lib/tipos";

export default function ListaLibros({ libros }: { libros: Libro[] }) {
  return (
    <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      {libros.map((libro) => (
        <li key={libro.id}>
          <LibroCard libro={libro} />
        </li>
      ))}
    </ul>
  );
}
