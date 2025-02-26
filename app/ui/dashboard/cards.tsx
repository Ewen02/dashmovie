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
    <div
      onClick={onClick}
      className="cursor-pointer rounded-lg shadow-md transition-all duration-300 hover:scale-105 hover:shadow-xl"
    >
      <div className="relative overflow-hidden rounded-t-lg">
        <Image
          src={imageUrl}
          alt={movie.title}
          width={500}
          height={750}
          className="object-cover w-full h-auto"
        />
      </div>
      <div className="bg-gray-800 p-4 rounded-b-lg">
        <h3 className="text-white text-center text-xl font-semibold">
          {movie.title}
        </h3>
      </div>
    </div>
  );
}
