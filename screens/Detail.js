import React from "react";
import { View, Text } from "react-native";

// Detail.js 는 navigation/stack.js 에서 Screen(stackNavigatorCreate.Screen) 으로 만들었기 때문에
// props로 navigation에 대한 접근 권한이 있다.!!! 자세한건 props로 받는 navigation을 
// 콘솔로 찍어보면 알 수 있다.
// route로 접근하면 'Detail' 의 라우터로 넘겨주는 값들을 params로 접근하여 가져올 수 있다!!!

export default ({
  navigation,
  route: {
    params: {id, title}
  }
}) => {
  navigation.setOptions({title})
  return (
    <View>
      <Text>{id}</Text>
    </View>
)};
