import React, { Component } from 'react';
import { View, TextInput, Text, Picker } from 'react-native';
import styled from 'styled-components/native';
import { connect } from 'react-redux';

import { fetchReddit } from './../actions';

const SearchBar = styled.View`
  height: 40;
  background-color: ${props => props.theme.light};
  flex-direction: row;
  align-items: center;
  justify-content: center;
  overflow: hidden;
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

const TopicPicker = styled.Picker`
  width: 30%;
  margin: 0px 10px;
  background-color: ${props => props.theme.defaultColor};
  border: 1px solid grey;
`;

class Search extends Component {
  state = {
    input: '',
    topic: 'javascript'
  };

  handleInput = input => {
    this.setState({ input });
  };

  handlePickerInput = topic => {
    this.setState({ topic });
    this.props.fetchReddit(topic);
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
        <TopicPicker
          selectedValue={this.state.topic}
          onValueChange={this.handlePickerInput}
        >
          <Picker.Item label="Java" value="java" />
          <Picker.Item label="JavaScript" value="javascript" />
        </TopicPicker>
      </SearchBar>
    );
  }
}

export default connect(null, { fetchReddit })(Search);
