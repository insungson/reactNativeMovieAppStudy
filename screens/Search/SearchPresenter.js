import React from "react";
import styled from "styled-components/native";
import Input from "../../components/Search/Input";
import HorizontalSlider from "../../components/HorizontalSilder";
import Vertical from "../../components/Vertical";
import PropTypes from "prop-types";
import ScrollContainer from "../../components/ScrollContainer";

const Container = styled.ScrollView`
  background-color: black;
`;

const SearchPresenter = ({ movies, shows, keyWord, onChange, onSubmit }) => {
  return (
    <ScrollContainer
      refreshFn={onSubmit}
      loading={false}
      contentContainerStyle={{
        paddingTop: 10,
      }}
    >
      <Input
        placeHolder={"write a keyWord"}
        value={keyWord}
        onChange={onChange}
        onSubmit={onSubmit}
      />
      {movies.length !== 0 && (
        <HorizontalSlider title={"Movie Results"}>
          {movies.map((movie) => (
            <Vertical
              key={movie.id}
              id={movie.id}
              votes={movie.vote_average}
              title={movie.title}
              poster={movie.poster_path || movie.backdrop_path}
            />
          ))}
        </HorizontalSlider>
      )}
      {shows.length !== 0 && (
        <HorizontalSlider title={"TV Results"}>
          {shows.map((show) => (
            <Vertical
              isTv={true}
              key={show.id}
              id={show.id}
              votes={show.vote_average}
              title={show.name}
              poster={show.poster_path}
            />
          ))}
        </HorizontalSlider>
      )}
    </ScrollContainer>
  );
};

SearchPresenter.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.object),
  shows: PropTypes.arrayOf(PropTypes.object),
  keyWord: PropTypes.string,
  onChange: PropTypes.func,
  onSubmit: PropTypes.func,
};

export default SearchPresenter;
