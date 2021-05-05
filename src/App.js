//Modules
import React, { useState, useEffect } from "react";
import axios from "axios";

//Components
import Movies from "./components/Movies/Movies";
import Nominees from "./components/Nominees/Nominees";
import Search from "./components/Search/Search";

//Styles
import styles from "./App.module.css";

function App() {
  const [data, setData] = useState([]);
  const [query, setQuery] = useState("");
  const [nominees, setNominees] = useState([]);
  //const { REACT_APP_API_KEY } = process.env;
  // const key = process.env.REACT_APP_API_KEY;

  useEffect(() => {
    setNominees(
      window.localStorage.getItem("nominees")
        ? JSON.parse(localStorage.getItem("nominees"))
        : []
    );
  }, []);

  useEffect(() => {
    fetchData();
    localStorage.setItem("nominees", JSON.stringify(nominees));
  }, [nominees]);

  const fetchData = () => {
    axios
      .get(
        `https://www.omdbapi.com/?s=${query}&apikey=${process.env.REACT_APP_API_KEY}&type=movie`
      )
      .then((response) => {
        const newData = response.data.Search?.map((movie) => {
          movie.isNominate = nominees?.some((el) => el.imdbID === movie.imdbID);
          return movie;
        });
        setData(newData);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  console.log(data);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchData();
  };

  const handleNominee = (movie) => {
    if (nominees.length < 5) {
      setNominees((prevState) => [...prevState, movie]);
    } else {
      alert("You can only nominate up to 5 movies, and not the same one");
    }
  };

  const deleteNominate = (movieId) => {
    setNominees(nominees.filter((movie) => movie.imdbID !== movieId));
  };

  return (
    <div className={styles.main}>
      <div className={styles.title}>The Shoppies</div>
      <Search query={query} setQuery={setQuery} handleSearch={handleSearch} />
      <Movies data={data} query={query} handleNominee={handleNominee} />
      <Nominees nominees={nominees} deleteNominate={deleteNominate} />
    </div>
  );
}

export default App;
