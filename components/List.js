import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  Image,
  TouchableHighlight
} from 'react-native';
import Search from './Search.js';

import styled from 'styled-components/native';

import { DefaultLink, LinkText, AppText, Spinner } from './styled';

const Separator = styled.View`
  height: 0.5;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.5);
`;
const ListContainer = styled.FlatList`
  width: 100%;
`;

function List({ findKey, articles, renderItems }) {
  return articles.length
    ? <ListContainer
        data={articles}
        renderItem={renderItems}
        ListHeaderComponent={Search}
        ItemSeparatorComponent={Separator}
        keyExtractor={findKey}
      />
    : <Spinner size="large" />;
}

export default List;
