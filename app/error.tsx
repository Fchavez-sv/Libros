"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function Error({
  error,
  retry,
}: {
  error: unknown;
  retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="bg-white border border-red-300 rounded p-6 text-center">
      <h1 className="text-2xl font-bold mb-2">Algo salió mal</h1>
      <p className="mb-4">
        No pudimos cargar la información. Puede que Open Library no esté
        respondiendo en este momento.
      </p>
      <div className="flex justify-center gap-4">
        <button
          onClick={() => retry()}
          className="bg-teal-700 text-white rounded px-4 py-2"
        >
          Intentar de nuevo
        </button>
        <Link href="/" className="border border-stone-400 rounded px-4 py-2">
          Ir al inicio
        </Link>
      </div>
    </div>
  );
}
