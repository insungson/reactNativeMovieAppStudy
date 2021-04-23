import React, { useState, useEffect } from "react";
import FavPresenter from "./FavsPresenter";
import { movieApi } from "../../api";

const FavsContainer = () => {
  const [movies, setMovies] = useState({
    results: [],
    error: null,
  });

  const getData = async () => {
    const [results, error] = await movieApi.discover();
    setMovies({
      results,
      error,
    });
  };

  useEffect(() => {
    getData();
  }, []);

  return <FavPresenter {...movies} />;
};

export default FavsContainer;
