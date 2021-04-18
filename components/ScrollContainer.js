//node 는 element 이므로 children 은 node로 해도 된다
// 컨테이너 안의 node element 는 children 으로 하면 알아서 들어가게 된다
import React from 'react';
import PropTypes from 'prop-types';
import {ScrollView, ActivityIndicator} from 'react-native';
import styled from 'styled-components/native';

const ScrollContainer = ({loading, children}) => {
  return (
    <ScrollView
      style={{backgroundColor: "black"}}
      contentContainerStyle={{
        flex: loading ? 1 : 0,
        justifyContent: loading ? "center" : "flex-start"
      }}
    >
      {loading ? <ActivityIndicator color="white" size="small" /> : children}
    </ScrollView>
  );
};

ScrollContainer.propTypes = {
  loading: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired
};

export default ScrollContainer;