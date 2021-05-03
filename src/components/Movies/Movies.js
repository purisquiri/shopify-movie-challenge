import React from "react";
import styles from "./Movies.module.css";
import oscars from "./oscars.jpeg";

export default function Movies({ data, query, handleNominee }) {
  return (
    <div className={styles.main}>
      results for {query}
      <img src={oscars} alt="oscar" className={styles.image} />
      {data?.map((movie) => (
        <div key={movie.imdbID} className={styles.container}>
          <span className={styles.title}>
            {movie.Title} {movie.Year}
          </span>
          <button
            onClick={() => handleNominee(movie)}
            className={styles.button}
            disabled={movie.isNominate}
          >
            Nominate
          </button>
        </div>
      ))}
    </div>
  );
}
