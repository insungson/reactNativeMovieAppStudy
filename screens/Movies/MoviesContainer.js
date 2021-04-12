import React, {useEffect, useState} from "react";
import { View, Text, Button } from "react-native"; //Button 은 title이 필수로 들어가야 한다 string 형
import {movieApi} from '../../api';
import MoviePresenter from './MoviePresenter';

//https://www.npmjs.com/package/react-native-web-swiper
// Movie 컴포넌트에 슬라이더를 위의 라이브러리를 사용하여 적용시킬 것이다!! (이건 웹으로도 가능함!)

const Movies = () => {
  const [movies, setMovies] = useState({
    loading: true,
    nowPlaying: [],
    popular: [],
    upcoming: [],
    nowPlayingError: null,
    popularError: null,
    upcomingError: null
  });

  const getData = async() => {
    const [nowPlaying, nowPlayingError] = await movieApi.nowPlaying();
    const [popular, popularError] = await movieApi.popular();
    const [upcoming, upcomingError] = await movieApi.upcoming();
    setMovies({
      loading: false,
      nowPlaying, nowPlayingError,
      popular, popularError,
      upcoming, upcomingError
    });
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    // <View style={{ flex: 1, backgroundColor: "black" }}>
    //   <Text style={{color: "white"}}>{movies.nowPlaying?.length}</Text>
    // </View>
    <MoviePresenter {...movies} />  //이렇게 현재 state를 MoviePresenter로 다 넘겨준다.
)};

export default Movies;
