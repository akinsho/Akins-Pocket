import { combineReducers } from 'redux';
import c from './../constants';

function reddit(state = [], action) {
  switch (action.type) {
    case c.REDDIT_SUCCESS:
      return action.articles;
    case c.REDDIT_FAILURE:
    default:
      return state;
  }
}

function search(state = '', action) {
  switch (action.type) {
    case c.FETCH_REDDIT:
      return action.topic;
    default:
      return state;
  }
}

function hackernoon(state = {}, action) {
  switch (action.type) {
    case c.HACKERNOON_SUCCESS:
      return action.articles;
    default:
      return state;
  }
}

function errors(state = '', action) {
  switch (action.type) {
    case c.REDDIT_FAILURE:
      return action.error;
    case c.HACKERNOON_FAILURE:
      return action.error;
    default:
      return state;
  }
}

function navigation(state = '', action) {
  switch (action.type) {
    case c.REDIRECT:
      return action.url;
    default:
      return state;
  }
}

export default combineReducers({
  navigation,
  hackernoon,
  reddit,
  search,
  errors
});
