import { NextResponse } from "next/server";
import { DetailedMovie } from "@/app/lib/definitions";

const BASE_URL = process.env.BASE_API_URL;
const API_KEY = process.env.API_KEY;

const GET_CONFIG = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
};

export async function GET(
  request: Request,
  { params }: { params: Record<string, string> },
) {
  const movieId = parseInt(params.id, 10);
  try {
    const res = await fetch(
      `${BASE_URL}movie/${movieId}?language=en-US`,
      GET_CONFIG,
    );
    if (!res.ok) return NextResponse.error();
    const data: DetailedMovie = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Erreur lors de la récupération du film :", error);
    return NextResponse.error();
  }
}
