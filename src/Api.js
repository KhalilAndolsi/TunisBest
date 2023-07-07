

export const searchData = async (type, search, page = 1) => {
  try {
    const response = await fetch(`https://api.themoviedb.org/3/search/${type}?api_key=0837e565ad5cfe363d2809af848fa88c&query=${search}&include_adult=false&language=en-US&page=${(page).toString()}`);
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(err)
  }
};


export const trending = async (type, time = "day") => {
  try {
    const response = await fetch(`https://api.themoviedb.org/3/trending/${type}/${time}?api_key=0837e565ad5cfe363d2809af848fa88c&language=en-US`);
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(err)
  }
};


export const genres = async (id) => {
  try {
    const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=0837e565ad5cfe363d2809af848fa88c&language=en-US`);
    const data = await response.json();
    return data.genres.map((g) => g.name).join(" | ");
  } catch (err) {
    console.error(err)
  }
};

export const popular = async (type, page = 1) => {
  try {
    const response = await fetch(`https://api.themoviedb.org/3/${type}/popular?api_key=0837e565ad5cfe363d2809af848fa88c&language=en-US&page=${page}`);
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(err)
  }
};

export const nowPlaying = async (type, page = 1) => {
  try {
    const response = await fetch(`https://api.themoviedb.org/3/${type}/now_playing?api_key=0837e565ad5cfe363d2809af848fa88c&language=en-US&page=${page}`);
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(err)
  }
};

export const topRated = async (type, page = 1) => {
  try {
    const response = await fetch(`https://api.themoviedb.org/3/${type}/top_rated?api_key=0837e565ad5cfe363d2809af848fa88c&language=en-US&page=${page}`);
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(err)
  }
};


export const details = async (type, id) => {
  try {
    const response = await fetch(`https://api.themoviedb.org/3/${type}/${id}?api_key=0837e565ad5cfe363d2809af848fa88c&language=en-US`);
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(err)
  }
};

export const getSeasonData = async (id, season = 1) => {
  try {
    const response = await fetch(`https://api.themoviedb.org/3/tv/${id}/season/${season}?api_key=0837e565ad5cfe363d2809af848fa88c&language=en-US`);
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(err)
  }
};
