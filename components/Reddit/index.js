import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import styled from 'styled-components/native';

import List from './../List.js';
import { fetchReddit } from './../../actions';
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

function renderReddit({ item }) {
  return (
    <ItemContent>
      <SmallIcon source={redditIcon} />
      <ItemArticle>
        <ItemTitle>
          {item.article.title}
        </ItemTitle>
        <AppText>
          Comments: {item.comments ? item.comments.length : 'No Comments'}
        </AppText>
        {item.article.selftext.length > 10
          ? <DefaultLink to={`/articles/${item.article.id}`}>
              <AppText>See More</AppText>
            </DefaultLink>
          : <AppText>{item.article.selftext}</AppText>}
      </ItemArticle>
    </ItemContent>
  );
}

function Reddit({ reddit, errors }) {
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
      {errors.reddit && <Text>{errors.reddit}</Text>}
    </RedditContainer>
  );
}

const mapStateToProps = ({ reddit, errors }) => ({
  reddit,
  errors
});

export default connect(mapStateToProps)(Reddit);
