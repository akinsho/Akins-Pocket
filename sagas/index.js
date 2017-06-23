import { take, put, call, fork } from 'redux-saga/effects';

import * as actions from './../actions';

const redditUrl = `http://www.reddit.com/r/vim/new.json?sort=new`;
const scrapeUrl = `https://job-news-scraper.herokuapp.com/scrapings`;
const hackernoonUrl = `https://medium.com/feed/@hackernoon`;

const fetchRedditArticles = url =>
  fetch(url)
    .then(res => res.json())
    .then(json => json.data.children.map(article => article.data));

const promisify = fn => (...args) =>
  new Promise((resolve, reject) => {
    fn(...args, (err, res) => {
      if (err) {
        return reject(err);
      }
      resolve(res);
    });
  });

const parseUrl = 'https://api.rss2json.com/v1/api.json?rss_url=';
const hackernoonArticles = url =>
  fetch(parseUrl + url).then(res => res.json()).then(({ feed, items }) => ({
    feed,
    items
  }));

function* getArticles() {
  const articles = yield call(fetchRedditArticles, redditUrl);
  try {
    yield put(actions.redditSuccess(articles));
  } catch (e) {
    yield put(actions.redditFailure(e));
  }
}
function* getHNArticles() {
  const hackernoon = yield call(hackernoonArticles, hackernoonUrl);
  try {
    yield put(actions.hackernoonSuccess(hackernoon));
  } catch (e) {
    yield put(actions.hackernoonFailure(e));
  }
}

export default function*() {
  yield fork(getArticles);
  yield fork(getHNArticles);
}
