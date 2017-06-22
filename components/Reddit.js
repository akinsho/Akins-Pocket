import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';

import { fetchReddit } from './../actions/';
import Card from './Card.js';

class Reddit extends Component {
  state = {};

  render() {
    console.log('props', this.props);
    const { reddit } = this.props;
    return (
      <View>
        <Text>
          Reddit
        </Text>
        <Card articles={reddit} />
      </View>
    );
  }
}

function mapStateToProps({ reddit, errors }) {
  return {
    reddit,
    errors
  };
}

function mapDispatchToProps(dispatch) {
  return {
    //fetchReddit
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Reddit);
