import React from "react";
import { View, Text, Button } from "react-native"; //Button 은 title이 필수로 들어가야 한다 string 형

const Movies = ({ navigation }) => (
  <View style={{ flex: 1, backgroundColor: "black" }}>
    <Text>Movies</Text>
    <Button title="Movie" onPress={() => navigation.navigate("Detail")} />
  </View>
);

export default Movies;
