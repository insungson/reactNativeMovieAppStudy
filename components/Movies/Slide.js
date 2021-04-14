import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
// import { Dimensions, Image } from 'react-native';
import {apiImage} from '../../api';

// const { width: WIDTH, height: HEIGHT } = Dimensions.get("screen");

// const Container = styled.View`
//   width: ${WIDTH}px;
//   height: ${HEIGHT / 4}px;
//   background-color: red;
// `;

const Container = styled.View`
  height: 100%;
  width: 100%;
`;

const BG = styled.Image`
  height: 100%;
  width: 100%;
  opacity: 0.6;
  position: absolute;
`;

const Content = styled.View`
  flex-direction: row;
`;

const Data = styled.View`
  width: 50%;
`;

const Title = styled.Text`
  color: white;
  font-weight: bold;
  font-size: 18px;
`;

const Votes = styled.Text`
  color: white;
  opacity: 0.7;
`;

const Overview = styled.Text`
  color: white;
  opacity: 0.7;
`;

const Slide = ({id, title, backgroundImage, votes, overview}) => {
  return(
    <Container>
      <BG source={{uri: apiImage(backgroundImage)}} />
      <Content>
        <Data>
          <Title>{title}</Title>
          <Votes>{votes}</Votes>
          <Overview>{overview}</Overview>
        </Data>
      </Content>
    </Container>
  );
};

Slide.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  backgroundImage: PropTypes.string.isRequired,
  votes: PropTypes.number.isRequired,
  overview: PropTypes.string.isRequired
};

export default Slide;