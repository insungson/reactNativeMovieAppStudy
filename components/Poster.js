import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components/native";
import { apiImage } from "../api";

const Image = styled.Image`
  width: 100px;
  height: 160px;
  border-radius: 4px;
`;

//만약 포스터 이미지가 없을땐... api.js 에서 apiImage(url) 에 들어가는 url 이 없을땐 기본 이미지 주소를 걸어 그걸 제공한다.
//여기선 그냥 분기처리로 처리한다.
const Poster = ({ url }) => {
  return <Image source={{ uri: apiImage(url) }} />;
};

Poster.propTypes = {
  uri: PropTypes.string,
};

export default Poster;
