// @flow
import React, { Component } from 'react';
import { MemoryRouter as Router, Redirect } from 'react-router-native';
import styled, { ThemeProvider } from 'styled-components/native';
import { Provider } from 'react-redux';
import { Font } from 'expo';
import { createStore, applyMiddleware, compose } from 'redux';
import { offline } from 'redux-offline';
import offlineConfig from 'redux-offline/lib/defaults';
import createSagaMiddleware from 'redux-saga';

import rootSaga from './sagas';
import { PropsRoute } from './components/utils/RouteHelpers.js';
import rootReducer from './reducers/';
import Nav from './components/Nav';
import CustomBar from './components/StatusBar.js';
import Hackernoon from './components/Hackernoon';
import Reddit from './components/Reddit/';
import Article from './components/Article.js';
import AppLoading from './components/AppLoading.js';

const AppWrapper = styled.View`
  flex: 1;
  background-color: #fff;
  padding: 0px;
  margin: 0px;
  width: 100%;
  flex-direction: column;
`;
const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  rootReducer,
  compose(applyMiddleware(sagaMiddleware), offline(offlineConfig))
);

sagaMiddleware.run(rootSaga);

const theme = {
  defaultColor: '#00897B',
  status: '#79B45D',
  light: '#E0F2F1',
  medium: '#4DB6AC'
};

class App extends Component {
  state = {
    fontloaded: false
  };

  async componentDidMount() {
    await Font.loadAsync({
      Roboto: require('./assets/fonts/Roboto/Roboto-Medium.ttf'),
      Inconsolata: require('./assets/fonts/Inconsolata/Inconsolata-Bold.ttf')
    });

    this.setState({ fontLoaded: true });
  }

  render() {
    if (!this.state.fontLoaded) {
      return <AppLoading />;
    }

    return (
      <Router>
        <Provider store={store}>
          <ThemeProvider theme={theme}>
            <AppWrapper>
              <CustomBar />
              <Nav />
              <PropsRoute exact path="/" component={Reddit} />
              <PropsRoute path="/hackernoon" component={Hackernoon} />
              <PropsRoute path="/articles/:id" component={Article} />
            </AppWrapper>
          </ThemeProvider>
        </Provider>
      </Router>
    );
  }
}

export default App;
