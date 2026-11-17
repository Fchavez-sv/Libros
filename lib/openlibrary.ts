import { cacheLife } from "next/cache";
import type { DetalleLibro, Libro } from "./tipos";

const API_URL = process.env.OPEN_LIBRARY_API_URL || "https://openlibrary.org";

type DocBusqueda = {
  key: string;
  title: string;
  author_name?: string[];
  first_publish_year?: number;
  cover_i?: number;
};

type ObraTema = {
  key: string;
  title: string;
  authors?: { name: string }[];
  first_publish_year?: number;
  cover_id?: number | null;
};

async function pedirJson(url: string) {
  const respuesta = await fetch(url, { signal: AbortSignal.timeout(15000) });
  if (!respuesta.ok) {
    throw new Error(`Open Library respondió con estado ${respuesta.status}`);
  }
  return respuesta.json();
}

function quitarPrefijo(key: string) {
  return key.replace("/works/", "");
}

function convertirDoc(doc: DocBusqueda): Libro {
  return {
    id: quitarPrefijo(doc.key),
    titulo: doc.title,
    autores: doc.author_name ?? [],
    anio: doc.first_publish_year ?? null,
    portada: doc.cover_i ?? null,
  };
}

export async function buscarLibros(texto: string, tipo: string) {
  "use cache";
  cacheLife("hours");

  let campo = "q";
  if (tipo === "titulo") campo = "title";
  if (tipo === "autor") campo = "author";

  const params = new URLSearchParams({
    [campo]: texto,
    fields: "key,title,author_name,first_publish_year,cover_i",
    limit: "24",
  });

  const datos = await pedirJson(`${API_URL}/search.json?${params}`);
  return (datos.docs as DocBusqueda[]).map(convertirDoc);
}

export async function obtenerLibro(id: string): Promise<DetalleLibro | null> {
  "use cache";
  cacheLife("hours");

  const respuestaObra = await fetch(`${API_URL}/works/${id}.json`, {
    signal: AbortSignal.timeout(15000),
  });
  if (respuestaObra.status === 404) {
    return null;
  }
  if (!respuestaObra.ok) {
    throw new Error(`Open Library respondió con estado ${respuestaObra.status}`);
  }
  const obra = await respuestaObra.json();

  const params = new URLSearchParams({
    q: `key:"/works/${id}"`,
    fields: "key,title,author_name,first_publish_year,cover_i",
  });
  const busqueda = await pedirJson(`${API_URL}/search.json?${params}`);
  const doc: DocBusqueda | undefined = busqueda.docs[0];

  let descripcion = "";
  if (typeof obra.description === "string") {
    descripcion = obra.description;
  } else if (obra.description?.value) {
    descripcion = obra.description.value;
  }

  return {
    id,
    titulo: obra.title,
    autores: doc?.author_name ?? [],
    anio: doc?.first_publish_year ?? null,
    portada: obra.covers?.[0] ?? doc?.cover_i ?? null,
    descripcion,
  };
}

export async function librosPorTema(subject: string) {
  "use cache";
  cacheLife("hours");

  const datos = await pedirJson(`${API_URL}/subjects/${subject}.json?limit=24`);
  return (datos.works as ObraTema[]).map(
    (obra): Libro => ({
      id: quitarPrefijo(obra.key),
      titulo: obra.title,
      autores: obra.authors?.map((autor) => autor.name) ?? [],
      anio: obra.first_publish_year ?? null,
      portada: obra.cover_id ?? null,
    })
  );
}
