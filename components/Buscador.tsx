"use client";

import { useEffect, useState } from "react";
import ListaLibros from "./ListaLibros";
import type { Libro } from "@/lib/tipos";

export default function Buscador() {
  const [texto, setTexto] = useState("");
  const [tipo, setTipo] = useState("todo");
  const [busqueda, setBusqueda] = useState({ texto: "", tipo: "todo" });
  const [libros, setLibros] = useState<Libro[]>([]);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (busqueda.texto === "") return;

    let cancelado = false;

    async function buscar() {
      setCargando(true);
      setError("");
      try {
        const params = new URLSearchParams({
          q: busqueda.texto,
          tipo: busqueda.tipo,
        });
        const respuesta = await fetch(`/api/libros?${params}`);
        const datos = await respuesta.json();
        if (cancelado) return;
        if (!respuesta.ok) {
          setError(datos.error);
          setLibros([]);
        } else {
          setLibros(datos.libros);
        }
      } catch {
        if (!cancelado) setError("Ocurrió un error de conexión.");
      } finally {
        if (!cancelado) setCargando(false);
      }
    }

    buscar();

    return () => {
      cancelado = true;
    };
  }, [busqueda]);

  function enviar(evento: React.FormEvent<HTMLFormElement>) {
    evento.preventDefault();
    setBusqueda({ texto: texto.trim(), tipo });
  }

  return (
    <div>
      <form onSubmit={enviar} className="flex flex-col sm:flex-row gap-2 mb-6">
        <input
          type="text"
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
          placeholder="Ej. Cien años de soledad"
          className="flex-1 border border-stone-400 rounded px-3 py-2 bg-white"
        />
        <select
          value={tipo}
          onChange={(e) => setTipo(e.target.value)}
          className="border border-stone-400 rounded px-3 py-2 bg-white"
        >
          <option value="todo">Título o autor</option>
          <option value="titulo">Solo título</option>
          <option value="autor">Solo autor</option>
        </select>
        <button
          type="submit"
          className="bg-teal-700 text-white rounded px-4 py-2"
        >
          Buscar
        </button>
      </form>

      {cargando && <p>Cargando...</p>}
      {error && <p className="text-red-700">{error}</p>}

      {!cargando && !error && busqueda.texto !== "" && libros.length === 0 && (
        <p>No se encontraron libros para &quot;{busqueda.texto}&quot;.</p>
      )}

      {!cargando && libros.length > 0 && (
        <>
          <p className="mb-3 text-stone-600">{libros.length} resultados</p>
          <ListaLibros libros={libros} />
        </>
      )}
    </div>
  );
}
