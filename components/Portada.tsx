const COVERS_URL =
  process.env.NEXT_PUBLIC_COVERS_URL || "https://covers.openlibrary.org";

type Props = {
  portada: number | null;
  titulo: string;
  tamano?: "M" | "L";
};

export default function Portada({ portada, titulo, tamano = "M" }: Props) {
  if (!portada) {
    return (
      <div className="w-full aspect-[2/3] bg-stone-200 border border-stone-300 flex items-center justify-center text-sm text-stone-500">
        Sin portada
      </div>
    );
  }

  return (
    <img
      src={`${COVERS_URL}/b/id/${portada}-${tamano}.jpg`}
      alt={`Portada de ${titulo}`}
      className="w-full aspect-[2/3] object-cover border border-stone-300"
    />
  );
}
