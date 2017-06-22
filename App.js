// @flow
import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NativeRouter as Router, Route, Link } from 'react-router-native';
import styled from 'styled-components/native';

import Nav from './components/Nav.js';

const AppWrapper = styled.View`
  flex: 1;
  background-color: #fff;
  align-items: center;
`;

const App = () => (
  <Router>
    <AppWrapper>
      <Nav />
    </AppWrapper>
  </Router>
);

const styles = StyleSheet.create({
  container: {}
});

export default App;
