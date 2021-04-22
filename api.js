// a7e53a1c449e667172b82c0149875128
// 위는 movie database api 키이고 아래는 api 라이브러리 모음 주소이다.
//https://developers.themoviedb.org/3/authentication/how-do-i-generate-a-session-id
import axios from "axios";

const TMDB_KEY = "a7e53a1c449e667172b82c0149875128";

const makeRequest = (path, params) => {
  return axios.get(`https://api.themoviedb.org/3${path}`, {
    params: {
      ...params,
      api_key: TMDB_KEY,
    },
  });
};

// https://developers.themoviedb.org/3/movies/get-movie-details
// 에서 detail에 대한 api 는 결과중 results:[] 의 프로퍼티가 없다. 그래서 return 값에 nullish 처리를 해준다.
const getAnything = async (path, params = {}) => {
  try {
    const {
      data: { results },
      data, // 위에서 설명한 results 프로퍼티가없다면 undefined 가 뜨기 때문에.. 이렇게 data로 받게 만든다.
    } = await makeRequest(path, params);
    return [results || data, null]; //results가 undefined 일땐.. 위에서 설정힌 data로 전체데이터를 받는다.
  } catch (error) {
    console.log("error: ", error);
    return [null, error];
  }
};

export const movieApi = {
  nowPlaying: () => getAnything("/movie/now_playing"),
  popular: () => getAnything("/movie/popular"),
  upcoming: () => getAnything("/movie/upcoming", { region: "kr" }),
  search: (query) => getAnything("/search/movie", { query }),
  movie: (id) => getAnything(`/movie/${id}`),
  discover: () => getAnything("/discover/movie"),
};

export const tvApi = {
  today: () => getAnything("/tv/airing_today"),
  thisWeek: () => getAnything("/tv/on_the_air"),
  topRated: () => getAnything("/tv/top_rated"),
  popular: () => getAnything("/tv/popular"),
  search: (query) => getAnything("/search/tv", { query }),
  show: (id) => getAnything(`/tv/${id}`),
};

export const apiImage = (
  path,
  defaultPoster = "https://images.unsplash.com/photo-1533637322518-7aadda74ddc0?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2119&q=80"
) => {
  return path ? `https://image.tmdb.org/t/p/w500${path}` : defaultPoster;
};
