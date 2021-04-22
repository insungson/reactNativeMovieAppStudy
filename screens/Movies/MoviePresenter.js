// Dimensions 는 screen 의 치수를 가져온다.
import React from "react";
import styled from "styled-components/native";
import Swiper from "react-native-web-swiper";
import { Dimensions, ActivityIndicator, View, ScrollView } from "react-native";
import Slide from "../../components/Movies/Slide";
import Title from "../../components/Title";
import Vertical from "../../components/Vertical";
import Horizontal from "../../components/Horizontal";
import ScrollContainer from "../../components/ScrollContainer";
import HorizontalSlider from "../../components/HorizontalSilder";
import List from "../../components/List";

const { width: WIDTH, height: HEIGHT } = Dimensions.get("window");
// 위에서 screen을 가져와도 되지만.. window 가 더 잘 맞아서 그걸로 가지고 있다.
// window: width/height를 soft menu bar 없이 알려준다
// screen: screen의 width/height를 알려준다

// 아래의 ``은 태그드탬플릿으로 아래의 링크를 참고하자
// https://velog.io/@lesh/%ED%85%9C%ED%94%8C%EB%A6%BF-%EB%A6%AC%ED%84%B0%EB%9F%B4Template-Literal%EA%B3%BC-%EC%8A%A4%ED%83%80%EC%9D%BC%EB%93%9C-%EC%BB%B4%ED%8F%AC%EB%84%8C%ED%8A%B8styled-component
// const Container = styled.View`
//   flex: 1;
//   background-color: black;
//   justify-content: center;
// `;

//여러가지들을 스크롤 하기 위해 ScrollView 를 reactNative 에서 가져오자
//ScrollView 에서 "justifyContent" 는 반드시 contentContainerStyle prop을 통해서 하위레이아웃에 적용되어야 한다!!
//contentContainerStyle 는 내부 스타일에서 flex 를 설정해줘야 위치가 잘 잡힌다. 여기선 1로 줘서 TOP으로 보냈다.
//ScrollView 는 브라우저에서 자동으되는 스크롤뷰를 핸폰에선 안되기 때문에 이걸 사용해야 한다!!
// https://reactnative.dev/docs/scrollview    수많은 props 들이 있다.
// showsHorizontalScrollIndicator 는 횡스크롤바를 안보이게 해준다.

const SliderContainer = styled.View`
  width: 100%;
  height: ${HEIGHT / 3}px;
  margin-bottom: 40px;
`;

const Container = styled.View``;

const UpcomingContainer = styled.View`
  margin-top: 20px;
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

const MoviePresenter = ({
  loading,
  nowPlaying,
  popular,
  upcoming,
  refreshFn,
}) => {
  // ActivityIndicator 는 react-native에서 제공하는것으로 폰에서 로딩되는 것을 보여준다.

  // Swiper의 옵션은 아래의 링크에서 확인해보면 된다
  // https://www.npmjs.com/package/react-native-web-swiper
  return (
    // <ScrollView
    //   style={{
    //     backgroundColor: "black"
    //   }}
    //   contentContainerStyle={{
    //     flex: loading ? 1 : 0,  //loading이 아닐땐 아래로 스크롤이 가능하도록 0을 넣어준다. flex 타입은 숫자만 가능하다!!
    //     justifyContent: loading ? "center": "flex-start",
    //     // flex-start 는 가로 정렬을 기준으로 좌측(시작점) center는 가운데 flex-end 우측(끝점)
    //     // justifyContent 는 flex Direction의 진행방향으로 정렬한다.
    //     // Align Items 는 flex Direction의 진행방향의 수직적으로 정렬한다.
    //     // 즉!!! flexDirection: 'column'에서 Justify Content는 세로 정렬, flexDirection: 'row'에서 Justify Content는 가로 정렬을 뜻함
    //   }}
    // >
    //   {loading ? (
    //     <ActivityIndicator color="white" size="small" />
    //   ) : (
    //     <>
    //     <SliderContainer>
    //       <Swiper controlsEnabled={false} loop timeout={3} >
    //         {nowPlaying.map((movie) => (
    //           <Slide
    //             key={movie.id}
    //             id={movie.id}
    //             title={movie.original_title}
    //             overview={movie.overview}
    //             votes={movie.vote_average}
    //             backgroundImage={movie.backdrop_path}
    //             poster={movie.poster_path}
    //           />
    //         ))}
    //       </Swiper>
    //     </SliderContainer>
    //     <Container>
    //       <Title title={"Popular Movies"}/>
    //       <ScrollView
    //         horizontal
    //         style={{marginTop: 20, marginBottom: 40}}
    //         contentContainerStyle={{paddingLeft: 30}}
    //         showsHorizontalScrollIndicator={false}
    //       >
    //         {popular.map(movie => (
    //           <Vertical
    //             id={movie.id}
    //             key={movie.id}
    //             poster={movie.poster_path}
    //             title={movie.title}
    //             votes={movie.vote_average}
    //           />
    //         ))}
    //       </ScrollView>
    //       <Title title={"Coming Soon"}></Title>
    //       {upcoming.map(movie => (
    //         <Horizontal
    //           key={movie.id}
    //           id={movie.id}
    //           title={movie.title}
    //           releaseDate={movie.release_date}
    //           poster={movie.poster_path}
    //           overview={movie.overview}
    //         />
    //       ))}
    //     </Container>
    //     </>
    //   )}
    // </ScrollView>

    <ScrollContainer loading={loading} refreshFn={refreshFn}>
      {/* 아래는 children으로 ScrollContainer에 들어가게 된다, ScrollContainer.js 참조 */}
      <>
        <SliderContainer>
          <Swiper controlsEnabled={false} loop timeout={3}>
            {nowPlaying.map((movie) => (
              <Slide
                key={movie.id}
                id={movie.id}
                title={movie.original_title}
                overview={movie.overview}
                votes={movie.vote_average}
                backgroundImage={movie.poster_path}
                poster={movie.poster_path}
              />
            ))}
          </Swiper>
        </SliderContainer>
        <Container>
          {/* <Title title={"Popular Movies"} />
          <ScrollView
            style={{marginTop: 20, marginBottom: 40}}
            contentContainerStyle={{paddingLeft: 30}}
            horizontal
            showsHorizontalScrollIndicator={false}
          > */}
          {/* 위의것을 아래것으로 교체 */}
          <HorizontalSlider title={"Popular Movies"}>
            {popular.map((movie) => (
              <Vertical
                id={movie.id}
                key={movie.id}
                poster={movie.poster_path}
                title={movie.title}
                votes={movie.vote_average}
                backgroundImage={movie.backdrop_path}
              />
            ))}
          </HorizontalSlider>
          {/* </ScrollView> */}
          {/* <Title title={"Coming Soon"} />
          <UpcomingContainer> */}
          <List title="Coming Soon">
            {upcoming.map((movie) => (
              <Horizontal
                key={movie.id}
                id={movie.id}
                title={movie.title}
                releaseDate={movie.release_date}
                poster={movie.poster_path}
                overview={movie.overview}
                backgroundImage={movie.backdrop_path}
              />
            ))}
          </List>
          {/* </UpcomingContainer> */}
        </Container>
      </>
    </ScrollContainer>
  );
};

export default MoviePresenter;
