"use client";

import { useSyncExternalStore } from "react";
import type { Libro } from "./tipos";

const CLAVE = "mi-lista";
const EVENTO = "mi-lista-cambio";

function suscribirse(avisar: () => void) {
  window.addEventListener("storage", avisar);
  window.addEventListener(EVENTO, avisar);
  return () => {
    window.removeEventListener("storage", avisar);
    window.removeEventListener(EVENTO, avisar);
  };
}

function leerTexto() {
  return localStorage.getItem(CLAVE) ?? "[]";
}

function leerTextoServidor() {
  return null;
}

function convertir(texto: string): Libro[] {
  try {
    return JSON.parse(texto);
  } catch {
    return [];
  }
}

export function guardarLista(libros: Libro[]) {
  localStorage.setItem(CLAVE, JSON.stringify(libros));
  window.dispatchEvent(new Event(EVENTO));
}

// Devuelve null mientras se renderiza en el servidor (no hay localStorage).
export function useMiLista() {
  const texto = useSyncExternalStore(suscribirse, leerTexto, leerTextoServidor);
  const libros = texto === null ? null : convertir(texto);

  function agregar(libro: Libro) {
    guardarLista([...convertir(leerTexto()), libro]);
  }

  function quitar(id: string) {
    guardarLista(convertir(leerTexto()).filter((libro) => libro.id !== id));
  }

  return { libros, agregar, quitar };
}
