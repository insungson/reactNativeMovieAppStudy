import React, {useEffect, useState} from "react";
import { View, Text } from "react-native";
import {movieApi} from '../api';

const Favs = () => {
  const [movies, setMovies] = useState({
    results: [],
    error: null
  });
  const getData = async() => {
    const [results, error] = await movieApi.discover();
    setMovies({
      results,
      error
    });
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <View>
      <Text>{movies.results.length}</Text>
    </View>
)};

export default Favs;
