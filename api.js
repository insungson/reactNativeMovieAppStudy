// a7e53a1c449e667172b82c0149875128
// 위는 movie database api 키이고 아래는 api 라이브러리 모음 주소이다.
//https://developers.themoviedb.org/3/authentication/how-do-i-generate-a-session-id
import axios from "axios";

const TMDB_KEY = "a7e53a1c449e667172b82c0149875128";

const makeRequest = (path, params) => {
  axios.get(`https://api.themoviedb.org/3${path}`, {
    params: {
      ...params,
      api_key: TMDB_KEY,
    },
  });
};

export const movieApi = {
  nowPlaying: () => makeRequest(),
  popular: () => makeRequest(),
  upcoming: () => makeRequest(),
  search: (word) => makeRequest(),
  movie: (id) => makeRequest(),
  discover: () => makeRequest(),
};

export const tvApi = {
  today: () => makeRequest(),
  thisWeek: () => makeRequest(),
  topRated: () => makeRequest(),
  popular: () => makeRequest(),
  search: (word) => makeRequest(),
  show: (id) => makeRequest(),
};
