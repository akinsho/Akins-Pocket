import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import styled from 'styled-components/native';
import { Redirect } from 'react-router-native';

import { trimText } from './../utils';
import Search from './../Search.js';
import List from './../List.js';
import { fetchReddit } from './../../actions';
import { getRedditSelector } from './../../selectors';
import {
  PageTitle,
  DefaultLink,
  LinkText,
  AppText,
  ItemArticle,
  ItemTitle,
  SmallIcon,
  ItemContent
} from './../styled';
import redditIcon from './reddit-icon.png';

const RedditContainer = styled.View`
  width: 100%;
  height: 100%;
`;

const NumberOfComments = styled(AppText)`
  margin-bottom: 10px;
`;

const RedditLink = styled(LinkText)`
  font-weight: bold;
  font-size: 18;
  color: ${props => props.theme.defaultColor};
`;

function renderReddit({ item }) {
  return (
    <ItemContent>
      <SmallIcon source={redditIcon} />
      <ItemArticle>
        <ItemTitle>
          {item.article.title}
        </ItemTitle>
        <NumberOfComments>
          Comments: {item.comments ? item.comments.length : 'No Comments'}
        </NumberOfComments>
        <DefaultLink margin={false} to={`/articles/${item.article.id}`}>
          <RedditLink>See More</RedditLink>
        </DefaultLink>
      </ItemArticle>
    </ItemContent>
  );
}

function Reddit({ reddit, errors }) {
  switch (true) {
    case errors.reddit:
      return <Text>{errors.reddit.message}</Text>;
    default:
      return (
        <RedditContainer>
          <PageTitle>
            Reddit
          </PageTitle>
          <List
            renderItems={renderReddit}
            findKey={item => item.article.id}
            articles={reddit}
          />
        </RedditContainer>
      );
  }
}

const mapStateToProps = ({ reddit, errors }) => ({
  reddit: getRedditSelector(reddit),
  errors
});

export default connect(mapStateToProps)(Reddit);
