import "./Header.css";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Header(props) {
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    setSearchValue(props.search || "");
  }, [props.search]);

  useEffect(() => {
    const ul = document.querySelector("header ul");
    const bars = document.querySelector("header .bars");
    bars.onclick = () => {
      ul.classList.toggle("hide")
    }
  }, [])

  useEffect(() => {
    window.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        if (document.getElementById("searchResult").getAttribute("href") !== "/") {
          document.getElementById("searchResult").click();
        }
      }
    });
  }, [])

  return (
    <header>
      <Link to="/">
        <h2 className="logo">
          <span>Tunis</span>
          <span>Best</span>
        </h2>
      </Link>
      <div className="search">
        <input
          type="text"
          name=""
          id="input"
          value={searchValue}
          placeholder="Search..."
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <button type="button">
          <Link id="searchResult" to={searchValue !== "" ? `/search/${searchValue}` : "/"}>
            <i className="fa-solid fa-magnifying-glass"></i>
          </Link>
        </button>
      </div>
      <button type="button" className="bars"><i className="fa-solid fa-bars"></i></button>
      <ul className="hide">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/favorites">Favorites</Link>
        </li>
      </ul>
    </header>
  );
}

export default Header;
