import { NowPlayingResponse, DetailedMovie } from "@/app/lib/definitions";

export async function getMovies(page: number = 1): Promise<NowPlayingResponse> {
  try {
    const response = await fetch(`/api/movies/${page}`);
    if (!response.ok) {
      throw new Error(`Erreur API: ${response.status}`);
    }
    const data = await response.json();
    return data as NowPlayingResponse;
  } catch (error) {
    console.error("Erreur lors de la récupération des films :", error);
    throw error;
  }
}

export async function getMovie(id: number): Promise<DetailedMovie> {
  try {
    const response = await fetch(`/api/movie/${id}`);
    if (!response.ok) {
      throw new Error(`Erreur API: ${response.status}`);
    }
    const data = await response.json();
    return data as DetailedMovie;
  } catch (error) {
    console.error("Erreur lors de la récupération du film :", error);
    throw error;
  }
}
