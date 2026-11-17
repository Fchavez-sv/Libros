"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const enlaces = [
  { href: "/", texto: "Inicio" },
  { href: "/libros", texto: "Buscar" },
  { href: "/mi-lista", texto: "Mi lista" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="flex gap-4">
      {enlaces.map((enlace) => {
        const activo =
          enlace.href === "/"
            ? pathname === "/"
            : pathname.startsWith(enlace.href);
        return (
          <Link
            key={enlace.href}
            href={enlace.href}
            className={activo ? "underline font-bold" : "hover:underline"}
          >
            {enlace.texto}
          </Link>
        );
      })}
    </nav>
  );
}
