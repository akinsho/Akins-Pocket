import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import styled from 'styled-components/native';

import { fetchReddit } from './../../actions';
import Card from './../Card.js';
import { PageTitle } from './../styled';

const RedditContainer = styled.View`
  width: 100%;
  height: 100%;
`;

class Reddit extends Component {
  state = {};

  render() {
    const { reddit, errors } = this.props;
    return (
      <RedditContainer>
        <PageTitle>
          Reddit
        </PageTitle>
        <Card articles={reddit} />
        {errors.reddit && <Text>{errors.reddit}</Text>}
      </RedditContainer>
    );
  }
}

const mapStateToProps = ({ reddit, errors }) => ({
  reddit,
  errors
});

const mapDispatchToProps = dispatch => ({
  //fetchReddit
});

export default connect(mapStateToProps, mapDispatchToProps)(Reddit);
