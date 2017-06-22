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

import { DefaultLink, LinkText, Spinner } from './styled';
import redditIcon from './Reddit/reddit-icon.png';

const CardContainer = styled.FlatList``;

const CardTitle = styled.Text`
  font-size: 15;
  padding: 3px 3px;
`;

const CardContent = styled.View`
  height: 100;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const CardArticle = styled.View`
  width: 70%;
`;

const Separator = styled.View`
  height: 0.5;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.5);
`;

const RedditIcon = styled.Image`
  width: 50;
  height: 50;
`;

function renderReddit({ item }) {
  //console.log('item', item);
  return (
    <CardContent>
      <RedditIcon source={redditIcon} />
      <CardArticle>
        <CardTitle>
          {item.title}
        </CardTitle>
        {item.selftext.length > 10
          ? <DefaultLink to={`/articles/${item.id}`}>
              <Text>See More</Text>
            </DefaultLink>
          : <Text>{item.selftext}</Text>}
      </CardArticle>
    </CardContent>
  );
}

function renderSeparator() {
  return <Separator />;
}

export default function Card({ articles }) {
  return articles.length // Zero coerces to falsy so don't need to specify length
    ? <CardContainer
        contentContainerStyle={styles.center}
        data={articles}
        renderItem={renderReddit}
        //ListHeaderComponent={Nav}
        ItemSeparatorComponent={renderSeparator}
        keyExtractor={item => item.id}
      />
    : <Spinner color="skyblue" size="large" />;
}

const styles = StyleSheet.create({
  center: {
    alignItems: 'center'
  }
});
