import React, { useEffect, useState } from "react";
import "./Home.css";
import Header from "../header/Header";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Link } from "react-router-dom";
import { nowPlaying, popular, topRated, trending } from "../../Api";
import SwiperCore, { Autoplay, Pagination } from "swiper";
import Footer from "../footer/Footer";

SwiperCore.use([Autoplay, Pagination]);

const Home = () => {
  const [trendingData, setTrendingData] = useState([]);
  const [popularMovie, setPopularMovie] = useState([]);
  const [popularSerie, setPopularSerie] = useState([]);
  const [moviesNowPlaying, setMoviesNowPlaying] = useState([]);
  const [seriesTopRated, setSeriesTopRated] = useState([]);
  const [moviesTopRated, setMoviesTopRated] = useState([]);

  useEffect(() => {
    trending("all", "day")
      .then((data) => (data ? setTrendingData(data) : undefined))
      .catch((err) => err);
    popular("movie")
      .then((data) => setPopularMovie(data))
      .catch((err) => err);
    popular("tv")
      .then((data) => setPopularSerie(data))
      .catch((err) => err);
    nowPlaying("movie")
      .then((data) => setMoviesNowPlaying(data))
      .catch((err) => err);
    topRated("tv")
      .then((data) => setSeriesTopRated(data))
      .catch((err) => err);
    topRated("movie")
      .then((data) => setMoviesTopRated(data))
      .catch((err) => err);
  }, []);

  const coverIsLoadingNow = [
    <SwiperSlide className="item" key={0}>wait...</SwiperSlide>,
    <SwiperSlide className="item" key={1}>wait...</SwiperSlide>,
    <SwiperSlide className="item" key={2}>wait...</SwiperSlide>,
    <SwiperSlide className="item" key={3}>wait...</SwiperSlide>,
    <SwiperSlide className="item" key={4}>wait...</SwiperSlide>
  ]
  const cardsIsLoadingNow = [
    <SwiperSlide className="card" key={0}>wait...</SwiperSlide>,
    <SwiperSlide className="card" key={1}>wait...</SwiperSlide>,
    <SwiperSlide className="card" key={2}>wait...</SwiperSlide>,
    <SwiperSlide className="card" key={3}>wait...</SwiperSlide>,
    <SwiperSlide className="card" key={4}>wait...</SwiperSlide>,
    <SwiperSlide className="card" key={5}>wait...</SwiperSlide>,
    <SwiperSlide className="card" key={6}>wait...</SwiperSlide>,
    <SwiperSlide className="card" key={7}>wait...</SwiperSlide>,
    <SwiperSlide className="card" key={8}>wait...</SwiperSlide>,
    <SwiperSlide className="card" key={9}>wait...</SwiperSlide>,
    <SwiperSlide className="card" key={10}>wait...</SwiperSlide>,
    <SwiperSlide className="card" key={11}>wait...</SwiperSlide>,
    <SwiperSlide className="card" key={12}>wait...</SwiperSlide>,
    <SwiperSlide className="card" key={13}>wait...</SwiperSlide>,
    <SwiperSlide className="card" key={14}>wait...</SwiperSlide>,
    <SwiperSlide className="card" key={15}>wait...</SwiperSlide>,
    <SwiperSlide className="card" key={16}>wait...</SwiperSlide>,
    <SwiperSlide className="card" key={17}>wait...</SwiperSlide>,
    <SwiperSlide className="card" key={18}>wait...</SwiperSlide>,
    <SwiperSlide className="card" key={19}>wait...</SwiperSlide>
  ]

  return (
    <>
      <Header />
      <Swiper
        className="coverCarousel"
        slidesPerView={1}
        spaceBetween={0}
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        speed={1000}
        pagination={{
          clickable: true,
        }}
        modules={[Autoplay, Pagination]}
      >
        {trendingData.length !== 0
          ? trendingData.results.slice(0, 5).map((t, i) => (
              <SwiperSlide className="item" key={i}>
                <img
                  src={`https://image.tmdb.org/t/p/w500${t.backdrop_path}`}
                  alt="background"
                  className="bg"
                />
                <div className="card">
                  <img
                    src={`https://image.tmdb.org/t/p/w500${t.poster_path}`}
                    alt="poster"
                  />
                  <div>
                    <h2 className="title">{t.name || t.title}</h2>
                    <p className="overview">{t.overview}</p>
                    <h5 className="date">
                      {t.media_type === "tv" ? "serie " : "movie "}
                      {t.first_air_date || t.release_date}
                    </h5>
                    <div className="rate">
                      <i className="fa-solid fa-star"></i>
                      <span>{t.vote_average.toFixed(1)}</span>
                    </div>
                  </div>
                </div>
                <button type="button" className="play">
                  <Link
                    to={`/${t.media_type === "tv" ? `series/${t.id}/1/1` : `movie/${t.id}`}`}>
                    <i className="fa-regular fa-circle-play"></i>
                    <span>PLAY NOW!</span>
                  </Link>
                </button>
              </SwiperSlide>
            ))
          : coverIsLoadingNow}
      </Swiper>
      <div className=" homeParts">
        <div className="containerParts">
          <h3 className="titleOfPart">Popular Movies</h3>
          <Swiper
            className="partOfCards"
            // ken il cards 12 i slidePerview ye5ou inso mte3hom weli hiya 6 bech i loop tekhdim
            slidesPerView="auto"
            spaceBetween={0}
            loop={true}
            autoplay={{
              delay: 1500,
              disableOnInteraction: false,
              reverseDirection: true,
            }}
            speed={2000}
            modules={[Autoplay]}
          >
            {popularMovie.length !== 0 ? popularMovie.results.map(d => (
              <SwiperSlide className="card" key={`movie_${d.id}`}>
                <Link to={`/movie/${d.id}`}>
                  <img src={`https://image.tmdb.org/t/p/w500${d.poster_path}`} alt={`poster_${d.id}`} />
                  <div>
                    <h4 className="title">{d.title}</h4>
                    <span><i className="fa-solid fa-star"></i>{(d.vote_average).toFixed(1)}</span>
                    <i className="fa-regular fa-circle-play fa-2x playIcon"></i>
                  </div>
                </Link>
              </SwiperSlide>
            )) : cardsIsLoadingNow}
          </Swiper>
        </div>
        <div className="containerParts">
          <h3 className="titleOfPart">Popular Series</h3>
          <Swiper
            className="partOfCards"
            // ken il cards 12 i slidePerview ye5ou inso mte3hom weli hiya 6 bech i loop tekhdim
            slidesPerView="auto"
            spaceBetween={0}
            loop={true}
            autoplay={{
              delay: 1500,
              disableOnInteraction: false,
              reverseDirection: false,
            }}
            speed={2000}
            modules={[Autoplay]}
          >
            {popularSerie.length !== 0 ? popularSerie.results.map(d => (
              <SwiperSlide className="card" key={`serie_${d.id}`}>
                <Link to={`/series/${d.id}/1/1`}>
                  <img src={`https://image.tmdb.org/t/p/w500${d.poster_path}`} alt={`poster_${d.id}`} />
                  <div>
                    <h4 className="title">{d.name}</h4>
                    <span><i className="fa-solid fa-star"></i>{(d.vote_average).toFixed(1)}</span>
                    <i className="fa-regular fa-circle-play fa-2x playIcon"></i>
                  </div>
                </Link>
              </SwiperSlide>
            )) : cardsIsLoadingNow}
          </Swiper>
        </div>
        <div className="containerParts">
          <h3 className="titleOfPart">Movies Now Playing</h3>
          <Swiper
            className="partOfCards"
            // ken il cards 12 i slidePerview ye5ou inso mte3hom weli hiya 6 bech i loop tekhdim
            slidesPerView="auto"
            spaceBetween={0}
            loop={true}
            autoplay={{
              delay: 1500,
              disableOnInteraction: false,
              reverseDirection: true,
            }}
            speed={2000}
            modules={[Autoplay]}
          >
            {moviesNowPlaying.length !== 0 ? moviesNowPlaying.results.map(d => (
              <SwiperSlide className="card" key={`movie_${d.id}`}>
                <Link to={`/movie/${d.id}`}>
                  <img src={`https://image.tmdb.org/t/p/w500${d.poster_path}`} alt={`poster_${d.id}`} />
                  <div>
                    <h4 className="title">{d.title}</h4>
                    <span><i className="fa-solid fa-star"></i>{(d.vote_average).toFixed(1)}</span>
                    <i className="fa-regular fa-circle-play fa-2x playIcon"></i>
                  </div>
                </Link>
              </SwiperSlide>
            )) : cardsIsLoadingNow}
          </Swiper>
        </div>
        <div className="containerParts">
          <h3 className="titleOfPart">Series Top Rated</h3>
          <Swiper
            className="partOfCards"
            // ken il cards 12 i slidePerview ye5ou inso mte3hom weli hiya 6 bech i loop tekhdim
            slidesPerView="auto"
            spaceBetween={0}
            loop={true}
            autoplay={{
              delay: 1500,
              disableOnInteraction: false,
              reverseDirection: false,
            }}
            speed={2000}
            modules={[Autoplay]}
          >
            {seriesTopRated.length !== 0 ? seriesTopRated.results.map(d => (
              <SwiperSlide className="card" key={`serie_${d.id}`}>
                <Link to={`/series/${d.id}/1/1`}>
                  <img src={`https://image.tmdb.org/t/p/w500${d.poster_path}`} alt={`poster_${d.id}`} />
                  <div>
                    <h4 className="title">{d.name}</h4>
                    <span><i className="fa-solid fa-star"></i>{(d.vote_average).toFixed(1)}</span>
                    <i className="fa-regular fa-circle-play fa-2x playIcon"></i>
                  </div>
                </Link>
              </SwiperSlide>
            )) : cardsIsLoadingNow}
          </Swiper>
        </div>
        <div className="containerParts">
          <h3 className="titleOfPart">Movies Top Rated</h3>
          <Swiper
            className="partOfCards"
            // ken il cards 12 i slidePerview ye5ou inso mte3hom weli hiya 6 bech i loop tekhdim
            slidesPerView="auto"
            spaceBetween={0}
            loop={true}
            autoplay={{
              delay: 1500,
              disableOnInteraction: false,
              reverseDirection: true,
            }}
            speed={2000}
            modules={[Autoplay]}
          >
            {moviesTopRated.length !== 0 ? moviesTopRated.results.map(d => (
              <SwiperSlide className="card" key={`movie_${d.id}`}>
                <Link to={`/movie/${d.id}`}>
                  <img src={`https://image.tmdb.org/t/p/w500${d.poster_path}`} alt={`poster_${d.id}`} />
                  <div>
                    <h4 className="title">{d.title}</h4>
                    <span><i className="fa-solid fa-star"></i>{(d.vote_average).toFixed(1)}</span>
                    <i className="fa-regular fa-circle-play fa-2x playIcon"></i>
                  </div>
                </Link>
              </SwiperSlide>
            )) : cardsIsLoadingNow}
          </Swiper>
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default Home;
