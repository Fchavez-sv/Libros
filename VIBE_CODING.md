# Vibe Coding: proceso de desarrollo con IA

Este proyecto se construyó usando una IA (Claude Code) como copiloto. Aquí se documentan los prompts principales, las iteraciones, las decisiones técnicas y los problemas que aparecieron.

## Prompts principales

### 1. Prompt inicial

> Construir una aplicación web con Next.js: un buscador de libros usando la API de Open Library, con la interfaz en español. Rutas: `/` (inicio con temas), `/libros` (buscador, Client Component que consume `/api/libros`), `/libros/[id]` (detalle, Server Component), `/temas/[tema]` (libros de un tema, Server Component), `/mi-lista` (libros guardados en localStorage) y `/api/libros` (Route Handler). Requisitos: Next.js 16 con App Router y TypeScript, Tailwind CSS, useState y useEffect, diseño responsive, loading.tsx, error.tsx, not-found.tsx y variables de entorno con un `.env.example`. Hacer un commit por cada paso.

### 2. Indicaciones adicionales

> Antes de programar, prueba la API con curl para confirmar que responde.

> Next.js 16 tiene cambios: lee la documentación en `node_modules/next/dist/docs` antes de escribir código. Por ejemplo, error.tsx recibe la prop `retry`, los params son una Promise y con Cache Components un componente que use usePathname debe ir dentro de `<Suspense>`.

> Antes de cada commit, verifica con `npx tsc --noEmit`, `npm run lint` y `npm run build`.

### 3. Cambio en Mi lista

> Corrige el error de ESLint `react-hooks/set-state-in-effect` en la página de Mi lista y en el botón de guardar.

## Iteraciones

| # | Paso | Resultado |
| --- | --- | --- |
| 1 | Probar la API con curl | Se confirmaron los endpoints `search.json`, `works/{id}.json`, `subjects/{tema}.json` y las portadas |
| 2 | Crear el proyecto con `create-next-app` | Next.js 16.4 con TypeScript, Tailwind y Cache Components activado |
| 3 | Layout, navegación y variables de entorno | Encabezado con Navbar dentro de `<Suspense>`, `.env.example` documentado |
| 4 | Página de inicio con temas | Diez temas con nombre en español y su equivalente en inglés |
| 5 | Route Handler `/api/libros` | Búsqueda por título, autor o ambos, con validación y manejo de errores |
| 6 | Buscador en `/libros` | Client Component con `useState` y `useEffect` |
| 7 | Detalle en `/libros/[id]` | Server Component con portada, autor, año y descripción |
| 8 | Temas en `/temas/[tema]` | Server Component con los libros del tema |
| 9 | Mi lista | Guardado en `localStorage`; se rehízo con `useSyncExternalStore` por un error de lint |
| 10 | loading, error y not-found | Páginas especiales en español |
| 11 | Documentación | README.md y este archivo |

## Decisiones técnicas

- **Route Handler como intermediario.** El buscador (Client Component) no llama directamente a Open Library, sino a `/api/libros`. Así la URL de la API queda en una variable de entorno del servidor y el formato de los datos se simplifica antes de llegar al navegador.
- **Funciones de datos en `lib/openlibrary.ts`.** Las usan tanto el Route Handler como los Server Components, para no repetir código.
- **Caché con `use cache`.** Como el proyecto tiene Cache Components activado, las funciones que consultan la API usan `"use cache"` y `cacheLife("hours")`. Así no se consulta Open Library en cada visita.
- **Detalle con dos consultas.** `works/{id}.json` trae la descripción y la portada, pero el autor solo como una referencia (`/authors/OL...`) y la fecha en formatos irregulares (por ejemplo "March 1999"). Por eso también se consulta `search.json?q=key:"/works/{id}"`, que devuelve el nombre del autor y el año de primera publicación.
- **Temas con slugs en español.** Las URLs son `/temas/novela`, `/temas/historia`, etc., y en `lib/temas.ts` se traducen al subject en inglés que usa Open Library (`fiction`, `history`...). Un tema que no está en la lista muestra la página de no encontrado.
- **Validación del id.** En `/libros/[id]` se revisa que el id tenga el formato `OL123W` antes de consultar la API.
- **Tipografía del sistema.** Se quitaron las fuentes Geist que trae el proyecto por defecto y se usa Arial, así no hay que descargar fuentes externas.

## Desafíos y soluciones

### 1. `PageProps` no existía al revisar los tipos

Al ejecutar `npx tsc --noEmit` apareció el error `Type '"/libros/[id]"' does not satisfy the constraint 'AppRoutes'`. Los tipos `PageProps` y `LayoutProps` de Next.js 16 se generan automáticamente y aún no incluían la ruta nueva.

**Solución:** ejecutar `npx next typegen` (o `npm run build`) antes de `tsc` para regenerar los tipos de las rutas.

### 2. Las portadas redirigen a otro dominio

`covers.openlibrary.org` responde con una redirección 302 hacia servidores de archive.org, lo que complica usar `next/image` (habría que permitir varios dominios en `remotePatterns`).

**Solución:** usar una etiqueta `<img>` normal y desactivar la regla `@next/next/no-img-element` de ESLint.

### 3. Error de lint al leer `localStorage` en `useEffect`

La primera versión de "Mi lista" leía `localStorage` dentro de un `useEffect` y guardaba el resultado con `setState`. ESLint (React 19) marcó el error `react-hooks/set-state-in-effect`: llamar a `setState` directamente dentro de un efecto provoca renderizados extra.

No se podía leer `localStorage` en el valor inicial de `useState` porque en el servidor no existe y causaría un error de hidratación.

**Solución:** crear el hook `useMiLista` en `lib/mi-lista.ts` con `useSyncExternalStore`, que es la forma que recomienda React para leer datos externos. En el servidor devuelve `null` (se muestra "Cargando...") y en el navegador lee la lista. Además, al guardar se lanza un evento para que el botón del detalle y la página de la lista se actualicen al mismo tiempo, incluso entre pestañas.

### 4. Parámetros de ruta con Cache Components

Con Cache Components, los `params` de una ruta dinámica sin `generateStaticParams` son datos de tiempo de ejecución y su acceso debe estar dentro de un `<Suspense>`.

**Solución:** el `loading.tsx` envuelve las páginas en un `<Suspense>` automáticamente, así que las páginas pueden hacer `await params` y el build genera un "static shell" con el texto "Cargando...".

### 5. El Navbar usa `usePathname`

Para marcar el enlace activo, el Navbar usa `usePathname`. Con Cache Components, este componente debe ir dentro de `<Suspense>` en el layout.

**Solución:** envolver `<Navbar />` en `<Suspense>` con un espacio vacío como fallback.

### 6. Estado 200 en libros que no existen

Al pedir `/libros/OL999999999W` la página muestra "Página no encontrada", pero el código HTTP es 200. Según la documentación de Next.js 16, si el streaming ya empezó (por el `loading.tsx`) el código no puede cambiar a 404; Next.js agrega `<meta name="robots" content="noindex">` en su lugar. Se dejó así porque es el comportamiento esperado.

### 7. Probar la página de error

Para probar `error.tsx` se levantó la aplicación con `OPEN_LIBRARY_API_URL` apuntando a una dirección inválida. El Route Handler respondió con el error 502 en español y las páginas de temas lanzaron el error que captura `error.tsx`.
