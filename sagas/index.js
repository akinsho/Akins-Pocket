import { take, select, put, call, fork, all } from 'redux-saga/effects';

import * as actions from './../actions';
import c from './../constants/';

const redditUrl = `http://www.reddit.com/r/vim/new.json?sort=new`;
const scrapeUrl = `https://job-news-scraper.herokuapp.com/scrapings`;
const hackernoonUrl = `https://medium.com/feed/@hackernoon`;

const fetchRedditItem = ({ children }) => {
  if (children.length) {
    return children.map(child => {
      if (child.children) {
        return fetchRedditItem(child);
      } else {
        return child.data;
      }
    });
  }
};

const fetchRedditArticles = url =>
  fetch(url)
    .then(res => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error(res.json().message);
      }
    })
    .then(json => fetchRedditItem(json.data));

const fetchRedditComments = url =>
  fetch(url)
    .then(res => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error('Response is not OK');
      }
    })
    .then(json => json.map(comment => fetchRedditItem(comment.data)));

const parseUrl = 'https://api.rss2json.com/v1/api.json?rss_url=';
const hackernoonArticles = url =>
  fetch(parseUrl + url).then(res => res.json()).then(({ feed, items }) => ({
    feed,
    items
  }));

function* fetchComments(articles) {
  const comments = yield all(
    articles.map(article => {
      const redditCommentsUrl = `https://www.reddit.com/r/vim/comments/${article.id}.json`;
      return call(fetchRedditComments, redditCommentsUrl);
    })
  );
  return comments.map(item => {
    return {
      //Too deeply nested due to multiple maps above ... TODO
      article: item[0][0],
      comments: item[1]
    };
  });
}

function* getArticles(url) {
  try {
    const articles = yield call(fetchRedditArticles, url);
    const itemisedArticles = yield call(fetchComments, articles);
    yield put(actions.redditSuccess(itemisedArticles));
  } catch (e) {
    console.log('error', e);
    yield put(actions.redditFailure(e));
  }
}

function* initialFetch() {
  yield fork(getArticles, redditUrl);
}

function* fetchSubReddit() {
  yield take(c.FETCH_REDDIT);
  const subreddit = yield select(state => state.search);
  const redditUrl = `http://www.reddit.com/r/${subreddit}/new.json?sort=new`;
  yield fork(getArticles, redditUrl);
}

function* getHNArticles() {
  const hackernoon = yield call(hackernoonArticles, hackernoonUrl);
  try {
    yield put(actions.hackernoonSuccess(hackernoon));
  } catch (e) {
    yield put(actions.hackernoonFailure(e));
  }
}

export default function* root() {
  yield all([
    fork(initialFetch, redditUrl),
    fork(getHNArticles),
    fork(fetchSubReddit)
  ]);
}
