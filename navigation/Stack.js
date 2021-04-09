import React from "react";
import {
  createStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/stack"; //CardStyleInterpolators 슬라이드형식으로 버튼이 넘어감 아래 Stack.Screen에서 옵션으로 넣어줘야함
import Home from "../screens/Home";
import Detail from "../screens/Detail";
import Tabs from "./Tabs";

const Stack = createStackNavigator();

//아래의 Stack.Screen 은 component 를 필요로 한다!! 그리고 name 도 반드시 사용해야한다!
export default () => (
  <Stack.Navigator
    // mode="modal" // modal 은 bottom 에서 우리가 screen을 갖게 만들어준다!
    screenOptions={{
      headerStyle: {
        backgroundColor: "black",
        borderBottomColor: "black",
        shadowColor: "black",
      },
      headerTintColor: "white",
      headerBackTitleVisible: false,
    }}
  >
    {/* <Stack.Screen
      name="Home"
      component={Home}
      CardStyleInterpolators={CardStyleInterpolators.forHorizontalIOS}
    /> */}
    <Stack.Screen
      name="Tab"
      component={Tabs}
      CardStyleInterpolators={CardStyleInterpolators.forHorizontalIOS}
    />
    <Stack.Screen
      name="Detail"
      component={Detail}
      CardStyleInterpolators={CardStyleInterpolators.forHorizontalIOS}
    />
  </Stack.Navigator>
);
