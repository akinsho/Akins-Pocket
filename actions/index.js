import c from './../constants';

export const fetchReddit = () => ({ type: c.FETCH_REDDIT });

export const redditSuccess = articles => ({ type: c.REDDIT_SUCCESS, articles });

export const redditFailure = e => ({ type: c.REDDIT_FAILURE, error: e });

export const hackernoonSuccess = articles => ({
  type: c.HACKERNOON_SUCCESS,
  articles
});
export const hackernoonFailure = e => ({
  type: c.HACKERNOON_FAILURE,
  error: e
});
