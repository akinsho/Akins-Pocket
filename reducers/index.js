import { combineReducers } from 'redux';
import c from './../constants';

function search(state = '', action) {
  switch (action.type) {
    case c.FETCH_REDDIT:
      return action.topic;
    default:
      return state;
  }
}

function articles(state = {}, action) {
  const { articles } = action;
  switch (action.type) {
    case c.HACKERNOON_SUCCESS:
      return {
        ...state,
        hackernoon: articles
      };
    case c.HACKERNEWS_SUCCESS:
      return {
        ...state,
        hackernews: articles
      };
    case c.REDDIT_SUCCESS:
      return {
        ...state,
        reddit: articles
      };
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
    case c.HACKERNEWS_FAILURE:
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
  articles,
  search,
  errors
});
