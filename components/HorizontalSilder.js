import React from "react";
import Title from "./Title";
import { ScrollView, View } from "react-native";
import PropTypes from "prop-types";

const HorizontalSlider = ({ title, children }) => {
  // HorizontalSlider가 Fragment만 실행하면 에러가 생길 수 있으므로 div를 뜻하는 view로 바꿔주도록 하자
  return (
    <View>
      <Title title={title} />
      <ScrollView
        style={{ marginTop: 20, marginBottom: 40 }}
        contentContainerStyle={{ paddingLeft: 30 }}
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        {children}
      </ScrollView>
    </View>
  );
};

HorizontalSlider.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default HorizontalSlider;
