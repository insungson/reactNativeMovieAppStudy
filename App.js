import React, { useState } from "react";
import { Image, StyleSheet, Text, View, StatusBar } from "react-native";
import AppLoading from "expo-app-loading"; //로딩화면을 쉽게 구성할 수 있다.
import { Asset } from "expo-asset"; //expo 내부 모듈에 접근할 수 있게 한다.
import { Ionicons } from "@expo/vector-icons";
import * as Font from "expo-font";
import { NavigationContainer } from "@react-navigation/native"; //react 라우터같은 기능
import Stack from "./navigation/Stack";
//yarn add 패키지    :
//npm i 패키지     : 모듈설치
//expo install 패키지  : expo랑 호환되는 패키지 설치
//https://reactnavigation.org/docs/getting-started    reactNative 설치해야하는 라이브러리들이다.

//이미지를 미리 가져오는 캐싱을 하기위한 함수이다.
const cacheImages = (images) =>
  images.map((image) => {
    if (typeof image === "string") {
      return Image.prefetch(image); //Image 는 promise 객체이기 때문에 prefetch가 가능하다
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });

//폰트 캐싱
const cacheFonts = (fonts) =>
  fonts.map((font) => [Font.loadAsync(font), Font.loadAsync(font)]);

export default function App() {
  const [isReady, setIsReady] = useState(false);
  const loadAssets = () => {
    //아래의 AppLoading의 startAsync 에서 promise 객체를 받기 때문에 async await 제거!(기존의 Font, Image 가 promise 객체리턴)
    const images = cacheImages([
      "https://images.unsplash.com/photo-1533637322518-7aadda74ddc0?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=619&q=80",
      "https://images.unsplash.com/photo-1584486188544-dc2e1417aff1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
      require("./assets/splash.png"),
    ]);
    // console.log(">>", images); //Ionicons, Font, Image 전부 Promise 객체 리턴해줌
    const fonts = cacheFonts([Ionicons.font]);
    // console.log(">> ", fonts);
    return Promise.all([...images, ...fonts]);
  };
  const onFinish = () => setIsReady(true);

  return isReady ? (
    <>
      <NavigationContainer>
        <Stack />
      </NavigationContainer>
      <StatusBar barStyle="light-content" />
      {/* 상태창을 나타내는 바를 넣어주고 상태바의 전반적인 디자인을 선택할 수 있다. */}
    </>
  ) : (
    <AppLoading
      startAsync={loadAssets}
      onFinish={onFinish}
      onError={console.error} //(e) => console.error(e) 와 같은것이다.
    />
  );
}
