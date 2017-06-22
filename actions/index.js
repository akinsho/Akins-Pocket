import c from './../constants';

export const fetchReddit = () => ({ type: c.FETCH_REDDIT });
export const redditSuccess = articles => ({ type: c.REDDIT_SUCCESS, articles });
export const redditFailure = e => ({ type: c.REDDIT_FAILURE, error: e });
