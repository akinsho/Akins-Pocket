// @flow
import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NativeRouter as Router, Route, Link } from 'react-router-native';
import styled, { ThemeProvider } from 'styled-components/native';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas';

import rootReducer from './reducers/';
import Nav from './components/Nav.js';
import Reddit from './components/Reddit/';
import Article from './components/Article.js';

const AppWrapper = styled.View`
  flex: 1;
  background-color: #fff;
  align-items: center;
  padding: 0px;
`;

const sagaMiddleware = createSagaMiddleware();
const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);

const theme = {
  defaultColor: 'skyblue'
};

const App = () => (
  <Router>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <AppWrapper>
          <Nav />
          <Route exact path="/" component={Reddit} />
          <Route path="/articles/:id" component={Article} />
        </AppWrapper>
      </ThemeProvider>
    </Provider>
  </Router>
);

export default App;
