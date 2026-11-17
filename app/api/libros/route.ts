import type { NextRequest } from "next/server";
import { buscarLibros } from "@/lib/openlibrary";

export async function GET(request: NextRequest) {
  const texto = request.nextUrl.searchParams.get("q")?.trim() ?? "";
  const tipo = request.nextUrl.searchParams.get("tipo") ?? "todo";

  if (texto.length < 2) {
    return Response.json(
      { error: "Escribe al menos 2 caracteres para buscar." },
      { status: 400 }
    );
  }

  try {
    const libros = await buscarLibros(texto, tipo);
    return Response.json({ libros });
  } catch (error) {
    console.error(error);
    return Response.json(
      { error: "No se pudo consultar Open Library. Intenta de nuevo." },
      { status: 502 }
    );
  }
}
