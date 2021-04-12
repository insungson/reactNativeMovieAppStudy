// Dimensions 는 screen 의 치수를 가져온다.
import React from 'react';
import styled from 'styled-components/native';
import Swiper from 'react-native-web-swiper';
import { Dimensions, ActivityIndicator } from 'react-native';
import Slide from '../../components/Movies/Slide';

const {width, height} = Dimensions.get("screen");

// 아래의 ``은 태그드탬플릿으로 아래의 링크를 참고하자
// https://velog.io/@lesh/%ED%85%9C%ED%94%8C%EB%A6%BF-%EB%A6%AC%ED%84%B0%EB%9F%B4Template-Literal%EA%B3%BC-%EC%8A%A4%ED%83%80%EC%9D%BC%EB%93%9C-%EC%BB%B4%ED%8F%AC%EB%84%8C%ED%8A%B8styled-component
const Container = styled.View`
  flex: 1;
  background-color: black;
  justify-content: center;
`;

// const Header = styled.View`
//   width: 100%;
//   height: ${height / 3}px;
// `;

// const Section = styled.View`
//   background-color: red;
//   height: 100%;
// `;

// const Text = styled.Text``;

const MoviePresenter = ({loading, nowPlaying}) => {
  // ActivityIndicator 는 react-native에서 제공하는것으로 폰에서 로딩되는 것을 보여준다.

  // Swiper의 옵션은 아래의 링크에서 확인해보면 된다
  // https://www.npmjs.com/package/react-native-web-swiper
  return (
    <Container>
      {loading ? (
        <ActivityIndicator color="white" size="small" />
      ) : (
        <>
          <Swiper controlsEnabled={false} loop timeout={3} >
            {nowPlaying.map((movie) => (
              <Slide 
                key={movie.id}
                id={movie.id}
                title={movie.original_language}
                overview={movie.overview}
                votes={movie.vote_average}
                backgroundImage={movie.backdrop_path}
              />
            ))}
          </Swiper>
        </>
      )}
    </Container>
  );
};

export default MoviePresenter;