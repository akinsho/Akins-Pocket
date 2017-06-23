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
          {item.title}
        </ItemTitle>
        {item.selftext.length > 10
          ? <DefaultLink to={`/articles/${item.id}`}>
              <AppText>See More</AppText>
            </DefaultLink>
          : <AppText>{item.selftext}</AppText>}
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
        findKey={item => item.id}
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
