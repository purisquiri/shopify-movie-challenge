//Modules
import React from "react";

//Styles
import styles from "./Search.module.css";

export default function Search({ query, setQuery, handleSearch }) {
  return (
    <div className={styles.container}>
      <form onSubmit={handleSearch} className={styles.search}>
        <input
          type="text"
          placeholder="search a title and enter"
          className={styles.input}
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
      </form>
    </div>
  );
}
