// app/api/movies/[page]/route.ts

import { NextResponse } from "next/server";
import { NowPlayingResponse } from "@/app/lib/definitions";

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
  { params }: { params: { page: string } },
) {
  // Attendre que params soit résolu avant d'accéder à ses propriétés
  const { page } = await Promise.resolve(params);
  const pageNum = parseInt(page, 10) || 1;

  try {
    const res = await fetch(
      `${BASE_URL}movie/now_playing?language=en-US&page=${pageNum}`,
      GET_CONFIG,
    );
    if (!res.ok) return NextResponse.error();
    const data: NowPlayingResponse = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Erreur lors de la récupération des films :", error);
    return NextResponse.error();
  }
}
