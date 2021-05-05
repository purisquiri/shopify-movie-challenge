import React from "react";

import styles from "./Nominees.module.css";

export default function Nominees({ nominees, deleteNominate }) {
  return (
    <div className={styles.main}>
      <div className={styles.nomineeContainer}>
        {nominees?.map((movie) => (
          <div key={movie.imdbID} className={styles.container}>
            <img src={movie.Poster} alt="movie" className={styles.poster} />
            <p className={styles.description}>
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
    </div>
  );
}
