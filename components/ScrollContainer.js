//node 는 element 이므로 children 은 node로 해도 된다
// 컨테이너 안의 node element 는 children 으로 하면 알아서 들어가게 된다
import React, { useState } from "react";
import PropTypes from "prop-types";
import { ScrollView, ActivityIndicator, RefreshControl } from "react-native";
import styled from "styled-components/native";
//ScrollView 에는 refreshControl 이라는 옵션이 있다...
//여기선 위로 드레그 할 경우.. refresh를 해주려고 한다.
//이 옵션은 세로 스크롤만 동작하고 가로 스크롤은 false 로 해줘야 한다!
// 이 옵션은 https://reactnative.dev/docs/refreshcontrol  에서 처럼
// RefreshControl 이라는 컴포넌트를 넣어준다.
// 자세한 옵션은 위의 링크에 들어가면 있다.
// 위의 옵션중 refreshing을 제어하는 함수를 하나 만들어주자(해당 state를 만들자)
// refreshing이 일어날때는 movie, tv 컨테이너에서 데이터를 가지고 오는 함수
// refreshFn을 props 로 받아 여기서 처리해준다.

// 다른 컴포넌트에서 contentContainerStyle의 옵션에 스타일을 적용시킬때 안먹히는걸 볼 수 있다..
// 그래서 아래와 같이 props 로 받아서 스프레드로 풀어서 기존의 스타일에 추가를 해주자
const ScrollContainer = ({
  loading,
  children,
  contentContainerStyle,
  refreshFn,
}) => {
  const [refreshing, setRefreshing] = useState(false);
  //데이터를 불러오는 함수가 작동하는 동안 로딩화면을 보여줘야 하기 때문에.. async 를 사용해준다
  const onRefresh = async () => {
    setRefreshing(true);
    await refreshFn();
    setRefreshing(false);
  };
  return (
    <ScrollView
      refreshControl={
        <RefreshControl
          onRefresh={onRefresh} // refresh가 일어나면 실행되는 함수
          refreshing={refreshing} // 화면에 보이는 refreshing
          enabled={true} // 안드로이드에서 당겨지는게 가능
          tintColor={"white"}
        />
      }
      style={{ backgroundColor: "black" }}
      contentContainerStyle={{
        flex: loading ? 1 : 0,
        justifyContent: loading ? "center" : "flex-start",
        ...contentContainerStyle,
      }}
    >
      {loading ? <ActivityIndicator color="white" size="small" /> : children}
    </ScrollView>
  );
};

ScrollContainer.propTypes = {
  loading: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  contentContainerStyle: PropTypes.object,
  refreshFn: PropTypes.func,
};

export default ScrollContainer;
