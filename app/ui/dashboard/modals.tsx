"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { getMovie } from "@/app/lib/actions";
import { DetailedMovie } from "@/app/lib/definitions";
import { ModalSkeleton } from "@/app/ui/skeleton";

interface ModalProps {
  isOpen: boolean;
  onCloseAction: () => void;
  movieId: number;
}

export default function Modal({ isOpen, onCloseAction, movieId }: ModalProps) {
  const [movie, setMovie] = useState<DetailedMovie | null>(null);

  // Load the movie when the modal is open or when the movieId changes
  useEffect(() => {
    async function fetchMovie() {
      try {
        const data = await getMovie(movieId);
        setMovie(data);
      } catch (error) {
        console.error("Error loading movie:", error);
      }
    }
    if (isOpen) {
      fetchMovie();
    }
  }, [movieId, isOpen]);

  // Close the modal when the Escape key is pressed
  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onCloseAction();
      }
    }
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [onCloseAction]);

  if (!isOpen) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70"
      onClick={onCloseAction}
    >
      <div
        className="bg-gray-900 text-white p-6 rounded-lg shadow-2xl relative max-w-4xl w-full overflow-y-auto max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onCloseAction}
          className="absolute top-2 right-2 text-gray-300 hover:text-white text-2xl"
        >
          &times;
        </button>
        {movie ? (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row gap-6">
              {movie.poster_path && (
                <div className="flex-shrink-0">
                  <Image
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    width={300}
                    height={450}
                    priority
                    className="rounded-md"
                  />
                </div>
              )}
              <div className="flex flex-col gap-4">
                <h2 className="text-3xl font-bold">{movie.title}</h2>
                {movie.tagline && (
                  <p className="italic text-gray-400">{movie.tagline}</p>
                )}
                <p>{movie.overview}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <p>
                    <strong>Release Date:</strong> {movie.release_date}
                  </p>
                  <p>
                    <strong>Runtime:</strong> {movie.runtime} minutes
                  </p>
                  <p>
                    <strong>Status:</strong> {movie.status}
                  </p>
                  <p>
                    <strong>Rating:</strong> {movie.vote_average} (
                    {movie.vote_count} votes)
                  </p>
                </div>
                {movie.genres && movie.genres.length > 0 && (
                  <div>
                    <strong>Genres:</strong>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {movie.genres.map((genre) => (
                        <span
                          key={genre.id}
                          className="bg-gray-800 px-2 py-1 rounded text-sm"
                        >
                          {genre.name}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                {movie.production_companies &&
                  movie.production_companies.length > 0 && (
                    <div>
                      <strong>Production Companies:</strong>
                      <ul className="list-disc ml-5">
                        {movie.production_companies.map((company) => (
                          <li key={company.id}>
                            {company.name} ({company.origin_country})
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                {movie.production_countries &&
                  movie.production_countries.length > 0 && (
                    <div>
                      <strong>Production Countries:</strong>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {movie.production_countries.map((country) => (
                          <span
                            key={country.iso_3166_1}
                            className="bg-gray-800 px-2 py-1 rounded text-sm"
                          >
                            {country.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                {movie.spoken_languages &&
                  movie.spoken_languages.length > 0 && (
                    <div>
                      <strong>Languages:</strong>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {movie.spoken_languages.map((lang, idx) => (
                          <span
                            key={idx}
                            className="bg-gray-800 px-2 py-1 rounded text-sm"
                          >
                            {lang.english_name}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                {movie.homepage && (
                  <div>
                    <a
                      href={movie.homepage}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline text-blue-400 hover:text-blue-300"
                    >
                      Homepage
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <ModalSkeleton />
        )}
      </div>
    </div>,
    document.body,
  );
}
