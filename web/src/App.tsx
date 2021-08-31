import React, { useState } from "react";
import { db } from "./firebase";
import { useCollectionData } from "react-firebase-hooks/firestore"; // this dependency does not support latest version of firebase
import TextField from "@material-ui/core/TextField";
import CircularProgress from "@material-ui/core/CircularProgress";

export default function App() {
  const [formInput, setFormInput] = useState("");
  const [queryText, setQueryText] = useState("");
  const [movies, loading, error] = useCollectionData(
    db.collection("movies").where("production_countries.name", "==", queryText)
  );

  return (
    <div>
      <TextField
        id="standard-basic"
        onChange={(e) => setFormInput(e.target.value)}
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            setQueryText(formInput);
          }
        }}
        error={!movies && !loading}
        label="Country"
      />
      <br />

      {loading ? (
        <CircularProgress />
      ) : (
        <span>
          {movies &&
            movies.map((movie) => (
              <React.Fragment key={movie.id}>
                {JSON.stringify(movie)},{" "}
              </React.Fragment>
            ))}
        </span>
      )}
      {error}
    </div>
  );
}
