import Image from "next/image";
import { Movie } from "@/app/lib/definitions";

interface CardProps {
  movie: Movie;
  onClick: () => void;
}

export function Card({ movie, onClick }: CardProps) {
  const imageUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "/fallback_image.jpg";

  return (
    <div className="cursor-pointer" onClick={onClick}>
      <Image
        src={imageUrl}
        alt={movie.title}
        width={500}
        height={750}
        className="rounded-md"
      />
      <h3 className="text-center mt-2 font-bold">{movie.title}</h3>
    </div>
  );
}
