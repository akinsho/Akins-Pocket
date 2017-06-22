import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity
} from 'react-native';
import styled from 'styled-components';

const CardContainer = styled(FlatList)`
  flex: 1;
`;

const CardItem = styled(TouchableOpacity)`
  width: 90%;
  margin: 10;
  color: palevioletred;
`;
function renderReddit({ item }) {
  console.log('item', item);
  console.log('id', item.id);
  return (
    <CardItem key={item.id}>
      <Text>
        {item.title}
      </Text>
    </CardItem>
  );
}

export default function Card(props) {
  console.log('props', props);
  return (
    <View>
      <CardContainer data={props.articles} renderItem={renderReddit} />
    </View>
  );
}
