import React, { Component } from 'react';
import { StyleSheet, View, Image, WebView } from 'react-native';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-native';
import styled from 'styled-components/native';
import HTMLView from 'react-native-htmlview';
import DOMParser from 'react-native-html-parser';

import { navigationUrl } from './../../actions';
import { ItemTitle, ItemContent, Topic, AppText, Container } from './../styled';
import { removeReturns } from './../utils';
import List from './../List.js';

const HackernoonImage = styled.Image`
  width: 40;
  height: 40;
  margin: 3px 5px;
`;

const HackernoonLargeImage = styled(HackernoonImage)`
  width: 500;
  height: 500;
  margin: 0 10px;
  align-self: center;
`;

const HackerArticleTitle = styled(ItemTitle)`
  font-size: 30;
  font-weight: 800;
  margin: 15px 0;
`;

const HackerTitle = styled(AppText)`
  font-size: 18;
  font-weight: 800;
`;
const HackerNoonArticle = styled(ItemContent)`
  margin-bottom: 20px;
  flex-direction: column;
  align-items: center;
  height: auto;
  padding: 0px 20px;
`;

const HackerNoonContent = styled.WebView`
  width: 400;
  height: 400;
`;

function renderNode(node, index, siblings, parent) {
  if (node.name === 'img') {
    return (
      <HackernoonLargeImage key={index} source={{ uri: node.attribs.src }} />
    );
  }
  if (node.data === '\n') {
    return null;
  }
}

class Hackernoon extends Component {
  state = {
    redirect: false,
    url: ''
  };

  renderHackernoon = ({ item }) => {
    const parser = new DOMParser.DOMParser();

    const html = parser.parseFromString(item.content, 'text/html');
    //console.log('item', item);
    console.log('html', html.querySelect(`* > a`));
    return (
      <HackerNoonArticle>
        <HackerArticleTitle>
          {item.title}
        </HackerArticleTitle>
        <HTMLView
          value={item.content}
          renderNode={renderNode}
          stylesheet={styles}
          onLinkPress={url => this.handleNavigation(url)}
        />
      </HackerNoonArticle>
    );
  };

  handleNavigation = url => {
    this.props.navigationUrl(url);
    this.setState({ redirect: true, url });
  };

  render() {
    const { feed, items } = this.props.hackernoon;

    if (this.state.redirect) {
      return (
        <Redirect
          to={{
            pathname: '/article',
            search: this.state.url,
            state: { referrer: 'hackernoon' }
          }}
        />
      );
    }
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
          renderItems={this.renderHackernoon}
          articles={items}
        />
      </Container>
    );
  }
}

const mapStateToProps = ({ hackernoon }) => ({
  hackernoon
});

const styles = StyleSheet.create({
  img: {
    width: '500',
    height: '200'
  },
  blockquote: {
    fontSize: 17
  },
  h4: {
    fontSize: 17
  },
  a: {
    fontSize: 17,
    fontWeight: '600',
    color: 'palevioletred'
  },
  div: {
    padding: 10,
    fontSize: 17
  },
  strong: {
    fontSize: 17,
    fontWeight: '600'
  },
  p: {
    fontSize: 17,
    marginLeft: 5,
    marginRight: 5
  }
});

export default connect(mapStateToProps, { navigationUrl })(Hackernoon);
