"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { getMovies } from "@/app/lib/actions";
import { NowPlayingResponse, Movie } from "@/app/lib/definitions";
import { Card } from "@/app/ui/dashboard/cards";
import Modal from "@/app/ui/dashboard/modals";

export default function Page() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const loaderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function fetchMovies() {
      try {
        const data: NowPlayingResponse = await getMovies(currentPage);
        setMovies((prevMovies) => {
          const combined = [...prevMovies, ...data.results];
          const uniqueMovies = Array.from(
            new Map(combined.map((movie) => [movie.id, movie])).values(),
          );
          return uniqueMovies;
        });
        setTotalPages(data.total_pages);
      } catch (error) {
        console.error("Erreur lors du chargement des films :", error);
      }
    }
    fetchMovies();
  }, [currentPage]);

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const target = entries[0];
      if (target.isIntersecting && currentPage < totalPages) {
        setCurrentPage((prev) => prev + 1);
      }
    },
    [currentPage, totalPages],
  );

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "20px",
      threshold: 1.0,
    };
    const observer = new IntersectionObserver(handleObserver, options);
    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }
    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
    };
  }, [handleObserver]);

  // Gestion du clic sur une carte pour ouvrir la modal
  const handleCardClick = (movie: Movie) => {
    setSelectedMovie(movie);
    setModalOpen(true);
  };

  return (
    <div className="min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <h1 className="text-4xl font-bold text-center mb-8">
        Welcome to Dashmovie
      </h1>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {movies.map((movie) => (
          <Card
            key={movie.id}
            movie={movie}
            onClick={() => handleCardClick(movie)}
          />
        ))}
      </div>
      {/* Élément sentinelle pour charger la page suivante */}
      <div ref={loaderRef} className="py-4 text-center">
        {currentPage < totalPages ? "Loading more movies..." : "No more movies"}
      </div>
      {isModalOpen && selectedMovie && (
        <Modal
          isOpen={isModalOpen}
          onCloseAction={() => setModalOpen(false)}
          movieId={selectedMovie.id}
        />
      )}
    </div>
  );
}
