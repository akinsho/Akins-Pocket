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

function errors(state = {}, action) {
  switch (action.type) {
    case c.REDDIT_FAILURE:
      return {
        ...state,
        reddit: action.error
      };
    default:
      return state;
  }
}

export default combineReducers({
  reddit,
  errors
});
