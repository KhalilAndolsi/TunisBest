import React, { useEffect, useState } from "react";
import Header from "../../header/Header";
import Footer from "../../footer/Footer";
import { useParams } from "react-router-dom";
import { details } from "../../../Api";
import "./TheMovie.css";

function TheMovie() {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [trailerHide, setTrailerHide] = useState(false);

  useEffect(() => {
    details("movie", id)
      .then((data) => setData(data))
      .catch((err) => console.error(err));
  }, [id]);

  function addToFavorites(e) {
    e.target.parentElement.classList.toggle("active");
    if (JSON.parse(localStorage.getItem(id)) === null) {
      localStorage.setItem(
        id,
        JSON.stringify({
          fav: true,
          watched: false,
          type: "movie",
          img: data.poster_path,
          rate: (data.vote_average).toFixed(1),
          title: data.title
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
                <h2>{data ? data.title : "....."}</h2>
                <p className="type">
                  <span>Movie</span>{" "}
                  {data.genres.map((g) => g.name).join(" , ")}
                </p>
                <span>
                  <b>Release Date in </b>
                  {data.release_date}
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
                        src={`https://autoembed.to/trailer/movie/${data.imdb_id}`}
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
              src={`https://autoembed.to/movie/tmdb/${data.id}`}
              allowFullScreen
              title="movie"
            ></iframe>
          </div>
        </div>
      ) : undefined}
      <Footer />
    </>
  );
}

export default TheMovie;
