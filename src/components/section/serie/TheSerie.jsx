import "./TheSerie.css";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../../header/Header";
import { details, getSeasonData } from "../../../Api";
import Footer from "../../footer/Footer";
import { Link } from "react-router-dom";

function TheSerie() {
  const { id, s, ep } = useParams();
  const [data, setData] = useState([]);
  const [trailerHide, setTrailerHide] = useState(false);
  const [seasonData, setSeasonData] = useState([]);
  const [episodeData, setEpisodeData] = useState([]);

  useEffect(() => {
    details("tv", id)
      .then((data) => setData(data))
      .catch((err) => console.error(err));
  }, [id]);

  useEffect(() => {
    getSeasonData(id, s)
      .then((data) => setEpisodeData(data))
      .catch((err) => console.error(err));
  }, [id, s]);

  useEffect(() => {
    setSeasonData(
      data.length !== 0
        ? data.seasons.filter(
            (s) =>
              s.season_number !== undefined &&
              s.season_number !== 0 &&
              s.episode_count !== 0
          )
        : []
    );
  }, [data]);

  function addToFavorites(e) {
    e.target.parentElement.classList.toggle("active");
    if (JSON.parse(localStorage.getItem(id)) === null) {
      localStorage.setItem(
        id,
        JSON.stringify({
          fav: true,
          watched: false,
          type: "serie",
          img: data.poster_path,
          rate: data.vote_average.toFixed(1),
          title: data.name,
        })
      );
    } else {
      localStorage.setItem(
        id,
        JSON.stringify({
          fav: !JSON.parse(localStorage.getItem(id)).fav,
          watched: false,
        })
      );
    }
  }
  return (
    <>
      <Header />
      {data.length !== 0 ? (
        <div className="TheMovie">
          <div
            className="cover"
            style={{
              backgroundImage: `url(https://image.tmdb.org/t/p/w500${data.backdrop_path})`,
            }}
          >
            <div className="infos">
              <div className="poster">
                <img
                  src={`https://image.tmdb.org/t/p/w500${data.poster_path}`}
                  alt="poster"
                />
              </div>
              <div className="infosData">
                <h2>{data ? data.name : "....."}</h2>
                <p className="type">
                  <span>Serie</span>{" "}
                  {data.genres.map((g) => g.name).join(" , ")}
                </p>
                <span>
                  <b>Release Date in </b>
                  {data.first_air_date}
                </span>
                <p className="overview">
                  <b>Overview: </b>
                  {data.overview}
                </p>
                <div className="down">
                  <div className="rating">
                    <i className="fa-solid fa-star"></i>
                    {data.vote_average.toFixed(1)}/10
                  </div>
                  <div className="btns">
                    <button
                      type="button"
                      className={
                        JSON.parse(localStorage.getItem(id)) !== null
                          ? JSON.parse(localStorage.getItem(id)).fav
                            ? "active"
                            : ""
                          : ""
                      }
                      onClick={addToFavorites}
                    >
                      <i className="fa-solid fa-heart"></i>
                    </button>
                    <button type="button">
                      <i className="fa-solid fa-eye"></i>
                    </button>
                    <button type="button">
                      <i className="fa-solid fa-share"></i>
                    </button>
                  </div>
                </div>
                <div className="trailer">
                  <button
                    type="button"
                    className="show"
                    title="trailer"
                    onClick={() => setTrailerHide(!trailerHide)}
                  >
                    <i className="fa-regular fa-circle-play"></i>Watch Trailer
                  </button>
                  {trailerHide ? (
                    <div className={`trailerVideo`}>
                      <button
                        type="button"
                        onClick={() => setTrailerHide(!trailerHide)}
                      >
                        <i className="fa-solid fa-xmark"></i>
                      </button>
                      <iframe
                        src={`https://autoembed.to/trailer/tv/${data.id}`}
                        title="trailer"
                        allowFullScreen
                      ></iframe>
                    </div>
                  ) : undefined}
                </div>
              </div>
            </div>
          </div>
          <div className="container movieWatchSpace">
            <iframe
              src={`https://autoembed.to/tv/tmdb/${data.id}-${s}-${ep}`}
              allowFullScreen
              title="movie"
            ></iframe>
            {seasonData.length !== 0 ? (
              <div className="seasons">
                <div className="top">
                  {seasonData.map((s, i) => (
                    <Link
                      to={`/series/${id}/${s.season_number}/${ep}`}
                      className="season"
                      key={i}
                    >
                      {`Season ${s.season_number}`}
                    </Link>
                  ))}
                </div>
                <div className="down">
                  {episodeData.length !== 0 ? (
                    episodeData.episodes.map((d, i) => (
                      <Link to={`/series/${id}/${s}/${d.episode_number}`} key={i}>
                        <img
                          src={`https://image.tmdb.org/t/p/w500${d.still_path}`}
                          alt={`${d.name}`}
                          width="50px"
                        />
                        <h3>{`${d.episode_number}) ${d.name}`}</h3>
                        <button type="button" title="watched">
                          <i className="fa-regular fa-eye"></i>
                        </button>
                      </Link>
                    ))
                  ) : undefined}
                </div>
              </div>
            ) : undefined}
          </div>
        </div>
      ) : undefined}
      <Footer />
    </>
  );
}

export default TheSerie;
