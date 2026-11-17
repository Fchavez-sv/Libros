import Link from "next/link";

export default function NotFound() {
  return (
    <div className="bg-white border border-stone-300 rounded p-6 text-center">
      <h1 className="text-2xl font-bold mb-2">Página no encontrada</h1>
      <p className="mb-4">
        El libro, tema o página que buscas no existe.
      </p>
      <Link href="/" className="bg-teal-700 text-white rounded px-4 py-2 inline-block">
        Volver al inicio
      </Link>
    </div>
  );
}
