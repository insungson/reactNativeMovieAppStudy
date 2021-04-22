// DetailContainer.js 는 navigation/stack.js 에서 Screen(stackNavigatorCreate.Screen) 으로 만들었기 때문에
// props로 navigation에 대한 접근 권한이 있다.!!! 자세한건 props로 받는 navigation을
// 콘솔로 찍어보면 알 수 있다.
// route로 접근하면 'Detail' 의 라우터로 넘겨주는 값들을 params로 접근하여 가져올 수 있다!!!

// 여기선... props의 params로 넘어온 값과 새로이 api를 호출하여 보여주는 값을 구분하여 처리할 것이다.
import React, { useState, useEffect } from "react";
import DetailPresenter from "./DetailPresenter";
import { movieApi, tvApi } from "../../api";
import * as WebBrowser from "expo-web-browser";

// 비디오를 띄우기 위해 아래의 링크처럼 web-browser 를 설치하도록 하자
// (imdb도 연결해주자)
// https://docs.expo.io/versions/latest/sdk/webbrowser/
// https://www.npmjs.com/package/expo-web-browser 도 같이 설치해줘야 한다.

const DetailContainer = ({
  navigation,
  route: {
    params: { isTv, id, title, backgroundImage, poster, votes, overview },
  },
}) => {
  //DetaillContainer에서 하위 DetailPresenter로 보낼때 로딩처리를 위한 state
  const [loading, setLoading] = useState(true);
  //props로 가져온건 우선적으로 관리하고... DetailPresent 로 보낼 데이터 state
  const [detail, setDetail] = useState({
    loading: false,
    result: {
      title,
      backgroundImage,
      poster,
      overview,
      votes,
      videos: {
        // 미리 state 를 만들어 error가 뜨는걸 막아준다.
        results: [],
      },
    },
  });
  //아래의 api 함수로 데이터를 가져온다.
  const getData = async () => {
    // if (isTv) {
    //   const [getMovie, getMovieError] = await tvApi.show(id);
    // } else {
    //   const [getMovie, getMovieError] = await movieApi.movie(id);
    // }
    // setMovie({
    //   ...getMovie,
    //   title: getMovie.title,
    //   backgroundImage: getMovie.backdrop_path,
    //   poster: getMovie.poster_path,
    //   overview: getMovie.overview,
    //   votes: getMovie.votes_average,
    // });
    //위의 코드는 작동하지 않는다 스코프 때문에... 그렇기 때문에 아래처럼 바꿔주자
    const [getDetail, getDetailError] = isTv
      ? await tvApi.show(id)
      : await movieApi.movie(id);
    setDetail({
      loading: false,
      result: {
        ...getDetail,
        title: getDetail.title || getDetail.name,
        backgroundImage: getDetail.backdrop_path,
        poster: getDetail.poster_path,
        overview: getDetail.overview,
        votes: getDetail.vote_average,
      },
    });
  };

  useEffect(() => {
    getData();
  }, [id]);
  // https://hyojin96.tistory.com/entry/%F0%9F%8D%80-useEffect-VS-useLayoutEffect-%F0%9F%8D%80
  // 위의 링크에서 차이에 대해 알아보자
  // useLayoutEffect는 랜더링 후 화면이 업데이트 되기전에 동기적으로 실행
  // useEffect는 랜더가 화면에 그려진 후 비동기적으로 실행
  React.useLayoutEffect(() => {
    navigation.setOptions({ title });
  });

  const openBrowser = async (url) => {
    await WebBrowser.openBrowserAsync(url);
  };

  // 기존에 {...movie}처럼 스프레드형식으로 보내어 필요없는 정보들까지 보내는것보단
  // 정제하여 필요한 정보만 movie 객체로 만들어 DetailPresenter 컴포넌트에
  // 보내도록 한다 movie={movie}.
  return <DetailPresenter openBrowser={openBrowser} {...detail} />;
};

export default DetailContainer;
