import React, { useState } from "react";
import { db } from "./firebase";
import { useCollectionData } from "react-firebase-hooks/firestore"; // this dependency does not support latest version of firebase
import TextField from "@material-ui/core/TextField";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Data } from "./components/Data";

export default function App() {
  const [formInput, setFormInput] = useState("");
  const [queryText, setQueryText] = useState("");
  const [movies, loading, error] = useCollectionData(
    db
      .collection("movies")
      .where("production_countries", "array-contains", queryText)
  );

  return (
    <div>
      <TextField
        id="standard-basic"
        onChange={(e) => setFormInput(e.target.value)}
        onKeyPress={(e) => {
          e.key === "Enter" && setQueryText(formInput);
        }}
        error={(!movies || (!!queryText && movies.length === 0)) && !loading}
        label="Country"
        style={{ width: 300 }}
      />
      <br />

      {loading ? (
        <CircularProgress />
      ) : (
        // when movies has been retrieved and is not empty, pass data to Data component
        <span>{movies && movies.length !== 0 && <Data movies={movies} />}</span>
      )}
      {error}
    </div>
  );
}
