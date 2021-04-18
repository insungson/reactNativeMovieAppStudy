import React from 'react';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';
import { Dimensions, Image, TouchableOpacity } from 'react-native';
import {apiImage} from '../../api';
import Poster from '../Poster';
import Votes from '../Votes';
import {trimText} from '../../utils';

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
  opacity: 0.4;
  position: absolute;
`;

const Content = styled.View`
    height: 100%;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
  `;

const Data = styled.View`
  width: 50%;
  align-items: flex-start;
`;

const Title = styled.Text`
  color: white;
  font-weight: bold;
  font-size: 19px;
  margin-bottom: 10px;
`;

// const Votes = styled.Text`
//   color: rgb(220, 220, 220);
//   margin-bottom: 7px;
//   font-weight: 500;
//   font-size: 12px;
// `;

const VotesContainer = styled.View`
  margin-bottom: 7px;
`;

const Overview = styled.Text`
  color: rgb(220, 220, 220);
  font-size: 14px;
  font-weight: 500;
`;

const Button = styled.View`
  margin-top: 10px;
  background-color: #e74c3c;
  padding: 7px 10px;
  border-radius: 3px;
`;

const ButtonText = styled.Text`
  color: white;
`;

 // Button 은 ReactNative 에서 제공하는 버튼이다. (이건 TouchableOpacity 안에 View, text 를 더할 수 있는 것이고)
 // TouchableOpacity 도 버튼같은 것이다. (이건 그냥 버튼이랑 비슷한 기능이다.)

const Slide = ({id, title, backgroundImage, votes, overview, poster}) => {
  return(
    <Container>
      <BG source={{uri: apiImage(backgroundImage)}} />
      <Content>
        <Poster url={poster}/>
        <Data>
          <Title>{trimText(title, 40)}</Title>
          <VotesContainer>
            <Votes votes={votes} />
          </VotesContainer>
          <Overview>{trimText(overview, 80)}</Overview>
          <TouchableOpacity>
            <Button>
              <ButtonText>View details</ButtonText>
            </Button>
          </TouchableOpacity>
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
  overview: PropTypes.string.isRequired,
  poster: PropTypes.string.isRequired
};

export default Slide;