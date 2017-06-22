import React from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import styled from 'styled-components/native';

import { PageTitle, Body } from './styled';

const ArticleContainer = styled.ScrollView`
  flex: 1;
`;

const Title = styled(PageTitle)`
  font-size: 20;
  height: 150;
  margin: 10px 0px;
  padding: 10px 10px;
  background-color: whitesmoke;
`;

function Article(props) {
  const { id } = props.match.params;
  const article = props.reddit.find(article => article.id === id);
  return (
    <ArticleContainer>
      <Title>
        {article.title}
      </Title>
      <Body>{article.selftext}</Body>
    </ArticleContainer>
  );
}

const mapStateToProps = ({ reddit }) => ({ reddit });

export default connect(mapStateToProps)(Article);
