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
    //{item.kids &&
    //item.kids.map(kid => <AppText key={kid.id}>{kid.text}</AppText>)}
    //
    return (
      <ItemContent>
        <ItemArticle>
          <ItemTitle>{item.title}</ItemTitle>
          <NumberOfComments>
            {item.kids ? item.kids.length : 'No comments'}
          </NumberOfComments>
          <Button to="/hackernoon" value="See More" />
        </ItemArticle>
      </ItemContent>
    );
  };
  render() {
    const { hackernews, history } = this.props;
    console.log('hackernews state', hackernews);
    console.log('history', history);
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
