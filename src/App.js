//Modules
import React, { useState, useEffect } from "react";
import axios from "axios";

//Components
import Movies from "./components/Movies/Movies";
import Nominees from "./components/Nominees/Nominees";
import Search from "./components/Search/Search";

//Styles
import styles from "./App.module.css";

//localStorage
// const pastNominees = JSON.parse(localStorage.getItem("pastNominees"));

function App() {
  const [data, setData] = useState([]);
  const [query, setQuery] = useState("");
  const [nominees, setNominees] = useState([]);
  const key = process.env.REACT_APP_API_KEY;

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
      .get(`http://www.omdbapi.com/?s=${query}&apikey=${key}&type=movie`)
      .then((response) => {
        // console.log(response.data.Search);
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
      // localStorage.setItem("pastNominees", JSON.stringify(nominees));
    } else {
      alert("You can only nominate up to 5 movies, and not the same one");
    }
  };

  const deleteNominate = (movieId) => {
    setNominees(nominees.filter((movie) => movie.imdbID !== movieId));
  };

  // const disableButton = (id) => {
  //   const alreadyExist = nominees.map((element) => element.imdbID === id);

  //   if (alreadyExist) {
  //     setIsNominate(true);
  //   }
  // };

  return (
    <div className={styles.main}>
      <div className={styles.title}>The Shoppies</div>
      <Search query={query} setQuery={setQuery} handleSearch={handleSearch} />
      <Movies
        data={data}
        query={query}
        handleNominee={handleNominee}
        // isNominate={isNominate}
      />
      <Nominees nominees={nominees} deleteNominate={deleteNominate} />
    </div>
  );
}

export default App;
