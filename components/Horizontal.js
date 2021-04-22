import React from "react";
import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import PropTypes from "prop-types";
import Poster from "./Poster";
import { trimText, formatDate } from "../utils";
import { useNavigation } from "@react-navigation/native";

const Container = styled.View`
  padding: 0px 30px;
  margin-bottom: 30px;
  flex-direction: row;
  align-items: flex-start;
`;

const Data = styled.View`
  align-items: flex-start;
  width: 65%;
  margin-left: 25px;
`;

const Title = styled.Text`
  color: white;
  font-weight: bold;
  margin-bottom: 10px;
`;

const ReleaseDate = styled.Text`
  color: white;
  font-size: 12px;
  opacity: 0.8;
`;

const Overview = styled.Text`
  margin-top: 10px;
  color: white;
  opacity: 0.8;
`;

//클릭시 detail 창으로 이동하기 위한 React Navigation 을 넣어준다.
//기본적으로 가진 정보가 많기 떄문에 바로 정보를 보내서 처리할 수 있다.

// 클릭하여 Detail 스크린에서 api 요청시 TV와 Movie를 구분하기 위해 isTv 플래그를 넣어준다.
const Horizontal = ({
  isTv = false,
  id,
  title,
  releaseDate,
  poster,
  overview,
  backgroundImage,
}) => {
  const navigation = useNavigation();
  const goToDetail = () => {
    return navigation.navigate("Detail", {
      isTv,
      id,
      title,
      poster,
      overview,
      releaseDate,
      backgroundImage,
    });
  };

  return (
    <TouchableOpacity onPress={goToDetail}>
      <Container>
        <Poster url={poster} />
        <Data>
          <Title>{trimText(title, 30)}</Title>
          {releaseDate ? (
            <ReleaseDate>📅 {formatDate(releaseDate)}</ReleaseDate>
          ) : null}
          <Overview>{trimText(overview, 80)}</Overview>
        </Data>
      </Container>
    </TouchableOpacity>
  );
};

Horizontal.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  releaseDate: PropTypes.string,
  poster: PropTypes.string.isRequired,
  overview: PropTypes.string.isRequired,
};

export default Horizontal;
