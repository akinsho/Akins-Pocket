import React from 'react';
import { connect } from 'react-redux';
import { WebView, View, StyleSheet, ScrollView, Text } from 'react-native';
import { MarkdownView as Markdown } from 'react-native-markdown-view';
import styled from 'styled-components/native';

import { PageTitle, Body, AppText } from './styled';
import { trimText } from './utils';

const ArticleContainer = styled.ScrollView`
  flex: 1;
  width: 100%;
  height: 100%;
`;

const Title = styled(PageTitle)`
  font-size: 20;
  height: 100;
  padding: 10px 10px;
  background-color: whitesmoke;
`;

const MarkdownContainer = styled.View`
  flex-direction: column;
  padding: 20px;
`;

const Comments = styled(MarkdownContainer)`
  border-radius: 7px;
  border: 1px solid grey;
  margin: 8px 0;
`;

const HACKERNEWS = 'hackernews';
const HACKERNOON = 'hackernoon';

function Article({ history, articles, match: { params } }) {
  const { hackernews, hackernoon, reddit } = articles;
  const { id, location } = params, currentLocation = articles[location];
  let selected;

  switch (location) {
    case HACKERNOON:
      return <WebView source={{ uri: location.search }} />;
    case HACKERNEWS:
      selected = currentLocation.find(item => item.id === Number(id));
      return (
        <MarkdownContainer>
          <Markdown styles={markdownStyles.main}>{selected.title}</Markdown>
          <Markdown>
            {selected &&
              selected.kids.map(item => (
                <Comments key={item.id}>
                  <AppText>{item.by}</AppText>
                  <Markdown styles={markdownStyles.comments}>
                    {item.text}
                  </Markdown>
                </Comments>
              ))}
          </Markdown>
        </MarkdownContainer>
      );
    default:
      selected = currentLocation.find(({ article }) => article.id === id);
      const { article, comments } = selected;
      return (
        <ArticleContainer>
          <Title>
            {trimText(article.title)}
          </Title>
          <MarkdownContainer>
            <Markdown styles={markdownStyles.main}>
              {article.selftext}
            </Markdown>
            {comments &&
              comments.map(comment => (
                <Comments key={comment.id}>
                  <AppText>{comment.author}</AppText>
                  <Markdown styles={markdownStyles.comments}>
                    {comment.body}
                  </Markdown>
                </Comments>
              ))}
          </MarkdownContainer>
        </ArticleContainer>
      );
  }
}

const mapStateToProps = ({ articles }) => ({
  articles
});

const markdownStyles = {
  main: {
    text: {
      fontSize: 18
    },
    comments: {
      text: {
        fontSize: 15
      }
    }
  }
};

export default connect(mapStateToProps)(Article);
