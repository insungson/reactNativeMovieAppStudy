import React from "react";
import { View, Text, Button } from "react-native";

// React에서 screen은 항상 navigation prop 에 접근한다.
// 마찬가지로 Stack navigator는 해당 컴포넌트로 prop으로 아래처럼 navigation을 넘겨준다
// 모든 Stack의 screen은 navigation이란 prop에 접근권을 가지고 있다.
// 그래서 아래처럼 navigation의 navigate 로 해당 Stack.Screen의 name으로 접근할 수 있다.
export default ({ navigation }) => {
  console.log("navigation: ", navigation); // navigation들의 목록들을 확인할 수 있다.
  return (
    <View>
      <Text>Home</Text>
      <Button
        onPress={() => navigation.navigate("Detail")}
        title="Go to Detail"
      />
    </View>
  );
};
