import React from "react";
import styled from "styled-components/native";
import { apiImage } from "../../api";
import { Dimensions, ActivityIndicator, TouchableOpacity } from "react-native";
import Poster from "../../components/Poster";
import Votes from "../../components/Votes";
import ScrollContainer from "../../components/ScrollContainer";
import { formatDate, formatInt } from "../../utils";
import Link from "../../components/Detail/Link";

// Detail.js 는 navigation/stack.js 에서 Screen(stackNavigatorCreate.Screen) 으로 만들었기 때문에
// props로 navigation에 대한 접근 권한이 있다.!!! 자세한건 props로 받는 navigation을
// 콘솔로 찍어보면 알 수 있다.
// route로 접근하면 'Detail' 의 라우터로 넘겨주는 값들을 params로 접근하여 가져올 수 있다!!!

//Dimensions 은 window나 screen의 가로, 세로값을 가져올수 있게 한다.
//Movies/MoviePresenter.js 에서 flex-content나 다른 스타일에 대한 설명을 참고하자
const BG = styled.Image`
  width: 100%;
  height: 100%;
  opacity: 0.4;
  position: absolute;
`;
const Header = styled.View`
  height: ${Dimensions.get("window").height / 3}px;
  align-items: center;
  justify-content: flex-end;
`;
const Container = styled.View`
  flex-direction: row;
  align-items: center;
  top: 30px;
`;
const Info = styled.View`
  width: 50%;
  margin-left: 40px;
`;
const Title = styled.Text`
  color: white;
  font-weight: 600;
  font-size: 24px;
  margin-bottom: 10px;
`;
const Data = styled.View`
  margin-top: 30px;
  padding: 0px 30px;
`;
const DataName = styled.Text`
  margin-top: 30px;
  color: white;
  opacity: 0.8;
  font-weight: 800;
  margin-bottom: 15px;
`;
const DataValue = styled.Text`
  color: white;
  opacity: 0.8;
  font-weight: 500;
`;

//revenue 부분은 값이 있으면 되는데... 없을땐 에러가남...

const DetailPresenter = ({ openBrowser, result, loading }) => {
  // console.log("result: ", typeof result.revenue, result.revenue); //개봉안한 영화는 에러가 남...
  return (
    <ScrollContainer
      loading={false}
      contentContainerStyle={{ paddingBottom: 80 }}
      //TODO: 여기에 refreshFn 에 데이터를 요청하는 함수를 만들어 넣어야 한다!!
    >
      <>
        <Header>
          <BG source={{ uri: apiImage(result.backgroundImage, "-") }} />
          <Container>
            <Poster url={result.poster} />
            <Info>
              <Title>{result.title}</Title>
              {result.votes ? <Votes votes={result.votes} /> : null}
            </Info>
          </Container>
        </Header>
        <Data>
          {result.overview ? (
            <>
              <DataName>Overview</DataName>
              <DataValue>{result.overview}</DataValue>
            </>
          ) : null}
          {loading ? (
            <ActivityIndicator style={{ marginTop: 30 }} color={"white"} />
          ) : null}
          {result.spoken_languages ? (
            <>
              <DataName>Languages</DataName>
              <DataValue>
                {result.spoken_languages.map((l) => `${l.name} `)}
              </DataValue>
            </>
          ) : null}
          {result.release_date ? (
            <>
              <DataName>ReleaseDate</DataName>
              <DataValue>{formatDate(result.release_date)}</DataValue>
            </>
          ) : null}
          {result.status ? (
            <>
              <DataName>Status</DataName>
              <DataValue>{result.status}</DataValue>
            </>
          ) : null}
          {result.runtime ? (
            <>
              <DataName>Runtime</DataName>
              <DataValue>⏲️{result.runtime} minutes</DataValue>
            </>
          ) : null}
          {result.first_air_date ? (
            <>
              <DataName>First Air Date</DataName>
              <DataValue>📅{result.first_air_date}</DataValue>
            </>
          ) : null}
          {result.genres ? (
            <>
              <DataName>Genres</DataName>
              <DataValue>
                {result.genres.map((g, index) =>
                  index + 1 === result.genres.length ? g.name : `${g.name}, `
                )}
              </DataValue>
            </>
          ) : null}
          {result.number_of_episodes ? (
            <>
              <DataName>Season / Episodes</DataName>
              <DataValue>
                {result.number_of_seasons} / {result.number_of_episodes}
              </DataValue>
            </>
          ) : null}
          {result?.revenue ? (
            <>
              <DataName>Revenue</DataName>
              <DataValue>{`💵${formatInt(result.revenue)}`}</DataValue>
            </>
          ) : null}
          {result.imdb_id ? (
            <>
              <DataName>Links</DataName>
              <Link
                text={"IMDB Page"}
                icon={"imdb"}
                onPress={() =>
                  openBrowser(`https://www.imdb.com/title/${result.imdb_id}`)
                }
              />
            </>
          ) : null}
          {result.videos.results?.length > 0 ? (
            <>
              <DataName>Video</DataName>
              {result.videos.results.map((video) => (
                <Link
                  text={video.name}
                  key={video.id}
                  icon="youtube-play"
                  onPress={() =>
                    openBrowser(`https://www.youtube.com/watch?v=${video.key}`)
                  }
                />
              ))}
            </>
          ) : null}
        </Data>
      </>
    </ScrollContainer>
  );
};

export default DetailPresenter;
