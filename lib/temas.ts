export type Tema = {
  slug: string;
  nombre: string;
  subject: string;
};

export const temas: Tema[] = [
  { slug: "novela", nombre: "Novela", subject: "fiction" },
  { slug: "historia", nombre: "Historia", subject: "history" },
  { slug: "ciencia", nombre: "Ciencia", subject: "science" },
  { slug: "fantasia", nombre: "Fantasía", subject: "fantasy" },
  { slug: "ciencia-ficcion", nombre: "Ciencia ficción", subject: "science_fiction" },
  { slug: "misterio", nombre: "Misterio", subject: "mystery" },
  { slug: "romance", nombre: "Romance", subject: "romance" },
  { slug: "poesia", nombre: "Poesía", subject: "poetry" },
  { slug: "biografia", nombre: "Biografía", subject: "biography" },
  { slug: "infantil", nombre: "Infantil", subject: "children" },
];

export function buscarTema(slug: string) {
  return temas.find((tema) => tema.slug === slug);
}
