import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';

import List from './../List.js';
import {
  ItemArticle,
  PageTitle,
  ItemTitle,
  ItemContent,
  AppText,
  NumberOfComments
} from './../styled';
import Button from './../Button.js';

class HackerNews extends Component {
  renderHackernews = ({ item }) => {
    return (
      <ItemContent>
        <ItemArticle>
          <ItemTitle>{item.title}</ItemTitle>
          <NumberOfComments>
            {item.kids ? item.kids.length : 'No comments'}
          </NumberOfComments>
          <Button to={`/articles/hackernews/${item.id}`} />
        </ItemArticle>
      </ItemContent>
    );
  };
  render() {
    const { hackernews } = this.props;
    console.log('hackernews state', hackernews);
    return (
      <View>
        <PageTitle>
          HackerNews
        </PageTitle>
        {hackernews &&
          <List
            findKey={item => item.id}
            renderItems={this.renderHackernews}
            articles={hackernews}
          />}
      </View>
    );
  }
}

function mapStateToProps({ articles: { hackernews } }) {
  return {
    hackernews
  };
}
export default connect(mapStateToProps)(HackerNews);
