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
import { swipeable } from 'react-native-gesture-recognizers';

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

const { directions: { SWIPE_LEFT, SWIPE_RIGHT } } = swipeable;

@swipeable({
  horizontal: true,
  vertical: true,
  continuous: false
})
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
    const { swipe: { direction } } = this.props;
    switch (true) {
      case !this.state.fontLoaded:
        return <AppLoading />;
      default:
        return (
          <Router>
            <Provider store={store}>
              <ThemeProvider theme={theme}>
                <AppWrapper>
                  <CustomBar />
                  <Nav />
                  <PropsRoute
                    exact
                    path="/"
                    swipe={direction}
                    component={Reddit}
                  />
                  <PropsRoute
                    exact
                    path="/hackernoon"
                    swipe={direction}
                    component={Hackernoon}
                  />
                  <PropsRoute
                    path="/articles/:id"
                    swipe={direction}
                    component={Article}
                  />
                </AppWrapper>
              </ThemeProvider>
            </Provider>
          </Router>
        );
    }
  }
}
export default App;
