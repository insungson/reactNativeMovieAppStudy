import React, { useState, useEffect } from "react";
import { tvApi } from "../../api";
import TvPresenter from "./TvPresenter";

const TvContainer = () => {
  const [shows, setShows] = useState({
    loading: true,
    today: [],
    todayError: null,
    thisWeek: [],
    thisWeekError: null,
    topRated: [],
    topRatedError: null,
    popular: [],
    popularError: null,
  });

  const getData = async () => {
    const [today, todayError] = await tvApi.today();
    const [thisWeek, thisWeekError] = await tvApi.thisWeek();
    const [topRated, topRatedError] = await tvApi.topRated();
    const [popular, popularError] = await tvApi.popular();
    setShows({
      loading: false,
      today,
      todayError,
      thisWeek,
      thisWeekError,
      topRated,
      topRatedError,
      popular,
      popularError,
    });
  };

  useEffect(() => {
    getData();
  }, []);

  return <TvPresenter refreshFn={getData} {...shows} />;
};

export default TvContainer;
