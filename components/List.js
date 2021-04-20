//여기서 만든것은.. HorizontalSlider(가로스크롤)와 다르게  세로로 스크롤되는 것이다.
// List 와 같은 컴포넌트는 reuseable component 를 만든것이다.
import React from "react";
import styled from "styled-components/native";
import Title from "./Title";

const Container = styled.View`
  margin-top: 20px;
`;

const List = ({ title, children }) => {
  return (
    <>
      <Title title={title} />
      <Container>{children}</Container>
    </>
  );
};

export default List;
