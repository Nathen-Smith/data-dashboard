import React from "react";
import { DocumentData } from "firebase/firestore";
// recharts for dataviz?

interface DataProps {
  movies: DocumentData[];
}

interface MovieMetadata {
  adult: boolean;
  belongs_to_collection: {
    id: number;
    name: string;
    poster_path: string;
    backdrop_path: string;
  };
  budget: number;
  genres: [{ id: number; name: string }];
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: [{ id: number; name: string }];
  // production_countries: {
  //   iso_3166_1: string;
  //   name: string;
  // };
  production_countries: [string];
  release_date: Date;
  revenue: number;
  runtime: number;
  spoken_languages: [{ iso_639_1: string; name: string }];
  status: string;
  tagline: string;
  title: string;
  video: false;
  vote_average: number;
  vote_count: number;
}

export const Data: React.FC<DataProps> = ({ movies }) => {
  const moviesMap = movies.map((movie) => JSON.stringify(movie));
  const moviesObj = moviesMap.map<MovieMetadata>((movie) => JSON.parse(movie));
  const totalBudget = moviesObj.reduce(function (a, b) {
    return b.budget ? a + b.budget : a;
  }, 0);

  return (
    <div>
      <div>Movies count: {moviesObj.length}</div>
      <div>Total budget: {totalBudget}</div>
      <br />

      <span>{/* {JSON.stringify(moviesObj)} */}</span>
    </div>
  );
};
