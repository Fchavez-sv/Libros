# Buscador de Libros

Aplicación web hecha con Next.js para buscar libros usando la API pública de [Open Library](https://openlibrary.org/developers/api). Permite buscar por título o autor, ver el detalle de cada libro, explorar libros por tema y guardar libros en una lista personal para leer después.

**URL en Vercel:** _pendiente_

## Tecnologías

- Next.js 16 (App Router, Cache Components)
- React 19
- TypeScript
- Tailwind CSS 4
- API de Open Library (gratuita, no necesita clave)

## Instalación

Requisitos: Node.js 20 o superior.

```bash
git clone <url-del-repositorio>
cd buscador-libros
npm install
cp .env.example .env.local
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en el navegador.

## Variables de entorno

Están documentadas en `.env.example`. Copia ese archivo como `.env.local` para desarrollo.

| Variable | Descripción | Valor por defecto |
| --- | --- | --- |
| `NEXT_PUBLIC_APP_NAME` | Nombre de la aplicación que aparece en el encabezado y en el título de la pestaña | `Buscador de Libros` |
| `OPEN_LIBRARY_API_URL` | URL base de la API de Open Library (solo se usa en el servidor) | `https://openlibrary.org` |
| `NEXT_PUBLIC_COVERS_URL` | URL base de las portadas de Open Library (se usa en el navegador) | `https://covers.openlibrary.org` |

Las variables con prefijo `NEXT_PUBLIC_` se incluyen en el código del navegador al hacer el build, por lo que si se cambian hay que volver a desplegar.

## Rutas

| Ruta | Tipo | Descripción |
| --- | --- | --- |
| `/` | Server Component | Inicio con la lista de temas |
| `/libros` | Client Component | Buscador por título o autor que consume `/api/libros` |
| `/libros/[id]` | Server Component | Detalle del libro: portada, autor, año y descripción |
| `/temas/[tema]` | Server Component | Libros de un tema (novela, historia, ciencia, etc.) |
| `/mi-lista` | Client Component | Libros guardados para leer (en `localStorage`) |
| `/api/libros` | Route Handler | Consulta la búsqueda de Open Library. Parámetros: `q` (texto) y `tipo` (`todo`, `titulo` o `autor`) |

También hay páginas especiales:

- `app/loading.tsx`: se muestra mientras cargan los datos.
- `app/error.tsx`: se muestra si falla la consulta a Open Library, con un botón para reintentar.
- `app/not-found.tsx`: se muestra para rutas, libros o temas que no existen.

## Estructura del proyecto

```
app/
  api/libros/route.ts    Route Handler de búsqueda
  libros/page.tsx        Buscador
  libros/[id]/page.tsx   Detalle del libro
  temas/[tema]/page.tsx  Libros por tema
  mi-lista/page.tsx      Lista de libros guardados
  layout.tsx, loading.tsx, error.tsx, not-found.tsx
components/              Componentes reutilizables (tarjetas, buscador, botón guardar...)
lib/
  openlibrary.ts         Funciones que consultan la API
  temas.ts               Lista de temas
  mi-lista.ts            Lectura y escritura de la lista en localStorage
  tipos.ts               Tipos de TypeScript
```

## Scripts

| Comando | Descripción |
| --- | --- |
| `npm run dev` | Inicia el servidor de desarrollo |
| `npm run build` | Genera la versión de producción |
| `npm run start` | Inicia la versión de producción (después de `build`) |
| `npm run lint` | Revisa el código con ESLint |
| `npx tsc --noEmit` | Revisa los tipos de TypeScript |

## Despliegue

El proyecto está desplegado en Vercel. Para desplegar una copia:

1. Importar el repositorio en [vercel.com/new](https://vercel.com/new).
2. Agregar las variables de entorno de la tabla anterior.
3. Presionar **Deploy**.

## Documentación del proceso

El proceso de desarrollo con IA está descrito en [VIBE_CODING.md](VIBE_CODING.md).
