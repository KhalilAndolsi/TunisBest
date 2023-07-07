import React from 'react'
import Header from "../header/Header"
import Footer from "../footer/Footer"
import "./Favorites.css"
import { Link } from 'react-router-dom'

function Favorites() {
  let moviesData = []
  let seriesData = []

  for (let i = 0; i < localStorage.length; i++) {
    if (JSON.parse(localStorage.getItem(localStorage.key(i))).type === "movie") {
      const data = JSON.parse(localStorage.getItem(localStorage.key(i)))
      moviesData.push(
      <Link to={`/movie/${localStorage.key(i)}`} key={i}>
        <img src={`https://image.tmdb.org/t/p/w500${data.img}`} alt={data.title} />
        <div className="infos">
          <h2>{data.title}</h2>
          <div>
            <i className="fa-solid fa-star"></i>
            <span>{data.rate}</span>
          </div>
          <i className="fa-regular fa-circle-play playIcon"></i>
        </div>
      </Link>
      )
    } else if (JSON.parse(localStorage.getItem(localStorage.key(i))).type === "serie") {
      const data = JSON.parse(localStorage.getItem(localStorage.key(i)))
      seriesData.push(
      <Link to={`/series/${localStorage.key(i)}/1/1`} key={i}>
        <img src={`https://image.tmdb.org/t/p/w500${data.img}`} alt={data.title} />
        <div className="infos">
          <h2>{data.title}</h2>
          <div>
            <i className="fa-solid fa-star"></i>
            <span>{data.rate}</span>
          </div>
          <i className="fa-regular fa-circle-play playIcon"></i>
        </div>
      </Link>)
    }
  }
  return (
    <>
      <Header />
      <div className="favorites container">
        <h4 className="searchTitle">My Favorite Movies</h4>
        <div className="searchListMovies lists">
          {moviesData}
        </div>
        <h4 className="searchTitle">My Favorite Series</h4>
        <div className="searchListSeries lists">
          {seriesData}
        </div>
      </div>
      <Footer/>
    </>
  )
}

export default Favorites