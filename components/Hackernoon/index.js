import React, { Component } from 'react';
import { StyleSheet, View, Image, WebView } from 'react-native';
import { connect } from 'react-redux';
import styled from 'styled-components/native';
import HTMLView from 'react-native-htmlview';

import { ItemTitle, ItemContent, Topic, AppText, Container } from './../styled';
import { removeReturns } from './../utils';
import List from './../List.js';

const HackernoonImage = styled.Image`
  width: 40;
  height: 40;
  margin: 3px 5px;
`;

const HackerTitle = styled(AppText)`
  font-size: 18;
  font-weight: 800;
`;
const HackerNoonArticle = styled(ItemContent)`
  margin: 20px 0;
  flex-direction: column;
  align-items: center;
  height: auto;
  padding: 0px 20px;
`;

const HackerNoonContent = styled.WebView`
  width: 400;
  height: 400;
`;

function renderHackernoon({ item }) {
  console.log('item', item);
  return (
    <HackerNoonArticle>
      <ItemTitle>
        {item.title}
      </ItemTitle>
      <HTMLView value={removeReturns(item.content)} stylesheet={styles} />
    </HackerNoonArticle>
  );
}

function Hackernoon({ hackernoon }) {
  const { feed, items } = hackernoon;
  return (
    <Container>
      <Topic>
        <HackerTitle>
          {feed.title}
        </HackerTitle>
        <HackernoonImage source={{ uri: feed.image }} />
      </Topic>
      <List
        findKey={item => item.guid}
        renderItems={renderHackernoon}
        articles={items}
      />
    </Container>
  );
}

const mapStateToProps = ({ hackernoon }) => ({
  hackernoon
});

const styles = StyleSheet.create({
  img: {
    width: '500',
    height: '200'
  },
  blockquote: {
    fontSize: 17
  },
  h4: {
    fontSize: 17
  },
  a: {
    fontSize: 17,
    fontWeight: '600'
  },
  div: {
    padding: 10,
    fontSize: 17
  },
  strong: {
    fontSize: 17,
    fontWeight: '600'
  },
  p: {
    fontSize: 17,
    marginLeft: 5,
    marginRight: 5
  }
});

export default connect(mapStateToProps)(Hackernoon);
