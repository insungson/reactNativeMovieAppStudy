import React from "react";
import styled from "styled-components/native";
import PropTypes from "prop-types";
import { TouchableOpacity } from "react-native";
import Poster from "./Poster";
import { apiImage } from "../api";
import Votes from "./Votes";
import { trimText } from "../utils";
import { useNavigation } from "@react-navigation/native";

const Container = styled.View`
  align-items: center;
  margin-right: 20px;
`;

const Title = styled.Text`
  color: white;
  font-weight: 500;
  margin: 10px 0px 5px 0px;
`;

//클릭시 detail 창으로 이동하기 위한 React Navigation 을 넣어준다.
//기본적으로

const Vertical = ({ id, poster, title, votes, backgroundImage }) => {
  const navigation = useNavigation();
  const goToDetail = () => {
    //아래의 메서드에 리턴을 안줘도 되는지 체크해보자
    navigation.navigate("Detail", {
      id,
      title,
      poster,
      votes,
      backgroundImage,
    });
  };

  return (
    <TouchableOpacity onPress={goToDetail}>
      <Container>
        <Poster url={poster} />
        <Title>{trimText(title, 10)}</Title>
        {votes > 0 && <Votes votes={votes} />}
      </Container>
    </TouchableOpacity>
  );
};

Vertical.propTypes = {
  id: PropTypes.number.isRequired,
  poster: PropTypes.string,
  title: PropTypes.string.isRequired,
  votes: PropTypes.number.isRequired,
};

export default Vertical;
