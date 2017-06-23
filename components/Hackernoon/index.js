import React, { Component } from 'react';
import { View, Image, WebView } from 'react-native';
import { connect } from 'react-redux';
import styled from 'styled-components/native';

import { ItemContent, Topic, AppText, Container } from './../styled';
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
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: auto;
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
      <HackerNoonContent source={{ html: item.content }} />
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

export default connect(mapStateToProps)(Hackernoon);
