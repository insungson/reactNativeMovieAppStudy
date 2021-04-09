//Tabs.Screen 도 마찬가지로 name, component 가 필수적으로 들어가야 한다!
import React, { useLayoutEffect, useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Movies from "../screens/Movies";
import Tv from "../screens/Tv";
import Search from "../screens/Search";
import Favs from "../screens/Favs";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native"; //
import { Ionicons } from "@expo/vector-icons";
import { Platform } from "react-native";

const Tabs = createBottomTabNavigator(); //Screen 은 해당 component를 랜더한다

const getHeaderName = (route) => {
  // route?.state?.routeNames[route.state.index] || "Movies"; //?. 옵셔널 체이닝 || 널리쉬 이용
  // //위의 코드처럼 직접 접근하면 에러가 발생한다.
  // //Accessing the 'state' property of the 'route' object is not supported.
  // //If you want to get the focused route name, use the 'getFocusedRouteNameFromRoute' helper instead:
  // //https://reactnavigation.org/docs/screen-options-resolution/#setting-parent-screen-options-based-on-child-navigators-state
  // //그래서 아래와 같이 해당 screen의 name을 가져오는 함수를 써서 접근해야 한다.
  return getFocusedRouteNameFromRoute(route) ?? "Movies";
};

//Tab은 Stack의 screen 이기 때문에.... 여기서 Stack에 접근이 가능하다!
// Stack.js 에서 보면 현재 tab은 stack의 자식이기 때문에 tab navigation은 prop navigation을 가진다.
export default ({ navigation, route }) => {
  // console.log("navigation: ", navigation);
  // console.log("route: ", route); //아래 tabs의 component 위치를 알수 있게 된다.
  // // console.log("props: ", props);
  // // //{route} 가 아닌 props 로 바꿔서 콘솔로 찍어서 보자
  // // console.log("route: ", props.route);

  //useLayoutEffect : useEffect 와 비슷하지만.. 차이점은 레이아웃 변경이 다 끝난후에 작동한다.
  // https://reactnavigation.org/docs/headers/#setting-the-header-title
  // 위의 링크에서 보면... 헤더를 숨길수 있고.. 헤더의 스타일을 바꿀 수도 있다. 아래처럼 헤더바의 컬러를 바꿀수도 있다.
  // headerStyle: {
  //   backgroundColor: '#f4511e',
  // },
  // headerTintColor: '#f4511e',  //headerTintColor 는 타이틀의 이름이나 뒤로가기화살표같은 강조하는부분의 색상을 바꿔준다
  // https://reactnavigation.org/docs/stack-navigator
  // screenOptions 옵션을 통해서 해당하는 navigator의 모든 screen에 대한 style을 설정할 수 있다.
  useLayoutEffect(() => {
    const name = getHeaderName(route);
    navigation.setOptions({
      title: name,
    });
  }, [route]);

  return (
    <Tabs.Navigator
      screenOptions={({ route }) => ({
        // tabBarIcon는 react.Node 즉 리엑트의 컴포넌트를 리턴해줘야한다. 여기선 아이콘의 모양에 해당하는 Ionicons
        tabBarIcon: ({ focused }) => {
          //https://docs.expo.io/guides/icons/   여기서Ionicons에 따른 iconName을 찾아서 정해주면 된다
          let iconName = Platform.OS === "ios" ? "ios-" : "md-";
          if (route.name === "Movies") {
            iconName += "film";
          } else if (route.name === "Tv") {
            iconName += "tv";
          } else if (route.name === "Search") {
            iconName += "search";
          } else if (route.name === "Favourites") {
            iconName += "heart";
          }
          return (
            <Ionicons
              name={iconName}
              color={focused ? "white" : "grey"}
              size={26}
            />
          );
        },
      })}
      tabBarOptions={{
        showLabel: false,
        style: {
          backgroundColor: "black",
          borderTopColor: "black",
        },
      }}
    >
      <Tabs.Screen name="Movies" component={Movies} />
      <Tabs.Screen name="Tv" component={Tv} />
      <Tabs.Screen name="Search" component={Search} />
      <Tabs.Screen name="Favourites" component={Favs} />
    </Tabs.Navigator>
  );
};

//props 를 콘솔로 찍어보면 아래와 같이 나옴을 알 수 있다.
// props:  Object {
//   "navigation": Object {
//     "addListener": [Function addListener],
//     "canGoBack": [Function canGoBack],
//     "dangerouslyGetParent": [Function dangerouslyGetParent],
//     "dangerouslyGetState": [Function anonymous],
//     "dispatch": [Function dispatch],
//     "goBack": [Function anonymous],
//     "isFocused": [Function isFocused],
//     "navigate": [Function anonymous],
//     "pop": [Function anonymous],
//     "popToTop": [Function anonymous],
//     "push": [Function anonymous],
//     "removeListener": [Function removeListener],
//     "replace": [Function anonymous],
//     "reset": [Function anonymous],
//     "setOptions": [Function setOptions],
//     "setParams": [Function anonymous],
//   },
//   "route": Object {
//     "key": "Tab-dpiGOdfUq64tT32krqtfJ",
//     "name": "Tab",
//     "params": undefined,
//   },
// }

// // 3번째 배열의 요소인 Favs 를 클릭시 아래의 정보들이 나온다 이는!! route로 application 안에서 어디 위치한지 알 수 있다.
// route:  Object {
//   "key": "Tab-LQ7rVoJ0CAm26-dvgSTe9",
//   "name": "Tab",
//   "params": undefined,
//   "state": Object {
//     "history": Array [
//       Object {
//         "key": "Movies-GxxUPLbsBME6jTDxbM0-k",
//         "type": "route",
//       },
//       Object {
//         "key": "Favs-oUI_VwP_zzI8j0eNanhBd",
//         "type": "route",
//       },
//     ],
//     "index": 3,
//     "key": "tab-RA3vQCKFkQPnFifX0hISv",
//     "routeNames": Array [
//       "Movies",
//       "Tv",
//       "Search",
//       "Favs",
//     ],
//     "routes": Array [
//       Object {
//         "key": "Movies-GxxUPLbsBME6jTDxbM0-k",
//         "name": "Movies",
//         "params": undefined,
//       },
//       Object {
//         "key": "Tv-nrWq8uLMK40V54vrB_XHT",
//         "name": "Tv",
//         "params": undefined,
//       },
//       Object {
//         "key": "Search-X8_QimHAkFGWOjAKFYDOj",
//         "name": "Search",
//         "params": undefined,
//       },
//       Object {
//         "key": "Favs-oUI_VwP_zzI8j0eNanhBd",
//         "name": "Favs",
//         "params": undefined,
//       },
//     ],
//     "stale": false,
//     "type": "tab",
//   },
// }
