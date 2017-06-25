import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  Image,
  TouchableHighlight
} from 'react-native';

import styled from 'styled-components/native';

import { DefaultLink, LinkText, AppText, Spinner } from './styled';

const Separator = styled.View`
  height: 0.5;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.5);
`;
const ListContainer = styled.FlatList`
  flex: 1;
`;

function List({ findKey, articles, renderItems }) {
  return articles.length // Zero coerces to falsy so don't need to specify length
    ? <ListContainer
        contentContainerStyle={styles.center}
        data={articles}
        renderItem={renderItems}
        ItemSeparatorComponent={Separator}
        keyExtractor={findKey}
      />
    : <Spinner size="large" />;
}

const styles = StyleSheet.create({
  center: {
    alignItems: 'center'
  }
});

export default List;
