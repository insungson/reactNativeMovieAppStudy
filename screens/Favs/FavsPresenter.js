import React, { useState, useEffect } from "react";
import { PanResponder, Dimensions, Animated } from "react-native";
import styled from "styled-components/native";
import { apiImage } from "../../api";

const { width: WIDTH, height: HEIGHT } = Dimensions.get("window");

const Container = styled.View`
  flex: 1;
  background-color: black;
  align-items: center;
`;

const Card = styled.View`
  top: 80px;
  height: ${HEIGHT / 1.5}px;
  width: 90%;
  position: absolute;
`;

const Poster = styled.Image`
  border-radius: 20px;
  width: 100%;
  height: 100%;
`;

const styles = {
  top: 50,
  height: HEIGHT / 1.5,
  width: "90%",
  position: "absolute",
};

// PanResponder와 Animated.ValueXY 는 클릭에 대한 이벤트 + css의 애니미이터적인 동작을 합쳐서 만든 것이다.(조합하기 나름...)

//PanResponder 는 사용자가 화면을 누르거나 드래그 하는 등의 제스처를 인식할 수 있게 해준다.
// https://reactnative.dev/docs/panresponder    를 참고하자
// 시작하기 전에 onStartShouldSetPanResponder: () => true, 를 해주고 다른 동작을 하기전 설정한다.
// 클릭후 동작은 onPanResponderMove를 사용하면 클릭후 움직이는 좌표를 확인할 수 있다.
//gestureState 안의 속성엔 여러가지가 있다. 자세한건 위의 링크에서..
// onPanResponderMove: (evt, (gestureState) => {
//   console.log(gestureState, gestureState.dx);
// })
// 클릭을 띄고 난 후 동작은 onPanResponderRelease를 사용하면 된다.
// onPanResponderRelease: () => {
//   Animated.spring(position, {
//     toValue: { x: 0, y: 0}, bounciness: 29 // bounciness는 클릭을 놓을때 다시원복하여 바운스되는 정도이다.
//   }).start();
// https://reactnative.dev/docs/animated  에서 Animated 의 함수에 대해알아보자
// spring() 은 toValue 가 Update 될때 동적으로 애니매이션 처리를 해주고 세부적인건 위의 링크에서 속성을 보면 된다.
// spring() 은 transition 과 함께 포지션 값을 움직이게 해준다.

// Animated.ValueXY 는 value 가 움직이는 값이다.
// https://reactnative.dev/docs/animatedvaluexy#gettranslatetransform   참조
// getTranslateTransform() 는 x,y 에 대한 animate 값을 가져온다.
// 위의 링크 예시에사.. {...panResponder.panHandlers} 이런식으로 해당 Animated.View 에 해당 속성을 적용시켜준다.
// 여기선 PanResponder 를 통해 마우스 드레그시 움직이는 x,y 값에 대해 변환하여 처리해준다.
// *그리고 getTranslateTransform() 에 해당하는 element는 Animated.View 로 접근해야 한다!!
// 스타일의 transform 속성에 배열 형태로 적용시켜야 한다.
// https://reactnative.dev/docs/transforms   transform 의 속성에 참조이다.
// 각도(deg)나 축별로 크기(scale)설정이 된다

