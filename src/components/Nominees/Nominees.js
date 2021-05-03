import React from "react";

import styles from "./Nominees.module.css";
//import movie from "./movie.jpeg";

export default function Nominees({ nominees, deleteNominate }) {
  //console.log(movies);
  return (
    <div className={styles.main}>
      You can Nominate up to five:
      {nominees?.map((movie) => (
        <div key={movie.imdbID} className={styles.container}>
          <img src={movie.Poster} alt="movie" className={styles.poster} />
          <p className={styles.description}>
            {movie.Title}
            <button
              onClick={() => deleteNominate(movie.imdbID)}
              className={styles.button}
            >
              remove
            </button>
          </p>
        </div>
      ))}
    </div>
  );
}
