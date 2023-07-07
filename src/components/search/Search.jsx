import React, { useEffect, useState } from "react";
import "./Search.css";
import Header from "../header/Header";
import { useParams } from "react-router-dom";
import { searchData } from "../../Api";
import { Link } from "react-router-dom";

function MoviesCard(props) {
  return (
    <Link to={`/movie/${props.id}`}>
      <img src={props.img} alt={props.title} />
      <div className="infos">
        <h2>{props.title}</h2>
        <div>
          <i className="fa-solid fa-star"></i>
          <span>{props.rate.toFixed(1)}</span>
        </div>
        <i className="fa-regular fa-circle-play playIcon"></i>
      </div>
    </Link>
  );
}
function SeriesCard(props) {
  return (
    <Link to={`/series/${props.id}/1/1`}>
      <img src={props.img} alt={props.title} />
      <div className="infos">
        <h2>{props.title}</h2>
        <div>
          <i className="fa-solid fa-star"></i>
          <span>{props.rate.toFixed(1)}</span>
        </div>
        <i className="fa-regular fa-circle-play playIcon"></i>
      </div>
    </Link>
  );
}

function Search() {
  const { search } = useParams();
  const [series, setSeries] = useState([])
  const [movies, setMovies] = useState([])


  useEffect(() => {
    searchData("tv", search)
      .then((data) => data ? setSeries(data) : undefined)
      .catch((err) => err);
    searchData("movie", search)
      .then((data) => data ? setMovies(data) : undefined)
      .catch((err) => console.error(err));
  }, [search]);

  

  const showSeries = series.results ? series.results.map((d, i) => (
    d.poster_path ? <SeriesCard
      id={d.id}
      img={`https://image.tmdb.org/t/p/w500${d.poster_path}`}
      title={d.original_name}
      rate={d.vote_average}
      key={d.id}
    /> : undefined
  )) : undefined

  const showMovies = movies.results ? movies.results.map((d, i) => (
    d.poster_path ? <MoviesCard
      id={d.id}
      img={`https://image.tmdb.org/t/p/w500${d.poster_path}`}
      title={d.original_title}
      rate={d.vote_average}
      key={d.id}
    /> : undefined
  )) : undefined



  return (
    <>
      <Header search={search} />
      <div className="container">
        <h4 className="searchTitle">Movies that have the name "{search}"</h4>
        <div className="searchListMovies lists">{showMovies}</div>
        <h4 className="searchTitle">Series that have the name "{search}"</h4>
        <div className="searchListSeries lists">{showSeries}</div>
      </div>
    </>
  );
}

export default Search;
