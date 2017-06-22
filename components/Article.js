import React from 'react';
import { connect } from 'react-redux';
import { WebView, View, StyleSheet, ScrollView, Text } from 'react-native';
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

function Article(props) {
  const { id } = props.match.params;
  const article = props.reddit.find(article => article.id === id);
  return (
    <ArticleContainer>
      <Title>
        {trimText(article.title)}
      </Title>
      {/*TODO
        <WebView source={{html: article.selftext_html}}/>
        */}
      <Body>{article.selftext}</Body>
    </ArticleContainer>
  );
}

const mapStateToProps = ({ reddit }) => ({ reddit });

export default connect(mapStateToProps)(Article);
