// @flow
import React, { Component } from 'react';
import { StatusBar, Text, View } from 'react-native';
import { NativeRouter as Router, Route, Link } from 'react-router-native';
import styled, { ThemeProvider } from 'styled-components/native';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import { offline } from 'redux-offline';
import offlineConfig from 'redux-offline/lib/defaults';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas';

import rootReducer from './reducers/';
import Nav from './components/Nav';
import CustomBar from './components/StatusBar.js';
import Reddit from './components/Reddit/';
import Article from './components/Article.js';

const AppWrapper = styled.View`
  flex: 1;
  background-color: #fff;
  align-items: center;
  padding: 0px;
`;
const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  rootReducer,
  compose(applyMiddleware(sagaMiddleware), offline(offlineConfig))
);

sagaMiddleware.run(rootSaga);

const theme = {
  defaultColor: '#00897B',
  status: '#79B45D'
};

const App = () => (
  <Router>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <AppWrapper>
          <CustomBar />
          <Nav />
          <Route exact path="/" component={Reddit} />
          <Route path="/articles/:id" component={Article} />
        </AppWrapper>
      </ThemeProvider>
    </Provider>
  </Router>
);

export default App;
