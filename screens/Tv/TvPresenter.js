import React from "react";
import ScrollContainer from "../../components/ScrollContainer";
import HorizontalSlider from "../../components/HorizontalSilder";
import Vertical from "../../components/Vertical";
import Horizontal from "../../components/Horizontal";
import styled from "styled-components/native";
import List from "../../components/List";

// <></> 이렇게 fragment 안에 있는 HorizontalSlider 를 render 할 수 없다.
// 왜냐하면.. HorizontalSlider 안에도 <></> 처럼 다른 Fragment 가 있기 때문에...
// 안드로이드는 되고.. 웹에선 동작이 안되었다.. 이부분을 바꾸기 위해 <> 대신에 View태그를 만들어주면 된다.

const Container = styled.View`
  margin-top: 30px;
`;

const TvPresenter = ({
  loading,
  popular,
  topRated,
  today,
  thisWeek,
  refreshFn,
}) => {
  return (
    <ScrollContainer loading={loading} refreshFn={refreshFn}>
      <Container>
        <HorizontalSlider title="Popular Shows">
          {popular.map((show) => (
            <Vertical
              isTv={true}
              id={show.id}
              key={show.id}
              poster={show.poster_path}
              title={show.name}
              votes={show.vote_average}
            />
          ))}
        </HorizontalSlider>
        <HorizontalSlider title="Top Rated">
          {topRated.map((show) => (
            <Vertical
              isTv={true}
              id={show.id}
              key={show.id}
              poster={show.poster_path}
              title={show.name}
              votes={show.vote_average}
            />
          ))}
        </HorizontalSlider>
        <HorizontalSlider title={"On The Air This Week!"}>
          {thisWeek.map((show) => (
            <Vertical
              isTv={true}
              id={show.id}
              key={show.id}
              poster={show.poster_path}
              title={show.original_name}
              votes={show.vote_average}
            />
          ))}
        </HorizontalSlider>
        <List title="Airing Today">
          {today.map((show) => (
            <Horizontal
              key={show.id}
              id={show.id}
              title={show.name}
              poster={show.poster_path}
              overview={show.overview}
            />
          ))}
        </List>
      </Container>
    </ScrollContainer>
  );
};

export default TvPresenter;
