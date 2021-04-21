import React, { useState } from "react";
import SearchPresenter from "./SearchPresenter";
import { movieApi, tvApi } from "../../api";

const SearchContainer = () => {
  const [keyWord, setKeyWord] = useState("");
  const [results, setResults] = useState({
    movies: [],
    shows: [],
    movieError: null,
    showsError: null,
  });
  const onChange = (text) => setKeyWord(text);
  const search = async () => {
    // searchPresenter 에서 ScrollContainer 로 넘겨줄때.. api를 요청하는 onSubmit을 넘기므로..
    // 상위 컴포넌트인 SearchContainer 에서 keyWord의 문자열이 없을때 빈값을 리턴해줘서 에러방지
    if (keyWord == "") {
      return;
    }
    const [movies, movieError] = await movieApi.search(keyWord);
    const [shows, showsError] = await tvApi.search(keyWord);
    setResults({
      movies,
      movieError,
      shows,
      showsError,
    });
  };

  return (
    <SearchPresenter
      {...results}
      onChange={onChange}
      onSubmit={search}
      keyword={keyWord}
    />
  );
};

export default SearchContainer;
