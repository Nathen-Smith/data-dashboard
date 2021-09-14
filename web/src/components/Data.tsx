import React from "react";
import { DocumentData } from "firebase/firestore";
import { BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Bar } from "recharts";

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

interface GenreData {
  count: number;
  genre: string;
}

interface GenresDataArr extends Array<GenreData> {}

export const Data: React.FC<DataProps> = ({ movies }) => {
  /*  We can use JSON.stringify to convert Firebase's type of DocumentData,
      then use JSON.parse to get the string into an array of objects where
      we define the types.  */
  const moviesObj = movies.map<MovieMetadata>((movie) =>
    JSON.parse(JSON.stringify(movie))
  );

  const totalBudget = moviesObj.reduce(function (a, b) {
    return b.budget ? a + b.budget : a;
  }, 0);
  const countMoviesWithRatings = moviesObj.reduce(function (a, b) {
    return b.vote_average ? a + 1 : a;
  }, 0);
  const sumAvgRatings = moviesObj.reduce(function (a, b) {
    return b.vote_average ? a + b.vote_average : a;
  }, 0);
  const avgRatings = (sumAvgRatings / countMoviesWithRatings).toFixed(2);

  /*  First get a count of all the genres in a Map, then convert to
      an array of objects so it can be plotted  */
  var genresMap = new Map<string, number>();
  moviesObj.forEach((movie) => {
    movie.genres.forEach((genre) => {
      genresMap.has(genre.name)
        ? genresMap.set(genre.name, genresMap.get(genre.name)! + 1)
        : genresMap.set(genre.name, 1);
    });
  });
  var res: GenresDataArr = [];
  genresMap.forEach((count, genre) => {
    res.push({ count, genre });
  });

  function numberWithCommas(x: number) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  } // https://stackoverflow.com/questions/2901102/how-to-print-a-number-with-commas-as-thousands-separators-in-javascript
  const totalBudgetWithCommas = numberWithCommas(totalBudget);
  const moviesCountWithCommas = numberWithCommas(moviesObj.length);

  return (
    <div>
      <br />
      <div>Movies count: {moviesCountWithCommas}</div>
      <div>Total budget: ${totalBudgetWithCommas}</div>
      <div>Average ratings: {avgRatings}</div>
      <br />

      <BarChart width={730} height={250} data={res}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="genre" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="count" fill="#82ca9d" />
      </BarChart>
    </div>
  );
};
