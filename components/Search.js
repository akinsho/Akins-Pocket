import React, { Component } from 'react';
import { View, TextInput, Text } from 'react-native';
import styled from 'styled-components/native';
import { connect } from 'react-redux';

import { fetchReddit } from './../actions';

const SearchBar = styled.View`
  height: 40;
  background-color: grey;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const SearchInput = styled.TextInput`
  border-radius: 3px;
  margin: 0px;
  padding: 0 8px;
  width: 50%;
  height: 70%;
  background-color: white;
  align-self: center;
`;

class Search extends Component {
  state = {
    input: ''
  };

  handleInput = input => {
    this.setState({ input });
  };

  handleSubmit = () => {
    this.props.fetchReddit(this.state.input);
  };
  render() {
    return (
      <SearchBar>
        <SearchInput
          onSubmitEditing={this.handleSubmit}
          onChangeText={this.handleInput}
          value={this.state.input}
          placeholder="Search"
        />
      </SearchBar>
    );
  }
}

export default connect(null, { fetchReddit })(Search);
