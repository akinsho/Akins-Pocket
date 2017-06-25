import { take, select, put, call, fork, takeLatest } from 'redux-saga/effects';

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
  fetch(url).then(res => res.json()).then(json => fetchRedditItem(json.data));

const fetchRedditComments = url =>
  fetch(url)
    .then(res => res.json())
    .then(json => json.map(comment => fetchRedditItem(comment.data)));

const parseUrl = 'https://api.rss2json.com/v1/api.json?rss_url=';
const hackernoonArticles = url =>
  fetch(parseUrl + url).then(res => res.json()).then(({ feed, items }) => ({
    feed,
    items
  }));

function* fetchComments(articles) {
  const comments = yield articles.map(article => {
    const redditCommentsUrl = `https://www.reddit.com/r/vim/comments/${article.id}.json`;
    return call(fetchRedditComments, redditCommentsUrl);
  });
  return comments.map(item => {
    return {
      //Too deeply nested due to multiple maps above ... TODO
      article: item[0][0],
      comments: item[1]
    };
  });
}

function* getArticles(url) {
  console.log('getting', url);
  const articles = yield call(fetchRedditArticles, url);
  const itemisedArticles = yield call(fetchComments, articles);
  try {
    yield put(actions.redditSuccess(itemisedArticles));
  } catch (e) {
    yield put(actions.redditFailure(e));
  }
}

function* initialFetch() {
  yield fork(getArticles, redditUrl);
}

function* fetchSubReddit() {
  yield take(c.FETCH_REDDIT);
  const subreddit = yield select(state => state.search);
  console.log('fetch', subreddit);
  const redditUrl = `http://www.reddit.com/r/${subreddit}/new.json?sort=new`;
  yield fork(getArticles, redditUrl);
  //try {
  //const subreddit = yield select(state => state.search);
  //const redditUrl = `http://www.reddit.com/r/${subreddit}/new.json?sort=new`;
  //const articles = yield call(fetchRedditArticles, redditUrl);
  //const newSubreddit = yield call(fetchComments, articles);
  //console.log('newSubreddit', newSubreddit);
  //yield put(actions.redditSuccess(newSubreddit));
  //} catch (e) {
  //yield put(actions.redditFailure(e));
  //}
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
  yield fork(initialFetch, redditUrl);
  yield fork(getHNArticles);
  yield fork(fetchSubReddit);
  //takeLatest(c.FETCH_REDDIT, fetchSubReddit)
}
