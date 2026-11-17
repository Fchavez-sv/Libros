export type Libro = {
  id: string;
  titulo: string;
  autores: string[];
  anio: number | null;
  portada: number | null;
};

export type DetalleLibro = Libro & {
  descripcion: string;
};
