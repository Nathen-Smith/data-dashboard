import React from "react";
import { db } from "./firebase";
import { useCollectionData } from "react-firebase-hooks/firestore"; // this dependency does not support latest version of firebase
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

export default function App() {
  // const moviesRef = ;
  // const q = moviesRef.orderBy;
  const [movies, loading, error] = useCollectionData(
    db
      .collection("movies")
      .where("production_countries.name", "==", "United States of America")
  );
  return (
    <div>
      {movies &&
        movies.map((movie) => (
          <React.Fragment key={movie.id}>
            {JSON.stringify(movie)},{" "}
          </React.Fragment>
        ))}
    </div>
  );
}
