import React from 'react';
import { connect } from 'react-redux';
import { WebView, View, StyleSheet, ScrollView, Text } from 'react-native';
import HTMLView from 'react-native-htmlview';
import styled from 'styled-components/native';

import { PageTitle, Body } from './styled';
import { trimText } from './utils';

const ArticleContainer = styled.ScrollView`
  flex: 1;
`;

const Title = styled(PageTitle)`
  font-size: 20;
  height: 100;
  padding: 10px 10px;
  background-color: whitesmoke;
`;

function Article({ history, reddit, location, match }) {
  if (location.state && location.state.referrer === 'hackernoon') {
    console.log('in hackernoon');
    return <WebView source={{ uri: location.search }} />;
  } else {
    const { id } = match.params;
    const article = reddit.find(article => article.id === id);
    return (
      <ArticleContainer>
        <Title>
          {trimText(article.title)}
        </Title>
        {/* TODO needs a markdown previewer */}
        <HTMLView value={article.selftext}>{article.selftext}</HTMLView>
      </ArticleContainer>
    );
  }
}

const mapStateToProps = ({ reddit }) => ({ reddit });

export default connect(mapStateToProps)(Article);
