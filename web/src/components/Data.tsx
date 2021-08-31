import React from "react";
import { DocumentData } from "firebase/firestore";

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
  // homepage:
  id: number;
  // imdb_id:
  // original_language:
  // original_title:
  // overview:
  // popularity:
  // poster_path:
  // production_companies:
  production_countries: {
    iso_3166_1: string;
    name: string;
  };
  // release_date:
  // revenue:
  // runtime:
  // spoken_languages:
  // status:
  // tagline:
  // title:
  // video:
  // vote_average:
  // vote_count:
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

      <span>
        {/* {movies.map((movie) => (
          <React.Fragment key={movie.id}>
            {JSON.stringify(movie)},{" "}
          </React.Fragment>
        ))} */}
        {/* {obj[0]} */}
        {JSON.stringify(moviesObj)}
      </span>
    </div>
  );
};