const FavsPresenter = ({ results }) => {
  // useState를 사용하는 이유는.. 맨위에 뭐가 올라오는지 비교하기 위함이다.
  const [topIndex, setTopIndex] = useState(0);
  const nextCard = () => setTopIndex(currentValue => currentValue + 1);
  // gestureState의 dx, dy는 드래그해서 움직인 거리에 해당하기 때문에.. 다른곳 클릭시 원복한다!!
  const position = new Animated.ValueXY();
  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (evt, gestureState) => {
      // console.log(gestureState, gestureState.dx);
      position.setValue({ x: gestureState.dx, y: gestureState.dy });
    },
    // gestureState에서 드래그하여 움직인 좌표가 dx,dy 이므로 이를 이용하여 좌, 우로 어느 기준 이상 움직일때..
    // toValue 에 추가로 좌표를 설정하여 화면밖으로 밀어내서 카드가 없어지는 효과를 만든다.
    // *그리고 다음 카드를 보여주기 위해 조건문의 index를 추가하여 드래그 기능을 계속 사용하게 한다.
    // start()는 클릭을 땐후 실행하는 기능으로.. 콜백함수로 사용할 수도 있다!!
    // 그 안에 topIndex를 증가하는 setTopIndex를 넣어준다.
    onPanResponderRelease: (evt, {dx, dy}) => {
      if (dx >= 250) {
        Animated.spring(position, {
          toValue: {
            x: WIDTH + 100,
            y: dy,
          },
        }).start(nextCard);
      } else if (dx <= -250) {
        Animated.spring(position, {
          toValue: {
            x: -WIDTH - 100,
            y: dy
          }
        }).start(nextCard);
      } else {
        Animated.spring(position, {
          toValue: {
            x:0, y:0
          }
        }).start();
      }

    },
  });
  // const position = new Animated.ValueXY(); 에서 animated로 움직인값중...
  // position.x.interpolate 로 x축의 값이 inputRange로 조정일 될때 아래처럼 outputRange로 animation이 움직인다고 생각하면 된다.
  // 쉽게 말해서 위의 방식은 x축의 값 범위를 설정하고 그 값에 따른 변화의 범위를 설정하는 것이다.
  // https://reactnative.dev/docs/animations#interpolation    참조
  // extrapolate는 3가지 속성을 가진다. extend(확장), identity(동일), clamp(고정) 여기선 clamp를 사용하여 범위를 벗어나도 고정을 시킨다.
  const rotationValues = position.x.interpolate({
    //Diemension("window") 로 가져온 height, width 로 설정해도 된다.
    inputRange: [-255, 0, 255],
    outputRange: ["-8deg", "0deg", "8deg"],
    extrapolate: "clamp",
  });

  const secondCardOpacity = position.x.interpolate({
    inputRange: [-255, 0, 255],
    outputRange: [1, 0.2, 1],
    extrapolate: "clamp",
  });

  const secondCardScale = position.x.interpolate({
    inputRange: [-255, 0, 255],
    outputRange: [1, 0.8, 1],
    extrapolate: "clamp",
  });

  useEffect(() => {
    position.setValue({x:0, y:0})
  }, [topIndex]); 

  // 첫번째 카드, 두번째카드, 나머지를 조건문으로 나눠 opacity를 정해주자
  // 여기선 위치의 각도 opacity(투명도), scale(크기) 를 조정하는데 사용하였다.
  return (
    <Container>
      {results.map((result, index) => {
        if (index < topIndex) {
          return null;
        } else if (index === topIndex) {
          return (
            <Animated.View
              key={result.id}
              style={{
                ...styles,
                zIndex: 1,
                transform: [
                  { rotate: rotationValues },
                  ...position.getTranslateTransform(),
                ],
                //맨윗줄만(zIndex:1) 움직이기 때문에 여기만 transform옵션을 넣어준다.
              }}
              {...panResponder.panHandlers}
            >
              <Poster source={{ uri: apiImage(result.poster_path) }} />
            </Animated.View>
          );
        } else if (index === topIndex + 1) {
          return (
            <Animated.View
              style={{
                ...styles,
                zIndex: -index,
                opacity: secondCardOpacity,
                transform: [{ scale: secondCardScale }],
              }}
              key={result.id}
              {...panResponder.panHandlers}
            >
              <Poster source={{ uri: apiImage(result.poster_path) }} />
            </Animated.View>
          );
        } else {
          return (
            <Animated.View
              style={{
                ...styles,
                zIndex: -index,
                opacity: 0,
              }}
              key={result.id}
              {...panResponder.panHandlers}
            >
              <Poster source={{ uri: apiImage(result.poster_path) }} />
            </Animated.View>
          );
        }
      })}
    </Container>
  );
};

export default FavsPresenter;
