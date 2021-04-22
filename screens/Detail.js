import React from "react";
import { Dimensions, View, Text } from "react-native";
import styled from "styled-components/native";
import ScollContainer from "../components/ScrollContainer";
import Poster from "../components/Poster";
import Votes from "../components/Votes";
import { apiImage } from "../api";
import ScrollContainer from "../components/ScrollContainer";

// Detail.js 는 navigation/stack.js 에서 Screen(stackNavigatorCreate.Screen) 으로 만들었기 때문에
// props로 navigation에 대한 접근 권한이 있다.!!! 자세한건 props로 받는 navigation을
// 콘솔로 찍어보면 알 수 있다.
// route로 접근하면 'Detail' 의 라우터로 넘겨주는 값들을 params로 접근하여 가져올 수 있다!!!

//Dimensions 은 window나 screen의 가로, 세로값을 가져올수 있게 한다.
const BG = styled.Image`
  width: 100%;
  height: ${Dimensions.get("window").height / 3}px;
  opacity: 0.4;
  position: absolute;
`;

const Header = styled.View``;

const Container = styled.View``;

const Title = styled.Text``;

const Info = styled.View``;

export default ({
  navigation,
  route: {
    params: { id, title, backgroundImage, poster, votes },
  },
}) => {
  navigation.setOptions({ title });
  return (
    <ScrollContainer loading={false}>
      <Header>
        <BG source={{ uri: apiImage(backgroundImage, "-") }} />
        <Container>
          <Poster url={poster} />
          <Info>
            <Title>{title}</Title>
            <Votes votes={votes} />
          </Info>
        </Container>
      </Header>
    </ScrollContainer>
  );
};
